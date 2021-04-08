<template>
    <div class="companyportraitlist">
        <div class="comWidth">
            <div class="topresult">
                <h3 class="result">企业信用详情</h3>
                <div class="companyname">
                  <input type="text" placeholder="请输入企业名称、统一社会信用代码" v-model="enterpriseName" >
                  <span class="bluebtn" @click="search(true)">搜索</span>
                </div>
            </div>
            <div class="companyinfobox">
                <div class="companyinfo">
                    <h3>{{info.enterpriseName}}</h3>
                    <p>统一社会信用代码：{{info.creditCode}}</p>
                    <p>组织机构代码：{{info.orgCode}}</p>
                    <p>法定代表人：{{info.legalPerson}}</p>
                    <p>经营范围：{{info.businessScope}}</p>
                </div>
                <!-- <div>
                    <div class="pingjia" @click="toevaluation">查看企业评价</div>
                    <div class="xinyong" @click="toportrait">查看企业画像</div>
                </div> -->
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
                <div class="credit">
                    <template v-if="xipopLegalPersonCredits.length">
                        <div v-for="(item, key) in xipopLegalPersonCredits" :key="key" class="itemcredit">
                            <h3 class="eachtitle">{{item.prompt}}</h3>
                            <div class="tablebox">
                                <table>
                                    <tbody>
                                        <tr class="headbox">
                                            <td class="wenhao"  v-for="(tit,k) in item.titles" :key="k" :class="{xuke: tit === '许可内容'}">{{tit}}</td>
                                        </tr>
                                        <tr class="wenzi">
                                            <td class="wenhao" v-for="(cont,k) in item.columns" :key="k">{{cont}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>      
                        </div>
                    </template>
                </div>
                <div class="black" v-if="sortsnow === 2" key="d">
                    <div class="headbox">
                        <span class="xuhao">序号</span>
                        <span class="xuhao">备注</span>
                        <span class="xuhao">法人姓名</span>
                        <span class="jigou">法人证件号</span>
                        <span class="jigou">黑名单事项</span>
                        <span class="xuhao">列入事由</span>
                        <span class="xuhao">列入依据</span>
                        <span class="riqi">列入名单日期</span>
                        <span class="rjigou">认定机构</span>
                        <span class="xuhao">公示期限</span>
                        <span class="leixing">信用类型</span>
                        <span class="riqi">生效时间</span>
                    </div>
                    <ul class="fieldlist" v-if="xipopEnterpriseBlacklists.length">
                        <li v-for="item in xipopEnterpriseBlacklists" :key="item.id" class="clearfix">
                            <span class="xuhao">{{item.seqNo}}</span>
                            <span class="xuhao">{{item.bz}}</span>
                            <span class="xuhao">{{item.fddbrxm}}</span>
                            <span class="jigou">{{item.fddbrzjhm}}</span>
                            <span class="jigou">{{item.hmdsxmc}}</span>
                            <span class="xuhao"><span class="chakan" @click="openlook(item.lrmdsy, 1)">查看</span></span>
                            <span class="xuhao"><span class="chakan" @click="openlook(item.lrmdyj, 2)">查看</span></span>
                            <span class="riqi">{{item.lrmdrq}}</span>
                            <span class="rjigou">{{item.rdjg}}</span>
                            <span class="xuhao">{{item.expireDays}}</span>
                            <span class="leixing">{{item.grade}}</span>
                            <span class="riqi">{{item.beginTime}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="sebemask" v-if="loading">
            <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
        </div>
    </div>
</template>
<script>
const detailUrl = '/api/queryEnterpriseCreditDetail/{assessId}'
export default {
    data() {
        return {
            pgIndex: 1,
            pgCount: 10,
            total: 20,
            loading: false,
            dataList: [],
            sortsnow: 1,
            intrshow: false,
            xipopLegalPersonCredits: [],
            xipopEnterpriseBlacklists: [],
            sorts: [
                { id: 1, label: '企业法人信用信息' },
                { id: 2, label: '严重违法失信企业名单（黑名单）信息' }
                // { id: 3, label: '风险提示' }
            ],
            cur: 'zl',
            lookshow: false,
            looktitle: '查看列入事由',
            neirong: '',
            assessId: null,
            enterpriseName: '',
            info: {
                enterpriseName: '',
                businessScope: '',
                creditCode: '',
                legalPerson: '',
                orgCode: ''
            }
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
        this.$messagesebe.warning('请输入企业名称、统一社会信用代码查询')
        return
      }
      this.$router.push({ name: 'CompanyCreditList', params: { cn: this.enterpriseName } })
    },
    toevaluation() {
      const url = `/portal/feature-service/company-evaluationinfo/${this.assessId}`
      window.open(url)
    //   this.$router.push({ name: 'CompanyEvaluationInfo', params: { id: this.assessId } })
    },
    toportrait() {
      const url = `/portal/feature-service/company-portraitinfo/${this.assessId}`
      window.open(url)
    //   this.$router.push({ name: 'CompanyPortraitInfo', params: { id: this.assessId } })
    },
    changesort(it) {
      this.sortsnow = it.id
      this.$router.replace({ query: { cur: it.id } })
    },
    getdetail() {
      this.loading = true
      this.$shttp.get(detailUrl.replace('{assessId}', this.assessId)).then(resp => {
          this.loading = false
          this.info = resp
          this.xipopLegalPersonCredits = resp.xipopLegalPersonCredits
          this.xipopEnterpriseBlacklists = resp.xipopEnterpriseBlacklists
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    },
    openlook(it, n) {
        this.neirong = it
        if (n === 1) {
            this.looktitle = "查看列入事由"
        }
        if (n === 2) {
            this.looktitle = "查看列入依据"
        }
        this.lookshow = true
    }
  },
  created() {
    const now = this.$route.query.cur || 1
    this.sortsnow = now - 0
    this.assessId = this.$route.params.id
    
  },
  mounted() {
    this.getdetail()
  }
}
</script>

<style lang="less" scoped>
.companyportraitlist {
    background-color: #f5f5f5;
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    h3, p {
      padding: 0;
      margin: 0;
    }
    .topresult {
        padding: 12px 15px 15px;
        margin-bottom: 6px;
        background-color: #fff;
        overflow: hidden;
        .result {
            line-height: 30px;
            font-size: 16px;
            color: #333;
            font-weight: 600
        }
      .companyname {
        width: 100%;
        font-size: 0;
        > input {
            width: 220px;
            border: 1px solid #ccc;
            border-radius: 2px 0 0 2px;
            padding: 5px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            vertical-align: top;
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
            vertical-align: top;
            border-radius: 0 2px 2px 0;
        }
      }
    }
    .companyinfobox {
        padding: 15px;
        margin-bottom: 6px;
        font-size: 14px;
        color: #333;
        line-height: 20px;
        background-color: #fff;
        .companyinfo {
            > h3 {
                font-size: 16px;
                color: #333;
                line-height: 25px;
                margin-bottom: 15px;
                font-weight: 600;
            }
            > p {
                line-height: 18px;
                margin-bottom: 6px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        .xinyong,
        .pingjia {
            width: 160px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
        }
        .pingjia {
            margin-bottom: 16px;
            background-color: #6198E7;
        }
        .xinyong {
            background-color: #2F72D1;
        }
    }
    .nosearchdata {
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: #fff;
        color: #666;
    }
    .searchdetail {
        background-color: #fff;
        padding: 0 15px;
        .sortsbox {
            padding: 16px 0;
            border-bottom: 1px solid #f5f5f5;
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
            overflow: hidden;
            padding: 24px 0;
            background-color: #fff;
            .leftnav {
                float: left;
                padding-top: 26px;
                margin-right: 270px;
                > li {
                    height: 52px;
                    width: 158px;
                    margin-bottom: 30px;
                    line-height: 52px;
                    text-align: center;
                    cursor: pointer;
                    color: #333;
                    font-size: 16px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    &.active {
                        background-color: #6198e7;
                        color: #fff;
                    }
                }
            }
            .rightcharts {
                position: relative;
                float: left;
                height: 100%;
                .ring {
                width: 500px;
                height: 500px;
                }
                .zongshu {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 160px;
                height: 160px;
                margin-left: -80px;
                margin-top: -80px;
                border-radius: 50%;
                font-size: 22px;
                color: #333;
                line-height: 160px;
                text-align: center;
                overflow: hidden;
                }
            }
        }
        .credit {
            padding: 15px 0;
            background-color: #fff;
            .eachtitle {
                font-size: 14px;
                padding: 10px 0;
            }
            .tablebox {
                overflow-x: auto;
                font-size: 12px;
                table {
                    border-collapse: collapse;
                    border-spacing: 0;
                }
                
                tr, td {
                    margin: 0;
                }
                td {
                    border: 1px solid #ccc;
                }
                td.xuke {
                    min-width: 320px;
                }
            }
            .wenhao {
               min-width: 150px;
               line-height: 16px;
               padding: 5px;
               word-break: break-all;
               text-align: center; 
            }
            .fieldlist {
                margin-bottom: 20px;
                border: 1px solid #F2F2F2;
                border-top: none;
                > li {
                    padding: 6px 0;
                    line-height: 20px;
                    color: #333;
                }
            }
        }
        .black {
            padding: 24px 0;
            background-color: #fff;
            .headbox {
                height: 52px;
                line-height: 52px;
                background-color: #6198E7;
                color: #fff;
            }
            .xuhao {
                float: left;
                width: 60px;
                text-align: center;
            }
            .riqi {
                float: left;
                width: 120px;
                text-align: center;
            }
            .jigou {
                float: left;
                width: 140px;
                text-align: center;
            }
            .rjigou {
                float: left;
                width: 160px;
                text-align: center;
            }
            .leixing {
                float: left;
                width: 100px;
                text-align: center;
            }
            .chakan {
                color: #2F72D1;
                cursor: pointer;
            }
            .fieldlist {
                margin-bottom: 20px;
                border: 1px solid #F2F2F2;
                border-top: none;
                > li {
                    padding: 6px 0;
                    line-height: 20px;
                    color: #333;
                }
            }
        }
        
    }
}
</style>

