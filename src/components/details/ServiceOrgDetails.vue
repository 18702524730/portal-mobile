<template>
  <div id="serviceOrgDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="request.org.name"
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

          <van-row class="org-content">
            <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1"
                      background="#EBECF7"
                      color="#2F72D1" class="my-tab">
              <van-tab title="机构首页" name="1">
                <h2>项目描述</h2>
                <p>
                  {{request.org.orgProfile}}
                </p>
                <recommend-organization title="">
                  <template slot="content">
                    <div>
                      <h2>推荐服务</h2>
                      <div class="container" v-if="data.length > 0">
                        <van-row type="flex" justify="space-between" class="my-list-layout-row"
                                 v-for="(outItem,outIndex) in data"
                                 :key="outIndex">
                          <recommend-service-card
                            v-for="(item,index) in outItem"
                            :key="item.id"
                            :item="item"
                          ></recommend-service-card>
                        </van-row>
                      </div>
                      <div v-else>
                        <van-empty description="没有内容"/>
                      </div>
                    </div>
                  </template>
                </recommend-organization>
              </van-tab>
              <van-tab title="机构介绍" name="2">
                <h2>机构介绍</h2>
                <p v-html="request.org.orgIntroduction"
                   style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;" class="html-content">
                </p>
                <h2>服务内容</h2>
                <p v-text="request.org.serviceContentName">
                </p>
                <h2>团队介绍</h2>
                <p v-text="request.org.teamIntroduction">
                </p>
              </van-tab>
              <van-tab title="服务项目" name="3">
                <recommend-organization title="" :pagination="projectIpagination" :have-page="projectData.length !== 0">
                  <template slot="content">
                    <div>
                      <h2>服务项目</h2>
                      <div class="container" v-if="projectData.length > 0">
                        <van-row type="flex" justify="space-between" class="my-list-layout-row"
                                 v-for="(outItem,outIndex) in projectData"
                                 :key="outIndex">
                          <recommend-service-card
                            v-for="(item,index) in outItem"
                            :key="item.id"
                            :item="item"
                          ></recommend-service-card>
                        </van-row>
                      </div>
                      <div v-else>
                        <van-empty description="没有内容"/>
                      </div>
                    </div>
                  </template>
                </recommend-organization>
              </van-tab>
            </van-tabs>
          </van-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import { judgeState, filterObj, changeArr } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../general/RecommendOrganization'
  import RecommendServiceCard from '../card/RecommendServiceCard'

  export default {
    name: 'ServiceOrgDetails',
    components: { RecommendServiceCard, RecommendOrganization },
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

        activeName: '1',

        getDataUrl: '/zscq/portal/agencyProductRecommendList',
        formParam: {
          recommend: 1,
          orgId: ''
        },
        ipagination: {
          current: 1,
          pageSize: 4,
          showQuickJumper: true,
          total: 0
        },
        data: [],

        projectUrl: '/zscq/portal/agencyProductOrgRecommendList',
        projectData: [],
        projectIpagination: {
          current: 1,
          pageSize: 4,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        projectFormParam: {
          orgId: ''
        },

        id: ''
      }
    },
    methods: {
      refresh(id) {
        this.loadData(id)
      },
      showPopup(id) {
        this.id = id
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
          id: this.request.org.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$notify({ message: '收藏成功！', type: 'success', duration: 2000 })
            } else {
              that.$notify({ message: '取消收藏成功！', type: 'success', duration: 2000 })
            }
            that.loadData(that.request.org.id)
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
        const param = {
          orgId: id
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
        this.formParam.orgId = id
        const orgRes = await getActionUpdateKeyword(this.getDataUrl, this.getParam(this.formParam, this.ipagination))
        if (orgRes.success) {
          this.ipagination.total = orgRes.result.total
          this.data = changeArr(orgRes.result.records, 2)
        } else {
          this.$notify({ type: 'warning', message: orgRes.message })
        }
        this.projectFormParam.orgId = id
        const projectRes = await getActionUpdateKeyword(this.projectUrl, this.getParam(this.projectFormParam, this.projectIpagination))
        if (projectRes.success) {
          this.projectIpagination.total = projectRes.result.total
          this.projectData = changeArr(projectRes.result.records, 2)
        } else {
          this.$notify({ type: 'warning', message: projectRes.message })
        }
        this.$cancelLoading()
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current - 1
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      async loadProject() {
        this.$showLoading({
          title: '加载中。。。'
        })
        const projectRes = await getActionUpdateKeyword(this.projectUrl, this.getParam(this.projectFormParam, this.projectIpagination))
        if (projectRes.success) {
          this.projectIpagination.total = projectRes.result.total
          this.projectData = changeArr(projectRes.result.records, 2)
        } else {
          this.$notify({ type: 'warning', message: projectRes.message })
        }
        this.$cancelLoading()
      },
      handleTableChange(page) {
        this.projectIpagination.current = page
        this.loadProject()
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

  #serviceOrgDetails {

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
      height: 93%;
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
    .org-content {
      /deep/ .van-tabs__content {
      }
      .html-content{
        font-size: 14px;
        /deep/ img{
          max-width: 100%;
        }
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
      /deep/ .van-tab {
        font-size: 16px;
        font-weight: normal;
      }
      /deep/ .van-tabs__line {
        height: 2px;
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
  }
</style>