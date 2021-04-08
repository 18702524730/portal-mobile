<template>
  <div id="mobileTrainActivityApply">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <van-nav-bar
        title="活动报名"
        left-arrow
        @click-left="onClickLeft"
        :fixed="false"
        placeholder
        class="bar-head"
      >
      </van-nav-bar>
      <div class="my-main-content">
        <p class="hint-p">
          * 为确保您能成功报名，请确保您的相关信息已完善准确。
        </p>
        <p class="a-p" v-if="!registerState">
          <a @click="loginBtn">有账号直接登录-></a>
        </p>

        <div class="form-div">
          <van-form ref="ruleForm">
            <van-field
              required
              v-model="form.realname"
              name="realname"
              label="姓名"
              placeholder="请输入姓名"
              :rules="[{required: true, message: '请输入姓名' }]"
            />
            <van-field
              required
              v-model="form.phone"
              name="phone"
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{pattern,  required: true, message: '请输入正确手机号' }]"
            />
            <van-field
              required
              v-model="form.captcha"
              name="captcha"
              center
              clearable
              label="短信验证码"
              placeholder="请输入短信验证码"
              v-if="!registerState"
            >
              <template #button>
                <van-button size="small"
                            type="primary"
                            class="my-sms"
                            tabindex="-1"
                            :disabled="state.smsSendBtn"
                            @click.stop.prevent="getCaptcha">{{!state.smsSendBtn && '获取验证码' || (state.time+' s')}}
                </van-button>
              </template>
            </van-field>
            <van-field
              required
              v-model="form.orgName"
              name="orgName"
              label="公司名称"
              placeholder="请输入公司名称"
              :rules="[{ required: true, message: '请输入公司名称' }]"
            />
            <van-field
              required
              readonly
              clickable
              name="post"
              :value="form.postStr"
              label="职位"
              placeholder="请选择职位"
              @click="showPicker = true"
              :rules="[{ required: true, message: '请选择职位' }]"
            />
            <van-field
              required
              readonly
              clickable
              name="workExperience"
              :value="form.workExperienceStr"
              label="工作经验"
              placeholder="请选择工作经验"
              @click="showWorkExperience = true"
              :rules="[{ required: true, message: '请选择工作经验' }]"
            />
            <van-field
              required
              readonly
              clickable
              name="location"
              :value="form.locationStr"
              label="所在地选择"
              placeholder="点击选择所在地"
              @click="showAreaPopup"
              :rules="[{ required: true, message: '点击选择所在地' }]"
            />
          </van-form>
        </div>
      </div>

      <van-tabbar
        placeholder :fixed="false" class="bar-footer">
        <van-row class="tabbar-btn">
          <van-col :span="12">
            <van-button type="default" class="contact-btn" @click="onClickLeft">取消</van-button>
          </van-col>
          <van-col :span="12">
            <van-button type="default" class="buy-btn" @click="handleOk">确认报名</van-button>
          </van-col>
        </van-row>
      </van-tabbar>
    </van-popup>

    <van-popup
      get-container="#app"
      position="bottom"
      round
      v-model="show"
      @close="closePopup">
      <van-area
        title="选择地域"
        :area-list="dictOptions.threeLocationSameLevel"
        @confirm="confirmArea"
        @cancel="cancelArea"
        visible-item-count="7"
        ref="myArea"
        :columns-num="2"
      />
    </van-popup>

    <van-popup v-model="showPicker" position="bottom" @close="closePicker('position')" get-container="#app">
      <van-picker
        title="选择职位"
        show-toolbar
        :columns="dictOptions.position"
        @confirm="onConfirm"
        @cancel="closePicker('position')"
      />
    </van-popup>

    <van-popup v-model="showWorkExperience" position="bottom" @close="closePicker('showWorkExperience')"
               get-container="#app">
      <van-picker
        title="选择工作经验"
        show-toolbar
        :columns="dictOptions.work_experience"
        @confirm="onWorkConfirm"
        @cancel="closePicker('showWorkExperience')"
      />
    </van-popup>
  </div>
</template>

