<template>
  <div id="mobileFinancialService">
    <swipe-map :adList="advertList"></swipe-map>
    <div class="container">
      <h2 class="header-h">申报指南</h2>
      <div v-html="messageData.applicationGuide"
           style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;" class="html-content"></div>
    </div>

    <recommend-organization title="金融项目" key-route-name="MobileProjectCenter" :have-more="false">
      <template slot="content">
        <van-empty description="没有内容" v-if="financialData.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in financialData"
                   :key="innerIndex"
                   class="my-class-row">
            <financial-card
              v-for="(item,index) in innerItem"
              :item="item"
              :key="item.id"
            >
            </financial-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <related-message-list :data="data" :have-page="data.length > 0" :pagination="ipagination"
                          title-name="相关政策" route-name="MobileFinancialServiceArticleMessage" keyRoute="MobileFinancialService"></related-message-list>
  </div>
</template>

<script>
  import SwipeMap from '../../components/general/SwipeMap'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, changeArr } from '@/utils/util'
  import RelatedMessageList from '../../components/list/RelatedMessageList'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import FinancialCard from '../../components/card/FinancialCard'

  export default {
    name: 'MobileFinancialService',
    components: { FinancialCard, RecommendOrganization, RelatedMessageList, SwipeMap },
    data() {
      return {
        financialData: [],

        financialUrl: '/zscq/portal/financeProductList',
        financialFormParam: {},
        financialIpagination: {
          current: 1,
          pageSize: 8,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        financialLoading: {
          spinning: false
        },

        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '3'
        },
        adLoading: false,
        advertList: [],

        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '7'
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleListTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: [],

        messageUrl: '/zscq/portal/guide/fundsGet',
        messageData: {}
      }
    },
    created() {
      this.getAllAdverts()
      this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
      this.loadData(this.getListParam(this.formParam, this.ipagination))
      this.loadMessageData()
    },
    methods: {
      getAllAdverts() {
        if (!this.adUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
        }).finally(() => {
        })
      },
      loadData(param) {
        if (!this.url) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.loading.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
          }
          this.loading.spinning = false
        }).finally(() => {
          this.loading.spinning = false
        })
      },
      getListParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleListTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getListParam(this.formParam, this.ipagination))
      },
      getFinancialData(param) {
        if (!this.financialUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.financialLoading.spinning = true
        getActionUpdateKeyword(this.financialUrl, param).then((res) => {
          if (res.success) {
            this.financialIpagination.total = res.result.total
            this.financialData = changeArr(res.result.records, 2)
          }
          this.financialLoading.spinning = false
        }).finally(() => {
          this.financialLoading.spinning = false
        })
      },
      handleTableChange(page) {
        this.financialIpagination.current = page
        this.getFinancialData(this.getParam(this.financialFormParam, this.financialIpagination))
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current - 1
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      async loadMessageData() {
        const res = await getActionUpdateKeyword(this.messageUrl)
        if (res.success) {
          this.messageData = res.result
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileFinancialService {
    .html-content{
      font-size: 14px;
      /deep/ img{
        max-width: 100%;
      }
    }
  }
</style>