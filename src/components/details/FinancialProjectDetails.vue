<template>
  <div id="financialProjectDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="request.org.name"
          left-arrow
          @click-left="onClickLeft"
          :fixed="false"
          placeholder
          class="bar-head"
        >
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
          </van-row>
          <van-row class="content-card content-card-project">
            <h2>服务信息</h2>
            <van-row class="card-img">
              <van-image :src="getImgNewView(request.agencyProduct.imgUrl)" class="my-image2"/>
              <img src="../../assets/images/quan.png" alt="券" class="quan-img" v-if="false">
            </van-row>

            <van-row>
              <van-row type="flex" align="center" justify="space-between" class="head-title">
                <van-col :span="24">
                  <span class="project-name">{{request.agencyProduct.title}}</span>
                </van-col>
              </van-row>
              <van-row>
                <span class="title">
                  发布日期：
                </span>
                <span class="content">
                  {{request.agencyProduct.publishTime | changeDate}}
                </span>
              </van-row>
              <van-row>
                <span class="title">
                  业务类型：
                </span>
                <span class="content">
                  {{request.agencyProduct.businessType}}
                </span>
              </van-row>
              <van-row>
                <span class="title">
                  所属机构：
                </span>
                <span class="content">
                  {{request.org.name}}
                </span>
              </van-row>
            </van-row>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" line-width="68px">
              <van-tab title="服务介绍" name="1">
                <h3>产品功能</h3>
                <p>{{request.agencyProduct.serviceRemark}}</p>
                <h3>产品优势</h3>
                <p>{{request.agencyProduct.productAdvantage}}</p>
                <h3>准入条件</h3>
                <p>{{request.agencyProduct.entryCriteria}}</p>
              </van-tab>
            </van-tabs>
          </van-row>
        </div>

        <van-tabbar
          placeholder :fixed="false" class="bar-footer">
          <van-row class="tabbar-btn">
            <van-col :span="24">
              <van-button type="default" class="contact-btn" icon="manager-o" @click="contactBtn(request.org)">联系卖家</van-button>
            </van-col>
          </van-row>
        </van-tabbar>
      </div>
    </van-popup>

    <contact-popup ref="contactMeRef"></contact-popup>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ContactPopup from '../popup/ContactPopup'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'FinancialProjectDetails',
    components: { ContactPopup },
    inject: ['headLogin'],
    data() {
      return {
        request: {
          agencyProduct: {},
          org: {}
        },
        url: '/zscq/portal/getFinanceProductAllInfo',

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
      refresh() {
        this.loadData(this.id, this.serviceProductId)
      },
      showPopup(id, serviceProductId) {
        this.id = id
        this.serviceProductId = serviceProductId
        this.detailsShow = true
        this.loadData(id, serviceProductId)
      },
      getImgNewView,
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
          this.request.agencyProduct = res.result.agencyProduct
          this.request.org = res.result.org
          if (this.request.agencyProduct === null || this.request.agencyProduct === undefined) {
            this.request.agencyProduct = {}
          }
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
        this.$cancelLoading()
      },
      contactBtn(item){
        if (judgeState()) {
          this.$refs.contactMeRef.showPopup(item.id, '-1')
        } else {
          this.$notify({ type: 'warning', message: '请先进行登录!' })
          this.headLogin()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  #financialProjectDetails {

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
    .my-tab {
      margin-top: 10px;
      background-color: #ffffff;
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
      h3 {
        font-size: 13px;
        font-weight: normal;
        padding: 0 7px;
        background-color: @main-bg-color;
        margin: 0;
        margin-bottom: 10px;
      }
      p{
        margin: 0;
        font-size: 12px;
        padding-bottom: 15px;
        padding-left: 7px;
      }
      /deep/ .van-tabs__wrap{
        width: 30%;
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