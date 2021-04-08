<template>
    <div class="patentnavsysteminfo">
        <div>
        <div class="topbgbox">
            <div class="topcont">
                <div class="techname">
                    <div class="picbox">
                        <img :src="info.coverUrl" alt="" />
                    </div>
                    <div class="techmsg">
                        <h3>{{ info.title }}</h3>
                        <p>更新时间：{{ info.updateTime | dateFormat }}</p>
                        <div class="shortintr">简介：</div>
                        <p class="shortmsg">{{ info.brief }}</p>
                    </div>
                </div>
                <!-- <div class="tonavdata" @click="todetail">
                    查看导航数据库
                </div> -->
            </div>
        </div>
        <div class="searchtypebox">
            <div class="searchtype">
                <div class="searchitem">
                    <h3>一级分支</h3>
                    <ul>
                        <li :class="{ active: nowf === 0 }" @click="changef(0, null)">全部</li>
                        <li :class="{ active: nowf === item.id }" @click="changef(item.id, item.name)" v-for="item in fbranch" :key="item.id">{{item.name}}</li>
                    </ul>
                </div>
                <div class="searchitem">
                    <h3>二级分支</h3>
                    <ul>
                        <li :class="{ active: nows === 0 }" @click="changes(0, null)">全部</li>
                        <li :class="{ active: nows === item.id }" @click="changes(item.id, item.id)" v-for="item in sbranch" :key="item.id">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="chartsbox">
            <div class="applytrend">
                <h3 class="bigtit">申请趋势</h3>
                <div class="areatab">
                    <span :class="{ active: area === '1' }" @click="changearea('1')">全球</span>
                    <span :class="{ active: area === '2' }" @click="changearea('2')">国内</span>
                </div>
                <div class="trendchartsbox">
                    <div id="trendChart" class="trendchart"></div>
                    <div id="pieChart" class="piechart"></div>
                </div>
            </div>
            <div class="applytrend">
                <h3 class="bigtit">技术来源与目标市场</h3>
                <div class="trendchartsbox">
                    <div class="piechartjsbox">
                        <div id="pieChartjs" class="piechartjs"></div>
                        <div class="textbox">技术来源</div>
                    </div>
                    <div class="piechartscbox">
                        <div id="pieChartsc" class="piechartsc"></div>
                        <div class="textbox">目标市场</div>
                    </div>
                </div>
            </div>
            <div class="applytrend">
                <h3 class="bigtit">权利人排行</h3>
                <div class="areatab">
                    <span :class="{ active: areab === '1' }" @click="changeareab('1')">全球</span>
                    <span :class="{ active: areab === '2' }" @click="changeareab('2')">国内</span>
                </div>
                <div class="trendchartsbox">
                    <div id="rightschart" class="rightschart"></div>
                </div>
            </div>
            <div class="applytrend">
                <h3 class="bigtit">国内各省排名</h3>
                <div class="trendchartsbox">
                    <div id="pmchart" class="rightschart"></div>
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
const fzUrl = '/api/findTechBranch'
const detailUrl = '/api/findPatentArticleDetail/{number}'
const dataUrl = '/api/findMatchNavigationStatistic'
export default {
    data() {
        return {
            nowf: 0,
            nows: 0,
            nowfn: '',
            nowsn: '',
            area: '1',
            areab: '1',
            loading: false,
            fbranch: [],
            sbranch: [],
            number: '',
            info: {},
            gyeardata: [], 
            gpatentdata: [], // 全球专利申请量
            cyeardata: [],
            cpatentdata: [], // 国内专利申请量
            gfdata: [], // 全球一级分支
            cfdata: [], // 国内一级分支
            techdata: [], // 技术来源国
            marketdata: [], // 目标市场
            grightdata: [], // 全球权利人
            grightdatan: [],
            crightdata: [], // 国内权利人 
            crightdatan: [],
            provincedata: [], // 国内省
            provincedatan: []
        }
    },
    created() {
        this.number = this.$route.params.id
        this.getDetail()
        this.getbranch()
        
    },
    mounted() {
        this.getalldata()
        
    },
    methods: {
        todetail() {
            const url = `/portal/feature-service/industry-info/${this.number}`
            window.open(url)
            // this.$router.push({ name: 'IndustryInfo', params: { id: this.number } })
        },
        getbranch() {
            const data = {
                number: this.number
            }
            this.$shttp.get(fzUrl, { params: data }).then(res => {
                this.fbranch = res.firstBranch
                this.sbranch = res.secondBranch
            })
        },
        getDetail() {
            this.$shttp.get(detailUrl.replace('{number}', this.number)).then(res => {
                this.info = res || {}
            })
        },
        getalldata() {
            const data = {
                number: this.number
            }
            if (this.nowfn) {
                data.firstBranch = this.nowfn
            }
            if (this.nowsn) {
                data.secondBranch = this.nowsn
            }
            this.loading = true
            this.$shttp.get(dataUrl, { params: data }).then(res => {
                this.loading = false
                // 全球专利申请
                const gpdataobj = res.globalPatentYearCountMap
                const gpdata = []
                const gpdatay = []
                // 国内专利申请
                const cpdataobj = res.domesticPatentYearCountMap
                const cpdata = []
                const cpdatay = []
                // 全球一级分支占比
                const gfdataobj = res.globalTechBranchRatioMap
                const gfdata = []
                // 国内一级分支占比
                const cfdataobj = res.domesticTechBranchRatioMap
                const cfdata = []
                // 技术来源国
                const techdataobj = res.techSrcCountryRatioMap
                const techdata = []
                // 目标市场
                const marketdataobj = res.destMarketCountryRatioMap
                const marketdata = []
                // 全球权利人排行
                const grightdataobj = res.globalObligeeRankingMap
                const grightdata = []
                const grightdatan = []
                // 国内权利人排行
                const crightdataobj = res.domesticObligeeRankingMap
                const crightdata = []
                const crightdatan = []
                // 国内各省排行
                const provincedataobj = res.provinceRankingMap
                const provincedata = []
                const provincedatan = []

                for (const k in gpdataobj) {
                    gpdata.push(gpdataobj[k])
                    gpdatay.push(k)
                }
                for (const k in cpdataobj) {
                    cpdata.push(cpdataobj[k])
                    cpdatay.push(k)
                }
                for (const k in gfdataobj) {
                    gfdata.push({
                        name: k,
                        value: gfdataobj[k],
                        label: {
                            formatter: '{d}%'
                        }
                    })
                }
                for (const k in cfdataobj) {
                    cfdata.push({
                        name: k,
                        value: cfdataobj[k],
                        label: {
                            formatter: '{d}%'
                        }
                    })
                }
                for (const k in techdataobj) {
                    techdata.push({
                        name: k,
                        value: techdataobj[k],
                        label: {
                            formatter: '{d}%'
                        }
                    })
                }
                for (const k in marketdataobj) {
                    marketdata.push({
                        name: k,
                        value: marketdataobj[k],
                        label: {
                            formatter: '{d}%'
                        }
                    })
                }
                for (const k in grightdataobj) {
                    grightdata.push(grightdataobj[k])
                    grightdatan.push(k)
                }
                for (const k in crightdataobj) {
                    crightdata.push(crightdataobj[k])
                    crightdatan.push(k)
                }
                for (const k in provincedataobj) {
                    provincedata.push(provincedataobj[k])
                    provincedatan.push(k)
                }
                // 全球专利申请量
                this.gyeardata = gpdatay
                this.gpatentdata = gpdata
                // 国内专利申请量
                this.cyeardata = cpdatay
                this.cpatentdata = cpdata
                // 全球一级分支
                this.gfdata = gfdata
                // 国内一级分支
                this.cfdata = cfdata
                // 技术来源国
                this.techdata = techdata
                // 目标市场
                this.marketdata = marketdata
                // 全球权利人
                this.grightdata = grightdata.reverse()
                this.grightdatan = grightdatan.reverse()
                // 国内权利人
                this.crightdata = crightdata.reverse()
                this.crightdatan = crightdatan.reverse()
                // 国内省
                this.provincedata = provincedata.reverse()
                this.provincedatan = provincedatan.reverse()
                if (this.area === '1') {
                    this.createStack(gpdatay, gpdata)
                    this.createPie(gfdata)
                }
                if (this.area === '2') {
                    this.createStack(cpdatay, cpdata)
                    this.createPie(cfdata)
                }
                this.createPiejs(techdata)
                this.createPiesc(marketdata)
                if (this.areab === '1') {
                    this.createBar(grightdatan, grightdata)
                }
                if (this.areab === '2') {
                    this.createBar(crightdatan, crightdata)
                }
                
                this.createBars(provincedatan, provincedata)
            }).catch(err => {
                this.loading = false
                this.$message.error(err.response.data.msg || '获取数据失败')
            })
        },
        changef(n, na) {
            this.nowf = n
            this.nowfn = na
            this.getalldata()
        },
        changes(n, na) {
            this.nows = n
            this.nowsn = na
            this.getalldata()
        },
        changearea(n) {
            this.area = n
            if (this.area === '1') {
                this.createStack(this.gyeardata, this.gpatentdata)
                this.createPie(this.gfdata)
            }
            if (this.area === '2') {
                this.createStack(this.cyeardata, this.cpatentdata)
                this.createPie(this.cfdata)
            }
        },
        changeareab(n) {
            this.areab = n
            if (this.areab === '1') {
                this.createBar(this.grightdatan, this.grightdata)
            }
            if (this.areab === '2') {
                this.createBar(this.crightdatan, this.crightdata)
            }
        },
        createStack(yeardata, ndata) {
            var stackOption = {
                title: {
                text: '专利申请数量',
                left: '20',
                top: '20',
                textStyle: {
                    fontSize: '14',
                    fontWeight: 'normal',
                    color: '#ccc'
                }
                },
                tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
                },
                color: ['#008DDA'], // 折线颜色
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
                        color: '#ccc'
                    }
                    },
                    boundaryGap: false,
                    axisLabel: {
                    textStyle: {
                        color: '#ccc'
                    }
                    },
                    data: yeardata
                    // data: ['2012', '2013', '2014', '2015', '2016', '2017']
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
                        color: '#ccc'
                    }
                    },
                    axisLabel: {
                    textStyle: {
                        color: '#ccc'
                    }
                    },
                    splitLine: {
                    show: false
                    }
                }
                ],
                series: [
                    {
                        name: '专利申请数量',
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
                        data: ndata
                        // data: [200, 300, 500, 900, 500, 600]
                    }
                ]
                
            }
            var stackCharts = echarts.init(document.getElementById('trendChart'), 'shine')
            stackCharts.setOption(stackOption)
            window.onresize = function() {
                stackCharts.resize()
            }
        },
        createPie(sdata) {
            var option = {
                title: {
                    text: '',
                    textStyle: {
                        color: '#235894'
                    }
                },
                legend: {
                    top: '10',
                    textStyle: {
                        fontSize: '12',
                        color: '#ccc'
                    },
                    itemWidth: 15,
                    itemHeight: 15 // 图例标记的图形高度
                    // show: false,
                    // data: [
                    //     { name: '国内', icon: 'line' },
                    //     { name: '福建', icon: 'line' },
                    //     { name: '厦门', icon: 'line' }
                    // ]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                series: [{
                    name: 'pie',
                    type: 'pie',
                    radius: '50%',
                    // selectedMode: 'single',
                    // selectedOffset: 30,
                    // clockwise: true,
                    label: {
                        fontSize: 14
                    },
                    labelLine: {
                        show: false,
                        length: 3,
                        length2: 2
                    },
                    data: sdata,
                    // data: [
                    //     { 
                    //         value: 335, 
                    //         name: '背板控制', 
                    //         label: {
                    //             formatter: '{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 310, 
                    //         name: '外延芯片',
                    //         label: {
                    //             formatter: '{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 234,
                    //         name: '应用',
                    //         label: {
                    //             formatter: '{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 135, 
                    //         name: '转移工艺',
                    //         label: {
                    //             formatter: '{d}%'
                    //         }
                    //     }
                    // ],
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor: '#fff'
                        }
                    }
                }]
            }
            var pieChart = echarts.init(document.getElementById("pieChart"), 'shine')
            pieChart.setOption(option)
        },
        createPiejs(sdata) {
            var option = {
                title: {
                    text: '',
                    textStyle: {
                        color: '#235894'
                    }
                },
                legend: {
                    top: '10',
                    textStyle: {
                        fontSize: '12',
                        color: '#ccc'
                    },
                    itemWidth: 15,
                    itemHeight: 15, // 图例标记的图形高度
                    show: false
                    // data: [
                    //     { name: '国内', icon: 'line' },
                    //     { name: '福建', icon: 'line' },
                    //     { name: '厦门', icon: 'line' }
                    // ]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                series: [{
                    name: 'pie',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    // selectedMode: 'single',
                    // selectedOffset: 30,
                    // clockwise: true,
                    label: {
                        fontSize: 14
                    },
                    labelLine: {
                        show: false,
                        length: 6,
                        length2: 4
                    },
                    // data: [
                    //     { 
                    //         value: 335, 
                    //         name: '背板控制', 
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 310, 
                    //         name: '外延芯片',
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 234,
                    //         name: '应用',
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 135, 
                    //         name: '转移工艺',
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     }
                    // ],
                    data: sdata,
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor: '#fff'
                        }
                    }
                }]
            }
            var pieChart = echarts.init(document.getElementById("pieChartjs"), 'shine')
            pieChart.setOption(option)
        },
        createPiesc(sdata) {
            var option = {
                title: {
                    text: '',
                    textStyle: {
                        color: '#235894'
                    }
                },
                legend: {
                    top: '10',
                    textStyle: {
                        fontSize: '12',
                        color: '#ccc'
                    },
                    itemWidth: 15,
                    itemHeight: 15, // 图例标记的图形高度
                    show: false
                    // data: [
                    //     { name: '国内', icon: 'line' },
                    //     { name: '福建', icon: 'line' },
                    //     { name: '厦门', icon: 'line' }
                    // ]
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} ({d}%)'
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true
                },
                series: [{
                    name: 'pie',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    // selectedMode: 'single',
                    // selectedOffset: 30,
                    // clockwise: true,
                    label: {
                        fontSize: 14
                    },
                    labelLine: {
                        show: false,
                        length: 6,
                        length2: 4
                    },
                    // data: [
                    //     { 
                    //         value: 335, 
                    //         name: '背板控制', 
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 310, 
                    //         name: '外延芯片',
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 234,
                    //         name: '应用',
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     },
                    //     { 
                    //         value: 135, 
                    //         name: '转移工艺',
                    //         label: {
                    //             formatter: '{b}\n{d}%'
                    //         }
                    //     }
                    // ],
                    data: sdata,
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor: '#fff'
                        }
                    }
                }]
            }
            var pieChart = echarts.init(document.getElementById("pieChartsc"), 'shine')
            pieChart.setOption(option)
        },
        createBar(xdata, ydata) {
            var barChartOption = {
                title: {
                text: '权利人排行',
                show: false,
                left: 20,
                top: 20,
                textStyle: {
                    align: 'center',
                    fontSize: 14,
                    color: '#333'
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
                    // show: false
                    lineStyle: {
                        color: '#f2f2f2'
                    }
                },
                axisLine: {
                    // show: false,// 取消坐标轴
                    lineStyle: {
                    color: '#f2f2f2'
                    // width:'2'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#666'
                    }
                }
                },
                yAxis: {
                type: 'category',
                // boundaryGap: false,
                data: xdata,
                // data: ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
                
                // show: false,
                // axisLabel:{
                //     show: false
                // },
                axisLine: {
                    // show: false,// 取消坐标轴
                    lineStyle: {
                    color: '#f2f2f2'
                    // width: '2'
                    }
                    
                },
                axisLabel: {
                    textStyle: {
                        color: '#666'
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
                    data: ydata
                    // data: [500, 300, 400,300,200,100,200,350,260,160]
                }
                ]
            }
            var barChart = echarts.init(document.getElementById('rightschart'), 'shine')
            barChart.setOption(barChartOption)
            window.onresize = function() {
                barChart.resize()
            }
        },
        createBars(xdata, ydata) {
            var barChartOption = {
                title: {
                text: '国内各省排名',
                show: false,
                left: 20,
                top: 20,
                textStyle: {
                    align: 'center',
                    fontSize: 14,
                    color: '#333'
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
                    show: false,
                    lineStyle: {
                        color: '#f2f2f2'
                    }
                },
                axisLine: {
                    // show: false,// 取消坐标轴
                    lineStyle: {
                    color: '#f2f2f2'
                    // width:'2'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#666'
                    }
                }
                },
                yAxis: {
                type: 'category',
                // boundaryGap: false,
                data: xdata,
                // data: ['一千元', '打发', '奥迪','爱的', '奋斗', '说的','是对','深度','发到','手段'],
                
                // show: false,
                // axisLabel:{
                //     show: false
                // },
                axisLine: {
                    // show: false,// 取消坐标轴
                    lineStyle: {
                    color: '#f2f2f2'
                    // width: '2'
                    }
                    
                },
                axisLabel: {
                    textStyle: {
                        color: '#666'
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
                    data: ydata
                    // data: [500, 300, 400,300,200,100,200,350,260,160]
                }
                ]
            }
            var barChart = echarts.init(document.getElementById('pmchart'), 'shine')
            barChart.setOption(barChartOption)
            window.onresize = function() {
                barChart.resize()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.patentnavsysteminfo {
    background-color: #f5f5f5;
    h3, p, ul, li {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .topbgbox {
        // height: 200px;
        background-color: #fff;
        color: #999;
        .topcont {
            display: flex;
            padding: 10px 15px;
            justify-content: space-between;
            align-items: center;
        }
        .techname {
            display: flex;
            .picbox {
                width: 120px;
                height: 120px;
                background-color: #f5f5f5;
                margin-right: 20px;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .techmsg {
                font-size: 14px;
                max-width: 200px;
                > h3 {
                    font-size: 16px;
                    line-height: 20px;
                    color: #333;
                    margin-bottom: 6px;
                }
                > p {
                    font-size: 12px;
                    line-height: 20px;
                }
                .shortintr {
                    padding-top: 30px;
                    line-height: 20px;
                }
                .shortmsg {
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-break: break-all;
                    max-height: 40px;
                    line-height: 20px;
                }
            }
        }
        .tonavdata {
            height: 40px;
            padding: 0 10px;
            background-color: #379dea;
            color: #fff;
            cursor: pointer;
            line-height: 40px;
            font-size: 16px;
        }
    }
    .searchtypebox {
        // margin-bottom: 20px;
        // background-color: #F2F2F2;
        padding: 15px 15px;
        .searchtype {
            font-size: 12px;
            .searchitem {
                margin-bottom: 10px;
                overflow: hidden;
                &:last-child {
                    margin-bottom: 0;
                }
                > h3 {
                    padding: 0;
                    margin: 0;
                    width: 100px;
                    margin-bottom: 6px;
                    font-size: 12px;
                    color: #333;
                    line-height: 20px;
                }
                > ul {
                    overflow: hidden;
                    > li {
                        float: left;
                        padding: 0 10px;
                        height: 21px;
                        line-height: 21px;
                        margin-right: 6px;
                        margin-bottom: 6px;
                        border-radius: 2px;
                        &.active {
                            background-color: #379dea;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
    .bigtit {
        padding: 20px 30px;
        font-size: 16px;
        font-weight: normal;
    }
    .areatab {
        text-align: center;
        font-size: 0;
        > span {
            display: inline-block;
            width: 80px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #333;
            font-size: 14px;
            background-color: #f2f2f2;
            &.active {
                background-color: #379dea;
                color: #fff;
            }
        }
    }
    .chartsbox {
        padding: 15px;
        .applytrend {
            background-color: #fff;
            margin-bottom: 10px;
        }
        .trendchartsbox {
            
            .trendchart {
                width: 100%;
                height: 300px;
            }
            .piechart {
                width: 100%;
                height: 300px;
            }
            .rightschart {
                width: 100%;
                height: 800px;
            }
            .piechartjs,
            .piechartsc {
                width: 100%;
                height: 300px;
            }
            .piechartjsbox {
                position: relative;
                width: 100%;
                height: 300px;
            }
            .piechartscbox {
                position: relative;
                width: 100%;
                height: 300px;
            }
            .textbox {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                width: 120px;
                height: 120px;
                border-radius: 50%;
                font-size: 16px;
                text-align: center;
                line-height: 120px;
            }
        }
    }
}
</style>
