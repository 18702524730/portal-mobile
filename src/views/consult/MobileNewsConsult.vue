<template>
  <div id="mobileNewsConsult">
    <div v-for="(outItem,outIndex) in dataList" :key="outItem.lawsType">
      <van-row class="card-head container" type="flex" justify="space-between" align="center">
        <van-col class="head-title">
          {{outItem.lawsTypeName}}
        </van-col>
        <van-col class="head-more" @click="moreBtn(outItem)">
          <span>查看更多</span><img src="../../assets/images/home/next.png" alt="more" class="span-img">
        </van-col>
      </van-row>
      <van-row class="message-content">
        <van-row class="btn-group">
          <van-button :type="index === outItem.selectItem?'info':'default'" size="mini"
                      v-for="(item,index) in outItem.data" :key="outItem.lawsType +'-' + item.lawsTypeChild"
                      @click="btnClick(outItem,index)">{{item.lawsTypeNameChild}}
          </van-button>
        </van-row>
        <van-row v-for="(onlyItem,onlyIndex) in outItem.data[`${outItem.selectItem}`].childData" :key="onlyItem.id"
                 class="my-row"
                 @click="rowClick(onlyItem)">
          <span>•</span>
          <span class="van-ellipsis">{{onlyItem.title }}</span>
          <span>{{onlyItem.releaseDate | changeDate}}</span>
        </van-row>
      </van-row>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'MobileNewsConsult',
    data() {
      return {
        url: '/zscq/portal/policies/policiesRegulationsList',
        dataList: [],
        formParam: {
          keyword: ''
        },
        ipagination: {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0
        },
        sort: {
          publishDateSort: 'desc'
        },

        keyRoute: 'MobileNewsConsult'
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      moreBtn(outItem) {
        this.$router.push({
          name: 'MobilePolicyList',
          query: {
            lawsType: outItem.lawsType,
            lawsTypeChild: outItem.data[`${outItem.selectItem}`].lawsTypeChild,
            selectItem: outItem.selectItem
          }
        })
      },
      btnClick(outItem, index) {
        outItem.selectItem = index
      },
      rowClick(item) {
        const newPage = this.$router.resolve({
          name: 'MobileArticleMessage',
          query: { id: item.id, keyRoute: this.keyRoute }
        })
        window.open(newPage.href, '_blank')
      },
      loadData() {
        if (!this.url) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        getActionUpdateKeyword(this.url).then((res) => {
          if (res.success) {
            const data = res.result
            console.info(res)
            console.info(data)
            console.info('哇哈哈哈')
            for (const a of data) {
              // 默认第一个为选择的数据
              a.selectItem = 0
            }
            this.dataList = data
          }
        }).finally(() => {
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileNewsConsult {
    background-color: @main-bg-color;
    .card-head {
      padding: 5px 0;
      .head-title {
        color: #001833;
        font-size: 16px;
      }
      .head-more {
        color: #898989;
        font-size: 12px;
        display: flex;
        align-items: center;
        .span-img {
          width: 13/2px;
          height: 22/2px;
          cursor: pointer;
        }
      }
    }
    .message-content {
      height: 263px;
      padding: 10px 15px;
      background-color: #ffffff;
      font-size: 12px;
      .van-button {
        border-radius: 10px;
        padding: 0 5px;
        font-size: 12px;
      }
      .van-button--info {
        background-color: @main-color;
        border-color: @main-color;
      }
      .van-button--mini + .van-button--mini {
        margin-left: 10px;
      }
      .my-row {
        display: flex;
        align-items: center;
        height: 70/2px;
        span:nth-child(1) {
          color: #B4B4B4;
          padding-right: 5px;
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
</style>