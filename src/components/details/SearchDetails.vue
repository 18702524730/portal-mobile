<template>
  <div id="searchDetails">
    <van-popup v-model="searchShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          title="搜索"
          left-arrow
          @click-left="onClickLeft"
          :fixed="false"
          placeholder
          class="bar-head"
        >
        </van-nav-bar>
        <div class="my-main-content">
          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" @change="changeTab">
              <van-row class="search-div">
                <van-search
                  shape="round"
                  v-model="value"
                  show-action
                  placeholder="请输入内容"
                  @search="onSearch"
                >
                  <template #action>
                    <div @click="onSearch">搜索</div>
                  </template>
                </van-search>
                <van-row class="num-row">共计<span class="num-span">{{ipagination.total}}</span>条</van-row>
              </van-row>
              <van-tab title="服务" name="1">
                <van-row class="search-content">
                  <van-row class="my-row" type="flex" align="center">
                    <van-col :span="8">
                      <order-button title="销量排序" @changeSort="changeSort($event,'serviceOrderNumSort')"
                                    ref="orderRef0"></order-button>
                    </van-col>
                    <van-col :span="8">
                      <order-button title="价格排序" @changeSort="changeSort($event,'moneySort')"
                                    ref="orderRef1"></order-button>
                    </van-col>
                    <van-col :span="8">
                      <order-button title="评分排序" @changeSort="changeSort($event,'avgScoreSort')"
                                    ref="orderRef2"></order-button>
                    </van-col>
                  </van-row>

                  <van-row>
                    <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="data.length !== 0">
                      <template slot="content">
                        <van-empty description="没有内容" v-if="data.length === 0"/>
                        <div class="container my-content" v-else>
                          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in data"
                                   :key="innerIndex"
                                   class="my-class-row">
                            <service-project-card
                              v-for="(item,index) in innerItem"
                              :item="item"
                              :key="item.id"
                              @func="loadTypeData"
                            >
                            </service-project-card>
                          </van-row>
                        </div>

                      </template>
                    </recommend-organization>
                  </van-row>
                </van-row>
              </van-tab>
              <van-tab title="服务机构" name="2">
                <van-row class="search-content">
                  <van-row class="my-row" type="flex" align="center">
                    <van-col :span="12">
                      <order-button title="销量排序" @changeSort="changeSort($event,'serviceOrderNumSort')"
                                    ref="orderRef3"></order-button>
                    </van-col>
                    <van-col :span="12">
                      <order-button title="发布时间排序" @changeSort="changeSort($event,'publishDateSort')"
                                    ref="orderRef4"></order-button>
                    </van-col>
                  </van-row>

                  <van-row>
                    <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="orgData.length !== 0">
                      <template slot="content">
                        <van-empty description="没有内容" v-if="orgData.length === 0"/>
                        <div class="container my-content" v-else>
                          <van-row type="flex" justify="space-between" class="my-list-layout-row"
                                   v-for="(outItem,outIndex) in orgData"
                                   :key="outIndex">
                            <recommend-service-org-card
                              v-for="(item,index) in outItem"
                              :key="item.id"
                              :item="item"
                            ></recommend-service-org-card>
                          </van-row>
                        </div>
                      </template>
                    </recommend-organization>
                  </van-row>
                </van-row>
              </van-tab>
              <van-tab title="需求" name="3">
                <van-row class="search-content">
                  <van-row class="my-row" type="flex" align="center">
                    <van-col :span="12">
                      <order-button title="发布时间排序" @changeSort="changeSort($event,'publishDateSort')"
                                    ref="orderRef5"></order-button>
                    </van-col>
                    <van-col :span="12">
                      <order-button title="价格排序" @changeSort="changeSort($event,'moneySort')"
                                    ref="orderRef6"></order-button>
                    </van-col>
                  </van-row>

                  <van-row>
                    <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="demandData.length !== 0">
                      <template slot="content">
                        <van-empty description="没有内容" v-if="demandData.length === 0"/>
                        <div class="container my-content" v-else>
                          <van-row type="flex" justify="space-between" class="my-list-layout-row"
                                   v-for="(outItem,outIndex) in demandData"
                                   :key="outIndex">
                            <search-demand-card
                              v-for="(item,index) in outItem"
                              :key="item.id"
                              :item="item">
                            </search-demand-card>
                          </van-row>
                        </div>
                      </template>
                    </recommend-organization>
                  </van-row>
                </van-row>
              </van-tab>
              <van-tab title="供应" name="4">
                <van-row class="search-content">
                  <van-row class="my-row" type="flex" align="center">
                    <van-col :span="12">
                      <order-button title="发布时间排序" @changeSort="changeSort($event,'publishDateSort')"
                                    ref="orderRef7"></order-button>
                    </van-col>
                    <van-col :span="12">
                      <order-button title="价格排序" @changeSort="changeSort($event,'moneySort')"
                                    ref="orderRef8"></order-button>
                    </van-col>
                  </van-row>

                  <van-row>
                    <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="supplyData.length !== 0">
                      <template slot="content">
                        <van-empty description="没有内容" v-if="data.length === 0"/>
                        <recommend-supply-card
                          v-else
                          v-for="(item,index) in supplyData"
                          :item="item"
                          :key="index"
                          :have-bottom="true"
                          @func="loadTypeData"
                          :only-money="true"
                        ></recommend-supply-card>
                      </template>
                    </recommend-organization>
                  </van-row>
                </van-row>
              </van-tab>
              <van-tab title="政策" name="5">
                <van-row class="search-content">
                  <van-row class="my-row" type="flex" align="center">
                    <van-col :span="12">
                      <order-button title="发布时间排序" @changeSort="changeSort($event,'publishDateSort')"></order-button>
                    </van-col>
                  </van-row>

                  <van-row>
                    <message-list :data="messageData" :pagination="ipagination" :have-page="messageData.length > 0"
                                  :have-type-name="true" :is-search="true"></message-list>
                  </van-row>
                </van-row>
              </van-tab>
            </van-tabs>
          </van-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import OrderButton from '../general/OrderButton'

  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, cloneObject, arrayToStringObj, changeArr } from '@/utils/util'
  import MessageList from '../list/MessageList'
  import RecommendOrganization from '../general/RecommendOrganization'
  import ServiceProjectCard from '../card/ServiceProjectCard'
  import RecommendServiceOrgCard from '../card/RecommendServiceOrgCard'
  import SearchDemandCard from '../card/SearchDemandCard'
  import RecommendSupplyCard from '../card/RecommendSupplyCard'

  export default {
    name: 'SearchDetails',
    components: { RecommendSupplyCard, SearchDemandCard, RecommendServiceOrgCard, ServiceProjectCard, RecommendOrganization, MessageList, OrderButton },
    data() {
      return {
        searchShow: false,
        active: '1',
        value: '',

        ipagination: {
          current: 1,
          pageSize: 8,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: [],
        getDataUrl: '/zscq/portal/agencyProductRecommendList',
        formParam: {
          keyword: '',
          avgScoreSort: '',
          moneySort: '',
          serviceOrderNumSort: ''
        },

        orgData: [],
        getOrgDataUrl: '/zscq/portal/getAgencyPage',
        formOrgParam: {
          keyword: '',
          serviceOrderNumSort: '',
          publishDateSort: ''
        },

        demandData: [],
        getDemandDataUrl: '/zscq/portal/requirementSearch',
        formDemandParam: {
          keyword: '',
          serviceOrderNumSort: '',
          publishDateSort: ''
        },

        supplyData: [],
        getSupplyDataUrl: '/zscq/portal/supplySearch',
        formSupplyParam: {
          keyword: '',
          serviceOrderNumSort: '',
          publishDateSort: ''
        },

        messageData: [],
        getMessageDataUrl: '/zscq/portal/searchInformationPageList',
        formMessageParam: {
          keyword: '',
          publishDateSort: ''
        }
      }
    },
    methods: {
      showPopup() {
        this.searchShow = true
        this.loadTypeData()
      },
      onClickLeft() {
        this.searchShow = false
        this.active = '1'
        this.initParam()
        this.value = ''

      },
      changeTab() {
        this.ipagination.current = 1
        this.value = ''
        this.initParam()
        this.loadTypeData()
      },
      initParam() {
        for (const a in this.$refs) {
          if (this.$refs[a].initBtn) {
            this.$refs[a].initBtn()
          }
        }
        this.formParam = {
          keyword: '',
          avgScoreSort: '',
          moneySort: '',
          serviceOrderNumSort: ''
        }
        this.formOrgParam = {
          keyword: '',
          serviceOrderNumSort: '',
          publishDateSort: ''
        }
        this.formDemandParam = {
          keyword: '',
          serviceOrderNumSort: '',
          publishDateSort: ''
        }
        this.formSupplyParam = {
          keyword: '',
          publishDateSort: ''
        }
        this.formMessageParam = {
          keyword: '',
          publishDateSort: ''
        }
      },
      loadTypeData() {
        switch (this.active) {
          case '1':
            this.loadData(this.handleParam(this.formParam))
            break
          case '2':
            this.loadOrgData(this.handleParam(this.formOrgParam))
            break
          case '3':
            this.loadDemandData(this.handleParam(this.formDemandParam))
            break
          case '4':
            this.loadSupplyData(this.handleParam(this.formSupplyParam))
            break
          case '5':
            this.loadMessageData(this.handleParam2(this.formMessageParam))
            break
        }
      },
      onSearch() {
        this.changeSort(this.value, 'keyword')
      },
      changeSort(sort, type) {
        switch (this.active) {
          case '1':
            this.formParam[`${type}`] = sort
            break
          case '2':
            this.formOrgParam[`${type}`] = sort
            break
          case '3':
            this.formDemandParam[`${type}`] = sort
            break
          case '4':
            this.formSupplyParam[`${type}`] = sort
            break
          case '5':
            this.formMessageParam[`${type}`] = sort
            break
        }
        this.loadTypeData()
      },
      handleParam(param) {
        const that = this

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current - 1
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      handleParam2(param) {
        const that = this

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      handleTableChange(page) {
        this.ipagination.current = page
        this.loadTypeData()
      },
      async loadData(param) {
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getActionUpdateKeyword(this.getDataUrl, param)
        console.info(res)
        if (res.success) {
          this.ipagination.total = res.result.total
          this.data = changeArr(res.result.records, 2)
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      async loadOrgData(param) {
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getActionUpdateKeyword(this.getOrgDataUrl, param)
        console.info(res)
        if (res.success) {
          this.ipagination.total = res.result.total
          this.orgData = changeArr(res.result.records, 2)
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      async loadDemandData(param) {
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getActionUpdateKeyword(this.getDemandDataUrl, param)
        console.info(res)
        if (res.success) {
          this.ipagination.total = res.result.total
          this.demandData = changeArr(res.result.records, 2)
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      async loadSupplyData(param) {
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getActionUpdateKeyword(this.getSupplyDataUrl, param)
        console.info(res)
        if (res.success) {
          this.ipagination.total = res.result.total
          this.supplyData = res.result.records
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      async loadMessageData(param) {
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getActionUpdateKeyword(this.getMessageDataUrl, param)
        if (res.success) {
          this.ipagination.total = res.result.total
          this.messageData = res.result.records
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .bar-head {
      height: 7%;
    }
    .my-main-content {
      height: 93%;
      overflow-y: auto;
      .search-div {
        .num-row {
          font-size: 12px;
          color: @main-font-color2;
          margin: 10px 15px;
        }
        .num-span {
          color: #FF3300;
        }
      }
      .search-content {
        .my-row {
          background-color: #ffffff;
          border-bottom: 1px solid @main-bg-color;
          height: 80/2px;
          .my-col {
            text-align: center;
            color: #333333;
            div {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            span {
              font-size: 24/2px;
            }
          }
        }
      }
      .my-content{
        margin-top: 10px;
      }
    }
  }
</style>