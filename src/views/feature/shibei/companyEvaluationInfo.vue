<template>
  <div class="companyevaluation">
    <div class="topsearch">
      <div class="topsearchtitle">
        <h3>{{info.enterpriseName}}</h3>
        <div class="indicators">
          <!-- <span>企业科技指标：{{ info.techIndex }}</span> -->
          <!-- <i class="infos">i</i>
          <div class="intrs" v-if="intrshow">
            <p v-for="(it, k) in intrlist" :key="k">{{ it }}</p>
          </div> -->
        </div>
        <div class="companyname">
            <input type="text" placeholder="请输入厦门企业名称检索" v-model="enterpriseName" >
            <span class="bluebtn" @click="search()">搜索</span>
        </div>
      </div>
      <div class="searchconts">
        <div class="overview">
          <h3><span>专利情况总览</span><span class="new">最新</span></h3>
          <!-- <div class="viewmsg">
            <span @click="toportrait">查看企业画像</span>
            <span @click="tocredit">查看企业信用信息</span>
          </div> -->
        </div>
        <div class="viewcont">
          <div class="itemallnum" :class="{ active: cur === 'zl' }" @click="changecur('zl')">
            <h3>{{zltotal}}</h3>
            <p>申请专利总量</p>
          </div>
          <div class="itemallnum" :class="{ active: cur === 'sq' }" @click="changecur('sq')">
            <h3>{{sqtotal}}</h3>
            <p>授权专利总量</p>
          </div>
          <div class="echartsmsg">
            <div class="echartsbox">
              <!-- <h3>专利申请</h3> -->
              <div id="barChart" class="barbox"></div>
            </div>
            <ul class="eachdata">
              <li class="headli">数量</li>
              <li v-for="(item, key) in ptotal" :key="item + key">{{item}}</li>
            </ul>
            <ul class="eachdata">
              <li class="headli">百分比</li>
              <li v-for="(item, key) in percent" :key="item + key">{{item | toPercent}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="searchdetail">
      <!-- <div class="sortsbox">
        <div class="sortsbtn">
          <span
            v-for="(item, k) in sorts"
            :key="k"
            @click="changesort(item)"
            :class="{ active: item.id === sortsnow }"
            >{{ item.label }}</span
          >
        </div>
      </div> -->
      <div class="commonconts">
        <ul class="leftnav">
          <li
            v-for="(item, key) in plist"
            :key="key"
            @click="changeleft(item)"
            :class="{ active: item.key === leftcur }"
          >
            {{ item.title }}
          </li>
        </ul>
        <div class="rightcharts">
          <div id="ringchart" class="ring"></div>
          <span class="zongshu">{{ringtotal}}件</span>
        </div>
      </div>
      <div class="workings">
          <div class="topbarbox">
              <h3>{{`申请人${info.enterpriseName}累计转让专利`}} <span class="bluenum">{{zrcount}}</span> 件，许可专利 <span class="bluenum">{{xkcount}}</span> 件，质押专利 <span class="bluenum">{{zycount}}</span> 件。 </h3>
              <div id="barCharts" class="barboxs"></div>
          </div>
          <div class="workingsitembox clearfix">
                <div class="workingsitem">
                    <h3>主要受让方</h3>
                    <ul v-if="srlist.length">
                        <li v-for="(item, index) in srlist" :key="index"><span>{{`${item.seqNo}.`}}</span><span class="cname"> {{item.field}}</span> <span class="pnum">{{item.count}}</span></li>
                    </ul>
                    <div class="nodatabox" v-if="!srlist.length">
                      暂无数据
                    </div>
                </div>
                <div class="workingsitem">
                    <h3>主要许可方</h3>
                    <ul  v-if="xklist.length">
                        <li v-for="(item, index) in xklist" :key="index"><span>{{`${item.seqNo}.`}}</span><span class="cname">{{item.field}}</span> <span class="pnum">{{item.count}}</span></li>
                    </ul>
                    <div class="nodatabox" v-if="!xklist.length">
                      暂无数据
                    </div>
                </div>
                <div class="workingsitem">
                    <h3>主要质权方</h3>
                    <ul  v-if="zqlist.length">
                        <li v-for="(item, index) in zqlist" :key="index"><span>{{`${item.seqNo}.`}}</span><span class="cname">{{item.field}}</span> <span class="pnum">{{item.count}}</span></li>
                    </ul>
                    <div class="nodatabox" v-if="!zqlist.length">
                      暂无数据
                    </div>
                </div>
          </div>
          
      </div>
      <div class="industryfield">
        <h3 class="fieldtitle">擅长领域</h3>
        <div class="fieldintr">
          {{`选取${info.enterpriseName}公开专利涉及最多的10个领域。`}}
        </div>
        <div class="headbox">
          <span class="xuhao">序号</span>
          <span class="leiming">IPC</span>
          <span class="jianshu">专利申请件数</span>
        </div>
        <ul class="fieldlist" v-if="expertiseArea.length">
          <li v-for="(item, index) in expertiseArea" :key="item.id">
            <span class="xuhao">{{index + 1}}</span>
            <span class="leiming">{{item.field}}</span>
            <span class="jianshu">{{`${item.count}件`}}</span>
          </li>
        </ul>
        <div class="nodatabox" v-if="!expertiseArea.length">暂无数据</div>
        <h3 class="fieldtitle">共同申请人</h3>
        <div class="fieldintr">
          {{`申请人${info.enterpriseName}的共同申请人有${industryDomain.coApplicantCount}个。合作申请中发明专利${industryDomain.inventCount}件；新型专利${industryDomain.utilityCount}8件；外观专利${industryDomain.appearCount}件。`}}
        </div>
        <div class="headbox">
          <span class="xuhao">序号</span>
          <span class="leiming">共同申请人</span>
          <span class="jianshu">共同申请专利件数</span>
        </div>
        <ul class="fieldlist" v-if="coApplicant.length">
          <li v-for="(item, index) in coApplicant" :key="item.id">
            <span class="xuhao">{{index + 1}}</span>
            <span class="leiming">{{item.field}}</span>
            <span class="jianshu">{{`${item.count}件`}}</span>
          </li>
        </ul>
        <div class="nodatabox" v-if="!coApplicant.length">暂无数据</div>
      </div>
      <div class="devteam">
        <h3 class="teamtitle">主要发明人专利申请情况</h3>
        <div class="teamintr">
          {{`选取${info.enterpriseName}公开专利涉及最多的10个发明人。`}}
        </div>
        <div id="specbarchart" class="specbar">

        </div>
      </div>
      <div class="industryfield">
        <h3 class="fieldtitle">委托代理机构情况</h3>
        <div class="fieldintr">
          {{`选取${info.enterpriseName}委托申请专利最多的10家代理机构。`}}
        </div>
        <div class="headbox">
          <span class="xuhao">序号</span>
          <span class="leiming">IPC</span>
          <span class="jianshu">专利申请件数</span>
        </div>
        <ul class="fieldlist" v-if="entrustAgency.length">
          <li v-for="item in entrustAgency" :key="item.id">
            <span class="xuhao">{{item.seqNo}}</span>
            <span class="leiming">{{item.field}}</span>
            <span class="jianshu">{{`${item.count}件`}}</span>
          </li>
        </ul>
        <div class="nodatabox" v-if="!entrustAgency.length">暂无数据</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import echarts from 'echarts'
const detailUrl = '/api/queryEnterpriseAssessDetail/{assessId}'
export default {
  data() {
    return {
      intrlist: [
        '企业科技指标体系，以深度洞察专利背后的人、企业与资本为立足点，以社会网络关系型知识图谱为数据支撑，参考《上海证券交易所科创板企业上市推荐指引》，借鉴摩根士丹利资本国际指数（MSCI指数）等主流国际评级机构做法，以企业专利数据作为核心并综合应用企业创新全要素数据，',
        '共涵盖创新力（Innovation）、竞争力（Competition）、进化力（Evolution）、影响力（Effect）4个主题、16个维度60余个定量指标。ICEE硬科技评价指标体系，',
        '目标是促进科技型中小企业以专利为核心能力的创新实力指标化和显性化。硬科技投资指数主要计算过程包括：计算60余个评价指标，按照企业所属行业类别，采用分位数排名打分法或区间打分法进行标准化处理，将各项评价指标得分加权计算后，获得ICEE指数得分。按照ICEE得分值区间给出企业从AAA到CCC的硬科技投资价值评级结果。',
        '评级结果具体分为AAA、AA、A、BBB、BB、B、CCC共7个等级。其中，AAA级为标杆企业、AA级为卓越企业、A级为优秀企业、BBB级为良好企业、BB级为一般企业、B级和CCC级为相对较差企业。'
      ],
      sortsnow: 1,
      intrshow: false,
      zltotal: 0,
      sqtotal: 0,
      // 专利概览
      viewdatax: [],
      viewdatay: [],
      viewdatad: [],
      viewdatap: [],
      sviewdatax: [],
      sviewdatay: [],
      sviewdatad: [],
      sviewdatap: [],
      ptotal: [],
      percent: [],
      // 权利法律情况
      allpatent: [],
      allpatentcount: 0,
      fmpatent: [],
      fmpatentcount: 0,
      sypatent: [],
      sypatentcount: 0,
      wgpatent: [],
      wgpatentcount: 0,
      ringtotal: 0,
      // 运用转化
      zhdatax: [],
      zhdatay: [],
      zrcount: 0,
      xkcount: 0,
      zycount: 0,
      expertiseArea: [],
      coApplicant: [],
      // 研发团队情况
      rdteamx: [],
      rdteamfm: [],
      rdteamsy: [],
      rdteamwg: [],
      entrustAgency: [],
      sorts: [
        { id: 1, label: '权利法律情况' },
        { id: 2, label: '运用与转化情况' },
        { id: 3, label: '行业领域情况' },
        { id: 4, label: '研发团队情况' },
        { id: 5, label: '委托代理机构情况' }
      ],
      cur: 'zl',
      assessId: null,
      enterpriseName: '',
      srlist: [],
      xklist: [],
      zqlist: [],
      leftcur: 1,
      ringtypea: [],
      ringtypeb: [],
      ringtypec: [],
      ringtyped: [],
      plist: [
        {
          title: '全部专利',
          key: 1
        },
        {
          title: '发明专利',
          key: 2
        },
        {
          title: '实用新型',
          key: 3
        },
        {
          title: '外观专利',
          key: 4
        }
      ],
      loading: false,
      industryDomain: {
        appearCount: '',
        inventCount: '',
        utilityCount: '',
        coApplicantCount: ''
      },
      info: {
        enterpriseName: '',
        techIndex: ''
      },
      bartitle: '专利申请',
      query: {}
    }
  },
  filters: {
    toPercent(num) {
      if (!num) {
        return 0
      }
      let str = Number(num * 100).toFixed(2)
      str += '%'
      return str
    }
  },
  methods: {
    search() {
      if (!this.enterpriseName) {
        Toast('请输入企业名称查询')
        return
      }
      this.$router.push({ name: 'CompanyEvaluation', query: { enterpriseName: this.enterpriseName } })
    },
    toportrait() {
      const url = `/portal/feature-service/company-portraitinfo/${this.assessId}`
      window.open(url)
      // this.$router.push({ name: 'CompanyPortraitInfo', params: { id: this.assessId } })
    },
    tocredit() {
      const url = `/portal/feature-service/company-creditinfo/${this.assessId}`
      window.open(url)
      // this.$router.push({ name: 'CompanyCreditInfo', params: { id: this.assessId } })
    },
    selected(it, tp) {
      this[tp + 'now'] = it.id
    },
    changesort(it) {
      this.sortsnow = it.id
      if (this.sortsnow === 1) {
        this.leftcur = 1
      }
    },
    changecur(tp) {
      this.cur = tp
    },
    changeleft(it) {
      this.leftcur = it.key
    },
    handleCurrentChange(i) {
      this.pgIndex = i
      this.searchpage()
    },
    getquery() {
      const re = {}
      if (this.$route.query) {
        const q = this.$route.query
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
    getdetail() {
      this.loading = true
      this.$shttp.get(detailUrl.replace('{assessId}', this.assessId)).then(resp => {
          this.loading = false
          this.info = resp
          const parr = resp.patentOverview
          const lawarr = resp.lawOfRights
          const useConvert = resp.useConvert
          const zharr = useConvert.transferPermitPledge
          const industryDomain = resp.industryDomain
          const rdteam = resp.rdTeam
          const entrustAgency = resp.entrustAgency
          this.srlist = useConvert.transfer || []
          this.xklist = useConvert.permit || []
          this.zqlist = useConvert.pledge || []
          this.industryDomain = industryDomain
          this.expertiseArea = industryDomain.expertiseArea || []
          this.coApplicant = industryDomain.coApplicant || []
          this.entrustAgency = entrustAgency || []
          const parrx = []
          const parry = []
          const parrp = []
          const parrd = []
          const sparrx = []
          const sparry = []
          const sparrp = []
          const sparrd = []
          parr.forEach(item => {
            if (item.type === 1) {
              this.zltotal = item.totalCount
              if (item.patentType === 1) {
                parrx.unshift('发明专利')
              }
              if (item.patentType === 2) {
                parrx.unshift('实用新型')
              }
              if (item.patentType === 3) {
                parrx.unshift('外观专利')
              }
              parry.unshift(item.count)
              parrd.push(item.count)
              parrp.push(item.percentage)
            }
            if (item.type === 2) {
              this.sqtotal = item.totalCount
              if (item.patentType === 1) {
                sparrx.unshift('发明专利')
              }
              if (item.patentType === 2) {
                sparrx.unshift('实用新型')
              }
              if (item.patentType === 3) {
                sparrx.unshift('外观专利')
              }
              sparry.unshift(item.count)
              sparrd.push(item.count)
              sparrp.push(item.percentage)
            }
          })
          this.viewdatax = parrx
          this.viewdatay = parry
          this.viewdatap = parrp
          this.viewdatad = parrd

          this.sviewdatax = sparrx
          this.sviewdatay = sparry
          this.sviewdatap = sparrp
          this.sviewdatad = sparrd
          
          lawarr.forEach(item => {
            if (item.patentType === 0) {
              if (item.lawStatus === 1) {
                this.allpatent.push({ name: '在审', value: item.count })
                this.ringtypea.push('在审')
              }
              if (item.lawStatus === 2) {
                this.allpatent.push({ name: '有效', value: item.count })
                this.ringtypea.push('有效')
              }
              if (item.lawStatus === 3) {
                this.allpatent.push({ name: '失效', value: item.count })
                this.ringtypea.push('失效')
              }
              if (item.lawStatus === 4) {
                this.allpatent.push({ name: '其他', value: item.count })
                this.ringtypea.push('其他')
              }
              this.allpatentcount = item.totalCount
            }
            if (item.patentType === 1) {
              if (item.lawStatus === 1) {
                this.fmpatent.push({ name: '在审', value: item.count })
                this.ringtypeb.push('在审')
              }
              if (item.lawStatus === 2) {
                this.fmpatent.push({ name: '有效', value: item.count })
                this.ringtypeb.push('有效')
              }
              if (item.lawStatus === 3) {
                this.fmpatent.push({ name: '失效', value: item.count })
                this.ringtypeb.push('失效')
              }
              if (item.lawStatus === 4) {
                this.fmpatent.push({ name: '其他', value: item.count })
                this.ringtypeb.push('其他')
              }
              this.fmpatentcount = item.totalCount
            }
            if (item.patentType === 2) {
              if (item.lawStatus === 1) {
                this.sypatent.push({ name: '在审', value: item.count })
                this.ringtypec.push('在审')
              }
              if (item.lawStatus === 2) {
                this.sypatent.push({ name: '有效', value: item.count })
                this.ringtypec.push('有效')
              }
              if (item.lawStatus === 3) {
                this.sypatent.push({ name: '失效', value: item.count })
                this.ringtypec.push('失效')
              }
              if (item.lawStatus === 4) {
                this.sypatent.push({ name: '其他', value: item.count })
                this.ringtypec.push('其他')
              }
              this.sypatentcount = item.totalCount
            }
            if (item.patentType === 3) {
              if (item.lawStatus === 1) {
                this.wgpatent.push({ name: '在审', value: item.count })
                this.ringtyped.push('在审')
              }
              if (item.lawStatus === 2) {
                this.wgpatent.push({ name: '有效', value: item.count })
                this.ringtyped.push('有效')
              }
              if (item.lawStatus === 3) {
                this.wgpatent.push({ name: '失效', value: item.count })
                this.ringtyped.push('失效')
              }
              if (item.lawStatus === 4) {
                this.wgpatent.push({ name: '其他', value: item.count })
                this.ringtyped.push('其他')
              }
              this.wgpatentcount = item.totalCount
            }
          })
          zharr.forEach(item => {
            if (item.convertType === 1) {
              this.zhdatax.push('专利转让')
              this.zrcount = item.count
            }
            if (item.convertType === 2) {
              this.zhdatax.push('专利许可')
              this.xkcount = item.count
            }
            if (item.convertType === 3) {
              this.zhdatax.push('专利质押')
              this.zycount = item.count
            }
            this.zhdatay.push(item.count)
          })
          rdteam.forEach(item => {
            this.rdteamx.push(item.inventor)
            this.rdteamfm.push(item.inventCount)
            this.rdteamsy.push(item.utilityCount)
            this.rdteamwg.push(item.appearCount)
          })
          this.ptypechange()
            this.ringschange()
              this.createBars()
              this.createSpecBar()
        })
        .catch(err => {
          this.loading = false
          Toast(err.response.data.msg)
        })
    },
    createBar(datax, datay) {
      var barChartOption = {
        title: {
          text: this.bartitle,
          left: 0,
          top: 0,
          textStyle: {
            align: 'left',
            fontSize: '12',
            color: '#333'
          }
        },
        // color: ['#5B8FF9'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 0,
          right: 30,
          top: 26,
          bottom: 10,
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
            lineStyle: {
              color: '#f4f4f4'
            }
            // show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false, // 取消坐标轴
            lineStyle: {
              color: '#A0A4AA'
              // width:'2'
            }
          }
        },
        yAxis: {
          type: 'category',
          //   boundaryGap: false,
          data: datax,
          // data: ['外观设计', '实用新型', '发明专利'],
          // show: false,
          //   axisLabel: {
          //     show: false
          //   },
          axisLine: {
            show: false, // 取消坐标轴
            lineStyle: {
              color: '#A0A4AA'
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
            barWidth: 12,
            barGap: 10,
            barCategoryGap: 10,
            itemStyle: {
              normal: {
                // label: {
                //     show: true,
                //     position: 'right',
                //     textStyle: {
                //         color: '#000'
                //     }
                // },
                color: '#5B8FF9'
              }
            },
            emphasis: {
              color: '#5B8FF9'
            },
            data: datay
            // data: [300, 160, 500]
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barChart'))
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    createRing(tdata, datas) {
      var ringOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          top: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#ccc',
            fontSize: '12'
          },
          data: tdata
          // data: ['在审', '有效', '失效']
        },
        color: ['#00DABE', '#254EC9', '#008DDA', '#379dea'],
        series: [
          {
            name: '申请量',
            center: ['50%', '60%'],
            type: 'pie',
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outside',
                formatter: '{c}件',
                textStyle: {
                  color: '#ccc'
                }
              }
            //   emphasis: {
            //     show: true,
            //     textStyle: {
            //         fontSize: '14',
            //         color: '#fff'
            //     }
            //   }
            },
            labelLine: {
              normal: {
                length: 2,
                lineStyle: {
                  color: '#ccc'
                }
              }
            },
            data: datas
            // data: [
            //     { name: '在审', value: 500 },
            //     { name: '有效', value: 300 },
            //     { name: '失效', value: 800 }
            // ]
          }
        ]
      }

      var ringCharts = echarts.init(document.getElementById('ringchart'))
      ringCharts.setOption(ringOption)
    },
    createBars() {
      var barChartOption = {
        // title: {
        //   text: '专利申请',
        //   left: 0,
        //   top: 0,
        //   textStyle: {
        //     align: 'left',
        //     fontSize: 14,
        //     color: '#333'
        //   }
        // },
        // color: ['#5B8FF9'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 0,
          right: 50,
          top: 0,
          bottom: 20,
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
            lineStyle: {
              color: '#f4f4f4'
            }
            // show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false, // 取消坐标轴
            lineStyle: {
              color: '#A0A4AA'
              // width:'2'
            }
          }
        },
        yAxis: {
          type: 'category',
          //   boundaryGap: false,
          data: this.zhdatax,
          // data: ['专利转让', '专利许可', '专利质押'],
          // show: false,
          //   axisLabel: {
          //     show: false
          //   },
          axisLine: {
            show: false, // 取消坐标轴
            lineStyle: {
              color: '#A0A4AA'
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
            barWidth: 20,
            barGap: 20,
            barCategoryGap: 20,
            itemStyle: {
              normal: {
                label: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: '#333'
                    }
                },
                color: '#5B8FF9'
              }
            },
            emphasis: {
              color: '#5B8FF9'
            },
            data: this.zhdatay
            // data: [300, 160, 500]
          }
        ]
      }
      var barChart = echarts.init(document.getElementById('barCharts'))
      barChart.setOption(barChartOption)
      window.onresize = function() {
        barChart.resize()
      }
    },
    createSpecBar() {
      var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          data: ['外观设计', '实用新型', '发明']
        },
        // color: ['#5D7092', '#5AD8A6', '#5B8FF9'],
        grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                  show: false // 取消刻度
                },
                axisLine: {
                  show: false, // 取消坐标轴
                  lineStyle: {
                    color: '#A0A4AA'
                    // width:'2'
                  }
                },
                axisLabel: {
                  interval: 0,
                  rotate: 30
                },
                data: this.rdteamx
                // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', '天天', '超然', '不大']
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                  show: false // 取消刻度
                },
                axisLine: {
                  show: false, // 取消坐标轴
                  lineStyle: {
                    color: '#A0A4AA'
                    // width:'2'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#f4f4f4'
                  }
                  // show: false
                }
            }
        ],
        series: [
            {
                name: '外观设计',
                type: 'bar',
                stack: 'true',
                barWidth: 12,
                color: '#5D7092',
                data: this.rdteamwg
                // data: [320, 332, 301, 334, 390, 330, 320, 980, 630, 500]
            },
            {
                name: '实用新型',
                type: 'bar',
                stack: 'true',
                color: '#5AD8A6',
                barWidth: 12,
                data: this.rdteamsy
                // data: [120, 132, 101, 134, 90, 230, 210, 400, 600, 500]
            },
            {
                name: '发明',
                type: 'bar',
                stack: 'true',
                color: '#5B8FF9',
                barWidth: 12,
                data: this.rdteamfm
                // data: [220, 182, 191, 234, 290, 330, 310, 300, 700, 620]
            }
            
        ]
      }
      var specbar = echarts.init(document.getElementById('specbarchart'))
      specbar.setOption(option)
    },
    ringschange() {
      if (this.leftcur === 1) {
        this.createRing(this.ringtypea, this.allpatent)
        this.ringtotal = this.allpatentcount
      }
      if (this.leftcur === 2) {
        this.createRing(this.ringtypeb, this.fmpatent)
        this.ringtotal = this.fmpatentcount
      }
      if (this.leftcur === 3) {
        this.createRing(this.ringtypec, this.sypatent)
        this.ringtotal = this.sypatentcount
      }
      if (this.leftcur === 4) {
        this.createRing(this.ringtyped, this.wgpatent)
        this.ringtotal = this.wgpatentcount
      }
    },
    ptypechange() {
      if (this.cur === 'zl') {
        this.ptotal = this.viewdatad
        this.percent = this.viewdatap
        this.bartitle = '专利申请'
        this.createBar(this.viewdatax, this.viewdatay)
      }
      if (this.cur === 'sq') {
        this.ptotal = this.sviewdatad
        this.percent = this.sviewdatap
        this.bartitle = '授权专利'
        this.createBar(this.sviewdatax, this.sviewdatay)
      }
    }
  },
  created() {
    this.assessId = this.$route.params.id
  },
  watch: {
    leftcur() {
      this.ringschange()
    },
    cur() {
      this.ptypechange()
    }
  },
  mounted() {
    this.getdetail()
  }
}
</script>
<style lang="less" scoped>
.companyevaluation {
  overflow: hidden;
  background-color: #F2F2F2;
  font-family: 'PingFangSC-Semibold', 'PingFang SC';
  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  .fr {
    float: right;
  }
  .topsearchtitle {
    padding: 15px;
    background-color: #fff;
    margin-bottom: 6px;
    > h3 {
      float: left;
      margin-right: 20px;
      line-height: 30px;
      font-size: 16px;
      color: #333;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .indicators {
      position: relative;
      float: left;
      line-height: 30px;
      font-size: 12px;
      color: #666;
      /*.infos {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 20px;
        border: 1px solid #fff;
        border-radius: 50%;
        color: #fff;
        font-style: normal;
        font-size: 14px;
        text-align: center;
        line-height: 16px;
      }
      .intrs {
        position: absolute;
        right: -490px;
        top: 0px;
        width: 486px;
        height: 450px;
        z-index: 2000;
        padding: 25px 30px 0;
        background: rgba(51, 51, 51, 0.8);
        color: #fff;
        > p {
          line-height: 20px;
          margin-bottom: 25px;
          font-size: 14px;
        }
      }
      */
    }
    .companyname {
      width: 100%;
      font-size: 0;
      > input {
          width: 220px;
          border: 1px solid #ccc;
          border-radius: 2px 0 0 2px;
          padding: 5px;
          line-height: 24px;
          font-size: 14px;
      }
      .bluebtn {
          display: inline-block;
          width: 80px;
          height: 36px;
          text-align: center;
          line-height: 36px;
          font-size: 14px;
          background-color: #2F72D1;
          color: #fff;
          border-radius: 0 2px 2px 0;
      }
    }
  }
  .searchconts {
    background-color: #fff;
    .overview {
      height: 32px;
      padding: 0 15px;
      margin-bottom: 6px;
      > h3 {
        font-size: 0;
        color: #333;
        line-height: 32px;
        > span {
          vertical-align: middle;
          font-size: 16px;
        }
        .new {
          display: inline-block;
          height: 18px;
          margin-left: 10px;
          padding: 0 10px;
          line-height: 16px;
          color: #2f72d1;
          border: 1px solid #2f72d1;
          border-radius: 8px;
          font-size: 12px;
        }
      }
      .viewmsg {
        float: right;
        text-align: center;
        > span {
          display: inline-block;
          width: 128px;
          height: 32px;
          line-height: 32px;
          border: 1px solid #2f72d1;
          margin-left: 12px;
          color: #2f72d1;
          font-size: 14px;
          vertical-align: middle;
          cursor: pointer;
        }
      }
    }
    .viewcont {
      padding: 0 15px;
      margin-bottom: 6px;
      .itemallnum {
        display: inline-block;
        width: 150px;
        height: 75px;
        padding-top: 15px;
        border: 1px solid #2f72d1;
        margin-right: 20px;
        color: #2f72d1;
        text-align: center;
        &.active {
          background-color: #2f72d1;
          color: #fff;
          > h3 {
            color: #fff;
          }
        }
        > h3 {
          line-height: 30px;
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #2f72d1;
        }
        > p {
          font-size: 14px;
          line-height: 22px;
        }
      }
      .echartsmsg {
        overflow: hidden;
        padding-top: 15px;
        .echartsbox {
          float: left;
          width: 180px;
        }
        .eachdata {
          float: left;
          width: 80px;
          padding-top: 6px;
          font-size: 12px;
          color: #a0a4aa;
          > li {
            line-height: 17px;
            margin-bottom: 22px;
            &:last-child {
              margin-bottom: 0;
            }
          }
          .headli {
            font-size: 14px;
            margin-bottom: 15px;
            color: #333;
          }
        }
      }
    }
  }
  .searchdetail {
    .sortsbox {
      height: 34px;
      margin-bottom: 20px;
      .sortsbtn {
        font-size: 0;
        > span {
          display: inline-block;
          height: 34px;
          margin-right: 30px;
          padding: 0 12px;
          line-height: 34px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
        }
        span.active {
          background-color: #2f72d1;
          color: #fff;
        }
      }
    }
    .commonconts {
      padding-bottom: 15px;
      background-color: #fff;
      margin-bottom: 6px;
      .leftnav {
        padding: 10px 15px;
        height: 30px;
        > li {
          float: left;
          height: 30px;
          width: 80px;
          line-height: 30px;
          text-align: center;
          margin-right: 5px;
          cursor: pointer;
          color: #333;
          font-size: 14px;
          &.active {
            background-color: #6198e7;
            color: #fff;
          }
        }
      }
      .rightcharts {
        position: relative;
        padding: 0 15px;
        height: 240px;
        .ring {
          width: 240px;
          height: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        .zongshu {
          position: absolute;
          left: 50%;
          top: 96px;
          width: 96px;
          height: 96px;
          margin-left: -48px;
          border-radius: 50%;
          font-size: 16px;
          color: #333;
          line-height: 96px;
          text-align: center;
          overflow: hidden;
        }
      }
    }
    .workings {
        padding: 10px 15px;
        background-color: #fff;
        margin-bottom: 6px;
        .topbarbox {
            padding-bottom: 10px;
            > h3 {
                margin-bottom: 20px;
                font-size: 14px;
                color: #000;
                line-height: 20px;
                font-weight: normal;
                text-align: center;
            }
            .barboxs {
                width: 300px;
                height: 130px;
                margin-left: auto;
                margin-right: auto;
            }
            .bluenum {
              color: #2F72D1;
            }
        }
        .workingsitembox {
          width: 100%;
        }
        .workingsitem {
          margin-bottom: 12px;
          font-size: 14px;
            > h3 {
                line-height: 22px;
                font-size: 14px;
                font-weight: 500px;
                margin-bottom: 10px;
            }
            li {
              overflow: hidden;
                line-height: 20px;
                margin-bottom: 6px;
                &:last-child {
                    margin-bottom: 0;
                }
                span {
                    float: left;
                }
            }
            .cname {
                max-width: 280px;
            }
            .pnum {
                float: right;
            }
        }
    }
    .industryfield {
      padding: 10px 15px;
      background-color: #fff;
      margin-bottom: 6px;
      .fieldtitle {
        margin-bottom: 12px;
        margin-top: 12px;
        line-height: 20px;
        color: #333;
        font-size: 16px;
        font-weight: 600
      }
      .fieldintr {
        margin-bottom: 15px;
        line-height: 20px;
        font-size: 14px;
        color: #333;
      }
      .headbox {
        height: 30px;
        line-height: 30px;
        background-color: #6198E7;
        color: #fff;
        font-size: 14px;
      }
      .xuhao {
        float: left;
        width: 40px;
        text-align: center;
        font-size: 12px
      }
      .leiming {
        float: left;
        width: 200px;
        text-align: center;
        font-size: 12px
      }
      .jianshu {
        float: right;
        width: 100px;
        text-align: center;
        font-size: 12px
      }
      .fieldlist {
        
        border: 1px solid #F2F2F2;
        border-top: none;
        > li {
          padding: 6px 0;
          line-height: 20px;
          color: #333;
          overflow:hidden
        }
      }
    }
    .devteam {
      padding: 10px 15px;
      background-color: #fff;
      margin-bottom: 6px;
      .teamtitle {
        margin-bottom: 12px;
        line-height: 25px;
        color: #333;
        font-size: 16px;
        font-weight: 600
      }
      .teamintr {
        margin-bottom: 12px;
        line-height: 20px;
        font-size: 14px;
        color: #333;
      }
      .specbar {
        height: 180px;
      }
    }
  }
  .barbox {
    width: 100%;
    height: 150px;
  }
  .nodatabox {
    border: 1px solid #f5f5f5;
    font-size: 16px;
    text-align: center;
    line-height: 100px;
  }
}
</style>