<script>
  import { judgeState } from '@/utils/util'
  import { mapGetters } from 'vuex'
  import { getActionUpdateKeyword, postAction } from '@/api/manage'

  export default {
    name: 'MobileTrainActivityApply',
    inject: ['headLogin'],
    data() {
      return {
        detailsShow: false,
        form: {
          realname: '',
          phone: '',
          captcha: '',
          orgName: '',
          post: '',
          workExperience: '',
          location: '',
          locationArr: [],

          userId: '',
          offlineSalonId: ''
        },
        url: {
          infoUrl: '/zscq/portal/training/getBaseInfo',
          applyUrl: '/zscq/portal/training/offlineSalonRegistration',
          smsUrl: '/zscq/portal/training/smsVerificationCode',
          dictUrl: '/zscq/portal/getDictInfo'
        },
        show: false,
        allLocation: [],
        activeItems: [],
        areaOptions: [],

        registerState: false,
        pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,

        showPicker: false,
        showWorkExperience: false,

        state: {
          time: 180,
          smsSendBtn: false
        },

        dictOptions: {
          position: [],
          work_experience: [],
          threeLocationSameLevel: {}
        },
        dictCode: ['threeLocationSameLevel', 'position', 'work_experience']
      }
    },
    created() {
      this.$showLoading({
        title: '加载中。。。'
      })
      for (const a of this.dictCode) {
        this.loadInfo(a)
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      getCaptcha() {
        const that = this
        this.$refs.ruleForm.validate('phone').then(valid => {
          this.state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (that.state.time-- <= 0) {
              that.state.time = 180
              that.state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          that.$showLoading({
            title: '验证码发送中。。。'
          })
          const smsParams = {}
          smsParams.mobile = this.form.phone
          smsParams.offlineSalonId = this.form.offlineSalonId
          getActionUpdateKeyword(this.url.smsUrl, smsParams)
            .then(res => {
              if (!res.success) {
                setTimeout(() => {
                  that.$cancelLoading()
                }, 0)
                that.$notify({ type: 'warning', message: res.message })
                that.state.time = 0
                console.info('hahaahah')
              }
              console.log(res)
              setTimeout(() => {
                that.$cancelLoading()
              }, 500)
            })
            .catch(err => {
              setTimeout(() => {
                that.$cancelLoading()
              }, 1)
              clearInterval(interval)
              that.state.time = 180
              that.state.smsSendBtn = false
              that.$notify({ type: 'danger', message: err })
            })
        })
      },
      closePicker(value) {
        this[`${value}`] = false
      },
      onConfirm(value) {
        console.info(value)
        this.form.postStr = value.title
        this.form.post = value.value
        this.showPicker = false
      },
      onWorkConfirm(value) {
        this.form.workExperienceStr = value.title
        this.form.workExperience = value.value
        this.showWorkExperience = false
      },
      closePopup() {
        this.show = false
      },
      cancelArea() {
        this.show = false
      },
      confirmArea(arr) {
        this.transmitData(arr)
        this.cancelArea()
      },
      showAreaPopup() {
        this.show = true
      },
      transmitData(objArr) {
        const arr = objArr.map(item => item.code)
        const arrStr = objArr.map(item => item.name)
        this.form.location = arr.join(',')
        this.form.locationStr = arrStr.join('/')
      },
      showPopup(id) {
        this.registerState = judgeState()
        if (this.registerState) {
          // 如果是登录用户，把userId赋值
          const user = this.userInfo()
          this.form.userId = user.id
          this.form.realname = user.realname
          this.form.phone = user.phone
          this.form.orgName = user.orgName === null ? '' : user.orgName
        }
        // 赋值活动id
        this.form.offlineSalonId = id
        this.detailsShow = true
      },
      onClickLeft() {
        this.detailsShow = false
        this.$refs.ruleForm.resetValidation()

        if (this.$refs.myArea && this.$refs.myArea.reset){
          this.$refs.myArea.reset()
        }
        this.state.time = 0
        this.form = {
          realname: '',
          phone: '',
          captcha: '',
          orgName: '',
          post: '',
          postStr: '',
          workExperience: '',
          workExperienceStr: '',
          location: '',
          locationStr: '',
          userId: '',
          offlineSalonId: ''
        }
      },
      handleOk() {
        this.$refs.ruleForm.validate().then(
          valid => {
            this.$showLoading({
              title: '加载中。。。'
            })
            postAction(this.url.applyUrl, this.form).then((res) => {
              if (!res.success) {
                this.$notify({ type: 'danger', message: res.message })

              } else {
                this.$notify({ type: 'success', message: '报名成功' })
                // 刷新
                this.$emit('func')
                // 重置表单
                this.onClickLeft()
              }
            }).finally(() => {
              this.$cancelLoading()
            })
          })
      },
      loginBtn() {
        this.onClickLeft()
        this.headLogin()
      },
      async loadInfo(code) {
        const res = await getActionUpdateKeyword(this.url.dictUrl, { code: code })
        if (res.success) {
          this.dictOptions[`${code}`] = res.result
        }
        this.$cancelLoading()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileTrainActivityApply {

  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .bar-head {
      height: 7%;
    }
    .my-main-content {
      height: 85.5%;
      overflow-y: auto;

      .hint-p {
        color: #FF3300;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
      }
      .a-p {
        font-size: 12px;
        text-align: right;
        padding: 0 20px;
        line-height: 24px;
        color: @main-color;
      }
      p {
        margin: 0;
      }
      .form-div {
        /deep/ .van-field__label {
          font-size: 14px;
          color: #333333;
        }
        .my-sms {
          background-color: @main-color;
          border-color: @main-color;
        }
      }
    }
    .bar-footer {
      height: 7.5%;

      .tabbar-btn {
        width: 100%;
        .van-col {
          height: 100%;
        }
        .van-button {
          width: 100%;
          height: 100%;
          border: none;
          font-size: 18px;
        }
        .contact-btn {
          color: @main-color;
        }
        .buy-btn {
          background-color: @main-color;
          color: #ffffff;
        }
      }

    }

    /deep/ .van-field--error .van-field__control::placeholder {
      color: #969799;
      -webkit-text-fill-color: currentColor;
    }
  }
</style>