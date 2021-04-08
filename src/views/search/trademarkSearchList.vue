<template>
  <div class="trademarksearchlist">
    <div class="search-trademarkbox">
      <div class="btnboxs">
        <input type="text" v-model="mark" placeholder="请输入要查询的商标名称、申请号等" >
        <span @click="onSearch">搜索</span>
      </div>
    </div>
    <div>
      <div class="trademark-search-result">
        <!-- <div class="screeningbox">
          <span
            v-for="(item, index) in conditions"
            :key="index"
            :class="{ active: marknum === index }"
            @click="changecondition(item, index)"
            >{{ item.name }}</span
          >
        </div> -->
        <!-- <div class="selected-condition">
          <div class="clearfix">
            <h3 class="fl yixuan">已选条件</h3>
            <div class="selectmark fl">
              <span v-for="(mark, key) in selectedcondition" :key="key"
                >{{ mark.typeCodeName }}<i class="closebtn" @click="close(mark, key)"><van-icon name="cross" /></i>
              </span>
            </div>
          </div>

          <ul class="morecondition">
            <li>
              <p class="tit">申请类别</p>
              <div class="types" :class="{ hasmore: ishasmore }">
                <span
                  v-for="(types, key) in applytype"
                  :key="key"
                  @click="addtype(types)"
                  :class="{ active: yixuantype.indexOf(types.typeCode) != -1 }"
                  >{{ types.typeCodeName }} ({{ types.num }})</span
                >
              </div>
              <div class="more" @click="changehasemore">
                <span>更多</span><van-icon name="arrow-down" v-if="ishasmore" /><van-icon name="arrow-up" v-else />
              </div>
            </li>
            <li>
              <p class="tit">法律状态</p>
              <div class="types" :class="{ hasmore: ishasmores }">
                <span
                  v-for="(mark, key) in markstate"
                  :key="key"
                  @click="addtype(mark)"
                  :class="{ active: yixuanstate.indexOf(mark.type) != -1 }"
                  >{{ mark.typeCodeName }} ({{ mark.num }})</span
                >
              </div>
              <div class="more" @click="changehasemores">
                <span>更多</span><van-icon name="arrow-down" v-if="ishasmores" /><van-icon name="arrow-up" v-else />
              </div>
            </li>
            <li>
              <p class="tit">申请年份</p>
              <div class="types" :class="{ hasmore: ishasmoret }">
                <span
                  v-for="(mark, key) in markyear"
                  :key="key"
                  @click="addtype(mark)"
                  :class="{ active: yixuanyear.indexOf(mark.typeCodeName) != -1 }"
                  >{{ mark.typeCodeName }} ({{ mark.num }})</span
                >
              </div>
              <div class="more" @click="changehasemoret">
                <span>更多</span><van-icon name="arrow-down" v-if="ishasmoret" /><van-icon name="arrow-up" v-else />
              </div>
            </li>
          </ul>
          <h2 class="found">
            为您找到<span>{{ total }}</span
            >个商标
          </h2>
        </div> -->
        <h2 class="found">
            为您找到<span>{{ total }}</span
            >个商标
        </h2>
        <div class="middle clearfix">
          <ul class="rightlist" v-if="!loading && dataList.length">
            <li v-for="(item, key) in dataList" :key="key">
              <div class="topcont clearfix">
                <div class="picbox fl">
                  <img :src="item.logoUrl" alt="" />
                </div>
                <div class="intr fr">
                  <h3>
                    <span class="tit" @click="todetail(item)">{{ item.name }}</span>
                    <!-- <span class="collect" v-if="item.isCollect === 1" @click.stop="cancelCollect(item)"
                      ><van-icon name="star shou" /> 取消收藏</span
                    >
                    <span class="collect" v-if="item.isCollect === 0" @click.stop="addCollect(item)"
                      ><van-icon name="star-o" /> 收藏</span
                    > -->
                  </h3>
                  <ul class="info">
                    <li>
                      当前状态：<span class="status">{{ item.processName }}</span>
                    </li>
                    <li>
                      商品类别：<span>{{ item.typeCodeName }}</span>
                    </li>
                    <li>
                      申请号：<span>{{ item.dataId }}</span>
                    </li>
                    <li>
                      申请日期：<span>{{ item.createDate }}</span>
                    </li>
                    <li>
                      申请人：<span>{{ item.applicant }}</span>
                    </li>
                    <li>
                      初审公告日期：<span>{{ item.noticeDate }}</span>
                    </li>
                    <li>
                      注册公告日期：<span>{{ item.registerDate }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          <div class="nodata" v-if="!loading && !total">
            温馨提示：暂未找到您要的搜索结果
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
// import $ from 'jquery'
import rootConfig from '@config/hostConfig.js'
// import filters from '@utils/filters.js'
const listUrl = '/api/brandSearch'
const addCollectUrl = '/api/addMyCollect'
const cancelCollectUrl = '/api/cancelMyCollect'
// import VueCookie from 'vue-cookie'
// const homeUrl = CONFIG.homeUrl

export default {
  // inject: ['loginNotReload'],
  data() {
    return {
      isvisible: false,
      startnum: '',
      endnum: '',
      radios: '1',
      field: 'name',
      ishasmore: true,
      ishasmores: true,
      ishasmoret: true,
      label: ['普通搜索', '高级搜索'],
      conditions: [
        { name: '近似商标', id: 'all' },
        { name: '精准商标', id: 'name' },
        { name: '申请号', id: 'data_id' },
        { name: '申请人', id: 'applicant' }
      ],
      checkedCities: ['cn', 'docdb'],
      marknum: 1,
      now: 2,
      patent: '',
      mark: '',
      cont: '',
      selected: '2',
      current: 0,
      world: false,
      selectednum: [],
      all: false,
      china: false,
      search: [
        { name: '专利检索', id: 1 },
        { name: '商标检索', id: 2 },
        { name: '判例检索', id: 3 }
      ],
      applytype: [],
      markstate: [],
      markyear: [],
      yixuantype: [],
      yixuanstate: [],
      yixuanyear: [],
      selectedcondition: [],
      pgIndex: 1,
      pgCount: 10,
      total: 0,
      dataList: [],
      loading: false,
      query: {}
    }
  },
  methods: {
    ...mapGetters(['userInfo']),
    addCollect(it) {
      const uid = 1
      if (uid) {
        const data = {
          collectType: 2,
          processName: it.processName,
          logoUrl: it.logoUrl,
          typeCodeName: it.typeCodeName,
          createDate: it.createDate,
          applicant: it.applicant,
          detailId: it.detailId,
          name: it.name
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
        this.loginNotReload()
      }
    },
    cancelCollect(it) {
      const data = {
        collectType: 2,
        collectItemUuid: it.detailId
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
        userId: userId || ''
      }
      const urldata = Object.assign({}, this.query, count)
      this.quxiao()
      const openurl = rootConfig.rootUrl + '/api/exportBrandSearch?' + (urldata)
      window.open(openurl)
    },
    isIn(arr, it) {
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; i++) {
          if (arr.indexOf(it) !== -1) {
            return true
          }
        }
        return false
      } else {
        return false
      }
    },
    addtype(it) {
      const type = it['tp']

      if (type === 'typeCode') {
        // if(this.yixuantype.length===0){
        //     this.yixuantype.push(it.typeCode)
        //     qobj[type] = this.yixuantype.join(',')
        // }else{
        //     if(this.isIn(this.yixuantype,it.typeCode)){
        //         return
        //     }
        //     this.yixuantype.push(it.typeCode)
        //     qobj[type] = this.yixuantype.join(',')
        // }
        if (this.isIn(this.yixuantype, it.typeCode)) {
          Toast('您已选择该类型')
          return
        }
        this.yixuantype.push(it.typeCode)
        this.query[type] = this.yixuantype.join(',')
        console.log(this.yixuantype, it.typeCode)
      }
      if (type === 'statusName') {
        if (this.isIn(this.yixuanstate, it.type)) {
          Toast('您已选择该类型')
          return
        }
        this.yixuanstate.push(it.type)
        this.query[type] = this.yixuanstate.join(',')
      }
      if (type === 'createYear') {
        if (this.isIn(this.yixuanyear, it.typeCodeName)) {
          Toast('您已选择该类型')
          return
        }
        this.yixuanyear.push(it.typeCodeName)
        this.query[type] = this.yixuanyear.join(',')
      }
      this.selectedcondition.push(it)
      //     qobj['field'] = this.field
      // var data = Object.assign({},this.query,qobj)
      // this.$router.replace({query:data})
      // this.getOrderList(data)
      this.searchpage(true)
    },
    close(it, k) {
      // this.applytype.forEach(item=>{
      //     if(item.id===it.id){
      //         item.ischeck = false
      //     }
      // })
      // this.markstate.forEach(item=>{
      //     if(item.id===it.id){
      //         item.ischeck = false
      //     }
      // })
      // this.markyear.forEach(item=>{
      //     if(item.id===it.id){
      //         item.ischeck = false
      //     }
      // })
      this.selectedcondition.splice(k, 1)
      const type = it['tp']

      if (type === 'typeCode') {
        for (let i = 0; i < this.yixuantype.length; i++) {
          if (this.yixuantype[i] === it['typeCode']) {
            this.yixuantype.splice(i, 1)
          }
        }
        this.query[type] = this.yixuantype.join(',')
        if (!this.yixuantype.length) {
          delete this.query['typeCode']
        }
      }
      if (type === 'statusName') {
        for (let i = 0; i < this.yixuanstate.length; i++) {
          if (this.yixuanstate[i] === it['type']) {
            this.yixuanstate.splice(i, 1)
          }
        }
        this.query[type] = this.yixuanstate.join(',')
        if (!this.yixuanstate.length) {
          delete this.query['statusName']
        }
      }
      if (type === 'createYear') {
        for (let i = 0; i < this.yixuanyear.length; i++) {
          if (this.yixuanyear[i] === it['typeCodeName']) {
            this.yixuanyear.splice(i, 1)
          }
        }
        this.query[type] = this.yixuanyear.join(',')
        if (!this.yixuanyear.length) {
          delete this.query['createYear']
        }
      }
      //     qobj['field'] = this.field
      // var data = Object.assign({},this.query,qobj)
      // this.$router.replace({query:data})
      // this.getOrderList(data)
      this.searchpage()
    },
    changehasemore() {
      this.ishasmore = !this.ishasmore
    },
    changehasemores() {
      this.ishasmores = !this.ishasmores
    },
    changehasemoret() {
      this.ishasmoret = !this.ishasmoret
    },
    changecondition(it, i) {
      this.marknum = i
      this.field = it.id
      this.resets()
      this.searchpage(true)
    },
    onSearch() {
      if (!this.mark) {
        Toast('请输入要查询的商标名称、申请号等')
        return
      }
      this.resets()
      this.searchpage(true)
    },
    resets() {
      this.yixuantype = []
      this.yixuanstate = []
      this.yixuanyear = []
      this.selectedcondition = []
      this.pgIndex = 1
      delete this.query['typeCode']
      delete this.query['statusName']
      delete this.query['createYear']
    },
    xuanze(it) {
      this.now = it.id
    },
    todetail(it) {
      // const url = `/portal/search/trademark-searchdetail/${it.detailId}`
      // window.open(url)
      this.$router.push({ name: 'TrademarkSearchDetail', params: { id: it.detailId } })
    },
    changeitem(it) {
      it.show = !it.show
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
      if (re['q']) {
        this.mark = re['q']
      }
      this.query = re
    },
    handleCurrentChange(i) {
      this.searchpage()
    },
    ranNum(n) {
      var t = ''
      for (var i = 0; i < n; i++) {
        t += String(Math.floor(Math.random() * 10))
      }
      return t
    },
    changeStr(str,index,changeStr) {    
      return str.substr(0,index) + changeStr + str.substr(index + changeStr.length)
    },
    searchpage(isf) {
      // var ret = {};
      // ret.pgIndex = this.pgIndex;
      // ret.pgCount = this.pgCount;
      // ret.field = this.field;
      // ret['q'] = this.mark;
      // var data = Object.assign({},ret);
      // this.$router.replace({query:data})
      // this.getOrderList(data)
      this.query.field = this.field
      this.query['q'] = this.mark
      this.query.pgIndex = isf ? 1 : this.pgIndex
      this.query.pgCount = this.pgCount
      let randomKey = String(new Date().getTime())
      randomKey = randomKey.replace(/0/g,'b')
      randomKey = randomKey.replace(/1/g,'d')
      randomKey = randomKey.replace(/2/g,'1')
      randomKey = randomKey.replace(/3/g,'e')
      randomKey = randomKey.replace(/4/g,'f')
      randomKey = randomKey.replace(/5/g,'z')
      randomKey = randomKey.replace(/6/g,'3')
      randomKey = randomKey.replace(/7/g,'g')
      randomKey = randomKey.replace(/8/g,'4')
      randomKey = randomKey.replace(/9/g,'k')
      this.query.randomKey = randomKey
      var domNum = this.ranNum(10)
      this.query.secret2 = domNum
      for (var i = 0; i < domNum.length; i++) {
        if (domNum[i] === "0") {
          domNum = this.changeStr(domNum,i,'b')
        } else if (domNum[i] === '1') {
          domNum = this.changeStr(domNum,i,'d')
        } else if (domNum[i] === '2') {
          domNum = this.changeStr(domNum,i,'1')
        } else if (domNum[i] === '3') {
          domNum = this.changeStr(domNum,i,'e')
        } else if (domNum[i] === '4') {
          domNum = this.changeStr(domNum,i,'f')
        } else if (domNum[i] === '5') {
          domNum = this.changeStr(domNum,i,'z')
        } else if (domNum[i] === '6') {
          domNum = this.changeStr(domNum,i,'3')
        } else if (domNum[i] === '7') {
          domNum = this.changeStr(domNum,i,'g')
        } else if (domNum[i] === '8') {
          domNum = this.changeStr(domNum,i,'4')
        } else if (domNum[i] === '9') {
          domNum = this.changeStr(domNum,i,'k')
        }
      }
      this.query.secret1 = domNum
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
          this.pgIndex = data.pageNum || 1
          this.total = data.totalElements

          var type = data.stat.typeCode
          var state = data.stat.status
          var year = data.stat.year
          this.applytype = []
          this.markstate = []
          this.markyear = []
          type.forEach(item => {
            item['ischeck'] = false
            item['tp'] = 'typeCode'
            this.applytype.push(item)
          })
          for (var x in state) {
            if (x && state.hasOwnProperty(x)) {
              const arr = x.split('_')
              this.markstate.push({
                typeCodeName: arr[1],
                num: state[x],
                tp: 'statusName',
                type: arr[0] || 30001
              })
            }
          }
          for (var y in year) {
            if (y && year.hasOwnProperty(y)) {
              this.markyear.push({
                typeCodeName: y,
                num: year[y],
                tp: 'createYear'
              })
            }
          }
        })
        .catch(err => {
          this.loading = false
          Toast(err.response.data.msg)
        })
    }
  },
  mounted() {
    this.getquery()
    this.resets()
    this.searchpage()
  }
}
</script>

