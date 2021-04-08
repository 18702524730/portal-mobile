<template>
  <div id="supplyPatentDetails">
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
                <van-icon :name="item.collection?'star':'star-o'" class="icon-size" :class="{'collect-span':item.collection}"/>
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
              <van-image :src="getImgNewView(item.imgUrl)" class="my-image"/>
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
                    <span>技术领域：</span>
                    <span>{{ item.technicalFieldName}}</span>
                  </van-col>
                  <van-col :span="12" class="van-ellipsis">
                    <span>交易价格：</span>
                    <span class="money-span">{{ newMoney }}</span>
                  </van-col>
                </van-row>
              </div>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="12" class="van-ellipsis">
                    <span>合作区域：</span>
                    <span>{{ item.cooperationAreaName}}</span>
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
            <content-body title="专利供应内容" :contentArr="contentArr"
                          v-if="item.patentRemark" :is-html="true"></content-body>
          </van-row>

          <van-row>
            <content-body title="专利供应描述" v-if="item.patentRemark"
                          :self-content="true">
              <template slot="selfContent">
                <div class="ant-descriptions ant-descriptions-bordered">
                  <div class="ant-descriptions-view">
                    <table cellspacing="0" cellpadding="0">
                      <tr class="ant-descriptions-row">
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">申请号</th>
                        <td class="ant-descriptions-item-content">{{item.applyNo}}</td>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">公布号</th>
                        <td class="ant-descriptions-item-content">{{item.announcementCode}}</td>
                      </tr>
                      <tr class="ant-descriptions-row">
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">申请日</th>
                        <td class="ant-descriptions-item-content">{{item.applyDate}}</td>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">公布日</th>
                        <td class="ant-descriptions-item-content">{{item.announcementDay}}</td>
                      </tr>
                      <tr class="ant-descriptions-row">
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">专利类型</th>
                        <td class="ant-descriptions-item-content">{{item.patentTypeName}}</td>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">专利状态</th>
                        <td class="ant-descriptions-item-content">{{item.pantentStatus}}</td>
                      </tr>
                      <tr class="ant-descriptions-row">
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">申请人</th>
                        <td class="ant-descriptions-item-content">{{item.applyer}}</td>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">专利权人</th>
                        <td class="ant-descriptions-item-content">{{item.patenter}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </template>
            </content-body>
          </van-row>
        </div>

        <van-tabbar
          placeholder :fixed="false" class="bar-footer">
          <van-row class="tabbar-btn">
            <van-col :span="12">
              <van-button type="default" class="contact-btn" icon="manager-o" @click="contactBtn"  :disabled="contact">联系卖家</van-button>
            </van-col>
            <van-col :span="12">
              <van-button type="default" class="buy-btn" icon="goods-collect" @click="buyService">购买服务</van-button>
            </van-col>
          </van-row>
        </van-tabbar>
      </div>
    </van-popup>
    <contact-popup ref="contactMeRef"></contact-popup>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ContentBody from '../general/ContentBody'
  import ContactPopup from '../popup/ContactPopup'

  export default {
    name: 'SupplyPatentDetails',
    components: { ContactPopup, ContentBody },
    inject: ['headLogin'],
    data() {
      return {
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 2,

        statusUrl: '/zscq/portal/getServeOrderStatusStr',
        statusMes: '',

        detailsShow: false,
        loginBtn: false,
        contentArr: [],
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
      getImgNewView,
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
          this.statusMes = this.item.jyStatusName
          this.contentArr = [{ content: this.item.patentRemark, littleTitle: '专利简介', isHtml: true }]
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
      buyService() {
        this.$notify({ type: 'primary', message: '请在PC端进行购买操作' })
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

  #supplyPatentDetails {

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

    table {
      white-space: nowrap;
      margin: 0;
      th {
        font-weight: normal;
        font-size: 9px;
        color: #515A6E;
      }
    }

    .ant-descriptions-bordered .ant-descriptions-row {
      border-bottom: 1Px solid #e8e8e8;
    }

    .ant-descriptions-bordered .ant-descriptions-item-label, .ant-descriptions-bordered .ant-descriptions-item-content {
      padding: 6px;
      border-right: 1Px solid #e8e8e8;
      border-bottom: 1Px solid #e8e8e8;
    }

    .ant-descriptions-bordered .ant-descriptions-item-label {
      background-color: #fafafa;
      text-align: right;
    }

    .ant-descriptions-view {
      width: 100%;
      overflow: auto;
      border-radius: 4px;
    }

    .ant-descriptions-item-content {
      font-size: 7px;
      display: table-cell;
      color: #515A6E;
      text-align: left;
      a {
        text-decoration: underline;
        color: rgba(0, 0, 0, 0.65);
        &:hover {
          color: @main-color;
        }
      }
    }
    .ant-descriptions-bordered .ant-descriptions-row:last-child {
      border-bottom: none;
    }
    .ant-descriptions-bordered .ant-descriptions-view > table {
      table-layout: auto;
    }
    .ant-descriptions-view table {
      width: 100%;
      table-layout: fixed;
    }
    .ant-descriptions-row > th, .ant-descriptions-row > td {
      padding-bottom: 5px;
    }
    .ant-descriptions-bordered .ant-descriptions-view {
      border: 1Px solid #e8e8e8;
      border-bottom: none;
    }
  }
</style>