<template>
  <div class="patentnavsebe">
    <div class="commonWidth">
      <div class="latest">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in datas" :key="index">
              <div class="picbox" @click="todetail(item)">
                <img :src="item.coverUrl" alt="" />
                <div class="intr">
                  <h3 class="title">{{ item.title }}</h3>
                  <div class="source">
                    <span class="date">{{ item.publishTime | dateFormat }}</span>
                    <span class="author">作者：{{ item.author }}</span>
                    <!-- <span>{{item.source}}</span> -->
                  </div>
                </div>
              </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <ul class="cont">
        <li v-for="(item, index) in dataList" :key="index" @click="todetail(item)">
          <div class="leftpic">
            <img :src="item.coverUrl" alt="" />
          </div>
          <div class="rightcont">
            <h3>{{ item.title }}</h3>
            <p>{{ item.brief }}</p>
            <p class="btm">
              <span class="date">{{ item.publishTime | dateFormat }}</span>
              <span class="author">作者：{{ item.author }}</span>
              <!-- <span>{{item.source}}</span> -->
            </p>
          </div>
        </li>
      </ul>
      <div class="mypagination" v-if="total > 10 && !loading">
        <van-pagination
          v-model="pgIndex"
          :total-items="total"
          :show-page-size="3"
          @change="handleCurrentChange"
          force-ellipses
        />
      </div>
    </div>
    <div class="sebemask" v-if="loading">
      <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
    </div>
  </div>
</template>

<script>
import filters from '@utils/filters.js'
const recomUrl = '/api/findRecommend'
const listUrl = '/api/findPatentArticleList'

export default {
  data() {
    return {
      datas: [],
      dataList: [],
      pgIndex: 1,
      pgCount: 10,
      total: 0,
      loading: false,
      query: {}
    }
  },
  filters: {
    dateFormat: filters.formatDate.datesFormat
  },
  methods: {
    todetail(it) {
      // const url = `/portal/feature-service/patent-navdetail/${it.number}`
      // window.open(url)
      this.$router.push({ name: 'PatentNavDetail', params: { id: it['number'] } })
    },
    getRecom() {
      const data = {
        type: 2
      }
      this.$shttp.get(recomUrl, { params: data }).then(res => {
        this.datas = res
      })
    },
    getquery() {
      var re = {}
      if (this.$route.query) {
        var q = this.$route.query
        for (var k in q) {
          if (q.hasOwnProperty(k)) {
            if (q[k]) {
              re[k] = q[k]
            }
          }
        }
      }
      this.query = re
    },
    handleCurrentChange(i) {
      this.pgIndex = i
      this.searchpage()
    },
    searchpage() {
      this.query.pgIndex = this.pgIndex
      this.query.pgCount = this.pgCount
      this.query.sortType = 2
      this.query.type = 2
      this.$router.replace({ query: this.query })
      this.getOrderList(this.query)
    },
    getOrderList(paramsData) {
      paramsData = paramsData || {}
      this.loading = true
      this.$shttp
        .get(listUrl, { params: paramsData })
        .then(resp => {
          this.loading = false
          var data = resp
          var dataList = data.elements
          this.dataList = dataList
          this.pgIndex = data.pageNo || 1
          this.total = data.totalElements
        })
        .catch(err => {
          this.loading = false
          this.$message(err.response.data.msg)
        })
    }
  },
  mounted() {
    this.getRecom()
    this.searchpage()
  }
}
</script>

<style lang="less">
.patentnavsebe {
  background-color: #f5f6f7;
  padding-bottom: 15px;
  overflow: hidden;
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .fr {
      float: right;
  }
  h3 {
      padding: 0;
      margin: 0;
  }
  p {
      padding: 0;
      margin: 0;
  }
  .latest {
    margin-bottom: 15px;
    padding: 0 15px;
    > li {
      float: left;
      width: 345px;
      height: 345px;
      margin-bottom: 10px;
    }
    .picbox {
      position: relative;
      width: 345px;
      height: 345px;
      // background-color: #ccc;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
      .intr {
        box-sizing: border-box;
        height: 69px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 14px 20px;
        background-color: #000;
        opacity: 0.6;
        color: #fff;
      }
      .title {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: 'PingFangSC-Regular,PingFang SC';
      }
      .source {
        height: 17px;
        font-size: 12px;
        font-family: 'PingFangSC-Regular,PingFang SC';
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 17px;
      }
    }
  }
  h2 {
    height: 28px;
    margin-bottom: 20px;
    line-height: 28px;
    font-size: 20px;
    font-weight: 600;
    color: #333;
    font-family: 'PingFangSC-Regular,PingFang SC';
    .english {
      font-size: 14px;
      line-height: 20px;
      color: #999;
      font-weight: 600;
      padding-left: 10px;
    }
  }
  .cont {
    margin-bottom: 15px;
    > li {
      display: flex;
      padding: 10px;
      margin-bottom: 15px;
      background-color: #fff;
      .leftpic {
        width: 100px;
        height: 100px;
        margin-right: 15px;
        background-color: #ccc;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
      .rightcont {
        flex: 1;
        > h3 {
          margin-bottom: 6px;
          height: 21px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          line-height: 21px;
        }
        p {
          line-height: 21px;
          font-size: 14px;
          max-width: 100%;
          margin-bottom: 6px;
          color: #333;
          // display: -webkit-box;
          // overflow: hidden;
          // -webkit-line-clamp: 2;
          // -webkit-box-orient: vertical;
        }
        .btm {
          height: 20px;
          font-size: 14px;
          font-family: 'PingFangSC-Regular,PingFang SC';
          font-weight: 400;
          color: #999;
          line-height: 20px;
        }
        .time {
          color: #999;
        }
        .result {
          float: right;
          padding-top: 36px;
        }
        .count {
          color: #2f72d1;
          font-size: 20px;
          font-weight: 300;
        }
      }
    }
  }
  .date {
    margin-right: 15px;
  }
  .author {
    margin-right: 10px;
  }
}

</style>