<style lang="less">
.trademarksearchlist {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }
  ul,
  p,
  h3,
  h2 {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .search-trademarkbox {
    padding: 20px 15px;
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
  .trademark-search-result {
    padding-bottom: 30px;
    background-color: #fff;
    .top {
      padding: 20px 0 10px;
      border-bottom: 1px solid #eee;
    }
    .middle {
      padding: 15px;
      .nodata {
        width: 100%;
        font-size: 14px;
      }
    }
    .selected-condition {
      background-color: #eee;
      padding: 10px 15px;
      margin-bottom: 10px;
      .yixuan {
        padding: 0;
        margin: 0;
        line-height: 20px;
        font-size: 14px;
        width: 70px;
      }
      .morecondition {
        margin-bottom: 10px;
        font-size: 14px;
        > li {
          display: flex;
          justify-content: space-between;
          /* margin-bottom: 10px; */
          font-size: 12px;
          .tit {
            color: #666;
            width: 100px;
            font-size: 14px;
            line-height: 22px;
          }
          .types {
            width: 100%;
            color: #333;
            font-weight: 500;
            span {
              display: inline-block;
              height: 22px;
              padding: 0 5px;
              line-height: 22px;
              margin-right: 10px;
              white-space: nowrap;
              font-size: 12px;
              /* margin-bottom: 5px; */
            }
            span.active {
              color: orangered;
            }
          }
          .hasmore {
            height: 22px !important;
            overflow: hidden !important;
          }
          .more {
            line-height: 22px;
            width: 60px;
            text-align: right;
            font-size: 12px;
          }
        }
      }
      .found {
        text-align: right;
        font-size: 14px;
        color: #333;
        border-top: 1px solid #ccc;
        padding-top: 10px;
        span {
          color: #379dea;
        }
      }
      .selectmark {
        width: 270px;
        span {
          position: relative;
          float: left;
          padding-left: 5px;
          padding-right: 25px;
          height: 20px;
          line-height: 21px;
          background-color: orangered;
          text-overflow: ellipsis;
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          margin-right: 5px;
          margin-bottom: 5px;
        }
        .closebtn {
          position: absolute;
          right: 5px;
          top: 4px;
          width: 12px;
          height: 12px;
          color: #fff;
          font-size: 12px;
          > i {
            float: left;
          }
        }
      }
    }

    .rightlist {
      > li {
        padding: 10px;
        border: 1px solid #eee;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        color: #999;
      }
      .topcont {
        color: #999;
        .picbox {
          width: 100px;
          height: 100px;
          /* background-color: #ccc; */
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .intr {
          width: 205px;
          h3 {
            color: #333;
            font-weight: bold;
            margin-bottom: 10px;
            line-height: 20px;
          }
          .info {
            > li {
              width: 100%;
              height: 20px;
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
                color: #333;
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
            max-width: 150px;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            line-height: 20px;
            vertical-align: middle;
            font-size: 14px;
          }
          .collect {
            float: right;
            vertical-align: middle;
            font-size: 14px;
            font-weight: normal;
            line-height: 20px;
            .shou {
              color: #379dea;
            }
          }
        }
      }
    }
    .screening {
      display: inline-block;
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #379dea;
      color: #379dea;
      font-size: 14px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .screeningbox {
      height: 30px;
      padding: 5px 15px;
      background-color: #efefef;
      margin-bottom: 15px;
      > span {
        float: left;
        padding: 0 20px 0 10px;
        line-height: 30px;
        height: 30px;
        color: #999;
        font-size: 12px;
        margin-right: 10px;
        cursor: pointer;
        &.active {
          color: #379dea;
        }
      }
      .exportbtn {
        float: right;
        padding: 0;
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
  }
  .found {
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
    padding: 10px 15px;
    span {
      color: #379dea;
    }
  }
}
</style>
