<template>
  <div class="statbgbox">
    <div class="topbox">
      <span class="left"></span>
      <span class="center">厦门各区知产统计</span>
      <span class="right"></span>
    </div>
    <div class="statbox clearfix">
      <ul class="left-menu">
        <li
          v-for="(item, key) in lefttabs"
          :key="key"
          @click="changetab(item, key)"
          :class="{ active: tabnum === key }"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="right-statistical">
        <div class="overview clearfix" v-show="tabnum === 0">
          <div class="citychart">
            <div class="nowtime">
              <strong>切换数据类型：</strong>
              <span :class="{ active: dangqian===1 }" @click="changenum(1)">申请量</span>
              <span :class="{ active: dangqian===2 }" @click="changenum(2)">授权量</span>
              <span :class="{ active: dangqian===3 }" @click="changenum(3)">有效量</span>
            </div>

            <div class="mapbox">
              <div class="map">
                <div class="tongan">{{ citydata.tongan }}
                </div>
                <div class="jimei">{{ citydata.jimei }} 
                </div>
                <div class="haicang">{{ citydata.haicang }} 
                </div>
                <div class="xiangan">{{ citydata.xiangan }} 
                </div>
                <div class="huli">{{ citydata.huli }} 
                </div>
                <div class="siming">{{ citydata.siming }} 
                </div>
              </div>
            </div>
            <ul class="elist">
              <li>
                <p>有效专利（件）</p>
                <div>
                  <span class="num">{{ viewdata.validPatentCount }}</span>
                </div>

                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
              <li>
                <p>PCT申请数（件）</p>
                <div>
                  <span class="num">{{ viewdata.pctCount }}</span>
                </div>

                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
              <li>
                <p>专利获奖数（件）</p>
                <div>
                  <span class="num">{{ viewdata.patentPrizeCount }}</span>
                </div>

                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
              <li>
                <p>质押融资金额（万）</p>
                <div>
                  <span class="num">{{ viewdata.pledgeFinanceAmount }}</span>
                </div>

                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
            </ul>
            <ul class="elist">
              <li>
                <p>商标总数（件）</p>
                <div>
                  <span class="num">{{ viewdata.trademarkCount }}</span>
                </div>

                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
              <li>
                <p>马德里总数（件）</p>
                <div>
                  <span class="num">{{ viewdata.madridCount }}</span>
                </div>

                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
              <li>
                <p>服务机构数（家）</p>
                <div>
                  <span class="num">{{ viewdata.organizationCount }}</span>
                </div>

                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
              <li>
                <p>小微企业托管数（家）</p>
                <div>
                  <span class="num">{{ viewdata.microEnterpriseCount }}</span>
                </div>
                <span class="tl"></span>
                <span class="tr"></span>
                <span class="bl"></span>
                <span class="br"></span>
              </li>
            </ul>
            
          </div>
          <div class="statchart clearfix">
            <div class="itembox">
              <div class="chartit">
                <i></i>
                <span>专利基础数据</span>
              </div>
              <div class="basebox">
                <div id="ringChart" class="ringbox"></div>
                <div class="totalnum" v-if="totalCount">
                  <p>专利总量</p>
                  <span>{{ totalCount }}</span>
                </div>
              </div>
              <span class="tl"></span>
              <span class="tr"></span>
              <span class="bl"></span>
              <span class="br"></span>
            </div>

            <div class="itembox">
              <div class="chartit">
                <i></i>
                <span>运营数据概览</span>
              </div>
              <div>
                <div id="sbarChart" class="sbarbox"></div>
              </div>
              <span class="tl"></span>
              <span class="tr"></span>
              <span class="bl"></span>
              <span class="br"></span>
            </div>
            <div class="itembox">
              <div class="chartit">
                <i></i>
                <span>科技大类企业</span>
              </div>
              <div>
                <div id="tbarChart" class="sbarbox"></div>
              </div>
              <span class="tl"></span>
              <span class="tr"></span>
              <span class="bl"></span>
              <span class="br"></span>
            </div>
            <!-- <ul class="company">
                      <li class="displayflex">
                          <p></p>
                          <p>企业数量</p>
                          <p>专利拥有数</p>
                      </li>
                      <li class="displayflex" v-for="(item,key) in companydata" :key='key'>
                          <div>{{item.name}}</div>
                          <div>{{item.cnum}}</div>
                          <div>{{item.pnum}}</div>
                      </li>
                  </ul> -->
          </div>
        </div>
        <div class="topten" v-show="tabnum === 1">
          <div class="tabbtn">
            <span v-show="nowtab === 0" @click="tabcharts(1)">切换为申请量</span><span v-show="nowtab === 1" @click="tabcharts(0)">切换为授权量</span>
          </div>
          <!-- <div class="markbtn">
            <strong>选择标签企业：</strong>
            <span :class="{ active: nowmark===0 }" @click="changemark(0)">全部</span>
            <span :class="{ active: nowmark===1 }" @click="changemark(1)">三高企业</span>
            <span :class="{ active: nowmark===2 }" @click="changemark(2)">高新企业</span>
            <span :class="{ active: nowmark===3 }" @click="changemark(3)">科技小巨人</span>
            <span :class="{ active: nowmark===4 }" @click="changemark(4)">知识产权优势示范企业</span>
          </div> -->
          <div id="barChart" class="chartbar"></div>
        </div>
        <div class="topten" v-show="tabnum === 2">
          <div id="stackChart" class="chartbar"></div>
        </div>
        <div class="topten" v-show="tabnum === 5">
          <div class="markbtn">
            <strong>切换数据类型：</strong>
            <span :class="{ active: nowtype===1 }" @click="changetype(1)">申请量</span>
            <span :class="{ active: nowtype===2 }" @click="changetype(2)">公开量</span>
          </div>
          <div id="stackChartqs" class="chartbar"></div>
        </div>
        <div class="topten" v-show="tabnum === 6">
          <div>
          <!-- <div class="typeselectbox">
            <div class="selectitembox">
              <div class="selectlabel">选择行业大类</div>
              <div class="selectbox">
                <el-select v-model="bigtype" clearable @change="changedldata">
                  <el-option :labe="item.name" :value="item.name" v-for="item in hydlarr" :key="item.id">{{item.name}}</el-option>
                </el-select>
              </div>
            </div>
            <div class="selectitembox">
              <div class="selectlabel">选择二级分类</div>
              <div class="selectbox">
                <el-select v-model="smtype" clearable @change="changexldata">
                  <el-option :labe="item.name" :value="item.name" v-for="item in hyxlarr" :key="item.id">{{item.name}}</el-option>
                </el-select>
              </div>
            </div>
          </div> -->
          <div id="stackChartcy" class="chartbarcy"></div>
          <div class="clearfix">
            <div id="barChartxm" class="chartbarsm"></div>
            <div id="barChartfj" class="chartbarsm"></div>
            <div id="barChartqg" class="chartbarsm"></div>
          </div>
          </div>
        </div>
        <div class="topten" v-show="tabnum === 3">
          <div class="markbtn">
            <strong>选择对比数据：</strong>
            <span :class="{ activetp: nowdatatp===1 }" @click="changedatatp(1)">申请量</span>
            <span :class="{ activetp: nowdatatp===2 }" @click="changedatatp(2)">运营情况</span>
          </div>
          <!-- <div class="tabbtns"><span v-show="isdetail" @click="toall">返回全部数据</span></div> -->
          <div id="barCharts" class="chartbar"></div>
        </div>
        <div class="xianglan clearfix" v-show="tabnum === 4">
          <div class="leftsearch">
            <h3>企业搜索</h3>
            <div class="searchbox">
              <input type="text" v-model="searchcompany" placeholder="企业名称" @input="inputchange" />
              <span @click="searchcompanys">搜索</span>
            </div>
            <div>
              <div v-if="!searchcompany && searchedcompany.length === 0">
                请输入企业名称进行搜索
              </div>
              <div v-if="issearched && searchedcompany.length === 0 && !loading">
                搜索无结果
              </div>
              <ul class="companylist" v-if="searchedcompany.length && !loading">
                <li v-for="(item, key) in searchedcompany" :key="key" @click="searchitem(item)">
                  {{ item.enterprice }}
                </li>
              </ul>
            </div>
          </div>
          <div class="rightcont" v-if="!issearch">
            <div class="nodatapic">
              <img src="../../../assets/img/nodata.png" alt="" />
              请点击公司名查看
            </div>
          </div>
          <div
            class="rightcont"
            v-show="issearch"
          >
            <h3>
              {{ infodata.company }}<span class="companymarks" v-for="(it, k) in companyMark" :key="k">{{ it }}</span>
            </h3>
            <div class="clearfix">
              <div class="companychart fl">
                <div id="eachRing" class="onering"></div>
                <div class="totalnum" v-if="infodata.totalCount">
                  <p>专利总量</p>
                  <span>{{ infodata.totalCount }}</span>
                </div>
              </div>
              <ul class="itemcomt fr">
                <li><span>专利类型</span><span>数量</span><span>百分比</span></li>
                <li v-if="patent.fm">
                  <span class="faming">发明专利</span><span class="faming">{{ patent.fm }}</span
                  ><span class="faming">{{ patent.fmper | priceFormat }}%</span>
                </li>
                <li v-if="patent.sy">
                  <span class="shiyong">实用新型</span><span class="shiyong">{{ patent.sy }}</span
                  ><span class="shiyong">{{ patent.syper | priceFormat }}%</span>
                </li>
                <li v-if="patent.wg">
                  <span class="waiguan">外观设计</span><span class="waiguan">{{ patent.wg }}</span
                  ><span class="waiguan">{{ patent.wgper | priceFormat }}%</span>
                </li>
              </ul>
            </div>
            <h3 class="itemtit">有效情况</h3>
            <ul class="tongji clearfix">
              <li v-if="infodata.trialCount">
                <span class="num">{{ infodata.trialCount }}</span>
                <p>
                  <span class="per">{{ infodata.trialPercentage }}%</span><span class="stat">在审</span>
                </p>
              </li>
              <li v-if="infodata.validCount">
                <span class="num">{{ infodata.validCount }}</span>
                <p>
                  <span class="per">{{ infodata.validPercentage }}%</span><span class="stat">有效</span>
                </p>
              </li>
              <li v-if="infodata.invalidCount">
                <span class="num">{{ infodata.invalidCount }}</span>
                <p>
                  <span class="per">{{ infodata.invalidPercentage }}%</span><span class="stat">无效</span>
                </p>
              </li>
            </ul>
            <h3 class="itemtit">申请</h3>
            <ul class="listitem clearfix">
              <li v-if="infodata.totalCount">
                <span>{{ infodata.totalCount }}</span>
                <p>申请数</p>
              </li>
              <li v-if="infodata.invalidCount">
                <span class="shixiao">{{ infodata.invalidCount }}</span>
                <p>失效数</p>
              </li>
            </ul>
            <h3 class="itemtit">授权指标</h3>
            <ul class="listitem clearfix">
              <li v-if="infodata.validCount">
                <span>{{ infodata.validCount }}</span>
                <p>有效专利数</p>
              </li>
              <li v-if="infodata.validInventCount">
                <span>{{ infodata.validInventCount }}</span>
                <p>有效发明专利数</p>
              </li>
              <li v-if="infodata.validUtilityCount">
                <span>{{ infodata.validUtilityCount }}</span>
                <p>有效实用新型数</p>
              </li>
              <li v-if="infodata.validAppearCount">
                <span>{{ infodata.validAppearCount }}</span>
                <p>有效外观专利</p>
              </li>
            </ul>
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
import echarts from 'echarts'
import filters from '@utils/filters.js'

