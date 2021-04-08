<template>
  <div class="industrydatabox">
    <div class="industrydata">
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
      <h2>最新专题库<span class="english">LIBRARY</span></h2>
      <ul class="cont">
        <li v-for="(item, index) in dataList" :key="index" @click="todetail(item)">
          <div class="leftpic">
            <img :src="item.coverUrl" alt="" />
          </div>
          <div class="rightcont">
            <h3>{{ item.title }}</h3>
            <p>{{ item.brief }}</p>
            <p class="time">更新时间：{{ item.updateTime | dateFormat }}</p>
            <div class="result">
              共<span class="count">{{ item.patentCount }}</span> 项专利
            </div>
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
import { isLoginAndAdmin } from '@/utils/role'
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
  methods: {
    todetail(it) {
      this.$router.push({ name: 'IndustryInfo', params: { id: it.number } })
    },
    getRecom() {
      const data = {
        type: 1
      }
      this.$shttp.get(recomUrl, { params: data }).then(res => {
        this.datas = res
      }).catch(() => {})
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
      this.query.type = 1
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
  created() {
    if (!isLoginAndAdmin()) {
      this.$router.push({ name: 'PatentShiBeiPort' })
    } else {
      this.getRecom()
      this.searchpage()
    }
  },
  filters: {
    dateFormat: filters.formatDate.datesFormat
  }
}
</script>

<style lang="less" scoped>

.industrydatabox {
  padding: 15px;
  background-color: #f5f6f7;
  ul {
      list-style: none;
      margin: 0;
      padding: 0;
  }
  .fr {
      float: right;
  }
  .fl {
      float: left;
  }
}
.industrydata {
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  .latest {
    margin-bottom: 15px;
    > li {
      float: left;
      width: 285px;
      height: 285px;
      // background-color: #ccc;
      margin-right: 20px;
      margin-bottom: 10px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 4px 4px 13px 0 #ccc;
      }
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
      .titlebox {
        height: 48px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 14px 20px;
        background-color: #000;
        opacity: 0.6;
      }
      .title {
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  h2 {
    height: 22px;
    margin-bottom: 15px;
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    .english {
      font-size: 14px;
      line-height: 20px;
      color: #999;
      font-weight: normal;
      padding-left: 10px;
    }
  }
  .cont {
    margin-bottom: 30px;
    > li {
      padding: 10px;
      margin-bottom: 10px;
      background-color: #fff;
      display: flex;
      .leftpic {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
      .rightcont {
        flex: 1;
        padding-left: 6px;
        h3 {
          margin-bottom: 10px;
          font-size: 16px;
          color: #333;
          line-height: 22px;
          font-weight: 600;
        }
        p {
          line-height: 20px;
          font-size: 14px;
          height: 20px;
        }
        .time {
          color: #999;
        }
      }
      .result {
        font-size: 14px;
      }
      .count {
        color: #2f72d1;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .date {
    margin-right: 20px;
  }
  .author {
    margin-right: 10px;
  }
}
</style>
