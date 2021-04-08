<template>
  <div class="trademarkdetail">
    <!-- <div class="commonWidth pdb10">
      <div class="combox">
        <div class="xlogobox">
          <div class="logobox">
            <div class="logo">
              <a href="/portal/main" target="_blank"><img src="@assets/img/logoa.png" alt=""/></a>
            </div>
            <div class="textbox">
              <p>厦门知识产权</p>
              <p>运营公共服务平台</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="banner">
      <div class="markcontent clearfix">
        <div class="logoboxs">
          <img :src="detailInfo.logoUrl" alt="logo" />
        </div>
        <div class="mark">
          <h3>{{ detailInfo.name }}</h3>
          <div class="intr">
            当前状态：<span style="color: #F08B2F;">{{ detailInfo.processName }}</span></div>
          <div class="intr">
            商品类别：<span>{{ detailInfo.typeCodeName }}</span>
          </div>
          <div class="intr">
            申请号：<span>{{ detailInfo.dataId }}</span>
          </div>
        </div>
        <!-- <span class="collects" @click="addCollect" v-if="detailInfo.isCollect === 0"
          ><i class="el-icon-star-off"></i>收藏</span
        >
        <span class="collect" @click="cancelCollect" v-if="detailInfo.isCollect === 1"
          ><i class="el-icon-star-on"></i>取消收藏</span
        > -->
      </div>
    </div>
    <div class="commonWidth">
      <ul class="displayflex tradesteps">
        <li :class="{ active: thestep > 0 }">
          <h3>商标申请</h3>
          <h3 class="date">{{ detailInfo.createDate }}</h3>
          <div class="circlebox">
            <span class="circle"></span>
            <div class="line linefirst"></div>
          </div>
        </li>
        <li :class="{ active: thestep > 1 }">
          <h3>初审公告</h3>
          <h3 class="date">{{ detailInfo.noticeDate || '--' }}</h3>
          <div class="circlebox">
            <span class="circle"></span>
            <div class="line linecenter"></div>
          </div>
        </li>
        <li :class="{ active: thestep > 2 }">
          <h3>已注册</h3>
          <h3 class="date">{{ detailInfo.registerDate || '--' }}</h3>
          <div class="circlebox">
            <span class="circle"></span>
            <div class="line linecenter"></div>
          </div>
        </li>
        <li :class="{ active: thestep > 3 }">
          <h3>终止</h3>
          <h3 class="date">{{ detailInfo.trademarkStopDate || '--' }}</h3>
          <div class="circlebox">
            <span class="circle"></span>
            <div class="line linelast"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="commonWidth">
      <div class="tablebox">
        <table>
          <tbody>
            <tr>
              <td class="leftname">商标名称</td>
              <td class="rightcont">{{ detailInfo.name }}</td>
            </tr>
            <tr>
              <td class="leftname">法律状态</td>
              <td class="rightpart" style="color:#379dea;">{{ detailInfo.processName }}</td>
              
            </tr>
            <tr>
              <td class="leftname">申请号</td>
              <td class="rightpart">{{ detailInfo.dataId }}</td>
            </tr>
            <tr>
              <td class="leftname">商品类别</td>
              <td class="rightpart">{{ detailInfo.typeCodeName }}</td>
            </tr>
            <tr>
              <td class="leftname">申请日期</td>
              <td class="rightpart">{{ detailInfo.createDate }}</td>
            </tr>
            <tr>
              <td class="leftname">申请人名称</td>
              <td class="rightcont">{{ detailInfo.applicant }}</td>
            </tr>
            <tr>
              <td class="leftname">申请人地址</td>
              <td class="rightcont">{{ detailInfo.adress }}</td>
            </tr>
            <tr>
              <td class="leftname">申请人名称（英文）</td>
              <td class="rightcont">{{ detailInfo.applicantEn }}</td>
            </tr>
            <tr>
              <td class="leftname">申请人地址（英文）</td>
              <td class="rightcont">{{ detailInfo.enAdress }}</td>
            </tr>
            <tr>
              <td class="leftname">商品图片</td>
              <td class="rightpart">
                <div class="pic"><img :src="detailInfo.logoUrl" alt="" /></div>
              </td>
            </tr>
            <tr>
              <td class="leftname">图片要素</td>
              <td class="rightpart">
                <ul v-if="detailInfo.imageElement">
                  <li v-for="(item, key) in detailInfo.imageElement" :key="key">{{ item }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="leftname">商品/服务项目</td>
              <td class="rightcont" >
                <ul class="product" v-if="detailInfo.productService">
                  <li v-for="(item, key) in detailInfo.productService" :key="key">{{ item }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="leftname">初审公告期号</td>
              <td class="rightpart">{{ detailInfo.noticeIssue }}</td>
            </tr>
            <tr>
              <td class="leftname">初审公告日期</td>
              <td>{{ detailInfo.noticeDate }}</td>
            </tr>
            <tr>
              <td class="leftname">注册公告期号</td>
              <td class="rightpart">{{ detailInfo.registerIssue }}</td>
            </tr>
            <tr>
              <td class="leftname">注册公告日期</td>
              <td>{{ detailInfo.registerDate }}</td>
            </tr>
            <tr>
              <td class="leftname">专用权期限</td>
              <td class="rightpart">{{ detailInfo.privateStartDate }}至{{ detailInfo.privateEndDate }}</td>
            </tr>
            <tr>
              <td class="leftname">是否共有商标</td>
              <td>{{ detailInfo.ifShareTrademark }}</td>
            </tr>
            <tr>
              <td class="leftname">后期制定日期</td>
              <td class="rightpart">{{ detailInfo.hqzdrqDate }}</td>
            </tr>
            <tr>
              <td class="leftname">国际注册日期</td>
              <td>{{ detailInfo.gjzcrqDate }}</td>
            </tr>
            <tr>
              <td class="leftname">优先权日期</td>
              <td class="rightpart">{{ detailInfo.yxqrqDate }}</td>
            </tr>
            <tr>
              <td class="leftname">代理人名称</td>
              <td>{{ detailInfo.agency }}</td>
            </tr>
            <tr>
              <td class="leftname">商标状态</td>
              <td class="rightcont" >
                <ul class="trademarks" v-if="detailInfo.trademarkState">
                  <li v-for="(item, key) in detailInfo.trademarkState" :key="key">{{ item }}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td class="leftname">商标公告</td>
              <td class="rightcont" >
                <ul class="trademarks" v-if="detailInfo.trademarkNotice">
                  <li v-for="(item, key) in detailInfo.trademarkNotice" :key="key">{{ item }}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="tips">
          *商标查询信息仅供参考，实际以国家商标局为准
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { judgeState } from '@/utils/util'
// import filters from '@utils/filters.js'
// import $ from 'jquery'
const detailUrl = '/api/findTrademarkDetail/{dataId}'
const addCollectUrl = '/api/addMyCollect'
const cancelCollectUrl = '/api/cancelMyCollect'

export default {
  // inject: ['loginNotReload'],
  data() {
    return {
      allshow: true,
      thestep: 4,
      time: '2017-08-09',
      label: ['普通搜索', '高级搜索'],
      checkedCities: ['1', '2'],
      checkedTypes: [],
      checkedCountries: [],
      types: [
        { name: '发明专利', id: 11, num: 250 },
        { name: '实用新型', id: 12, num: 256 }
      ],
      conditions: [],
      now: 1,
      patent: '',
      mark: '',
      cont: '',
      selected: '',
      current: 0,
      world: false,
      all: false,
      china: false,
      search: [
        { name: '专利检索', id: 1 },
        { name: '商标检索', id: 2 }
      ],
      detailInfo: {},
      loading: false,
      detailId: ''
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.detailId = this.$route.params.id
    this.getDetail()
  },
  updated() {},
  methods: {
    // ...mapGetters(['userInfo']),
    addCollect() {
      const uid = 0
      if (uid) {
        const data = {
          collectType: 2,
          processName: this.detailInfo.processName,
          logoUrl: this.detailInfo.logoUrl,
          typeCodeName: this.detailInfo.typeCodeName,
          createDate: this.detailInfo.createDate,
          applicant: this.detailInfo.applicant,
          detailId: this.detailId,
          name: this.detailInfo.name
        }
        this.$shttp
          .post(addCollectUrl, data)
          .then(res => {
            this.detailInfo.isCollect = 1
            this.$messagesebe.success('收藏成功')
          })
          .catch(err => {
            this.$messagesebe(err.response.data.msg)
          })
      } else {
        this.loginNotReload()
      }
    },
    cancelCollect() {
      const data = {
        collectType: 2,
        collectItemUuid: this.detailId
      }
      this.$shttp
        .put(cancelCollectUrl, data)
        .then(res => {
          this.detailInfo.isCollect = 0
          this.$messagesebe('取消收藏成功')
        })
        .catch(err => {
          this.$messagesebe(err.response.data.msg)
        })
    },
    onSearch(num) {
      const re = {}
      if (num === 1) {
        if (!this.patent) {
          this.$messagesebe('请输入内容查询')
          return
        }
        re.all = this.patent
        if (this.checkedCities.length === 0 || this.checkedCities.length === 2) {
          re.category = ''
        } else {
          re.category = this.checkedCities[0]
        }
        // re.searchType =1
        // this.$store.dispatch('set_patent',re)
        // this.$nextTick(()=>{
        //     this.$router.push({name:'patentsearch'})
        // })

        this.$router.push({ path: '/search/patentsearch', query: re })
      }
      if (num === 2) {
        if (!this.mark) {
          this.$messagesebe('请输入内容查询')
          return
        }
        re.q = this.mark
        // this.$store.dispatch('set_trademark',re)
        // this.$nextTick(()=>{
        //     this.$router.push({name:'trademarksearch'})
        // })

        this.$router.push({ path: '/search/trademarksearch', query: re })
      }
      if (num === 3) {
        if (!this.cont) {
          this.$messagesebe('请输入内容查询')
          return
        }
        re.searchtype = this.selected
        // this.$store.dispatch('set_trademark',re)
        // this.$nextTick(()=>{
        //     this.$router.push({name:'trademarksearch'})
        // })
        if (this.selected === 1) {
          this.$router.push({ path: 'panli', query: re })
        }
        if (this.selected === 2) {
          this.$router.push({ path: 'fushen', query: re })
        }
      }
    },
    tosenior() {
      this.$router.push({ name: 'seniorsearch' })
    },
    xuanze(it) {
      this.now = it.id
    },
    changeStr(str,index,changeStr) {    
      return str.substr(0,index) + changeStr + str.substr(index + changeStr.length)
    },
    ranNum(n) {
      var t = ''
      for (var i = 0; i < n; i++) {
        t += String(Math.floor(Math.random() * 10))
      }
      return t
    },
    getDetail() {
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
      var paramsData = {}
      paramsData.randomKey = randomKey
      var domNum = this.ranNum(10)
      paramsData.secret2 = domNum
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
      paramsData.secret1 = domNum
      console.log(paramsData)
      this.loading = true
      this.$shttp
        .get(detailUrl.replace('{dataId}', this.detailId),{ params: paramsData })
        .then(resp => {
          this.loading = false
          var data = resp
          this.detailInfo = data
          this.thestep = data.trademarkFlowState
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.trademarkdetail {
  padding-top: 15px;
  .pdb10 {
    padding-bottom: 20px;
  }
  h3 {
    padding: 0;
    margin: 0;
  }
  .clearfix:after {
    display: block;
    content: '';
    clear: both;
  }
  .banner {
    background-color: #000;
    padding: 10px 0;
  }

  .logoboxs {
    float: left;
    width: 75px;
    height: 75px;
    margin-right: 10px;
    border-radius: 4px;
    background-color: #379dea;
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
  .mark {
    float: left;
    color: #fff;
    h3 {
      font-size: 14px;
      margin-bottom: 10px;
      color: #fff;
    }
    span {
      margin-right: 10px;
    }
  }
  .markcontent {
    width: 100%;
    padding: 0 15px;
    font-size: 12px;
  }
  .collects {
    float: right;
    height: 24px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    i {
      width: 16px;
      height: 16px;
    }
  }
  .collect {
    float: right;
    height: 24px;
    color: #379dea;
    cursor: pointer;
    font-size: 14px;
    i {
      width: 16px;
      height: 16px;
    }
  }
  .displayflex {
    display: flex;
  }
  .tradesteps {
    background-color: #fff;
    padding: 15px 15px;
    > li {
      width: 25%;
      text-align: center;
      color: #ccc;
      font-size: 13px;
      .date {
        font-weight: normal;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
      }
      &.active {
        color: #379dea;
      }
    }
    .circlebox {
      position: relative;
      height: 30px;
      overflow: hidden;
      .line {
        position: absolute;
        width: 100%;

        border-bottom: 2px solid #ccc;
      }
      .linefirst {
        top: 14px;
        left: 50%;
      }
      .linelast {
        top: 14px;
        right: 50%;
      }
      .linecenter {
        top: 14px;
        left: 0;
      }
    }
    .circle {
      position: absolute;
      top: 5px;
      left: 50%;
      margin-left: -8px;
      width: 20px;
      border: 2px solid #fff;
      height: 20px;
      border-radius: 50%;
      background-color: #ccc;
      z-index: 2;
    }
    .active .circlebox .line {
      border-bottom: 2px solid #379dea;
    }
    .active .circlebox .circle {
      background-color: #379dea;
    }
  }
  .tablebox {
    padding: 15px;
    background-color: #fff;
    table {
      border: 1px solid #ccc;
      border-collapse: collapse;
      font-weight: normal;
      font-size: 14px;
      td {
        padding: 10px 15px;
        border: 1px solid #ccc;
      }
      .leftname {
        background-color: #eee;
        width: 100px;
        color: #666;
      }
      .rightcont {
        width: 200px;
      }
    }
    .rightpart {
      width: 200px;
    }
    .pic {
      /* width: 100px;
            height: 100px; */
      /* background-color: #eee; */
      img {
        vertical-align: middle;
      }
    }
  }
  .product {
    padding: 0;
    margin: 0;
    overflow: hidden;
    > li {
      font-size: 12px;
      word-break: break-all;
    }
  }
  .trademarks {

    font-size: 12px;
    line-height: 15px;
    > li {
      line-height: 15px;
      margin-bottom: 6px;
    }
  }
  .tips {
    padding: 10px 15px;
    font-size: 14px;
    color: #999;
  }
}
</style>
