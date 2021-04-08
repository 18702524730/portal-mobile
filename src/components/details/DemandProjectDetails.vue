<template>
  <div id="demandProjectDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="item.title"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
          :fixed="false"
          placeholder
          class="bar-head"
        >
          <template #right>
            <van-row class="right-btn">
              <van-row>
                <van-icon :name="item.collection?'star':'star-o'" :class="{'collect-span':item.collection}" class="icon-size"/>
              </van-row>
              <van-row>
                {{!item.collection?'收藏':'已收藏'}}
              </van-row>
            </van-row>

          </template>
        </van-nav-bar>
        <div class="my-main-content">
          <van-row class="content-card">
            <van-row>
              <van-image :src="getImgView(item.imgUrl)" class="my-image"  fit="contain"/>
            </van-row>
            <van-row class="title container">
              <h3 class="van-multi-ellipsis--l2">{{ item.title }}</h3>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="12" class="van-ellipsis">
                    <span>所属行业：</span>
                    <span>{{ item.belongIndustryName}}</span>
                  </van-col>
                  <van-col :span="12" class="van-ellipsis">
                    <span>意向运营方式：</span>
                    <span>{{ item.intendedOperationModeName}}</span>
                  </van-col>
                </van-row>
              </div>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="12" class="van-ellipsis">
                    <span>项目所在地：</span>
                    <span>{{ item.madeAreaCodeName}}</span>
                  </van-col>
                  <van-col :span="12" class="van-ellipsis">
                    <span>交易价格：</span>
                    <span class="money-span">{{ newMoney }}</span>
                  </van-col>
                </van-row>
              </div>
              <van-row class="my-time" type="flex" align="center">
                <van-icon name="clock-o"/>
                {{ item.publishTime | changeDate}}
              </van-row>
            </van-row>
          </van-row>
          <van-row>
          </van-row>

          <van-row>
            <content-body title="项目需求内容"
                          :contentArr="[{content:item.projectRemark,littleTitle:'项目简介',isHtml:true},{content:item.requireContent,littleTitle:'项目需求内容',isHtml:true}]"
                          v-if="item.projectRemark || item.requireContent"></content-body>
          </van-row>

          <van-row>
            <content-body title="项目需求描述"
                          :contentArr="[{content:item.sloveProblem,littleTitle:'解决的技术问题',isHtml:false},{content:item.technicalField,littleTitle:'适用的领域/范围',isHtml:false}]"
                          v-if="item.sloveProblem || item.technicalField"></content-body>
          </van-row>
        </div>

        <van-tabbar
          placeholder :fixed="false" class="bar-footer">
          <van-row class="tabbar-btn">
            <van-col :span="24">
              <van-button type="default" class="contact-btn" icon="manager-o" @click="contactBtn"  :disabled="contact">联系卖家</van-button>
            </van-col>
          </van-row>
        </van-tabbar>
      </div>
    </van-popup>

    <contact-popup ref="contactMeRef"></contact-popup>
  </div>
</template>

<script>
  import { isAdmin } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ContentBody from '../general/ContentBody'
  import ContactPopup from '../popup/ContactPopup'

  export default {
    name: 'DemandProjectDetails',
    components: { ContactPopup, ContentBody },
    inject: ['headLogin'],
    data() {
      return {
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 4,

        statusUrl: '/zscq/portal/getServeOrderStatusStr',
        statusMes: '',

        detailsShow: false,
        loginBtn: false,
        defaultIcon: require('../../assets/images/defaultImg.png'),
        contact: false,
        getMessageUrl: '/zscq/portal/getSupplyRequiermentCreaterInfo'
      }
    },
    methods: {
      refresh(id) {
        this.loadData(id)
      },
      showPopup(id) {
        this.detailsShow = true
        this.loadData(id)
      },
      /* 图片预览 */
      getImgView(text) {
        if (text === null || text === undefined) {
          text = this.defaultIcon
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      onClickRight() {
        if (this.loginBtn) {
          return
        }
        if (judgeState()) {
          if (isAdmin()) {
            this.$notify({ type: 'warning', message: '您没有权限，暂时不能操作!' })
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper(this.keyRoute)
        } else {
          // 没有登录，则先进行登录
          this.$notify({ type: 'warning', message: '请先进行登录！' })
          this.headLogin()
        }
      },
      collectOper(keyRoute) {
        const that = this
        that.loginBtn = true
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          id: this.item.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$notify({ message: '收藏成功！', type: 'success', duration: 2000 })
            } else {
              that.$notify({ message: '取消收藏成功！', type: 'success', duration: 2000 })
            }
            that.loadData(that.item.id)
            that.$emit('func')
          } else {
            that.$notify({ type: 'warning', message: res.message })
          }
        }).finally(() => {
          that.loginBtn = false
        })
      },
      onClickLeft() {
        this.detailsShow = false
      },
      async loadData(id) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.url, {
          supplyRequirementType: this.supplyRequirementType,
          id: id
        })
        if (res.success) {
          this.item = res.result
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }

        this.$cancelLoading()
      },
      getPhoneByItem(item) {
        this.contact = true
        getActionUpdateKeyword(this.getMessageUrl, {
          type: item.supplyRequirementType,
          id: item.id
        }).then((res) => {
          if (res.success) {
            this.$refs.contactMeRef.showPopup(res.result.orgId ? res.result.orgId : res.result.userId, res.result.userId)
          } else {
            this.$notify({ type: 'danger', message: res.message })
          }
          this.contact = false
        }).finally(() => {
          this.contact = false
        })
      },
      contactBtn() {
        if (judgeState()) {
          this.getPhoneByItem(this.item)
        } else {
          this.$notify({ type: 'danger', message: '请先进行登录!' })
          this.headLogin()
        }
      }
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return this.item.money
        }
      }
    },
    filters: {}
  }
</script>

<style scoped lang="less">
  @import "details";

  #demandProjectDetails {

  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .right-btn {
      font-size: 10px;
      color: @main-font-color2;
      text-align: center;
      .collect-span {
        color: #ff3300;
      }
    }
    .bar-head {
      height: 7%;
    }
    .bar-footer {
      height: 7.5%;
    }
    .my-main-content {
      height: 85.5%;
      overflow-y: auto;
    }
    .content-card {
      .money-span {
        color: #ff3300;
      }
    }

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
        background-color: #EB4826;
        color: #ffffff;
      }
    }
  }
</style>