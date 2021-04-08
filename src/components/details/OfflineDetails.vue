<template>
  <div id="offlineDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <van-nav-bar
        title="活动详情"
        left-arrow
        @click-left="onClickLeft"
        :fixed="false"
        placeholder
        class="bar-head"
      >
      </van-nav-bar>
      <div class="my-main-content">
        <div class="head-content">
          <h3>{{offlineSalon.title}}</h3>
          <p>活动时间：{{ offlineSalon.beginDate }}</p>
          <p><span class="van-ellipsis">活动地点：{{ offlineSalon.activityAddress }}</span></p>
          <p>报名倒计时：
            <van-count-down :time="endTime" format="DD 天 HH 时 mm 分 ss 秒" @finish="onFinish"/>
          </p>
          <div class="btn-group">
            <van-button :disabled="!canApply" class="my-btn" type="default" @click="applyBtn"
                        v-if="!alreadyApply">{{
              canApply?
              '立即报名':'活动已结束'}}
            </van-button>

            <van-button v-else :disabled="true" class="my-btn" type="primary">已报名</van-button>
          </div>
        </div>

        <div class="other-content">
          <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                    color="#2F72D1" class="my-tab" type="line" :border="false">
            <van-tab title="活动介绍" name="1">
              <div class="my-content">
                <div v-html="offlineSalon.content"
                     style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;" class="html-content"></div>

                <div class="activity-div">
                  <van-image :src="getImgNewView(offlineSalon.activityIcons)" alt="活动图片" class="my-image"/>
                </div>
              </div>
            </van-tab>
            <van-tab title="已报名用户" name="2">
              <div class="my-content">
                <van-row v-for="(outItem,outIndex) in item.userRecord" :key="outIndex" class="my-row-two">
                  <van-col v-for="(item,index) in outItem" :key="item.id" :span="6" class="user-content">
                    <van-row>
                      <van-image :src="getImgView(item.avatar)" round class="avatar"></van-image>
                    </van-row>
                    <van-row>
                      {{item.realname}}
                    </van-row>
                  </van-col>
                </van-row>
              </div>
            </van-tab>
          </van-tabs>
        </div>

        <div class="other-content">
          <van-tabs v-model="active2" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                    color="#2F72D1" class="my-tab my-inner-tab" type="line" :border="false" line-width="68px">
            <van-tab title="近期活动" name="1">
              <div class="my-content">
                <van-row v-for="(innerItem,innerIndex) in item.recentOfflineSalonList" :key="innerItem.id"
                         class="my-row" @click="rowClick(innerItem)">
                  <span>•</span>
                  <span class="van-ellipsis">{{innerItem.title }}</span>
                </van-row>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </van-popup>

    <mobile-train-activity-apply ref="applyRef" @func="loadData(id)"></mobile-train-activity-apply>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { changeArr, judgeState } from '@/utils/util'
  import { mapGetters } from 'vuex'
  import { getImgNewView } from '@/utils/role'
  import MobileTrainActivityApply from '../../views/feature/MobileTrainActivityApply'

  export default {
    name: 'OfflineDetails',
    components: { MobileTrainActivityApply },
    data() {
      return {
        detailsShow: false,

        item: {},
        offlineSalon: {},
        url: '/zscq/portal/training/offlineSalonDetail',
        canApply: true,
        endTime: '',

        alreadyApply: false,
        userId: '',
        id: '',
        active: '1',
        active2: '1'
      }
    },
    methods: {
      onFinish() {
        this.canApply = false
      },
      getImgNewView,
      ...mapGetters(['userInfo']),
      showPopup(id) {
        this.detailsShow = true
        this.loadData(id)
      },
      onClickLeft() {
        this.detailsShow = false
      },
      async loadData(id) {
        this.$showLoading({
          title: '加载中。。。'
        })
        if (judgeState()) {
          this.userId = this.userInfo().id
        } else {
          this.userId = ''
        }
        this.id = id
        const res = await getActionUpdateKeyword(this.url, { id: id, userId: this.userId })
        if (res.success) {
          this.item = res.result
          this.alreadyApply = this.item.isRegistration
          this.offlineSalon = this.item.offlineSalon
          this.item.userRecord = changeArr(this.item.userRecord.splice(0, 8), 4)
          const endDate = new Date(this.offlineSalon.endDate).getTime()

          if (Date.now() >= endDate) {
            this.canApply = false
            this.endTime = 0
          } else {
            this.canApply = true
            this.endTime = endDate - Date.now()
          }

        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        console.info(res)
        console.info('hahaha')
        this.$cancelLoading()
      },
      getImgView(text) {
        if (!text) {
          return 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      applyBtn() {
        this.$refs.applyRef.showPopup(this.offlineSalon.id)
      },
      rowClick(item) {
        this.loadData(item.id)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #offlineDetails {

  }

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
      padding-top: 7.5px;

      .head-content {
        padding: 15px;
        background-color: #ffffff;
        h3, p {
          margin: 0;
          font-weight: normal;
        }

        h3 {
          font-size: 16px;
          color: @main-font-color;
          line-height: 18px;
          margin-bottom: 15px;
        }

        p {
          line-height: 18px;
          font-size: 12px;
          color: #888888;
          margin-bottom: 10px;
          display: flex;
        }
        p:nth-child(4) {
          display: flex;
          color: @main-font-color;
          .van-count-down {
            font-size: 12px;
            line-height: 18px;
          }
        }
      }

      .btn-group {
        .my-btn {
          width: 100%;
          font-size: 12px;
          color: #FF3300;
          border-color: #ff3300;
          height: 28px;
          background-color: #fceae9;
        }
      }

      .other-content {
        margin-top: 7.5px;
        background-color: #ffffff;

        .html-content {
          font-size: 14px;
          margin-bottom: 15px;
          /deep/ img{
            max-width: 100%;
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

          /deep/ .van-tabs__content {
            border-top: 2px solid @main-bg-color;
            padding: 15px;
            color: #666666;
          }
          h3 {
            font-size: 13px;
            font-weight: normal;
            padding: 0 7px;
            background-color: @main-bg-color;
            margin: 0;
            margin-bottom: 10px;
          }
        }
        .my-inner-tab {
          /deep/ .van-tabs__wrap {
            width: 30%;
          }
        }
        .my-image {
          width: 100%;
          height: 364/2px;
          border: 1Px solid #E6E6E6;
        }
        .user-content {
          text-align: center;
          font-size: 12px;
          color: @main-font-color;
          .avatar {
            width: 133/2px;
            height: 133/2px;
            border: 1Px solid #E6E6E6;
          }
        }
        .my-row-two {
          padding-bottom: 10px;
        }
        .my-row {
          display: flex;
          align-items: center;
          padding-left: 29/2px;
          height: 70/2px;
          span:nth-child(1) {
            color: #B4B4B4;
            padding-right: 5px;
            font-size: 20px;
          }
          span:nth-child(2) {
            width: 510/2px;
            display: inline-block;
            font-size: 24/2px;
            padding-right: 66/2px;
          }
          span:nth-child(3) {
            color: @main-font-color2;
            font-size: 14/2px;
          }
        }
      }
    }
  }
</style>