<template>
  <div id="mobileTrainMessage">
    <swipe-map :adList="advertList"></swipe-map>

    <recommend-organization title="课程培训" :have-more="true" :have-page="false" v-if="haveCourses" key-route-name="MobileTrainCourse" :is-router="false" @openPopup="openPopup">
      <template slot="content">
        <div class="my-btn-group">
          <van-button size="mini" round :type="`${value === 'approve'?'primary':'default'}`"
                      @click="btnClick('approve')">认证课程
          </van-button>
          <van-button size="mini" round :type="`${value === 'boutique'?'primary':'default'}`"
                      @click="btnClick('boutique')">精品课程
          </van-button>
          <van-button size="mini" round :type="`${value === 'public'?'primary':'default'}`" @click="btnClick('public')">
            公开课
          </van-button>
        </div>
        <van-empty description="没有内容" v-if="courseData.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in courseData"
                   :key="innerIndex"
                   class="my-class-row">
            <train-activity-card
              v-for="(item,index) in innerItem"
              :item="item"
              :key="item.id"
              @func="btnClick(value)"
            ></train-activity-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <recommend-organization title="沙龙活动" :have-more="true" :have-page="false" :is-router="false" @openPopup="openOfflinePopup">
      <template slot="content">
        <van-empty description="没有内容" v-if="offlineData.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in offlineData"
                   :key="innerIndex"
                   class="my-class-row">
            <offline-card
              v-for="(item,index) in innerItem"
              :item="item"
              :key="item.id"
            >
            </offline-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <related-message-list :data="data" :have-page="data.length > 0" :pagination="ipagination"
                          title-name="培训信息" route-name="MobileTrainArticleMessage" key-route="MobileTrainMessage"></related-message-list>

    <mobile-train-course ref="coursePopup"></mobile-train-course>
    <mobile-train-offline ref="offlinePopup"></mobile-train-offline>
  </div>
</template>

<script>
  import SwipeMap from '../../components/general/SwipeMap'
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import TrainActivityCard from '../../components/card/TrainActivityCard'
  import { changeArr, filterObj } from '@/utils/util'
  import RelatedMessageList from '../../components/list/RelatedMessageList'
  import OfflineCard from '../../components/card/OfflineCard'
  import MobileTrainCourse from './MobileTrainCourse'
  import MobileTrainOffline from './MobileTrainOffline'

  export default {
    name: 'MobileTrainMessage',
    components: { MobileTrainOffline, MobileTrainCourse, OfflineCard, RelatedMessageList, TrainActivityCard, RecommendOrganization, SwipeMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '7'
        },
        adLoading: false,
        advertList: [],

        value: 'approve',
        haveCourses: true,
        courseUrl: '/zscq/portal/courseSearch',
        courseData: [],
        courseFormParam: {
          recommend: 1,
          pageSize: 4,
          current: 1,
          total: 0,
          type: '1'
        },
        courseLoading: {
          spinning: false
        },

        offlineUrl: '/zscq/portal/training/offlineSalonRecommendList',

        offlineData: [],
        offlineFormParam: {
          num: 4
        },
        offlineLoading: {
          spinning: false
        },

        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '4'
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: []
      }
    },
    created() {
      this.getAllAdverts()
      this.loadOfflineData()
      this.loadAllCouresData()
      this.loadData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      openPopup(){
        this.$refs.coursePopup.showPopup()
      },
      openOfflinePopup(){
        this.$refs.offlinePopup.showPopup()
      },
      btnClick(a) {
        this.value = a
        let type = ''
        switch (a) {
          case 'approve':
            type = '1'
            break
          case 'boutique':
            type = '2'
            break
          case 'public':
            type = '3'
            break
        }
        this.loadCouresData(type)
      },
      getAllAdverts() {
        if (!this.adUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      },
      async loadCouresData(type = '1') {
        this.courseLoading.spinning = true
        this.courseFormParam.type = type
        const res = await getActionUpdateKeyword(this.courseUrl, this.courseFormParam)
        if (res.success) {
          console.info(res)
          this.courseData = changeArr(res.result.records, 2)
        }
        this.courseLoading.spinning = false
      },
      async loadAllCouresData() {
        this.courseLoading.spinning = true
        const res = await getActionUpdateKeyword(this.courseUrl, { recommend: 1 })
        if (res.success) {
          if (res.result.records.length > 0) {
            this.haveCourses = true
            this.loadCouresData()
          } else {
            this.haveCourses = false
          }
        }

        this.courseLoading.spinning = false
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getParam(this.formParam, this.ipagination))
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
      async loadOfflineData() {
        this.offlineLoading.spinning = true
        const res = await getActionUpdateKeyword(this.offlineUrl, this.offlineFormParam)
        if (res.success) {
          this.offlineData = changeArr(res.result, 2)
        }
        this.offlineLoading.spinning = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileTrainMessage {
    .my-btn-group {
      line-height: 0;
      margin: 0 15px 15px;
      .van-button {
        font-size: 12px;
        padding: 0 13px;
      }
      .van-button--primary {
        background-color: @main-color;
        border-color: @main-color;
        color: #ffffff;
      }
      .van-button--default {

      }
    }
    .my-class-row{
      padding-bottom: 10px;
    }
  }
</style>