<template>
    <div class="patentassessinfobox">
        <div class="assessinfocont">
            <h3 class="assesstit">专利价值评估结果</h3>
            <div class="assessresult clearfix"  v-if="searchResultState === 'ready'">
                <div class="leftecharts">
                    <div class="patentmsg">
                        <span>{{info.applicationDocNum}}</span><span>{{info.title}}</span><span class="mark">{{info.patentType | ptypeFormat}}</span>
                    </div>
                    <div id="">
                        <div id="barChart" class="barbox"></div>
                    </div>
                    <div class="shouyi">
                        <span class="intr">近一年净收益</span> <span class="num">{{`￥${info.recentOneYearNetIncome}`}}</span><span class="intr">万元</span>
                    </div>
                </div>
                <div class="rightmoney">
                    <div class="shengyutit">专利剩余资产</div>
                    <div class="shengyuzichan">
                        <div class="zichan">
                            <p>约为</p>
                            <h3>{{info.patentRemainAssetLowerLimit | priceFormat}}~{{info.patentRemainAssetUpperLimit | priceFormat}}</h3>
                            <p>万元</p>
                            <!-- <span class="danwei">万元</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="loadingtips" v-if="searchResultState === 'loading'">
                <div class="tip_loading_img"></div>
                <div class="loadingtext">正在为您的专利资产进行评估，请稍等...</div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
const assessUrl = '/api/analysis/estimatePatentWorth'
export default {
    data() {
        return {
            searchResultState: '',
            msg: {
                patentNo: '',
                yearNetIncome: ''
            },
            xaxis: [],
            yaxis: [],
            info: {
                applicationDocNum: null,
                title: null,
                patentType: null,
                patentRemainAssetLowerLimit: null,
                patentRemainAssetUpperLimit: null,
                recentOneYearNetIncome: null
            }
        }
    },
    filters: {
        ptypeFormat: function(num) {
            const n = num - 0
            let ret = ''
            if (n === 1) {
                ret = '发明专利'
            }
            if (n === 2) {
                ret = '实用新型'
            }
            if (n === 3) {
                ret = '外观专利'
            }
            return ret
        },
        priceFormat: function(num) {
            const onumber = num - 0
            return onumber.toFixed(2)
        }
    },
    methods: {
        createBar() {
            var barChartOption = {
                title: {
                text: null,
                left: 0,
                top: 0,
                textStyle: {
                    align: 'left',
                    fontSize: 14,
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
                left: 30,
                right: 40,
                top: 10,
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
                // data: datax,
                data: ['周期', '产品', '市场', '法律', '技术'],
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
                                color: '#000'
                            }
                        },
                        color: '#5B8FF9'
                    }
                    },
                    emphasis: {
                    color: '#5B8FF9'
                    },
                    data: this.yaxis
                    // data: [12.11, 23.12, 12.23, 12.31, 87.04]
                }
                ]
            }
            var barChart = echarts.init(document.getElementById('barChart'))
            barChart.setOption(barChartOption)
            window.onresize = function() {
                barChart.resize()
            }
        },
        getdetail() {
            this.searchResultState = 'loading'
            this.$shttp.get(assessUrl, { params: this.msg }).then(res => {
                this.info = res
                this.searchResultState = 'ready'
                this.yaxis.push(res.techUpdateCycleScore - 0)
                this.yaxis.push(res.productUpdateCycleScore - 0)
                this.yaxis.push(res.marketScore - 0)
                this.yaxis.push(res.lawScore - 0)
                this.yaxis.push(res.techScore - 0)
                
                this.$nextTick(() => {
                    this.createBar()
                })
            }).catch(err => {
                this.searchResultState = 'ready'
                this.$messagesebe.error(err.response.data.msg || '未获取到相关专利信息，请重试')
            })
        }
    },
    created() {
        this.msg.patentNo = this.$route.params.num
        this.msg.yearNetIncome = this.$route.params.count
    },
    mounted() {
        this.getdetail()
    }
}
</script>

<style lang="less" scoped>
.patentassessinfobox {
    background-color: #f5f5f5;
    p,
    h3 {
        padding: 0;
        margin: 0;
    }
    .assessinfocont {
        padding-top: 20px;
        .assesstit {
            height:25px;
            padding: 0 15px;
            margin-bottom: 15px;
            font-size:18px;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:25px;

        }
        .assessresult {
            .leftecharts {
                height: 300px;
                padding: 15px 15px;
                margin-bottom: 6px;
                background-color: #fff;
                .patentmsg {
                    padding-bottom: 12px;
                    margin-bottom: 6px;
                    border-bottom: 1px solid #E9E9E9;
                    font-size: 0;
                    > span {
                        display: inline-block;
                        height: 20px;
                        font-size: 14px;
                        color: #333;
                        line-height: 20px;
                        margin-right: 20px;
                        max-width: 400px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        vertical-align: middle;
                        &.mark {
                            
                            height: 16px;
                            padding: 0 10px;
                            line-height: 16px;
                            font-size: 12px;
                            color: #2F72D1;
                            border: 1px solid #2F72D1;
                            border-radius: 8px;
                            text-align: center;
                            color: #2F72D1;
                        }
                    }
                }
                .barbox {
                    height: 210px;
                }
                .shouyi {
                    padding-top: 15px;
                    text-align: center;
                    font-size: 0;
                    > span {
                        display: inline-block;
                        vertical-align: bottom;
                        &.intr {
                            height: 16px;
                            line-height: 16px;
                            font-size: 14px;
                            color: #333;
                            margin-right: 16px;
                        }
                        &.num {
                            height: 30px;
                            line-height: 30px;
                            font-size: 30px;
                            color: #2F72D1;
                        }
                    }
                    
                }
            }
            .rightmoney {
                height: 300px;
                padding: 0 15px;
                background-color: #fff;
                .shengyutit {
                    padding-top: 15px;
                    margin-bottom: 15px;
                    text-align: center;
                    line-height: 30px;
                    color: #2F72D1;
                    font-size: 18px;

                }
                .shengyuzichan {
                    display: flex;
                    align-items: center;
                    width: 200px;
                    height: 200px;
                    margin-left: auto;
                    margin-right: auto;
                    border: 1px solid #2F72D1;
                    border-radius: 50%;
                    color: #2F72D1;
                    font-size: 14px;
                    .zichan {
                        margin: 0 auto;
                        text-align: center;
                        > p {
                            height: 20px;
                            line-height: 20px;
                        }
                        > h3 {
                            height: 30px;
                            line-height: 30px;
                            font-size: 26px;
                            color: #2F72D1;
                            .danwei {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
        }
        .loadingtips {
            padding-top: 40px;
            padding-bottom: 40px;
            background-color: #fff;
        }
        .loadingtext {
            font-size: 14px;
            text-align: center;
        }
        .tip_loading_img {
            height: 266px;
            margin-left: auto;
            margin-right: auto;
            background: url('../../../assets/img/loading.gif') center center no-repeat;
            background-size: 100%;
        }
    }
}
</style>

