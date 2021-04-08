<template>
  <div class="industry-box">
    <div class="industryinfo">
      <div class="leftcondition">
        <div class="itemindustry">
          <div class="picbox">
            <img :src="info.coverUrl" alt="" />
          </div>
          <div class="rmsgs">
            <h3>{{ info.title }}</h3>
            <p>更新时间：{{ info.updateTime | dateFormat }}</p>
          </div>
        </div>
        <div class="shortintr">
          简介：
          <p>
            {{ info.brief }}
          </p>
        </div>
      </div>
      <div class="right-content">
        <div class="top">
          <div class="counts">
            共<span class="color-blue">{{ total }}</span
            >项专利
          </div>
        </div>
        <ul class="rightlist">
          <li v-for="(item, key) in dataList" :key="key" @click="toinfo(item)">
            <div class="topcont">
              <div class="patnamebox">
                <div class="picbox">
                  <img :src="item.abstractFigure" alt="" />
                </div>
                <h3 class="patname">【{{ item.typeName }}】{{ item.title }}</h3>
              </div>
              <div class="intr">
                <ul class="info">
                  <li>申请号：{{ item.applicationDocNum }}</li>
                  <li>申请日：{{ item.applicationDate }}</li>
                  <li>公开/公告号：{{ item.publicationDocNum }}</li>
                  <li>公开/公告日：{{ item.publicationDate }}</li>
                  <li>申请人：{{ item.applicant }}</li>
                  <li>发明人：{{ item.inventor }}</li>
                  <li>代理人：{{ item.agentPersonName }}</li>
                  <li>分类号：{{ item.ipcList.join(',') }}</li>
                  <li>代理机构：{{ item.agentName }}</li>
                </ul>
              </div>
            </div>
            <p class="desc">摘要：{{ item.abstractDesc }}</p>
          </li>
        </ul>
        <div class="mypagination" v-if="total > 10">
          <van-pagination
            v-model="pgIndex"
            :total-items="total"
            :show-page-size="3"
            @change="handleCurrentChange"
            force-ellipses
          />
        </div>
      </div>
    </div>
    <div class="sebemask" v-if="loading">
      <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
    </div>
  </div>
</template>

<script>
import filters from '@utils/filters.js'
const detailUrl = '/api/findPatentArticleDetail/{number}'
const listUrl = '/api/findMatchPatentList'

export default {
  data() {
    return {
      pgIndex: 1,
      pgCount: 10,
      total: 0,
      loading: false,
      selected: '',
      title: '',
      dataList: [],
      query: {},
      info: {},
      number: ''
    }
  },
  filters: {
    dateFormat: filters.formatDate.datesFormat
  },
  mounted() {
    this.number = this.$route.params.id
    this.getDetail()
    this.searchpage()
  },
  methods: {
    toinfo(it) {
      // const url = `/portal/search/patent-searchdetail/${it.applicationDocNum}/${it.country}/${it.publicationDocNum}/${it.type}`
      // window.open(url)
      this.$router.push({ name: 'PatentSearchDetail', params: { id: it.applicationDocNum, country: it.country, num: it.publicationDocNum, tp: it.type } })
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
    getDetail() {
      this.$shttp.get(detailUrl.replace('{number}', this.number)).then(res => {
        this.info = res
      })
    },
    handleCurrentChange(i) {
      this.pgIndex = i
      this.searchpage()
    },
    searchpage() {
      this.query.pgIndex = this.pgIndex
      this.query.pgCount = this.pgCount
      this.query.number = this.number
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
          this.total = data.totalElements
        })
        .catch(err => {
          this.loading = false
          this.$message(err.response.data.msg)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.industry-box {
  background-color: #f5f6f7;
  font-size: 14px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  .fr {
    float: right;
  }
  .fl {
    float: left;
  }
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }
  .top {
    padding: 15px;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
    .color-blue {
      padding: 0 5px;
      color: #2f72d1;
    }
  }
  .middle {
    padding-top: 10px;
  }
  .counts {
    font-size: 14px;
  }
  .leftcondition {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #fff;
    color: #666;

    .itemindustry {
      display: flex;
      .rmsgs {
        flex: 1;
        padding-left: 10px;
        > h3 {
          height: 22px;
          font-size: 16px;
          font-weight: 600;
          color: #333;
          line-height: 22px;
          margin-bottom: 5px;
        }
      }
    }
    .shortintr {
      color: #333;
      > p {
        text-indent: 2em;
        color: #666;
        font-size: 12px;
      }
    }

    .picbox {
      width: 170px;
      height: 170px;
      margin-bottom: 6px;
      // background-color: #ccc;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
    > p {
      height: 17px;
      margin-bottom: 20px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
      line-height: 17px;
    }
  }
  .right-content {
    background-color: #fff;
  }
  .rightlist {
    // width: 940px;
    border-bottom: 1px solid #eee;

    > li {
      padding: 15px;
      border-top: 1px solid #eee;
      .patnamebox {
        display: flex;
        margin-bottom: 6px;
        .patname {
          flex: 1;
          padding-left: 15px;
          font-size: 16px;
          color: #333;
        }
      }
    }
    .desc {
      font-size: 14px;
      color: #999;
      line-height: 21px;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    .topcont {
      // margin-bottom: 10px;
      color: #999;
      .picbox {
        width: 152px;
        height: 152px;
        background-color: #ccc;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .intr {
        .info {
          > li {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 21px;
            font-size: 13px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 21px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
  .mypagination {
    padding: 15px;
  }
}
</style>