const xiaUrl = '/api/findOverviewOfXiamen'
const topUrl = '/api/findPatentTopTenOfXiamen'
const patUrl = '/api/findTenThousandEffectInvent'
const cityUrl = '/api/findContrastOfOperateCity'
const comUrl = '/api/findPatentTopTenOfEnterprice'
const infoUrl = '/api/findPatentStatisticOfEnterprice'

const yyUrl = '/api/findOperateData'
const sswUrl = '/api/findThirteenFiveTrend'

const hyUrl = '/api/findIndustryClass'
const hydataUrl = '/api/findIndustryData'
// const itemdataUrl = '/api/findOperateDataOfCity'
const tokenUrl = 'http://112.48.134.160:8081/jeecg-boot/sb/getAccessToken'
const markUrl = 'http://112.48.134.160:8081/jeecg-boot/sb/getEnLabel'
export default {
  data() {
    return {
      companyMark: [],
      markcompany: '',
      nowtab: 0,
      issearch: false,
      issearched: false,
      province: '',
      city: '',
      selected: '1',
      ischina: true,
      isprovince: false,
      totalCount: '',
      searchcompany: '',
      searchedcompany: [],
      patent: {
        fm: '',
        fmper: '',
        wg: '',
        wgper: '',
        sy: '',
        syper: ''
      },
      viewdata: {
        regionPatentCount: [],
        operateDataOverview: {},
        techEnterprice: [],
        patentBaseData: {}
      },

      citydata: {
        siming: '',
        huli: '',
        jimei: '',
        tongan: '',
        haicang: '',
        xiangan: ''
      },
      citydatasq: {
        siming: '',
        huli: '',
        jimei: '',
        tongan: '',
        haicang: '',
        xiangan: ''
      },
      citydatashq: {
        siming: '',
        huli: '',
        jimei: '',
        tongan: '',
        haicang: '',
        xiangan: ''
      },
      citydatayx: {
        siming: '',
        huli: '',
        jimei: '',
        tongan: '',
        haicang: '',
        xiangan: ''
      },
      qushidata: {
        xm: [],
        sm: [],
        hc: [],
        jm: [],
        ta: [],
        hl: [],
        xa: []
      },
      yeararrs: [],
      zyarr: [],
      xkarr: [],
      zlarr: [],
      typearr: [],
      qyarr: [],
      qyarrs: [],
      qtarr: [],
      topxdata: [],
      topydata: [],
      patdata: {},
      comdata: {},
      infodata: {
        company: ''
      },
      ringdata: [],
      tabnum: 0,
      lefttabs: [
        { title: '厦门概览', id: 1 },
        { title: '专利申请TOP10', id: 2 },
        { title: '万人有效发明', id: 3 },
        { title: '重点运营城市', id: 4 },
        { title: '企业详览', id: 5 },
        { title: '十三五趋势', id: 6 },
        { title: '产业数据', id: 7 }
      ],
      xyeardata: [],
      seriesdata: [],
      fmdata: [],
      sydata: [],
      wgdata: [],
      zdcity: [],
      zdfm: [],
      zdwg: [],
      zdsy: [],
      companyring: [],
      cloading: false,
      loading: false,
      rloading: false,
      dangqian: 1,
      nowmark: 0,
      nowdatatp: 1,
      nowtype: 1,
      toptenshow: false,
      chartready: false,
      bigtype: '',
      smtype: '',
      allcont: [],
      sqarrdatas: {
        ta: [],
        jm: [],
        hc: [],
        xa: [],
        hl: [],
        sm: []
      },
      shqarrdatas: {
        ta: [],
        jm: [],
        hc: [],
        xa: [],
        hl: [],
        sm: []
      },
      yxarrdatas: {
        ta: [],
        jm: [],
        hc: [],
        xa: [],
        hl: [],
        sm: []
      },
      hydlarr: [],
      hyxlarr: [],
      chanyeyeardata: [],
      chanyedata: {
        xm: [],
        fj: [],
        qg: []
      },
      topxdataxm: [],
      topydataxm: [],
      topxdatafj: [],
      topydatafj: [],
      topxdataqg: [],
      topydataqg: [],
      chanyeloading: false
    }
  },
  filters: {
    dateFormat: filters.formatDate.dateFormat,
    priceFormat: filters.priceformat
  },
  methods: {
    findfirst() {
      this.$shttp.get(hyUrl + "?parentId=0").then(res => {
        if (res) {
          this.hydlarr = res
          this.bigtype = res[0]['name']
          this.changedldata()
        }
      })
    },
    findsecond(id) {
      this.$shttp.get(hyUrl + "?parentId=" + id).then(res => {
        this.hyxlarr = res
      })
    },
    // 产业数据
    getalldata(id) {
      this.loading = true
      this.$shttp.get(hydataUrl + "?id=" + id).then(res => {
        this.loading = false
        const xmtop = res.xmTopCounts
        const fjtop = res.fjTopCounts
        const qgtop = res.qgTopCounts
         const darr = res.yearCounts
          const xdata = []
          darr.sort((a, b) => {
            return a['year'] - b['year']
          })
          const xmarr = []
          const fjarr = []
          const qgarr = []
          darr.forEach(item => {
            xdata.push(item['year'])
            xmarr.push(item['areaCounts']['厦门'])
            fjarr.push(item['areaCounts']['福建'])
            qgarr.push(item['areaCounts']['中国'])
          })
          this.chanyeyeardata = xdata
          this.chanyedata = {
            xm: xmarr,
            fj: fjarr,
            qg: qgarr
          }
          const xarrxm = []
          const yarrxm = []
          const xarrfj = []
          const yarrfj = []
          const xarrqg = []
          const yarrqg = []
          xmtop.forEach(item => {
            xarrxm.push(item['applicant'])
            yarrxm.push(item['count'])
          })
          this.topxdataxm = xarrxm.reverse()
          this.topydataxm = yarrxm.reverse()
          fjtop.forEach(item => {
            xarrfj.push(item['applicant'])
            yarrfj.push(item['count'])
          })
          this.topxdatafj = xarrfj.reverse()
          this.topydatafj = yarrfj.reverse()
          qgtop.forEach(item => {
            xarrqg.push(item['applicant'])
            yarrqg.push(item['count'])
          })
          this.topxdataqg = xarrqg.reverse()
          this.topydataqg = yarrqg.reverse()
          this.createStackcy()
          this.createBarxm()
          this.createBarfj()
          this.createBarqg()
          
      }).catch(() => {
        this.loading = false
      })
    },
    gethyid(arr, str) {
      if (arr) {
        if (arr.length) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i]['name'] === str) {
              return arr[i]['id']
            }
          }
        }
      }
    },
    changedldata() {
      if (this.bigtype) {
        const id = this.gethyid(this.hydlarr, this.bigtype)
        this.smtype = ''
        this.findsecond(id)
        this.getalldata(id)
      }
    },
    changexldata() {
      if (this.smtype) {
        const id = this.gethyid(this.hyxlarr, this.smtype)
        this.getalldata(id)
      }
    },
    createsmallchart(data) {
      this.createsBarta(data['ta'])
      this.createsBarjm(data['jm'])
      this.createsBarhc(data['hc'])
      this.createsBarxa(data['xa'])
      this.createsBarhl(data['hl'])
      this.createsBarsm(data['sm'])
    },
    changenum(n) {
      this.dangqian = n
      if (n === 1) {
        this.citydata = this.citydatasq
      }
      if (n === 2) {
        this.citydata = this.citydatashq
      }
      if (n === 3) {
        this.citydata = this.citydatayx
      }
    },
    changemark(n) {
      this.nowmark = n
      this.gettop()
    },
    changedatatp(n) {
      this.nowdatatp = n
      if (n === 1) {
        this.getcity()
      }
      if (n === 2) {
        this.getcityyy()
      }
    },
    changetype(n) {
      this.nowtype = n
      this.getqushi()
    },
    toall() {
      this.getcity()
    },
    inputchange() {
      this.issearched = false
      console.log(this.issearched)
    },
    // 专利申请top10 申请量和授权量切换
    tabcharts(num) {
      this.nowtab = num
      // this.nowmark = 0
      this.gettop()
    },
    changetab(it, k) {
      this.tabnum = k
      this.$nextTick(() => {
        if (k === 0) {
          this.dangqian = 1
          this.getoverview()
        }
        if (k === 1) {
          this.nowtab = 0
          this.gettop()
        }
        if (k === 2) {
          this.getpat()
        }
        if (k === 5) {
          this.nowtype = 1
          this.getqushi()
        }
        if (k === 6) {
          this.findfirst()
        }
        if (k === 3) {
          this.nowdatatp = 1
          this.getcity()
        }
        if (k === 4) {
          this.searchcompany = ''
          this.issearch = false
          this.issearched = false
          this.searchedcompany = []
        }
      })
    },
    // 厦门专利TOP10(授权量)
    createBar() {
      var barChartOption = {
        title: {
          text: '厦门专利TOP10(授权量)',
          left: 20,
          top: 20,
          textStyle: {
            align: 'center',
            fontSize: 14,
            color: '#fff'
          }
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          // boundaryGap: false,
          axisTick: {
            show: false // 取消刻度
          },
          splitLine: {
            show: false
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width:'2'
            }
          }
        },
        yAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.topxdata,
          // data:[500, 300, 400,300,200,100,200,350,260,160],
          // show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width: '2'
            }
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '订单数',
            type: 'bar',
            barWidth: '20',
            barGap: '20',
            barCategoryGap: '20',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                    { offset: 1, color: 'rgb(51,36,169)' } // 柱图渐变色
                  ])
                }
              }
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                { offset: 1, color: '#008DDA' } // 柱图渐变色
              ])
            },
            data: this.topydata
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barChart'), 'shine')
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    // 厦门专利TOP10
    createBarsq() {
      var barChartOption = {
        title: {
          text: '厦门专利TOP10(申请量)',
          left: 20,
          top: 20,
          textStyle: {
            align: 'center',
            fontSize: 14,
            color: '#fff'
          }
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          // boundaryGap: false,
          axisTick: {
            show: false // 取消刻度
          },
          splitLine: {
            show: false
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width:'2'
            }
          }
        },
        yAxis: {
          type: 'category',
          value: '有效专利申请量',
          // boundaryGap: false,
          data: this.topxdata,
          // data:[500, 300, 400,300,200,100,200,350,260,160],
          // show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width: '2'
            }
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '订单数',
            type: 'bar',
            barWidth: '20',
            barGap: '20',
            barCategoryGap: '20',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                    { offset: 1, color: 'rgb(51,36,169)' } // 柱图渐变色
                  ])
                }
              }
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                { offset: 1, color: '#008DDA' } // 柱图渐变色
              ])
            },
            data: this.topydata
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barChart'), 'shine')
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    // 重点运营城市
    createBars(arrs) {
      var barChartOption = {
        title: {
          text: '重点运营城市',
          left: 20,
          top: 20,
          textStyle: {
            align: 'center',
            fontSize: 12,
            color: '#fff'
          }
        },
        legend: {
          orient: 'horizontal',
          left: '100',
          top: '50',
          itemWidth: 10,
          itemHeight: 5,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          data: ['发明专利', '实用新型', '外观专利']
        },
        tooltip: {
          // triggerOn: 'click',
          // enterable: true,
          trigger: 'axis',
          // formatter:'{b}<br/>{a}:{c}<br/>{a1}:{c1}<br/>{a2}:{c2}<br/>',
          formatter: function(params) {
            // return self.getitemdata(params,arrs)
            return (
              params[0].name +
              '<br/>专利总数:' +
              arrs[params[0].dataIndex] +
              '<br/>' +
              params[0].seriesName +
              ':' +
              params[0].value +
              '<br/>' +
              params[1].seriesName +
              ':' +
              params[1].value +
              '<br/>' +
              params[2].seriesName +
              ':' +
              params[2].value
            )
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: this.zdcity,
          type: 'category',
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          // data:[500, 300, 400,300,200,100,200,350,260,160],
          // show: false,
          axisLabel: {
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '发明专利',
            type: 'bar',
            barWidth: '5',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#FFC861'
              }
            },

            data: this.zdfm
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          },
          {
            name: '实用新型',
            type: 'bar',
            barWidth: '5',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#00DACC'
              }
            },

            data: this.zdsy
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          },
          {
            name: '外观专利',
            type: 'bar',
            barWidth: '5',
            // barGap:'2',
            barCategoryGap: '5',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#254EC9'
              }
            },

            data: this.zdwg
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barCharts'), 'shine')
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    // 重点运营城市 运营情况
    createBaryy() {
      var barChartOption = {
        title: {
          text: '重点运营城市',
          left: 20,
          top: 20,
          textStyle: {
            align: 'center',
            fontSize: 12,
            color: '#fff'
          }
        },
        legend: {
          orient: 'horizontal',
          left: '100',
          top: '50',
          itemWidth: 10,
          itemHeight: 5,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          data: ['质押融资', '专利转让', '许可登记']
        },
        tooltip: {
          // triggerOn: 'click',
          // enterable: true,
          trigger: 'axis',
          // formatter:'{b}<br/>{a}:{c}<br/>{a1}:{c1}<br/>{a2}:{c2}<br/>',
          formatter: function(params) {
            // return self.getitemdata(params,arrs)
            return (
              params[0].name + '<br/>' +
              params[0].seriesName +
              ':' +
              params[0].value +
              '<br/>' +
              params[1].seriesName +
              ':' +
              params[1].value +
              '<br/>' +
              params[2].seriesName +
              ':' +
              params[2].value
            )
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          data: this.zdcity,
          type: 'category',
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          // data:[500, 300, 400,300,200,100,200,350,260,160],
          // show: false,
          axisLabel: {
            textStyle: {
              fontSize: 10
            }
          },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '质押融资',
            type: 'bar',
            barWidth: '5',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#FFC861'
              }
            },

            data: this.zdfm
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          },
          {
            name: '许可登记',
            type: 'bar',
            barWidth: '5',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#00DACC'
              }
            },

            data: this.zdsy
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          },
          {
            name: '专利转让',
            type: 'bar',
            barWidth: '5',
            // barGap:'2',
            barCategoryGap: '5',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#254EC9'
              }
            },

            data: this.zdwg
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barCharts'), 'shine')
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    // 运营数据概览
    createsBar() {
      var barChartOption = {
        // title: {
        //         text: '重点运营城市',
        //         left:20,
        //         top: 20,
        //         textStyle: {
        //             align: 'center',
        //             fontSize: 14,
        //             color:"#fff"
        //         }
        // },
        // color:['#ccc','#6fd5de','#379dea'],
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 'bottom',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          data: ['质押融资', '许可登记', '专利转让']
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}<br/>{a}:{c}<br/>{a1}:{c1}<br/>{a2}:{c2}<br/>',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          top: '4%',
          containLabel: true
        },
        xAxis: {
          data: this.yeararrs,
          type: 'category',
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          nameLocation: 'middle',
          axisLabel: {
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',

          // data:[500, 300, 400,300,200,100,200,350,260,160],
          // show: false,
          // axisLabel:{
          //     show: false
          // },
          axisLine: {
            // show: false,//取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '质押融资',
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#00DABE'
              }
            },

            data: this.zyarr
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          },
          {
            name: '许可登记',
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'1',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#254EC9'
              }
            },

            data: this.xkarr
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          },
          {
            name: '专利转让',
            type: 'bar',
            barWidth: '10',
            // barGap:'2',
            // barCategoryGap:'10',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#008DDA'
              }
            },

            data: this.zlarr
            // data : ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('sbarChart'), 'shine')
      barChart.setOption(barChartOption)
    },
    // 科技大类企业
    createtBar(arr) {
      var barChartOption = {
        // title: {
        //         text: '厦门专利TOP10',
        //         left:20,
        //         top: 20,
        //         textStyle: {
        //             align: 'center',
        //             fontSize: 14,
        //             color:"#fff"
        //         }
        // },
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          // formatter:'{b}<br/>{a}:{c}<br/>企业数量：',
          formatter: function(params) {
            return (
              params[0].name +
              '<br/>' +
              params[0].seriesName +
              '：' +
              params[0].value +
              '<br/>企业数量：' +
              arr[params[0].dataIndex]
            )
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.qtarr,
          // position: 'top',
          axisTick: {
            show: false // 取消刻度
          },
          splitLine: {
            show: false
          },

          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 4 // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            },
            interval: 0
          }
        },
        yAxis: {
          type: 'value',

          // data:[500, 300, 400,300,200,100,200,350,260,160],
          // show: false,
          splitLine: {
            show: false
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '专利数量',
            type: 'bar',
            barWidth: '10',
            // barGap:'20',
            // barCategoryGap:'20',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: '#254ec9'
              }
            },

            data: this.qyarr
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('tbarChart'), 'shine')
      barChart.setOption(barChartOption)
    },
    // 专利订单分布饼状图
    createBread() {
      var breadChartOption = {
        color: ['#5B95FF', '#7AD6AF', '#FFC86C'],
        title: {
          text: '专利订单分布饼状图',
          x: 'center',
          textStyle: {
            align: 'center',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item'
          // formatter:'{a}<br/>{b}:{c}'
        },
        legend: {
          orient: 'vertical',
          left: '30',
          top: '30',
          show: false,
          data: ['发明', '实用新型', '外观']
        },
        series: [
          {
            name: '订单数',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: [
              {
                value: 70,
                name: '发明',
                label: {
                  normal: {
                    show: true,
                    position: 'outside',
                    formatter: '{b} : {c}件\n国内30件，国外40件'
                  }
                },
                tooltip: {
                  formatter: '{a}<br />{b}:{c},国内30，国外40件'
                }
              },
              {
                value: 90,
                name: '实用新型',
                label: {
                  normal: {
                    show: true,
                    position: 'outside',
                    formatter: '{b} : {c}件\n国内10件，国外80件'
                  }
                },
                tooltip: {
                  formatter: '{a}<br />{b}:{c},国内10件，国外80件'
                }
              },
              {
                value: 60,
                name: '外观',
                label: {
                  normal: {
                    show: true,
                    position: 'outside',
                    formatter: '{b} : {c}件\n国内40件，国外20件'
                  }
                },
                tooltip: {
                  formatter: '{a}<br />{b}:{c},国内40，国外20件'
                }
              }
            ]
          }
        ]
      }
      var breadChart = echarts.init(document.getElementById('breadChart'), 'shine')
      breadChart.setOption(breadChartOption)
    },
    // 专利基础数据
    createRing() {
      var ringOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 'bottom',
          itemWidth: 10,
          itemHeight: 4,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          data: ['发明专利', '实用新型', '外观设计']
        },
        color: ['#00DABE', '#254EC9', '#008DDA'],
        series: [
          {
            name: '申请量',
            center: ['50%', '44%'],
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outside',
                formatter: '{c}件',
                textStyle: {
                  color: '#fff'
                }
              }
            },
            labelLine: {
              normal: {
                length: 5,
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            data: this.ringdata
          }
        ]
      }

      var ringCharts = echarts.init(document.getElementById('ringChart'), 'shine')
      ringCharts.setOption(ringOption)
    },
    // 企业详情 环状图
    createRings() {
      var ringOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} ({d}%)'
        },
        color: ['#00DABE', '#008DDA', '#254EC9'],
        series: [
          {
            name: '申请量',
            center: ['50%', '50%'],
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'inside',
                formatter: '{c}件',
                textStyle: {
                  color: '#fff'
                }
              }
            },
            labelLine: {
              normal: {
                show: false,
                length: 5,
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            data: this.companyring
          }
        ]
      }

      var ringCharts = echarts.init(document.getElementById('eachRing'), 'shine')
      ringCharts.setOption(ringOption)
    },
    // 万人有效发明
    createStack() {
      var stackOption = {
        title: {
          text: '万人有效发明',
          left: '20',
          top: '20',
          textStyle: {
            fontSize: '12',
            fontWeight: 'normal',
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        color: ['#008DDA', '#0038DA', '#6D00DA', '#DA00B6', '#DA3200', '#DAA000', '#00DAB5'], // 折线颜色
        legend: {
          top: '20',
          left: '100',
          textStyle: {
            fontSize: '12',
            color: '#fff'
          },
          itemWidth: 6,
          itemHeight: 15, // 图例标记的图形高度
          // show: false,
          data: [
            { name: '厦门市', icon: 'line' },
            { name: '思明区', icon: 'line' },
            { name: '海沧区', icon: 'line' },
            { name: '集美区', icon: 'line' },
            { name: '同安区', icon: 'line' },
            { name: '湖里区', icon: 'line' },
            { name: '翔安区', icon: 'line' }
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
          // show: true,
          // backgroundColor:'red'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              // show: false
              lineStyle: {
                color: '#666'
              }
            },
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            data: this.xyeardata
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              // show: false
              lineStyle: {
                color: '#666'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: this.patdata
        
      }
      var stackCharts = echarts.init(document.getElementById('stackChart'), 'shine')
      stackCharts.setOption(stackOption)
      window.onresize = function() {
        stackCharts.resize()
      }
    },
    // 十三五趋势
    createStackqs() {
      var stackOption = {
        title: {
          text: '十三五趋势',
          left: '20',
          top: '22',
          textStyle: {
            fontSize: '12',
            fontWeight: 'normal',
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        color: ['#008DDA', '#0038DA', '#6D00DA', '#DA00B6', '#DA3200', '#DAA000', '#00DAB5'], // 折线颜色
        legend: {
          bottom: '10',
          left: '20',
          textStyle: {
            fontSize: '12',
            color: '#fff'
          },
          itemWidth: 15,
          itemHeight: 15, // 图例标记的图形高度
          // show: false,
          data: [
            { name: '厦门市', icon: 'line' },
            { name: '思明区', icon: 'line' },
            { name: '海沧区', icon: 'line' },
            { name: '集美区', icon: 'line' },
            { name: '同安区', icon: 'line' },
            { name: '湖里区', icon: 'line' },
            { name: '翔安区', icon: 'line' }
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '12%',
          containLabel: true
          // show: true,
          // backgroundColor:'red'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              // show: false
              lineStyle: {
                color: '#666'
              }
            },
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            data: this.xyeardata
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              // show: false
              lineStyle: {
                color: '#666'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '厦门市',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.qushidata['xm']
          },
          {
            name: '思明区',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.qushidata['sm']
          },
          {
            name: '海沧区',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.qushidata['hc']
          },
          {
            name: '集美区',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.qushidata['jm']
          },
          {
            name: '同安区',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.qushidata['ta']
          },
          {
            name: '湖里区',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.qushidata['hl']
          },
          {
            name: '翔安区',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.qushidata['xa']
          }
        ]
        
      }
      var stackCharts = echarts.init(document.getElementById('stackChartqs'), 'shine')
      stackCharts.setOption(stackOption)
      window.onresize = function() {
        stackCharts.resize()
      }
    },
    // 产业数据
    createStackcy() {
      var stackOption = {
        title: {
          text: '产业数据',
          left: '20',
          top: '20',
          textStyle: {
            fontSize: '14',
            fontWeight: 'normal',
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        color: ['#008DDA', '#0038DA', '#6D00DA'], // 折线颜色
        legend: {
          top: '20',
          textStyle: {
            fontSize: '12',
            color: '#fff'
          },
          itemWidth: 15,
          itemHeight: 15, // 图例标记的图形高度
          // show: false,
          data: [
            { name: '中国', icon: 'line' },
            { name: '福建', icon: 'line' },
            { name: '厦门', icon: 'line' }
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '2%',
          containLabel: true
          // show: true,
          // backgroundColor:'red'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              // show: false
              lineStyle: {
                color: '#666'
              }
            },
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            data: this.chanyeyeardata
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              // show: false
              lineStyle: {
                color: '#666'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '中国',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.chanyedata['qg']
          },
          {
            name: '福建',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.chanyedata['fj']
          },
          {
            name: '厦门',
            type: 'line',
            // stack: '总量',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.chanyedata['xm']
          }
        ]
        
      }
      var stackCharts = echarts.init(document.getElementById('stackChartcy'), 'shine')
      stackCharts.setOption(stackOption)
      window.onresize = function() {
        stackCharts.resize()
      }
    },
    // 厦门市top
    createBarxm() {
      var barChartOption = {
        title: {
          text: '厦门市top',
          left: 20,
          top: 20,
          textStyle: {
            align: 'center',
            fontSize: 14,
            color: '#fff'
          }
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          // boundaryGap: false,
          axisTick: {
            show: false // 取消刻度
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            rotate: 90
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width:'2'
            }
          }
        },
        yAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.topxdataxm,
          
          // show: false,
          axisLabel: {
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 10 // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            },
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width: '2'
            }
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '订单数',
            type: 'bar',
            barWidth: '15',
            barGap: '10',
            barCategoryGap: '10',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                    { offset: 1, color: 'rgb(51,36,169)' } // 柱图渐变色
                  ])
                }
              }
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                { offset: 1, color: '#008DDA' } // 柱图渐变色
              ])
            },
            data: this.topydataxm
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barChartxm'), 'shine')
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    // 福建省top
    createBarfj() {
      var barChartOption = {
        title: {
          text: '福建top',
          left: 20,
          top: 20,
          textStyle: {
            align: 'center',
            fontSize: 14,
            color: '#fff'
          }
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          // boundaryGap: false,
          axisTick: {
            show: false // 取消刻度
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            rotate: 90
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width:'2'
            }
          }
        },
        yAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.topxdatafj,
          
          // show: false,
          axisLabel: {
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 10 // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            },
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width: '2'
            }
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '订单数',
            type: 'bar',
            barWidth: '15',
            barGap: '10',
            barCategoryGap: '10',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                    { offset: 1, color: 'rgb(51,36,169)' } // 柱图渐变色
                  ])
                }
              }
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                { offset: 1, color: '#008DDA' } // 柱图渐变色
              ])
            },
            data: this.topydatafj
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barChartfj'), 'shine')
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    // 全国top
    createBarqg() {
      var barChartOption = {
        title: {
          text: '全国top',
          left: 20,
          top: 20,
          textStyle: {
            align: 'center',
            fontSize: 14,
            color: '#fff'
          }
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          // boundaryGap: false,
          axisTick: {
            show: false // 取消刻度
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            rotate: 90
          },
          axisLine: {
            // show: false,// 取消坐标轴
            
            lineStyle: {
              color: '#fff'
              // width:'2'
            }
          }
        },
        yAxis: {
          type: 'category',
          // boundaryGap: false,
          data: this.topxdataqg,
          
          axisLabel: {
            formatter: function(params) {
              var newParamsName = ''
              var paramsNameNumber = params.length
              var provideNumber = 10 // 一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''
                  var start = p * provideNumber
                  var end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            },
            interval: 0
          },
          axisLine: {
            // show: false,// 取消坐标轴
            lineStyle: {
              color: '#fff'
              // width: '2'
            }
          },
          axisTick: {
            show: false // 取消刻度
          }
        },
        series: [
          {
            name: '订单数',
            type: 'bar',
            barWidth: '15',
            barGap: '10',
            barCategoryGap: '10',
            label: {
              show: false
              // position: 'top',
              // formatter: '{@订单数}件',
            },

            itemStyle: {
              normal: {
                color: function(params) {
                  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                    { offset: 1, color: 'rgb(51,36,169)' } // 柱图渐变色
                  ])
                }
              }
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#00C1EF' }, // 柱图渐变色
                { offset: 1, color: '#008DDA' } // 柱图渐变色
              ])
            },
            data: this.topydataqg
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barChartqg'), 'shine')
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    getoverview() {
      this.$shttp
        .get(xiaUrl)
        .then(res => {
          this.viewdata = res
          const odata = res.operateDataOverview
          const tdata = res.techEnterprice
          let edata
          if (res.patentBaseData) {
            edata = res.patentBaseData['list']
            const count = res.patentBaseData['totalCount']
            this.totalCount = count
          }
          const shenqing = res.applyRegionPatentCount
          const shouquan = res.authorizeRegionPatentCount
          const youxiao = res.validRegionPatentCount
          if (shenqing) {
            shenqing.forEach(item => {
              switch (item['countyName']) {
                case '思明区':
                  this.citydatasq.siming = item['count']
                  this.sqarrdatas['sm'].push(item['fKindMap']['01'])
                  this.sqarrdatas['sm'].push(item['fKindMap']['02'])
                  this.sqarrdatas['sm'].push(item['fKindMap']['03'])
                  break
                case '湖里区':
                  this.citydatasq.huli = item['count']
                  this.sqarrdatas['hl'].push(item['fKindMap']['01'])
                  this.sqarrdatas['hl'].push(item['fKindMap']['02'])
                  this.sqarrdatas['hl'].push(item['fKindMap']['03'])
                  break
                case '集美区':
                  this.citydatasq.jimei = item['count']
                  this.sqarrdatas['jm'].push(item['fKindMap']['01'])
                  this.sqarrdatas['jm'].push(item['fKindMap']['02'])
                  this.sqarrdatas['jm'].push(item['fKindMap']['03'])
                  break
                case '同安区':
                  this.citydatasq.tongan = item['count']
                  this.sqarrdatas['ta'].push(item['fKindMap']['01'])
                  this.sqarrdatas['ta'].push(item['fKindMap']['02'])
                  this.sqarrdatas['ta'].push(item['fKindMap']['03'])
                  break
                case '海沧区':
                  this.citydatasq.haicang = item['count']
                  this.sqarrdatas['hc'].push(item['fKindMap']['01'])
                  this.sqarrdatas['hc'].push(item['fKindMap']['02'])
                  this.sqarrdatas['hc'].push(item['fKindMap']['03'])
                  break
                case '翔安区':
                  this.citydatasq.xiangan = item['count']
                  this.sqarrdatas['xa'].push(item['fKindMap']['01'])
                  this.sqarrdatas['xa'].push(item['fKindMap']['02'])
                  this.sqarrdatas['xa'].push(item['fKindMap']['03'])
                  break
              }
            })
          }
          if (shouquan) {
            shouquan.forEach(item => {
              switch (item['countyName']) {
                case '思明区':
                  this.citydatashq.siming = item['count']
                  this.shqarrdatas['sm'].push(item['fKindMap']['01'])
                  this.shqarrdatas['sm'].push(item['fKindMap']['02'])
                  this.shqarrdatas['sm'].push(item['fKindMap']['03'])
                  break
                case '湖里区':
                  this.citydatashq.huli = item['count']
                  this.shqarrdatas['hl'].push(item['fKindMap']['01'])
                  this.shqarrdatas['hl'].push(item['fKindMap']['02'])
                  this.shqarrdatas['hl'].push(item['fKindMap']['03'])
                  break
                case '集美区':
                  this.citydatashq.jimei = item['count']
                  this.shqarrdatas['jm'].push(item['fKindMap']['01'])
                  this.shqarrdatas['jm'].push(item['fKindMap']['02'])
                  this.shqarrdatas['jm'].push(item['fKindMap']['03'])
                  break
                case '同安区':
                  this.citydatashq.tongan = item['count']
                  this.shqarrdatas['ta'].push(item['fKindMap']['01'])
                  this.shqarrdatas['ta'].push(item['fKindMap']['02'])
                  this.shqarrdatas['ta'].push(item['fKindMap']['03'])
                  break
                case '海沧区':
                  this.citydatashq.haicang = item['count']
                  this.shqarrdatas['hc'].push(item['fKindMap']['01'])
                  this.shqarrdatas['hc'].push(item['fKindMap']['02'])
                  this.shqarrdatas['hc'].push(item['fKindMap']['03'])
                  break
                case '翔安区':
                  this.citydatashq.xiangan = item['count']
                  this.shqarrdatas['xa'].push(item['fKindMap']['01'])
                  this.shqarrdatas['xa'].push(item['fKindMap']['02'])
                  this.shqarrdatas['xa'].push(item['fKindMap']['03'])
                  break
              }
            })
          }
          if (youxiao) {
            youxiao.forEach(item => {
              switch (item['countyName']) {
                case '思明区':
                  this.citydatayx.siming = item['count']
                  this.yxarrdatas['sm'].push(item['fKindMap']['01'])
                  this.yxarrdatas['sm'].push(item['fKindMap']['02'])
                  this.yxarrdatas['sm'].push(item['fKindMap']['03'])
                  break
                case '湖里区':
                  this.citydatayx.huli = item['count']
                  this.yxarrdatas['hl'].push(item['fKindMap']['01'])
                  this.yxarrdatas['hl'].push(item['fKindMap']['02'])
                  this.yxarrdatas['hl'].push(item['fKindMap']['03'])
                  break
                case '集美区':
                  this.citydatayx.jimei = item['count']
                  this.yxarrdatas['jm'].push(item['fKindMap']['01'])
                  this.yxarrdatas['jm'].push(item['fKindMap']['02'])
                  this.yxarrdatas['jm'].push(item['fKindMap']['03'])
                  break
                case '同安区':
                  this.citydatayx.tongan = item['count']
                  this.yxarrdatas['ta'].push(item['fKindMap']['01'])
                  this.yxarrdatas['ta'].push(item['fKindMap']['02'])
                  this.yxarrdatas['ta'].push(item['fKindMap']['03'])
                  break
                case '海沧区':
                  this.citydatayx.haicang = item['count']
                  this.yxarrdatas['hc'].push(item['fKindMap']['01'])
                  this.yxarrdatas['hc'].push(item['fKindMap']['02'])
                  this.yxarrdatas['hc'].push(item['fKindMap']['03'])
                  break
                case '翔安区':
                  this.citydatayx.xiangan = item['count']
                  this.yxarrdatas['xa'].push(item['fKindMap']['01'])
                  this.yxarrdatas['xa'].push(item['fKindMap']['02'])
                  this.yxarrdatas['xa'].push(item['fKindMap']['03'])
                  break
              }
            })
          }
          if (this.dangqian === 1) {
            this.citydata = this.citydatasq
          }
          if (this.dangqian === 2) {
            this.citydata = this.citydatashq
          }
          if (this.dangqian === 3) {
            this.citydata = this.citydatayx
          }
          if (edata) {
            const arr = []
            edata.forEach(item => {
              if (item['fKind'] === '01') {
                arr.push({
                  name: '发明专利',
                  value: item['count']
                })
              }
              if (item['fKind'] === '02') {
                arr.push({
                  name: '实用新型',
                  value: item['count']
                })
              }
              if (item['fKind'] === '03') {
                arr.push({
                  name: '外观设计',
                  value: item['count']
                })
              }
            })
            this.ringdata = arr
            this.createRing()
          }

          if (odata) {
            const oarr = []
            const oarro = []
            const oarrt = []
            const yeararr = []
            odata.forEach(item => {
              yeararr.push(item['year'])
              if (item['pledgeCount']) {
                oarr.push(item['pledgeCount'])
              } else {
                oarr.push(0)
              }
              if (item['transferCount']) {
                oarro.push(item['transferCount'])
              } else {
                oarro.push(0)
              }
              if (item['licenseCount']) {
                oarrt.push(item['licenseCount'])
              } else {
                oarrt.push(0)
              }
            })
            this.zyarr = oarr.reverse()
            this.xkarr = oarrt.reverse()
            this.zlarr = oarro.reverse()
            this.yeararrs = yeararr.reverse()
            this.createsBar()
          }
          if (tdata) {
            const qarr = []
            const qt = []
            const qarrs = []
            tdata.forEach(item => {
              qarr.push(item['patentCount'])
              qarrs.push(item['enterpriceCount'])
              if (item.type === 1) {
                qt.push('三高企业')
              }
              if (item.type === 2) {
                qt.push('高新企业')
              }
              if (item.type === 3) {
                qt.push('科技小巨人')
              }
              if (item.type === 4) {
                qt.push('知识产权优势示范企业')
              }
            })
            this.qyarr = qarr
            this.qtarr = qt
            this.qyarrs = qarrs
            this.createtBar(this.qyarrs)
          }
        })
        .catch(err => {
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    gettop() {
      const data = {
        type: this.nowtab
      }
      if (this.nowmark) {
        data.tagId = this.nowmark
      }
      this.$shttp
        .get(topUrl, { params: data })
        .then(res => {
          const tdata = res
          if (tdata) {
          const xarr = []
          const yarr = []
            tdata.forEach(item => {
              xarr.push(item['applicant'])
              yarr.push(item['count'])
            })
            this.topxdata = xarr.reverse()
            this.topydata = yarr.reverse()
            if (this.nowtab === 0) {
              this.createBar()
            }
            if (this.nowtab === 1) {
              this.createBarsq()
            }

            this.toptenshow = true
          }
        })
        .catch(err => {
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    // 万人有效发明
    getpat() {
      this.$shttp
        .get(patUrl)
        .then(res => {
          const darr = res

          const yarr = darr[0]['list']
          const xdata = []
          const ydata = []
          yarr.forEach(it => {
            xdata.push(it['year'])
          })
          console.log(xdata)
          darr.forEach(item => {
            const arr = []
            for (let i = 0; i < item['list'].length; i++) {
              arr.push(item['list'][i]['count'])
            }

            ydata.push({
              name: item['regionName'],
              type: 'line',
              // stack: '总量',
              symbol: 'none',
              lineStyle: {
                width: 1
              },
              label: {
                normal: {
                  show: false
                }
              },
              data: arr
            })
          })
          this.patdata = ydata
          this.xyeardata = xdata
          this.createStack()
          
        })
        .catch(err => {
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    // 十三五趋势
    getqushi() {
      const pdata = {
        type: this.nowtype
      }
      this.$shttp.get(sswUrl, { params: pdata })
        .then(res => {
          const darr = res
          const xdata = []
          darr.sort((a, b) => {
            return a['year'] - b['year']
          })
          const xmarr = []
          const hcarr = []
          const hlarr = []
          const jmarr = []
          const taarr = []
          const smarr = []
          const xaarr = []
          darr.forEach(item => {
            xdata.push(item['year'])
            xmarr.push(item['regionMap']['厦门市'])
            smarr.push(item['regionMap']['思明区'])
            hcarr.push(item['regionMap']['海沧区'])
            jmarr.push(item['regionMap']['集美区'])
            taarr.push(item['regionMap']['同安区'])
            hlarr.push(item['regionMap']['湖里区'])
            xaarr.push(item['regionMap']['翔安区'])
          })
          this.xyeardata = xdata
          this.qushidata = {
            xm: xmarr,
            sm: smarr,
            hc: hcarr,
            jm: jmarr,
            ta: taarr,
            hl: hlarr,
            xa: xaarr
          }
          this.createStackqs()
          
        })
        .catch(err => {
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    // 重点运营城市 申请量
    getcity() {
      this.$shttp
        .get(cityUrl)
        .then(res => {
          const cdata = res
          if (cdata) {
          const cs = []
          const fm = []
          const wg = []
          const sy = []
          const quanbu = []
            cdata.forEach(item => {
              cs.push(item['city'])
              for (let i = 0; i < item['list'].length; i++) {
                if (item['list'][i]['fKind'] === '01') {
                  fm.push(item['list'][i]['count'])
                }
                if (item['list'][i]['fKind'] === '02') {
                  sy.push(item['list'][i]['count'])
                }
                if (item['list'][i]['fKind'] === '03') {
                  wg.push(item['list'][i]['count'])
                }
                if (item['list'][i]['fKind'] === '00') {
                  quanbu.push(item['list'][i]['count'])
                }
              }
            })
            this.zdcity = cs
            this.zdfm = fm
            this.zdsy = sy
            this.zdwg = wg
            this.allcont = quanbu
            this.$nextTick(() => {
              this.createBars(quanbu)
              this.chartready = true
            })
          }
          console.log(cdata)
        })
        .catch(err => {
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    // 重点运营城市 运营情况
    getcityyy() {
      this.$shttp
        .get(yyUrl)
        .then(res => {
          const cdata = res
          if (cdata) {
          const cs = []
          const fm = []
          const wg = []
          const sy = []
            cdata.forEach(item => {
              cs.push(item['city'])
              fm.push(item['pledgeCount'])
              wg.push(item['transferCount'])
              sy.push(item['licenseCount'])
            })
            this.zdcity = cs
            this.zdfm = fm
            this.zdsy = sy
            this.zdwg = wg
            this.$nextTick(() => {
              this.createBaryy()
            })
          }
          console.log(cdata)
        })
        .catch(err => {
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    getcom() {
      const data = {
        keyword: this.searchcompany
      }
      this.loading = true
      this.$shttp
        .get(comUrl, { params: data })
        .then(res => {
          this.loading = false
          const comdata = res
          if (comdata) {
            this.searchedcompany = comdata
          }
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    searchcompanys() {
      if (!this.searchcompany) {
        this.$messagesebe('请输入企业名称搜索')
        return
      }
      this.searchedcompany = []
      this.getcom()
      this.issearch = false
      this.issearched = true
    },
    searchitem(it) {
      const data = {
        enterprise: it.enterprice
      }
      this.loading = true
      this.$shttp
        .get(infoUrl, { params: data })
        .then(res => {
          this.loading = false
          if (res) {
            this.infodata = res
            this.infodata.company = it.enterprice
            this.markcompany = it.enterprice
            const list = res.list
            if (list) {
              const obj = {}
              const ring = []
              list.forEach(item => {
                switch (item['fKind']) {
                  case '01':
                    obj['fm'] = item['count']
                    obj['fmper'] = item['percentage']
                    ring.push({
                      name: '发明专利',
                      value: item['count']
                    })
                    break
                  case '02':
                    obj['sy'] = item['count']
                    obj['syper'] = item['percentage']
                    ring.push({
                      name: '实用新型',
                      value: item['count']
                    })
                    break
                  case '03':
                    obj['wg'] = item['count']
                    obj['wgper'] = item['percentage']
                    ring.push({
                      name: '外观设计',
                      value: item['count']
                    })
                    break
                }
              })
              this.companyring = ring
              this.patent = obj
              this.createRings()
              this.getmark()
              this.issearch = true
            }
          }

          console.log(this.infodata)
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    
    getkey(data) {
      return this.$shttp.post(tokenUrl, data)
    },
    async getmark() {
      const tda = {
        userName: 'sb',
        password: 'QhMm+WR0DUeUXjibLY'
      }
      // let c = '厦门'
      const ret = await this.getkey(tda)
      const key = ret.result
      const markdata = {
        accessKey: key,
        orgName: this.markcompany
      }
      this.$shttp.post(markUrl, markdata).then(res => {
        const re = res.result
        if (re) {
          this.companyMark = re
        }
      })
    }
  },
  mounted() {
    this.getoverview()
  }
}
</script>

<style lang="less" scoped>
.statbgbox {
  padding-top: 24px;
  padding-bottom: 30px;
  background: rgba(9, 11, 57, 1);
  font-size: 14px;
  ul, h3, p {
    list-style: none;
    margin: 0;
    padding: 0;
  }
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
  .topbox {
    height: 28px;
    line-height: 28px;
    margin-bottom: 20px;
    // text-align: center;
    > span {
      float: left;
    }
    .left,
    .right {
      // display: inline-block;
      width: 35%;
      height: 22px;
      margin-top: 3px;
      margin-bottom: 3px;
      background-size: 100%;
    }
    .left {
      background-image: url(../../../assets/img/left.png);
      background-position: left center;
      background-repeat: no-repeat;
    }
    .center {
      width: 30%;
      text-align: center;
      line-height: 28px;
      color: #fff;
      font-size: 14px;
      font-family: 'PingFangSC-Semibold,PingFang SC';
      font-weight: 600;
    }
    .right {
      background-image: url(../../../assets/img/right.png);
      background-position: right center;
      background-repeat: no-repeat;
    }
  }
  .bl,
  .br,
  .tl,
  .tr {
    position: absolute;
    width: 13px;
    height: 13px;
    background-position: left top;
    background-repeat: no-repeat;
  }
  .bl {
    left: -2px;
    bottom: -2px;
    background-image: url(../../../assets/img/bl.png);
  }
  .br {
    right: -2px;
    bottom: -2px;
    background-image: url(../../../assets/img/br.png);
  }
  .tl {
    left: -2px;
    top: -2px;
    background-image: url(../../../assets/img/tl.png);
  }
  .tr {
    right: -2px;
    top: -2px;
    background-image: url(../../../assets/img/tr.png);
  }

  .elist {
    overflow: hidden;
    padding: 0 15px;
    > li {
      position: relative;
      float: left;
      margin-right: 12px;
      margin-bottom: 12px;
      width: 130px;
      height: 54px;
      padding: 12px;
      background: rgba(9, 11, 57, 1);
      box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
      border: 1px solid rgba(20, 58, 172, 1);
      > p {
        font-size: 14px;
        color: #fff;
        line-height: 20px;
        margin-bottom: 5px;
      }
      .num {
        height: 24px;
        font-size: 16px;
        font-family: 'PingFangSC-Semibold', 'PingFang SC';
        font-weight: 600;
        color: rgba(4, 143, 219, 1);
        line-height: 24px;
      }
    }
  }
  .nowtime {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 24px;
    line-height: 24px;
    z-index: 2;
    > strong {
      display: inline-block;
      height: 24px;
      color: #fff;
      font-size: 12px;
      line-height: 24px;
      font-weight: normal;
    }
    > span {
      display: inline-block;
      height: 24px;
      color: #fff;
      font-size: 12px;
      line-height: 24px;
      margin-left: 12px;
      padding: 0 10px;
      &.active {
        background-color: #999;
      }
    }
  }
  .ringbox {
    height: 180px;
  }
  .sbarbox {
    height: 180px;
  }
  .posbread {
    padding: 10px 30px;
    span {
      cursor: pointer;
    }
  }


.topten {
  position: relative;
  .tabbtn {
    position: absolute;
    left: 200px;
    top: 22px;
    z-index: 9;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    > span {
      border-bottom: 1px solid #fff;
    }
  }
  .markbtn {
    position: absolute;
    right: 10px;
    top: 22px;
    z-index: 9;
    color: #fff;
    font-size: 0;
    cursor: pointer;
    > strong {
      display: inline-block;
      height: 22px;
      color: #fff;
      font-size: 12px;
      line-height: 22px;
      font-weight: normal;
    }
    > span {
      display: inline-block;
      height: 22px;
      color: #fff;
      font-size: 12px;
      line-height: 22px;
      margin-left: 10px;
      padding: 0 10px;
      &.active {
        background-color: #999;
      }
      &.activetp {
        background-color: #999;
      }
    }
  }
  .tabbtns {
    position: absolute;
    left: 110px;
    top: 22px;
    z-index: 999999;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    > span {
      border-bottom: 1px solid #fff;
    }
  }
}
.xianglan .companymarks {
  display: inline-block;
  padding: 0 5px;
  border: 1px solid #999;
  color: #999;
  margin-left: 5px;
  font-size: 12px;
  font-weight: normal;
}
  .smallelist {
    display: none;
  }
  .statbox {
    position: relative;
    min-height: 400px;
    background: rgba(9, 11, 57, 1);
    box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
    border: 1px solid rgba(20, 58, 172, 1);
  }
  .left-menu {
    padding: 0 15px;
    overflow: hidden;
    > li {
      float: left;
      width: 100px;
      height: 30px;
      margin-bottom: 6px;
      line-height: 30px;
      text-align: center;
      margin-right: 6px;
      font-size: 12px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.5);
      background: rgba(37, 78, 201, 1);
      box-shadow: 0px 1px 10px 0px rgba(0, 35, 255, 0.62) inset;
      &.active {
        color: #fff;
        background: rgba(0, 141, 218, 1);
        box-shadow: 0px 1px 10px 0px rgba(147, 213, 255, 0.62) inset;
      }
    }
  }
  .right-statistical {
    width: 100%;
    min-height: 400px;
    .citychart {
      position: relative;
      width: 100%;
    }
    .mapbox {
      margin-bottom: 12px;
      .map {
        position: relative;
        width: 100%;
        height: 400px;
        background-image: url(../../../assets/img/map.png);
        background-position: center 60px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        > div {
          position: absolute;
          color: #ffd55c;
          font-size: 12px;
          width: 100px;
          height: 20px;
          line-height: 20px;
        }
        
        .jimei {
          top: 220px;
          left: 114px;
        }
        .tongan {
          top: 136px;
          left: 180px;
        }
        .xiangan {
          top: 200px;
          left: 250px;
        }
        .haicang {
          top: 280px;
          left: 80px;
        }
        .huli {
          top: 280px;
          left: 170px;
        }
        .siming {
          top: 320px;
          left: 168px;
        }
      }
    }
    .statchart {
      padding: 15px;
      // width: 280px;
      .itembox {
        position: relative;
        width: 280px;
        height: 260px;
        padding-top: 20px;
        background: rgba(9, 11, 57, 1);
        box-shadow: 0px 1px 40px 0px rgba(0, 104, 255, 0.31) inset;
        border: 1px solid rgba(20, 58, 172, 1);
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .basebox {
        height: 160px;
        position: relative;
        .totalnum {
          position: absolute;
          left: 100px;
          top: 40px;
          width: 80px;
          height: 80px;
          // background-color: #111080;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          font-size: 12px;
          overflow: hidden;
          > p {
            padding-top: 15px;
          }
        }
      }
      .chartit {
        position: relative;
        padding: 0 30px;
        overflow: hidden;
        height: 30px;
        margin-bottom: 10px;
        i {
          position: absolute;
          top: 15px;
          width: 218px;
          border-top: 1px solid #143aac;
        }
        span {
          position: absolute;
          left: 50%;
          -ms-transform: translateX(-50%);
          -moz-transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
          -o-transform: translateX(-50%);
          transform: translateX(-50%);
          padding: 0 10px;
          line-height: 30px;
          background: rgba(9, 11, 57, 1);
          color: #fff;
          font-size: 14px;
        }
      }
      .dataview {
        li {
          height: 20px;
          margin-bottom: 20px;
        }
      }
      .gray {
        color: #999;
      }
      .white {
        vertical-align: bottom;
        color: #fff;
      }
      .high {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        vertical-align: bottom;
      }
      .small {
        vertical-align: bottom;
        font-size: 12px;
      }
      .first {
        width: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .font {
        font-size: 20px;
        font-weight: bold;
      }
      .fbcolor {
        background-color: #ccc;
      }
      .fcolor {
        color: #fff;
      }
      .sbcolor {
        background-color: #6fd5de;
      }
      .scolor {
        color: #6fd5de;
      }
      .tbcolor {
        background-color: #379dea;
      }
      .tcolor {
        color: #379dea;
      }
      .company {
        color: #ccc;
        font-size: 14px;
        p {
          width: 33%;
          text-align: center;
          &:last-child {
            text-align: right;
          }
        }
        > li {
          justify-content: space-between;
          margin-bottom: 10px;
          > div {
            width: 33%;
            text-align: center;
            color: red;
            &:first-child {
              text-align: left;
              color: #fff;
            }
            &:last-child {
              // text-align: right;
              color: #379dea;
            }
          }
        }
      }
    }
    .topten {
      width: 100%;
      min-height: 500px;
      background: rgba(9, 11, 57, 1);
      box-shadow: 0px 1px 100px 0px rgba(0, 104, 255, 0.14) inset;
      .chartbar {
        width: 100%;
        height: 500px;
      }
      .chartbarcy {
        width: 100%;
        height: 380px;
      }
      .chartbarsm {
        width: 340px;
        height: 380px;
      }
      .typeselectbox {
        height: 30px;
        position: relative;
        z-index: 9;
        display: flex;
        justify-content: flex-end;
        .selectitembox {
          display: flex;
          margin-left: 20px;
          color: #fff;
          font-size: 14px;
          .selectlabel {
            width: 100px;
            line-height: 30px;
            font-size: 14px;
          }
          /deep/ .selectbox {
            width: 180px;
            height: 30px;
            .el-select .el-input__inner {
              width: 100%;
              height: 30px;
            }
            .el-input__icon {
              line-height: 30px;
            }
            .el-select-dropdown__item {
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
    }
    .xianglan {
      width: 100%;
      min-height: 300px;
      .leftsearch {
        width: 340px;
        min-height: 300px;
        font-size: 14px;
        padding: 15px;
        background: rgba(9, 11, 57, 1);
        box-shadow: 0px 1px 100px 0px rgba(0, 104, 255, 0.14);
        color: #fff;
        > h3 {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .searchbox {
          height: 40px;

          margin-bottom: 10px;
          input {
            float: left;
            width: 210px;
            height: 20px;
            padding: 10px;
            background-color: #fff;
            border: none;
            outline: none;
            color: #090b39;
          }
          span {
            float: left;
            width: 90px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            background-color: #254ec9;
          }
        }
        .companylist {
          min-height: 300px;
          > li {
            height: 20px;
            max-width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-left: 10px;
            padding-right: 10px;
            line-height: 20px;
            margin-bottom: 6px;
          }
        }
      }
      .rightcont {
        position: relative;
        min-height: 300px;
        padding: 15px;
        background: rgba(9, 11, 57, 1);
        box-shadow: 0px 1px 100px 0px rgba(0, 104, 255, 0.14);
        font-size: 12px;
        > h3 {
          color: #fff;
        }
        .nodatapic {
          position: absolute;
          text-align: center;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 102px;
          font-size: 12px;
          color: rgba(20, 58, 172, 1);
          img {
            width: 90px;
            height: 90px;
          }
        }
        .companychart {
          width: 150px;
          height: 150px;
          position: relative;
          .totalnum {
            position: absolute;
            left: 40px;
            top: 40px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            font-size: 12px;
            overflow: hidden;
            > p {
              padding-top: 15px;
            }
          }
        }
        .onering {
          width: 150px;
          height: 150px;
        }
        .itemcomt {
          width: 100%;
          padding-top: 20px;
          margin-bottom: 20px;
          color: #254ec9;

          > li {
            margin-bottom: 10px;
            &:first-child {
              padding-bottom: 5px;
              // opacity: 0.4;
              border-bottom: 1px solid rgba(20, 58, 172, 0.4);
            }
            > span {
              display: inline-block;
              width: 33%;
              text-align: center;
              &:first-child {
                text-align: left;
              }
              &:last-child {
                text-align: right;
              }
            }
            .faming {
              color: #00dabe;
            }
            .waiguan {
              color: #254ec9;
            }
            .shiyong {
              color: #008dda;
            }
          }
        }
        .tongji {
          padding: 10px 0 20px;
          border-bottom: 1px solid rgba(20, 58, 172, 0.4);
          > li {
            float: left;
            width: 25%;
            text-align: left;
            span {
              color: #fff;
              font-size: 12px;
            }
            .per {
              margin-right: 5px;
              line-height: 14px;
            }
            .stat {
              font-size: 12px;
              padding-top: 2px;
            }
          }
        }
        .itemtit {
          padding-top: 20px;
          font-size: 12px;
          line-height: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(20, 58, 172, 0.4);
          margin-bottom: 10px;
          color: #254ec9;
        }
        .listitem {
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(20, 58, 172, 0.4);
          &:last-child {
            border-bottom: none;
          }
          > li {
            width: 25%;
            float: left;
            margin-bottom: 10px;
            span {
              color: #fff;
            }
            span.shixiao {
              color: #ffd55c;
            }
            p {
              padding-top: 10px;
              color: #fff;
              transform: scale(0.9)
            }
          }
        }
      }
    }
  }
}
</style>

