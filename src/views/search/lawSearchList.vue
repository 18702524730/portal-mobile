<template>
  <div class="lawsearchlist">
    <div class="ordinary-search-trademark">
      <div class="xrightpart">
        <div class="search-boxs">
            <div class="lawtabbox">
                <span :class="{ active: selected === '2' }" @click="selected = '2'">复审无效</span><span @click="selected = '1'" :class="{ active: selected === '1' }">裁判文书</span>
            </div>
            <div class="left-search">
                <div class="btnboxs">
                    <input type="text" v-model="cont" placeholder="请输入要查询的专利申请号" >
                    <span @click="onSearch">搜索</span>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div>
      <div class="panli-search-result">
        <div class="top" v-show="!loading">
          共有<span class="color-red">{{ this.total }}</span>个结果
          <!-- <span class="exportbtn" @click="isvisible = true" v-if="total > 0"><img src="@assets/img/daochu-2.png" alt="" /> <em>导出</em></span>
          <el-dialog :visible.sync="isvisible" title="批量导出" width="30%">
            <div class="exportbtnbox">
              <div class="itembox">
                <span class="left">导出方式：</span>
                <span>
                  <el-radio label="1" v-model="radios">EXCEL</el-radio>
                </span>
              </div>
              <div class="itembox">
                <span class="left">导出条数：</span>
                <span class="exportcount">
                  <input type="text" maxlength="10" v-model="startnum" @keyup="putcheck(1)" /> -
                  <input type="text" maxlength="10" v-model="endnum" @keyup="putcheck(2)" /> 条
                </span>
              </div>
              <p>备注：每次最多导出20条，每日最多可导出100条</p>
            </div>
            <div class="confirmbox">
              <span class="no" @click="quxiao">取消</span>
              <span class="yes" @click="queding">确定</span>
            </div>
          </el-dialog> -->
        </div>
        <div class="middle clearfix">
          <ul class="rightlist">
            <li v-for="(item, key) in dataList" :key="key">
              <div class="topcont clearfix">
                <div class="intr">
                  <h3>
                    <span class="tit" @click="todetail(item)">{{ item.inventionTitle }}</span>
                    <!-- <span class="collect" v-if="item.isCollect === 1" @click.stop="cancelCollect(item)"
                      ><van-icon name='star' class="shou" /> 取消收藏</span
                    >
                    <span class="collect" v-if="item.isCollect === 0" @click.stop="addCollect(item)"
                      ><van-icon name='star-o' /> 收藏</span
                    > -->
                  </h3>
                  <ul class="info" v-if="collectType === '2'" key="2">
                    <li>
                      申请号：<span>{{ item.applicationDocNum }}</span>
                    </li>
                    <li>
                      申请日期：<span>{{ item.applicationDate }}</span>
                    </li>
                    <li>
                      请求人：<span>{{ item.appellant }}</span>
                    </li>
                    <li>
                      专利权人：<span>{{ item.assignee }}</span>
                    </li>
                    <li>
                      决定号：<span>{{ item.decisionNumber }}</span>
                    </li>
                    <li>
                      判决日期：<span>{{ item.decisionDate }}</span>
                    </li>
                  </ul>
                  <ul class="info" v-if="collectType === '1'" key="1">
                      <li>申请号：<span>{{item.applicationDocNum}}</span></li>
                      <li>专利权人：<span>{{item.assigneeName}}</span></li>
                      <li>原告：<span>{{item.plaintiff}}</span></li>
                      <li>被告：<span>{{item.defendant}}</span></li>
                      <li>法庭：<span>{{item.courtHouse}}</span></li>
                      <li>审判员：<span>{{item.judgeChief}}</span></li>
                      <li>决定号：<span>{{item.decisionNumberl}}</span></li>
                      <li>判决日：<span>{{item.verdictDate}}</span></li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="mypagination" v-if="!loading && total > 10">
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
import { Toast } from 'vant'
import { mapGetters } from 'vuex'
// import { judgeState } from '@/utils/util'
import rootConfig from '@config/hostConfig.js'
const bsOrderListUrl = '/api/lawCaseSearch'
const addCollectUrl = '/api/addMyCollect'
const cancelCollectUrl = '/api/cancelMyCollect'
// import VueCookie from 'vue-cookie'
// import { store } from 'utils/'

