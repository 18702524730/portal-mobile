<template>
  <div id="scrollboxsebe">
    <div class="bannerbox" v-if="blist && blist.length">
      <swipe-map :adList="blist"></swipe-map>
    </div>
    <div class="sebeWidth" >
      <!-- <div class="tuijian" v-if="list&&list.length">
                <h3 class="title">推荐画报</h3>
                <div class="totalbox">
                    <span class="prev" v-if="list.length>4" @click="checknext('prev')"><i class="el-icon-arrow-left"></i></span>
                    <span class="next" v-if="list.length>4" @click="checknext('next')"><i class="el-icon-arrow-right"></i></span>
                    <div class="illustratedbox">
                        <ul class="illustrated" id="illustrated">
                            <li v-for="(item,key) in list" :key="key" @click="toinfo(item)">
                                <div class="imgbox">
                                    <img :src="item.journalCover" alt="">
                                </div>
                                <p>{{item.journalName}}</p>
                                <span>{{item.journalIssue}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div> -->
      <ul class="yearbox" v-if="years && years.length">
        <li v-for="(item, key) in years" :key="key" :class="{ active: current === key }" @click="changeyear(item, key)">
          {{ item }}
        </li>
      </ul>
      <!-- <div class="yearbox">
        <van-tabs v-model="nowyear" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7" color="#2F72D1" class="my-tab">
          <van-tab :title="it+''" :name="it" v-for="(it, key) in years" :key="key">
          </van-tab>
        </van-tabs>
      </div> -->
      <div class="itemyearbox">
        <ul class="itemyear">
          <li v-for="(item, key) in dataList" :key="key" @click="toinfo(item)">
            <div class="imgbox">
              <img :src="item.journalCover" alt="" />
            </div>
            <p>{{ item.journalName }}</p>
            <span>{{ item.journalIssue }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
import SwipeMap from "../../components/general/SwipePic"
const listUrl = '/api/pictorial/bannerList'
const tlistUrl = '/api/pictorial/journalList'
const yearlist = '/api/pictorial/journalYearList'

export default {
  data() {
    return {
      list: [],
      banners: [],
      blist: [],
      years: [],
      current: 0,
      hasnext: false,
      hasprev: false,
      pgIndex: 1,
      pgCount: 8,
      total: 0,
      dataList: [],
      loading: false,
      nowindex: 0,
      nowyear: '',
      query: {}
    }
  },
  components: {
    SwipeMap
  },
  methods: {
    changeyear(it, key) {
      this.current = key
      this.nowyear = it
      this.searchpage()
    },
    changeyears(name, title) {
      console.log(name, title)
      this.current = name
      this.nowyear = name
      this.searchpage()
    },
    checknext(type) {
      var oul = document.getElementById('illustrated')
      if (oul) {
        var ali = oul.getElementsByTagName('li')
        var ow = ali[0].offsetWidth
        var long = (ow + 20) * ali.length
        oul.style.width = long + 'px'
        // var off = long - 1200 - 20
        var left = oul.offsetLeft
        if (type === 'prev') {
          this.nowindex--
          if (this.nowindex <= -1) {
            this.hasprev = false
            this.hasnext = true
            this.nowindex = 0
            return
          }

          left += ow + 20
          oul.style.left = left + 'px'
        }
        if (type === 'next') {
          this.nowindex++
          if (this.nowindex >= this.list.length - 3) {
            this.hasprev = true
            this.hasnext = false
            this.nowindex = this.list.length - 4
            return
          }
          left -= ow + 20
          oul.style.left = left + 'px'
        }
        if (this.nowindex <= 0) {
          this.hasnext = true
          this.hasprev = false
        }
        if (this.nowindex > 0 && this.nowindex < this.list.length - 4) {
          this.hasnext = true
          this.hasprev = true
        }
        if (this.nowindex >= this.list.length - 4) {
          this.hasnext = false
          this.hasprev = true
        }
      }
    },
    toinfo(it) {
      this.$router.push({ name: 'MobileCloudPaperList', params: { id: it.id, year: it.journalYear } })
    },
    getbanner() {
      const data = {
        isTime: 1,
        from: 2
      }
      this.$shttp.get(listUrl, { params: data }).then(res => {
        this.blist = res.elements
      })
    },
    getrecom() {
      const tdata = {
        isRecommend: 1
      }
      this.$shttp.get(tlistUrl, { params: tdata }).then(res => {
        this.list = res.elements
        if (this.list && this.list.length) {
          this.$nextTick(() => {
            this.checknext()
          })
        }
      })
    },
    getyears() {
      this.$shttp.get(yearlist).then(res => {
        this.years = res
        this.nowyear = this.years[0]
        this.searchpage()
      })
    },
    getquery() {
      const re = {}
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
      this.query.journalYear = this.nowyear
      this.query.pgIndex = this.pgIndex
      this.query.pgCount = this.pgCount

      this.$router.replace({ query: this.query })
      this.getOrderList(this.query)
    },
    getOrderList(paramsData) {
      paramsData = paramsData || {}
      this.loading = true
      this.$shttp
        .get(tlistUrl, { params: paramsData })
        .then(resp => {
          this.loading = false
          var data = resp
          var dataList = data.elements
          this.dataList = dataList
          this.pgIndex = data.pageNum || 1
          this.total = data.totalElements
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    }
  },
  // created() {
  //   this.getquery()
  //   this.getbanner()
  //   this.getyears()
  // },
  mounted() {
    this.getquery()
    this.getbanner()
    this.getyears()
  }
}
</script>

<style lang="less" scoped>
#scrollboxsebe {
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
  .bannerbox {
    img {
      height: 100%;
      width: 100%;
    }
  }
  .sebeWidth {
      padding-bottom: 20/2px;
  }
  .tuijian {
    margin-bottom: 20px;
    padding-top: 40px;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      height: 28px;
      line-height: 28px;
      margin-bottom: 20px;
    }
    .imgbox {
      height: 385px;
      width: 100%;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .totalbox {
      position: relative;
      > span {
        position: absolute;
        width: 24px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background-color: #eee;
        color: #999;
        z-index: 999;
        font-size: 24px;
        &:hover {
          background-color: #2f72d1;
          color: #fff;
          cursor: pointer;
        }
      }
      .prev {
        left: -24px;
        top: 150px;
      }
      .next {
        right: -24px;
        top: 150px;
      }
    }
    .illustratedbox {
      width: 100%;
      height: 490px;
      overflow: hidden;
      position: relative;
    }
    .illustrated {
      position: absolute;
      left: 0;
      top: 0;
      width: 19000px;
      transition: left 0.5s linear;
      > li {
        float: left;
        width: 285px;
        height: 470px;
        border: 1px solid #eee;
        margin-right: 20px;

        background-color: #f5f6f7;
        cursor: pointer;
        > p {
          font-size: 14px;
          color: #333;
          font-weight: bold;
          line-height: 20px;
          margin-bottom: 5px;
          padding-left: 20px;
          padding-right: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        > span {
          padding-left: 20px;
          line-height: 20px;
          color: #999;
          font-size: 14px;
          margin-bottom: 20px;
        }
        &:hover {
          box-shadow: 0 6px 15px #ccc;
          > p {
            color: #2f72d1;
          }
        }
      }
    }
  }
  .itemyearbox {
    overflow: hidden;
    padding: 0 15px;
    .imgbox {
      height: 385px;
      width: 100%;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    .itemyear {
      > li {
        width: 285px;
        height: 470px;
        border: 1px solid #eee;
        margin-bottom: 10px;
        background-color: #f5f6f7;
        cursor: pointer;
        > p {
          font-size: 14px;
          color: #333;
          font-weight: bold;
          line-height: 20px;
          margin-bottom: 5px;
          padding-left: 20px;
          padding-right: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        > span {
          padding-left: 20px;
          line-height: 20px;
          color: #999;
          font-size: 14px;
          margin-bottom: 20px;
        }
      }
    }
  }
  .yearbox {
    margin-top: 20/2px;
    margin-bottom: 20/2px;
    padding: 0 15px;
    border-bottom: 1px solid #eee;
    height: 64/2px;
    overflow: hidden;
    > li {
      float: left;
      width: 120/2px;
      height: 60/2px;
      text-align: center;
      font-size: 32/2px;
      color: #999;
      cursor: pointer;
      &.active {
        font-size: 40/2px;
        color: #2f72d1;
        border-bottom: 2px solid #2f72d1;
      }
    }
  }
}
</style>
