<template>
  <div id="mobileMessageNavigation">
    <van-tabs v-model="active" animated background="#EBECF7" title-inactive-color="#141414" type="card"
              :ellipsis="false">
      <template slot="nav-right">
        <div class="my-more">
          <a @click="btnClick">
            <span class="more-span">查看更多</span><img src="../../assets/images/home/next.png" alt="查看更多" class="span-img">
          </a>
        </div>

      </template>
      <van-tab title="最新公告" name="MobileNoticeMessage">
        <van-row v-for="(item,index) in newNotice" :key="item.id" class="my-row" @click="rowClick(item)">
          <span>•</span>
          <span class="van-ellipsis">{{item.title }}</span>
          <span>{{item.releaseDate | changeDate}}</span>
        </van-row>
      </van-tab>
      <van-tab title="最新政策" name="MobileNewsConsult" class="my-second">
        <van-row v-for="(item,index) in newConsult" :key="item.id" class="my-row" @click="rowClick(item)">
          <span>•</span>
          <span class="van-ellipsis">{{item.title }}</span>
          <span>{{item.releaseDate | changeDate}}</span>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'MobileMessageNavigation',
    data() {
      return {
        active: 'MobileNoticeMessage',
        newNotice: [],
        newConsult: [],
        noticeParam: {
          num: 6,
          informationType: '2'
        },
        consultParam: {
          num: 6
        },
        noticeLoading: {
          spinning: false
        },
        consultLoading: {
          spinning: false
        },
        url: '/zscq/portal/informationRecommendList',
        consultUrl: '/zscq/portal/policies/newPoliciesRegulationsList',
        key: 'MobileNoticeMessage'
      }
    },
    created() {
      this.noticeData(this.getParam(this.noticeParam))
      this.consultData(this.getParam(this.consultParam))
    },
    methods: {
      rowClick(item) {
        let keyRoute = 'MobileNewsConsult'
        switch (item.type) {
          case '1':
            keyRoute = 'MobileNewsConsult'
            break
          case '2':
            keyRoute = 'MobileNoticeMessage'
            break
        }
        this.$router.push({ name: 'MobileArticleMessage', query: { id: item.id, keyRoute: keyRoute } })
      },
      btnClick() {
        this.$router.push({ name: this.active })
      },
      noticeData(param) {
        if (!this.url) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.noticeLoading.spinning = true
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.newNotice = res.result
          }
          this.noticeLoading.spinning = false
        }).finally(() => {
          this.noticeLoading.spinning = false
        })
      },
      consultData(param) {
        if (!this.consultUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.consultLoading.spinning = true
        getActionUpdateKeyword(this.consultUrl, param).then((res) => {
          if (res.success) {
            this.newConsult = res.result
          }
          this.consultLoading.spinning = false
        }).finally(() => {
          this.consultLoading.spinning = false
        })
      },
      getParam(formParam) {
        const param = Object.assign({}, formParam)
        return filterObj(param)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #mobileMessageNavigation {
    .my-more {
      width: 45%;
      padding-right: 27/2px;
      font-size: 24/2px;
      line-height: 24px;

      .more-span {
        color: #898989;
        padding-right: 5/2px;
        cursor: pointer;
      }
      .span-img {
        width: 13/2px;
        height: 22/2px;
        cursor: pointer;
      }
      a {
        height: 77/2px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    /deep/ .van-tab--active {
      color: @main-color;
      border-bottom: 2px solid @main-color;
    }
    /deep/ .van-tabs__line {
      background-color: @main-color;
    }

    /deep/ .van-tabs__nav--card {
      .van-tab.van-tab--active {
        background-color: #EBECF7;
      }
    }

    /deep/ .van-tab__pane {
      height: 451/2px;
      padding-top: 15/2px;
    }
    /deep/ .van-tabs__wrap {
      height: 77/2px;
    }

    /deep/ .van-tabs__nav--card {
      height: 77/2px;
      border: none;
      margin: 0;
      border-radius: 0;
      .van-tab {
        border-right: none;
        border-left: none;
      }
    }

    /deep/ .van-tab {
      padding: 0;
      margin: 0 40/2px;
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
</style>