<template>
  <div id="mobileLogin">
    <van-row class="my-row">
      <img src="../../assets/images/logo2.png" alt="厦门知识产权运营公共服务平台">
    </van-row>
    <van-row class="my-row">
      <h2>厦门知识产权</h2>
      <h2>运营公共服务平台</h2>
    </van-row>
    <van-row class="my-row my-content">
      <van-form @submit="onSubmit" ref="form" validate-first>
        <van-tabs v-model="active" color="#2F72D1" title-active-color="#2F72D1" title-inactive-color="#A2A2A2"
                  background="none">
          <van-tab title="账号登录" name="1">

            <van-field
              v-model="formLogin.username"
              name="username"
              placeholder="请输入账号"
              :rules="validatorRules.username"
            />
            <van-field
              v-model="formLogin.password"
              type="password"
              name="password"
              placeholder="请输入密码"
              autocomplete="false"
              :rules="validatorRules.password"
            />
          </van-tab>
          <van-tab title="手机号登录" name="2">
            <van-field
              v-model="formLogin.mobile"
              name="mobile"
              placeholder="请输入手机号"
              :rules="validatorRules.mobile"
            />
            <van-field
              v-model="formLogin.captcha"
              clearable
              placeholder="请输入短信验证码"
              :rules="validatorRules.captcha"
            >
              <template #button>
                <van-button size="small" color="#2F72D1" @click.stop.prevent="getCaptcha" :disabled="state.smsSendBtn">
                  {{ !state.smsSendBtn && '获取验证码' || (state.time+' s') }}
                </van-button>
              </template>
            </van-field>
          </van-tab>
        </van-tabs>
        <div class="my-btn">
          <van-button block color="#2F72D1" native-type="submit" oading-text="登录中" :loading="loginBtn"
                      :disabled="loginBtn">
            登录
          </van-button>
        </div>
        <van-row type="flex" justify="space-between">
          <a :href="registerUrl" class="forge-password">
            新用户注册
          </a>
          <a :href="forgetUrl" class="forge-password">
            忘记密码
          </a>
        </van-row>
        <van-row class="my-row my-ixm">
          <a :href="getIxmUrl()" style="display: flex;align-items: flex-end;justify-content: center;">
            <img src="../../assets/images/index.png" alt="i厦门">
            <span>i厦门市民通行证登录</span>
          </a>
        </van-row>
      </van-form>
    </van-row>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { encryption } from '@/utils/encryption/aesEncrypt'
  import { mapActions } from 'vuex'
  import bus from '@/assets/eventBus'
  import { timeFix } from '@/utils/util'
  import { postAction } from '@/api/manage'


  export default {
    name: 'MobileLogin',
    inject: ['reload'],
    data() {
      return {
        registerUrl: window._CONFIG['registerUrl'],
        forgetUrl: window._CONFIG['forgetUrl'],
        formLogin: {
          username: '',
          password: '',
          captcha: '',
          mobile: '',
          rememberMe: true
        },
        validatorRules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'onBlur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'onBlur' }
          ],
          mobile: [{
            required: true,
            message: '请输入正确格式的手机号码!',
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
          }],
          captcha: [{ required: true, message: '请输入验证码!' }]
        },
        active: '1',
        state: {
          time: 180,
          smsSendBtn: false
        },
        loginBtn: false,
        encryptedString: {
          key: 'Xmzscq3234567889',
          iv: 'Xmzscq3234567889'
        },
        verifiedCode: '',
        inputCodeContent: '',
        inputCodeNull: true,

        departList: [],
        departVisible: false,
        departSelected: '',
        currentUsername: '',
        validate_status: '',
        isReload: true
      }
    },
    created() {

    },
    methods: {
      ...mapActions(['Login', 'Logout', 'PhoneLogin']),
      getIxmUrl() {
        return window._CONFIG['ixmURL']
      },
      onSubmit() {
        const that = this
        const loginParams = {
          remember_me: that.formLogin.rememberMe
        }
        that.loginBtn = true
        // 使用账户密码登录
        if (this.active === '1') {
          loginParams.username = that.formLogin.username
          loginParams.password = encryption(that.formLogin.password, that.encryptedString.key, that.encryptedString.iv)
          that.Login(loginParams).then((res) => {
            that.departConfirm(res)
            Vue.ls.set(window._CONFIG['roleCookieName'], res['result']['roleInfo'], 7 * 24 * 60 * 60 * 1000)
          }).catch((err) => {
            that.requestFailed(err)
          })
        } else {
          loginParams.mobile = that.formLogin.mobile
          loginParams.captcha = that.formLogin.captcha
          that.PhoneLogin(loginParams).then((res) => {
            this.departConfirm(res)
          }).catch((err) => {
            that.requestFailed(err)
          })
        }
      },
      getCaptcha(e) {
        e.preventDefault()
        const that = this
        that.$refs.form.validate('mobile').then(() => {
          that.state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (that.state.time-- <= 0) {
              that.state.time = 180
              that.state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$notify({
            type: 'primary',
            message: '验证码发送中..',
            duration: 0
          })
          const smsParams = {}
          smsParams.mobile = this.formLogin.mobile
          smsParams.smsmode = '0'
          postAction('/sys/sms', smsParams)
            .then(res => {
              if (!res.success) {
                setTimeout(hide, 0)
                that.cmsFailed(res.message)
              }
              console.log(res)
              setTimeout(hide, 500)
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              that.state.time = 180
              that.state.smsSendBtn = false
              that.requestFailed(err)
            })
        }).catch((err) => {
          that.cmsFailed(err.message)
        })

      },
      generateCode(value) {
        this.verifiedCode = value.toLowerCase()
      },
      inputCodeChange(e) {
        this.inputCodeContent = e.target.value
        if (!e.target.value || e.target.value === 0 || e.target.value === '0') {
          this.inputCodeNull = true
        } else {
          this.inputCodeContent = this.inputCodeContent.toLowerCase()
          this.inputCodeNull = false
        }
      },
      departConfirm(res) {
        if (res.success) {
          const multiDepart = res.result.multi_depart
          // 0:无部门 1:一个部门 2:多个部门
          if (multiDepart === 0 || multiDepart === '0') {
            this.loginSuccess()
          } else if (multiDepart === 2 || multiDepart === '2') {
            this.departVisible = true
            this.currentUsername = this.form.getFieldValue('username')
            this.departList = res.result.departs
          } else {
            this.loginSuccess()
          }
        } else {
          this.requestFailed(res)
          this.Logout()
        }
      },
      requestFailed(err) {
        console.info(err)
        this.$notify({
          message: '登录失败:' + err.message || ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
          type: 'danger'
        })
        this.loginBtn = false
      },
      loginSuccess() {
        this.$notify({
          message: `${timeFix()}，欢迎回来`,
          type: 'success'
        })
        this.$emit('func')
        this.$emit('message')
        this.handleCancel()
        if (this.keyRoute !== undefined && this.keyRoute !== '') {
          this.$router.push({ name: this.keyRoute })
        }
        if (this.isReload) {
          this.reload()
        } else {
          bus.$emit('transmitData')
        }
      },
      cmsFailed(err) {
        this.$notify({
          message: '登录失败:' + err,
          type: 'warning',
          duration: 4000
        })
      },
      handleCancel(e) {
        this.loginBtn = false
        this.$emit('close')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #mobileLogin {
    .my-row {
      text-align: center;
      img {
        padding-top: 72/2px;
        width: 178/2px;
        height: 178/2px;
      }
      h2 {
        color: #001833;
        font-size: 36/2px;
        font-weight: 400;
        margin: 0;
      }
    }
    .my-content {
      margin: 100/2px 80/2px 0;
      /deep/ .van-tabs__content {
        padding-top: 100/2px;
        padding-bottom: 20/2px;
      }
      /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border-width: 0;
      }
      .van-cell {
        background: none;
        margin-bottom: 40/2px;
        border-bottom: 1Px solid #ebedf0;
        padding-left: 0;
      }
      .van-cell {

      }
      .van-cell::after {
        border-bottom: none;
      }
      .my-btn {
        .van-button__text {
          font-size: 36/2px;
        }
        margin-bottom: 20/2px;
      }
      .forge-password {
        color: @main-color;
        font-size: 28/2px;
      }

      .my-ixm {
        img {
          width: 43/2px;
          height: 39/2px;
          padding-right: 2px;
          padding-top: 100/2px;
        }
        a {
          color: @main-color;
          font-size: 28/2px;
        }
        padding-bottom: 49/2px;
      }
    }

    /deep/ .van-field--error .van-field__control::placeholder {
      color: #969799;
      -webkit-text-fill-color: currentColor;
    }
  }
</style>