<template>
  <div id="serviceProjectDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="request.org.name"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight(request.org.id)"
          :fixed="false"
          placeholder
          class="bar-head"
        >
          <template #right>
            <van-row class="right-btn">
              <van-row>
                <van-icon :name="request.org.collection?'star':'star-o'" class="icon-size"
                          :class="{'collect-span':request.org.collection}"/>
              </van-row>
              <van-row>
                {{!request.org.collection?'收藏':'已收藏'}}
              </van-row>
            </van-row>

          </template>
        </van-nav-bar>
        <div class="my-main-content">
          <van-row class="content-card">
            <van-row :gutter="15">
              <van-col :span="8" class="my-logo">
                <van-image :src="getImgNewView(request.org.logo)" class="my-image" fit="contain"/>
              </van-col>
              <van-col :span="16">
                <van-row>
                  <span class="title">负责人：</span><span class="content">{{request.org.legal}}</span>
                </van-row>
                <van-row>
                  <span class="title">成立时间：</span><span class="content">{{request.org.startDate}}</span>
                </van-row>
                <van-row>
                  <span class="title">联系电话：</span><span class="content">{{request.org.phone}}</span>
                </van-row>
                <van-row>
                  <span class="title">联系地址：</span><span class="content">{{request.org.address}}</span>
                </van-row>
              </van-col>
            </van-row>
            <van-row class="condition">
              <van-col :span="24">
                <span class="title">已交易：</span><span class="content">{{request.orderInfo['已交易']}}<span
                v-if="request.orderInfo['已交易']">&nbsp;笔</span></span>
              </van-col>
              <van-col :span="24">
                <span class="title">交易进行中：</span><span class="content">{{request.orderInfo['交易中']}}<span
                v-if="request.orderInfo['已交易']">&nbsp;笔</span></span>
              </van-col>
              <van-col :span="24">
                <span class="title">交易终止：</span><span class="content">{{request.orderInfo['交易中止']}}<span
                v-if="request.orderInfo['已交易']">&nbsp;笔</span></span>
              </van-col>
            </van-row>
          </van-row>
          <van-row class="content-card content-card-project">
            <h2>服务信息</h2>
            <van-row class="card-img">
              <van-image :src="getImgNewView(item.imgUrl)" class="my-image2"/>
              <img src="../../assets/images/quan.png" alt="券" class="quan-img" v-if="item.voucher">
            </van-row>

            <van-row>
              <van-row type="flex" align="center" justify="space-between" class="head-title">
                <van-col :span="20">
                  <span class="project-name">{{item.title}}</span>
                </van-col>
                <van-col>
                  <van-row type="flex" align="center" justify="end">
                    <van-icon :name="item.collection?'star':'star-o'"
                              @click.stop="onClickRight(item.id)" :class="item.collection?'collect-span':''"/>
                    <span>{{item.collection? '已收藏':'收藏'}}</span>
                  </van-row>
                </van-col>
              </van-row>
              <van-row>
                <span class="title">
                  发布日期：
                </span>
                <span class="content">
                  {{item.publishTime | changeDate}}
                </span>
              </van-row>
              <van-row>
                <span class="title">
                  服务价格：
                </span>
                <span class="content collect-span">
                  {{newMoney}}
                </span>
              </van-row>
              <van-row>
                <span class="title">
                  服务评价：
                </span>
                <span class="content">
                  <van-rate
                    v-model="avgScoreValue"
                    :size="12"
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                  />
                </span>
              </van-row>
              <van-row v-if="item.projectIds !== undefined && item.projectIds.length > 0">
                <span class="title">
                  服务项目：
                </span>
                <span class="content">
                  <template v-for="(project,key) in item.projectNames" v-if="project !== null">
                    <span :key="key" style="padding-right: 5px">
                      <van-icon name="checked" color="#52c41a" style="display: inline-block;vertical-align: middle;"/>
                      <span style="display: inline-block;vertical-align: middle;">{{project}}</span>
                    </span>
                  </template>
                </span>
              </van-row>
              <van-row>
                <span class="title">
                  已成交数量：
                </span>
                <span class="content">
                  {{orderNums}}
                </span>
              </van-row>
            </van-row>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" line-width="68px">
              <van-tab title="服务介绍" name="1">
                <div v-html="item.serviceRemark" style="white-space: pre-wrap;word-break: break-all;overflow-x:auto;"
                     class="html-content">

                </div>
              </van-tab>
              <van-tab title="服务评价" name="2">
                <div class="ant-descriptions ant-descriptions-bordered"
                     v-if="evaluateData.length > 0">
                  <div class="ant-descriptions-view">
                    <table cellspacing="0" cellpadding="0">
                      <tr class="ant-descriptions-row">
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">评价用户/企业</th>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">服务评价</th>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">评价内容</th>
                      </tr>
                      <tr class="ant-descriptions-row"
                          v-for="(innerItem,innerIndex) in evaluateData" :key="innerItem.id">
                        <td class="ant-descriptions-item-content">{{innerItem.enterpriseName}}</td>
                        <td class="ant-descriptions-item-content">
                            <span>
                              <van-rate
                                v-model="innerItem.serveScore"
                                :size="14"
                                color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"
                                allow-half
                              />
                            </span>
                        </td>
                        <td class="ant-descriptions-item-content">
                          {{innerItem.evalContent}}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <van-pagination v-model="ipagination.current" :total-items="ipagination.total"
                                  :items-per-page="ipagination.pageSize" force-ellipses
                                  @change="ipagination.onChange"/>
                </div>
                <div v-else>
                  <van-empty description="没有内容"/>
                </div>
              </van-tab>
            </van-tabs>
          </van-row>
        </div>

        <van-tabbar
          placeholder :fixed="false" class="bar-footer">
          <van-row class="tabbar-btn">
            <van-col :span="12">
              <van-button type="default" class="contact-btn" icon="manager-o" @click.stop="contactBtn">联系卖家</van-button>
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
  import { judgeState, filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ContactPopup from '../popup/ContactPopup'

  export default {
    name: 'ServiceProjectDetails',
    components: { ContactPopup },
    inject: ['headLogin'],
    data() {
      return {
        request: {
          orderInfo: {},
          org: {}
        },
        url: '/zscq/portal/getServiceProductAllInfo',

        detailsShow: false,
        loginBtn: false,


        id: '',
        serviceProductId: '',

        detailsUrl: '/zscq/portal/getAgencyProductDetail',
        item: {},
        active: '1',


        evaluateData: [],
        getEvaluateUrl: '/zscq/portal/getPortalServeEvalPage',
        formParam: {
          serviceProductId: ''
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        }
      }
    },
    methods: {
      refresh(id) {
        this.loadData(id)
      },
      showPopup(id, serviceProductId) {
        this.id = id
        this.serviceProductId = serviceProductId
        this.detailsShow = true
        this.loadData(id, serviceProductId)
        this.loadDetailsData(serviceProductId)
      },
      getImgNewView,
      onClickRight(id) {
        if (this.loginBtn) {
          return
        }
        if (judgeState()) {
          if (isAdmin()) {
            this.$notify({ type: 'warning', message: '您没有权限，暂时不能操作!' })
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper(id)
        } else {
          // 没有登录，则先进行登录
          this.$notify({ type: 'warning', message: '请先进行登录！' })
          this.headLogin()
        }
      },
      collectOper(id) {
        const that = this
        that.loginBtn = true
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          id: id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$notify({ message: '收藏成功！', type: 'success', duration: 2000 })
            } else {
              that.$notify({ message: '取消收藏成功！', type: 'success', duration: 2000 })
            }
            that.loadData(that.id, that.serviceProductId)
            that.loadDetailsData(that.serviceProductId)
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
      async loadData(id, serviceProductId) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const param = {
          orgId: id,
          serviceProductId: serviceProductId
        }
        const res = await getActionUpdateKeyword(this.url, param)
        if (res.success) {
          this.request.orderInfo = res.result.orderInfo
          this.request.org = res.result.org
          if (this.request.orderInfo === null || this.request.orderInfo === undefined) {
            this.request.orderInfo = {}
          }
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
        this.$cancelLoading()
      },
      async loadDetailsData(serviceProductId) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const param = {
          id: serviceProductId
        }
        const res = await getActionUpdateKeyword(this.detailsUrl, param)
        if (res.success) {
          this.item = res.result
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
        this.formParam.serviceProductId = serviceProductId
        const eRes = await getActionUpdateKeyword(this.getEvaluateUrl, this.getParam(this.formParam, this.ipagination))
        if (eRes.success) {
          this.ipagination.total = eRes.result.total
          this.evaluateData = eRes.result.records
        } else {
          this.$notify({ type: 'warning', message: eRes.message })
        }
        console.info(eRes)
        this.$cancelLoading()
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      async handleTableChange(page) {
        this.ipagination.current = page
        this.$showLoading({
          title: '加载中。。。'
        })
        const eRes = await getActionUpdateKeyword(this.getEvaluateUrl, this.getParam(this.formParam, this.ipagination))
        if (eRes.success) {
          this.ipagination.total = eRes.result.total
          this.evaluateData = eRes.result.records
        } else {
          this.$notify({ type: 'warning', message: eRes.message })
        }
        this.$cancelLoading()
      },
      buyService() {
        this.$notify({ type: 'primary', message: '请在PC端进行购买操作' })
      },
      contactBtn() {
        if (judgeState()) {
          this.$refs.contactMeRef.showPopup(this.item.orgId, '-1')
        } else {
          this.$notify({ type: 'warning', message: '请先进行登录!' })
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
      },
      'orderNums': function() {
        const applyNum = this.item.serviceOrderNum === null ? 0 : this.item.serviceOrderNum
        return applyNum
      },
      'avgScoreValue': function() {
        if (this.item.avgScore === undefined || this.item.avgScore === null || this.item.avgScore === '') {
          return 5
        } else {
          return this.item.avgScore
        }
      }
    },
    filters: {
      getValue(value) {
        if (value === undefined || value === null) {
          return '无'
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  #serviceProjectDetails {

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
      margin-bottom: 10px;
      font-size: 12px;
      span {
        line-height: 20px;
      }
      .title {
        color: #666666;
      }
      .content {
        color: #333333;
      }
      padding: 15px;
      .my-image {
        width: 230/2px;
        height: 180/2px;
      }
      .my-image2 {
        width: 100%;
        height: 180px;
      }
      .money-span {
        color: #ff3300;
      }
      .condition {
        margin-top: 12px;
        padding: 0 10px;
        line-height: 24px;
        background-color: #F5F6FA;
        .title {
          color: #333333;
        }
        .content {
          color: #FF3300;
          span {
            color: #333333;
          }
        }
      }
    }
    .content-card-project {
      color: #666666;
      .head-title {
        margin: 10px 0;
      }
      h2 {
        font-weight: normal;
        font-size: 14px;
        margin: 0 0 12px 0;
      }
      .collect-span {
        color: #ff3300;
      }
      .project-name {
        font-size: 14px;
        color: @main-font-color;
      }
      .title, .content {
        display: inline-block;
        vertical-align: middle;
      }

      .card-img {
        position: relative;
        .quan-img {
          height: 25px;
          position: absolute;
          top: -19/2px;
          right: -10/2px;
        }
      }
    }
    .org-content {
      /deep/ .van-tabs__content {
      }
      h3 {
        color: #666666;
        font-size: 13px;
        font-weight: normal;
        padding: 0 7px;
        background-color: @main-bg-color;
        margin: 0;
        margin-bottom: 10px;
      }
      p {
        margin: 0;
        padding: 12px 15px;
        color: #666666;
        font-size: 12px;
        line-height: 20px;
        margin-bottom: 10px;
        background-color: #ffffff;
      }
    }
    .my-tab {
      margin-top: 10px;
      background-color: #ffffff;
      .html-content {
        font-size: 14px;
        /deep/ img{
          max-width: 100%;
        }
      }
      /deep/ .van-tab {
        font-size: 16px;
        font-weight: normal;
      }
      /deep/ .van-tabs__line {
        height: 2px;
      }
      .van-tabs__nav .van-tabs__nav--line {
        width: 50%;
      }
      /deep/ .van-tabs__content {
        border-top: 2px solid @main-bg-color;
        padding: 15px;
        color: #666666;
      }
      h2 {
        font-weight: normal;
        font-size: 14px;
        margin: 12px 15px;
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
    }

    .ant-descriptions-bordered .ant-descriptions-item-label {
      background-color: #fafafa;
      text-align: center;
    }

    .ant-descriptions-view {
      width: 100%;
      overflow: auto;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .ant-descriptions-item-content {
      font-size: 7px;
      display: table-cell;
      color: #515A6E;
      text-align: center;
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
      border-right: none;
    }
  }
</style>