export default {
  // inject: ['loginNotReload'],
  data() {
    return {
      isvisible: false,
      collectType: '',
      startnum: '',
      endnum: '',
      radios: '1',
      marknum: 0,
      now: 3,
      patent: '',
      mark: '',
      cont: '',
      selected: '2',
      type: '',
      current: 0,
      world: false,
      selectednum: [],
      pgIndex: 1,
      pgCount: 10,
      dataList: [],
      total: 0,
      loading: false,
      query: {}
    }
  },
  mounted() {
    this.getquery()
    this.searchpage()
  },
  methods: {
    ...mapGetters(['userInfo']),
    addCollect(it) {
      const uid = 1
      if (uid) {
        let data = {
          collectType: 4,
          docId: it.docId,
          decisionNumber: it.decisionNumber,
          decisionDate: it.decisionDate,
          applicationDocNum: it.applicationDocNum,
          applicationDate: it.applicationDate,
          appellant: it.appellant,
          assignee: it.assignee,
          inventionTitle: it.inventionTitle,
          chiefExaminer: it.chiefExaminer,
          leaderExaminer: it.leaderExaminer,
          memberExaminer: it.memberExaminer,
          lawReference: it.lawReference,
          decisionCaseIssueHeading: it.decisionCaseIssueHeading,
          decisionCaseIssueParagraphs: it.decisionCaseIssueParagraphs,
          reasoningHeading: it.reasoningHeading,
          reasoningParagraphs: it.reasoningParagraphs,
          finalDecisionHeading: it.finalDecisionHeading,
          finalDecisionParagraphs: it.finalDecisionParagraphs
        }
        if (this.collectType === '1') {
          data = {
              collectType: 3,
              courtHouse: it.courtHouse,
              applicationDocNum: it.applicationDocNum,
              assigneeName: it.assigneeName,
              inventionTitle: it.inventionTitle,
              defendant: it.defendant,
              defendantRepresentative: it.defendantRepresentative,
              defendantAttorney: it.defendantAttorney,
              thirdPartyRepresentative: it.thirdPartyRepresentative,
              judgeChief: it.judgeChief,
              judgeDeputy: it.judgeDeputy,
              judgeAssistant: it.judgeAssistant,
              courtReporter: it.courtReporter,
              complainantOpinion: it.complainantOpinion,
              factCognizance: it.factCognizance,
              verdictReasoning: it.verdictReasoning,
              verdictHolding: it.verdictHolding,
              verdictDate: it.verdictDate,
              publicationInformation: it.publicationInformation,
              decisionNumberl: it.legalFileNumber,
              // legalFileNumber: it.legalFileNumber,
              plaintiff: it.plaintiff,
              plaintiffAttorney: it.plaintiffAttorney
          }
        }
        this.$shttp
          .post(addCollectUrl, data)
          .then(res => {
            it.isCollect = 1
            Toast('收藏成功')
          })
          .catch(err => {
            Toast(err.response.data.msg)
          })
      } else {
        // this.loginNotReload()
      }
    },
    cancelCollect(it) {
      let data = {
        collectType: 4,
        collectItemUuid: it.decisionNumber
      }
      if (this.collectType === '1') {
        data = {
          collectType: 3,
          collectItemUuid: it.legalFileNumber
        }
      }
      this.$shttp
        .put(cancelCollectUrl, data)
        .then(res => {
          it.isCollect = 0
          Toast('取消收藏成功')
        })
        .catch(err => {
          Toast(err.response.data.msg)
        })
    },
    quxiao() {
      this.startnum = ''
      this.endnum = ''
      this.isvisible = false
    },
    putcheck(i) {
      const reg = /[^0-9]/g
      if (i === 1) {
        this.startnum = this.startnum.replace(reg, '')
      }
      if (i === 2) {
        this.endnum = this.endnum.replace(reg, '')
      }
    },
    queding() {
      if (!this.startnum) {
        Toast('请输入开始条数')
        return
      }
      if (!this.endnum) {
        Toast('请输入结束条数')
        return
      }
      if (this.endnum - this.startnum > 19) {
        Toast('每次最多导出20条')
        return
      }
      if (this.endnum - this.startnum < 0) {
        Toast('请输入正确的开始条数和结束条数')
        return
      }
      if (this.startnum > this.total || this.endnum > this.total) {
        Toast(`当前共${this.total}条数据，请输入有效的条数`)
        return
      }
      const uinfo = this.userInfo()
      const userId = uinfo && uinfo.id
      const count = {
        startLine: this.startnum,
        endLine: this.endnum,
        userId: userId || '',
        type: this.selected
      }
      const urldata = Object.assign({}, this.query, count)
      this.quxiao()
      const openurl = rootConfig.rootUrl + '/api/exportLawCaseSearch?' + urldata
      window.open(openurl)
    },
    onSearch(num) {

      if (!this.cont) {
        Toast('请输入内容查询')
        return
      }
      const re = {}
      console.log(this.selected)
      re.applicationDocNum = this.cont
      this.searchpage()
    },
    todetail(it) {
      let ctype = 4
      if (this.collectType === '1') {
        const str = JSON.stringify(it)
        ctype = 3
        localStorage.setItem('sebechaijuexinxi', str)
      }
      if (this.collectType === '2') {
        const str = JSON.stringify(it)
        localStorage.setItem('sebefushenxinxi', str)
      }
      this.$router.push({ name: 'LawSearchDetail', params: { type: ctype, islocal: 1 } })
      // const openurl = `/portal/search/law-searchdetail/${ctype}/1`
      // window.open(openurl)
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
      if (re['applicationDocNum']) {
        this.cont = re['applicationDocNum']
      }
      this.selected = re.type
      this.type = re.type
      this.query = re
    },

    handleCurrentChange(i) {
      this.pgIndex = i
      this.searchpage()
    },
    searchpage() {
      this.query.pgIndex = this.pgIndex
      this.query.pgCount = this.pgCount
      this.query.applicationDocNum = this.cont
      this.query.type = this.selected
      this.$router.replace({ query: this.query })
      this.getOrderList(this.query)
    },
    getOrderList(paramsData) {
      paramsData = paramsData || {}
      this.loading = true
      this.$shttp
        .get(bsOrderListUrl, { params: paramsData })
        .then(resp => {
          this.loading = false
          this.collectType = this.selected
          var data = resp
          var dataList = data.elements
          this.dataList = dataList
          this.pgIndex = data.pageNum || 1
          this.total = data.totalElements
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.lawsearchlist {
  padding: 50px 15px 20px;
  background-color: #fff;
  .panli-search-result {
    padding-bottom: 50px;
    background-color: #fff;
    .top {
      padding: 30px 0 10px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      .export {
        float: right;
        color: #666;
        cursor: pointer;
      }
      .exportbtn {
        float: right;
        padding: 0;
        cursor: pointer;
        img {
          vertical-align: middle;
          width: 16px;
          height: 16px;
        }
        em {
          font-style: normal;
          vertical-align: middle;
        }
      }
      .confirmbox {
        padding: 10px 0;
        text-align: right;
        span {
          display: inline-block;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          border-radius: 4px;
        }
        .no {
          margin-right: 20px;
          border: 1px solid #379dea;
          color: #379dea;
        }
        .yes {
          background-color: #379dea;
          color: #fff;
        }
      }
      .exportbtnbox {
        padding-bottom: 30px;
        border-bottom: 1px solid #eee;
        p {
          font-size: 12px;
          color: #999;
          padding-left: 20px;
        }
        .itembox {
          margin-bottom: 20px;
          padding-left: 20px;
          .left {
            margin-right: 20px;
            line-height: 20px;
          }
          .left:before {
            content: '*';
            color: red;
          }
        }
        .exportcount {
          min-width: 220px;
          white-space: nowrap;
          line-height: 24px;
          input {
            width: 100px;
            height: 28px;
            padding: 4px;
            border: 1px solid #eee;
          }
        }
      }
    }
    .middle {
      padding-top: 10px;
    }
    .rightlist {
      > li {
        padding: 10px 15px;
        border: 1px solid #eee;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        color: #999;
      }
      .topcont {
        color: #999;
        .intr {
          h3 {
            padding: 0;
            margin: 0;
            font-size: 14px;
            color: #333;
            font-weight: normal;
            margin-bottom: 10px;
          }
          .info {
            > li {
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
              color: #999;
              &:last-child {
                margin-bottom: 0;
              }
              span {
                color: #666;
                font-weight: bold;
              }
              span.status {
                color: #379dea;
              }
            }
          }
          .state {
            display: inline-block;
            width: 60px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #fff;
            background-color: #379dea;
            border-radius: 10px;
            vertical-align: middle;
          }
          .tit {
            display: inline-block;
            max-width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 20px;
            vertical-align: middle;
            color: #379dea;
          }
          .collect {
            float: right;
            vertical-align: middle;
            font-size: 14px;
            line-height: 15px;
            .shou {
              color: #379dea;
            }
          }
        }
      }
    }
  }
  .lawtabbox {
      font-size: 0;
      > span {
          display: inline-block;
          width: 75px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background-color: #f5f5f5;
          color: #666;
          font-size: 14px;
          &.active {
              background-color: #1890ff;
              color: #fff;
          }
      }
  }
  .btnboxs {
    display: flex;
    width: 100%;
    > input {
      box-sizing: border-box;
      flex: 1;
      height: 40px;
      padding: 5px 10px;
      border: 1px solid #f5f5f5;
      border-radius: 2px;
      font-size: 14px;
      line-height: 30px;
    }
    > span {
      display: inline-block;
      width: 80px;
      height: 40px;
      background-color: #1890ff;
      color: #fff;
      text-align: center;
      font-size: 14px;
      line-height: 40px;
    }
  }
}
</style>
