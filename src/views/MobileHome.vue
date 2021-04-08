<template>
  <div>
    <mobile-portal-header ref="header"></mobile-portal-header>
    <mobile-search-menu :changeLogin="isRouterAlive"></mobile-search-menu>
    <swipe-map :adList="advertList"></swipe-map>

    <mobile-service-navigation></mobile-service-navigation>
    <mobile-message-navigation></mobile-message-navigation>

    <recommend-organization title="推荐项目 • 供应信息" key-route-name="MobileSupplyCenter" :have-img="true">
      <template slot="content">
        <div>
          <recommend-supply-card
            v-for="(item,index) in supplyData"
            :item="item"
            :column="getKey(item,'column')"
            :item-key="getKey(item,'key')"
            :is-brand="getKey(item,'brand')"
            :key="index"></recommend-supply-card>
        </div>
      </template>
    </recommend-organization>
    <recommend-organization title="推荐项目 • 需求信息" key-route-name="MobileDemandCenter">
      <template slot="content">
        <div class="container">
          <van-row type="flex" justify="space-between" v-for="(outItem,outIndex) in demandData" :key="outIndex"
                   class="my-row">
            <recommend-demand-card
              v-for="(item,index) in outItem"
              :item="item"
              :column="getKey(item,'column')"
              :item-key="getKey(item,'key')"
              :is-brand="getKey(item,'brand')"
              :key="item.id"></recommend-demand-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <recommend-organization title="推荐服务机构" key-route-name="MobileServiceOrg" class="institution-class">
      <template slot="content">
        <div class="container">
          <van-row type="flex" justify="space-between" class="my-row" v-for="(outItem,outIndex) in agencyData"
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

    <recommend-organization title="推荐服务" key-route-name="MobileServiceProject">
      <template slot="content">
        <div class="container">
          <van-row type="flex" justify="space-between" class="my-row my-new-row" v-for="(outItem,outIndex) in serviceData"
                   :key="outIndex + Date.parse(new Date())">
            <recommend-service-card
              v-for="(item,index) in outItem"
              :key="item.id"
              :item="item"
            ></recommend-service-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <recommend-organization title="专题信息" key-route-name="MobileSpecialMessage">
      <template slot="content">
        <div class="container">
          <van-row type="flex" justify="space-between" class="my-row" v-for="(outItem,outIndex) in specialData"
                   :key="outIndex">
            <recommend-message-card
              v-for="(item,index) in outItem"
              :key="item.id"
              :item="item"
              route-name="MobileSpecialList"
            ></recommend-message-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <recommend-organization title="培训信息" key-route-name="MobileTrainMessage">
      <template slot="content">
        <div class="container">
          <van-row type="flex" justify="space-between" class="my-row" v-for="(outItem,outIndex) in trainData"
                   :key="outIndex">
            <recommend-message-card
              v-for="(item,index) in outItem"
              :key="item.id"
              :item="item"
              route-name="MobileTrainArticleMessage"
            ></recommend-message-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>
    <mobile-friend-link></mobile-friend-link>
    <mobile-portal-footer></mobile-portal-footer>
    <mobile-footer-link></mobile-footer-link>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, changeArr } from '@/utils/util'
  import _ from 'lodash'

  import MobilePortalHeader from '../components/general/MobilePortalHeader'
  import MobilePortalFooter from '../components/general/MobilePortalFooter'
  import MobileFooterLink from "../components/general/MobileFooterLink"
  import MobileFriendLink from "../components/general/MobileFriendLink"
  import SwipeMap from "../components/general/SwipeMap"
  import MobileServiceNavigation from "../components/navigation/MobileServiceNavigation"
  import MobileMessageNavigation from "../components/navigation/MobileMessageNavigation"
  import MobileSearchMenu from "../components/navigation/MobileSearchMenu"
  import RecommendOrganization from "../components/general/RecommendOrganization"
  import RecommendSupplyCard from "../components/card/RecommendSupplyCard"
  import RecommendDemandCard from "../components/card/RecommendDemandCard"
  import RecommendServiceOrgCard from "../components/card/RecommendServiceOrgCard"
  import RecommendMessageCard from "../components/card/RecommendMessageCard"
  import RecommendServiceCard from "../components/card/RecommendServiceCard"


  export default {
    name: 'MobileHome',
    components: {
      RecommendServiceCard,
      RecommendMessageCard,
      RecommendServiceOrgCard,
      RecommendDemandCard,
      RecommendSupplyCard,
      RecommendOrganization,
      MobileSearchMenu,
      MobileMessageNavigation,
      MobileServiceNavigation,
      SwipeMap,
      MobileFriendLink,
      MobileFooterLink,
      MobilePortalFooter,
      MobilePortalHeader
    },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin
      }
    },
    data() {
      return {
        isRouterAlive: true,
        agencyData: [],
        agencyFormParam: {
          recommend: 1,
          pageSize: 16,
          current: 1,
          total: 0
        },
        agencyLoading: {
          spinning: false
        },
        agencyTimer: null,
        url: {
          serviceUrl: '/zscq/portal/agencyProductRecommendList',
          agencyUrl: '/zscq/portal/getAgencyPage',
          recommentUrl: '/zscq/portal/informationRecommendList',
          adUrl: '/zscq/portal/advertList',

          newSpecialUrl: '/zscq/portal/special/specialMessageRecommendList',

          supplyRecommendSearchUrl: '/zscq/portal/supplyRecommendSearch',
          requirementRecommendSearchUrl: '/zscq/portal/requirementRecommendSearch'
        },

        adLoading: false,
        advertList: [],
        adParam: {
          position: '1'
        },

        serviceData: [],
        serviceFormParam: {
          recommend: 1,
          pageSize: 16,
          current: 1,
          total: 0
        },
        serviceLoading: {
          spinning: false
        },
        serviceTimer: null,

        specialLoading: {
          spinning: false
        },
        specialParam: {
          num: 4
        },
        specialRoute: 'SpecialMessage',

        trainLoading: {
          spinning: false
        },
        trainParam: {
          informationType: '4',
          num: 4
        },
        trainRoute: 'TrainMessage',
        specialData: [],
        trainData: [],


        formParam: {
          pageSize: 4
        },
        supplyData: [],
        demandData: [],

        supplyLoading: {
          spinning: false
        },
        demandLoading: {
          spinning: false
        },
        classList: [
          'project-class',
          'patent-class',
          'brand-class'
        ],
        columnType: {
          'project': {
            columnList: [
              '所属行业',
              '项目成熟度',
              '交易方式',
              '交易价格'
            ],
            isBrand: false,
            itemKeyList: [
              'imgUrl',
              'title',

              'belongIndustryName',
              'projectMaturityName',
              'intendedOperationModeName',
              'money'
            ]
          },
          'patent': {
            columnList: [
              '所属行业',
              '技术领域',
              '交易方式',
              '交易价格'
            ],
            isBrand: false,
            itemKeyList: [
              'imgUrl',
              'title',

              'belongIndustryName',
              'technicalFieldName',
              'intendedOperationModeName',
              'money'
            ]
          },
          'brand': {
            columnList: [
              '商标类别',
              '行业需求',
              '所属行业',
              '交易价格'
            ],
            isBrand: true,
            itemKeyList: [
              'imgUrl',
              'title',

              'trademarkTypeName',
              'belongIndustryName',
              'belongIndustryName',
              'money'
            ]
          }
        }
      }
    },
    beforeDestroy() {
    },
    created() {
      this.getAllAdverts(this.getParam(this.adParam))
      this.getSupplyData(this.getParam(this.formParam))
      this.getDemandData(this.getParam(this.formParam))
      this.getAgencyData(this.getParam(this.agencyFormParam))
      this.getServiceData(this.getParam(this.serviceFormParam))
      this.getSpecialInfos(this.getParam(this.specialParam))
      this.getTrainInfos(this.getParam(this.trainParam))
    },
    methods: {
      getSpecialInfos(param) {
        if (!this.url.newSpecialUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.specialLoading.spinning = true
        getActionUpdateKeyword(this.url.newSpecialUrl, param).then((res) => {
          if (res.success) {
            this.specialData = res.result
            this.specialData.forEach(item => {
              item.articleIcons = item.specialCover
              item.title = item.specialName
              item.releaseDate = item.createTime
            })
            this.specialData = changeArr(this.specialData, 2)
          }
          this.specialLoading.spinning = false
        }).finally(() => {
          this.specialLoading.spinning = false
        })
      },
      getTrainInfos(param) {
        if (!this.url.recommentUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.trainLoading.spinning = true
        getActionUpdateKeyword(this.url.recommentUrl, param).then((res) => {
          if (res.success) {
            this.trainData = res.result
            this.trainData = changeArr(this.trainData, 2)
          }
          this.trainLoading.spinning = false
        }).finally(() => {
          this.trainLoading.spinning = false
        })
      },
      handleTableChange(page, key) {
        switch (key) {
          case 'service':
            this.serviceFormParam.current = page
            this.serviceFormParam.pageNo = page - 1
            this.getServiceData(this.getParam(this.serviceFormParam))
            break
          case 'agency':
            this.agencyFormParam.current = page
            this.agencyFormParam.pageNo = page - 1
            this.getAgencyData(this.getParam(this.agencyFormParam))
            break
        }
      },
      getAgencyData(param) {
        if (!this.url.agencyUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.agencyLoading.spinning = true
        getActionUpdateKeyword(this.url.agencyUrl, param).then((res) => {
          if (res.success) {
            this.agencyFormParam.total = res.result.total
            this.agencyData = changeArr(_.shuffle(res.result.records).slice(0,4), 2)
          }
          this.agencyLoading.spinning = false
        }).finally(() => {
          this.agencyLoading.spinning = false
        })
      },
      getServiceData(param) {
        if (!this.url.serviceUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.serviceLoading.spinning = true
        getActionUpdateKeyword(this.url.serviceUrl, param).then((res) => {
          if (res.success) {
            this.serviceFormParam.total = res.result.total
            this.serviceData = changeArr(_.shuffle(res.result.records).slice(0,4), 2)
          }
          this.serviceLoading.spinning = false
        }).finally(() => {
          this.serviceLoading.spinning = false
        })
      },
      getKey(item, key) {
        let type = ''
        switch (item.supplyRequirementType) {
          case '1':
          case '4':
            type = 'project'
            break
          case '2':
          case '5':
            type = 'patent'
            break
          case '3':
          case '6':
            type = 'brand'
            break
        }
        if (key === 'column') {
          return this.columnType[`${type}`].columnList
        } else if (key === 'key') {
          return this.columnType[`${type}`].itemKeyList
        } else if (key === 'brand') {
          return this.columnType[`${type}`].isBrand
        }
      },
      getDemandData(param) {
        if (!this.url.requirementRecommendSearchUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.demandLoading.spinning = true
        getActionUpdateKeyword(this.url.requirementRecommendSearchUrl, param).then((res) => {
          if (res.success) {
            this.demandData = changeArr(res.result, 2)
          }
          this.demandLoading.spinning = false
        }).finally(() => {
          this.demandLoading.spinning = false
        })
      },
      getSupplyData(param) {
        if (!this.url.supplyRecommendSearchUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.supplyLoading.spinning = true
        getActionUpdateKeyword(this.url.supplyRecommendSearchUrl, param).then((res) => {
          if (res.success) {
            this.supplyData = res.result
          }
          this.supplyLoading.spinning = false
        }).finally(() => {
          this.supplyLoading.spinning = false
        })
      },
      getParam(formParam) {
        const param = Object.assign({}, formParam)
        return filterObj(param)
      },
      getAllAdverts(param) {
        if (!this.url.adUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.url.adUrl, param).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      },
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      },
      headLogin() {
        this.$refs.header.showPopup()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../components/index";

  .my-row {
    padding-bottom: 32/2px;
  }

  .institution-class {
    background: url("../assets/images/home/bg12.png") no-repeat;
    background-size: 100% 100%;
    /deep/ h2 {
      color: #ffffff;
    }
  }
</style>