<template>
    <div class="serviceagent">
        <!-- <div class="topsearch">
            <div class="topsearchtitle">
                <h3>服务机构列表</h3>
                <div class="companyname">
                    <input type="text" placeholder="请输入机构名称检索" v-model="agency" >
                    <span class="bluebtn" @click="searchpage(true)">搜索</span>
                </div>
            </div>
        </div> -->
        <div class="cxTitles">
            <div :class="{active : actTit==1}" @click="actTit=1">专利代理机构查询</div>
            <!-- <div :class="{active : actTit==2}" @click="actTit=2">专利代理师查询</div> -->
        </div>
        <div class="searchs" v-if="actTit==1">
            <div>
                <span>机构名称 </span>
                <input class="elinp" type="text" v-model="institutionName" placeholder="请输入机构名称">
            </div>
            <div>
                <span>法定代表人 </span>
                <input class="elinp" type="text" v-model="legal" placeholder="请输入法定代表人">
            </div>
            <div>
                <span>机构代码 </span>
                <input type="text" class="elinp" v-model="institutionCode" placeholder="请输入机构代码">
            </div>
            <div class="searchBtn" @click="searchpage(true)">查询</div>
        </div>
        <div class="addrs" v-if="actTit==1">
            <span>地区</span>
            <div :class="{active:addrAct == 1}" @click="addrFn(1)">全部</div>
            <div :class="{active:addrAct == 2}" @click="addrFn(2)">厦门</div>
            <div :class="{active:addrAct == 3}" @click="addrFn(3)">其他</div>
        </div>
        <div class="searchs" v-if="actTit==2">
            <div>
                <span>姓名 </span>
                <input type="text" class="elinp" v-model="agent" placeholder="请输入姓名">
            </div>
            <div>
                <span>专业 </span>
                <input type="text" class="elinp" v-model="major" placeholder="请输入专业">
            </div>
            <div>
                <span>资格证号 </span>
                <input type="text" class="elinp" v-model="certificateNo" placeholder="请输入资格证号">
            </div>
            <div>
                <span>执业备案号 </span>
                <input type="text" class="elinp" v-model="professionNo" placeholder="请输入执业备案号">
            </div>
            <div class="searchBtn" @click="AgentFn">查询</div>
        </div>
        <div class="searchlist" >
            <div class="organizationList"  v-if="actTit==1">
                <div class="organizationTit">
                    <div>服务机构列表</div>
                </div>
                <div class="organizations">
                    <table border="1" cellpadding="0" cellspacing="0" class="organizationTables" v-if="total">
                        <thead class="organizationTheader">
                            <tr>
                                <!-- <th>机构代码</th> -->
                                <th>机构名称</th>
                                <!-- <th>机构状态</th> 
                                <th @click="sortFn(1)" class="soPor">
                                    成立年限
                                    <i class="el-icon-sort-down" :class="{ active: sort === 1 }"></i>
                                    <i class="el-icon-sort-up" :class="{ active: sort === 2 }"></i>
                                </th>
                                <th @click="sortFn(2)" class="soPor">
                                    专利代理师总数
                                    <i class="el-icon-sort-down" :class="{ active: sort === 4 }"></i>
                                    <i class="el-icon-sort-up" :class="{ active: sort === 3 }"></i>
                                </th> -->
                            </tr>
                        </thead>
                        <tbody class="organizationTbody">
                            <tr class="trCur" v-for="(item, index) in dataList" :key="index" >
                                <!-- <td>{{item.institutionCode}}</td> -->
                                <td class="links"  @click="toinfo(item)">{{item.institutionName}}<br>({{item.agentNumber}}名代理人)</td>
                                <!-- <td>{{item.institutionState}}</td>
                                <td>{{item.establishYear}}</td>
                                <td>{{item.agentNumber}}</td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mypagination" v-show="!loading && total > 10">
                    <van-pagination
                        v-model="pgIndex"
                        :total-items="total"
                        :items-per-page="pgCount"
                        @change="handleCurrentChange"
                        class="fr"
                    />
                </div>
            </div>
            <div class="nosearchdata" v-if="actTit==1 && !total && !loading">
                暂无数据
            </div>



            <div class="organizationList"  v-if="actTit==2">
                <div class="organizationTit">
                    <div>专利代理师列表</div>
                </div>
                <div class="organizations">
                    <table border="1" cellpadding="0" cellspacing="0" class="organizationTables" v-if="to2tal">
                        <thead class="organizationTheader">
                            <tr>
                                <th>姓名</th>
                                <th>性别</th>
                                <th>资格证号</th> 
                                <th>执业备案号</th>
                                <th>专业</th>
                                <th>机构名称</th>
                                <th>职业年限</th>
                                <th>是否取得律师执业资格</th>
                            </tr>
                        </thead>
                        <tbody class="organizationTbody">
                            <tr v-for="(item, index) in data2List" :key="index">
                                <td>{{item.agent}}</td>
                                <td>{{item.sex==1?'女':'男'}}</td>
                                <td>{{item.certificateNo}}</td>
                                <td>{{item.professionNo}}</td>
                                <td>{{item.major}}</td>
                                <td>{{item.agency}}</td>
                                <td>{{item.practiceYear}}</td>
                                <td>{{item.obtain==0?'否':item.obtain==1?'是':''}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="mypagination" v-show="!loading && to2tal > 10">
                    <van-pagination
                        v-model="pg2Index"
                        :total-items="to2tal"
                        :items-per-page="pg2Count"
                        @change="handleCurrent2Change"
                        class="fr"
                    />
                </div>
            </div>
            <div class="nosearchdata" v-if="actTit==2 && !to2tal && !loading">
                暂无数据
            </div>
            <div class="sebemask" v-if="loading">
                <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
const listUrl = '/api/findXipopInstitutionList'
const list2Url = '/api/findXipopAgentList'
export default {
    data() {
        return {
            actTit: 1,
            institutionName: '',
            legal: '',
            institutionCode: '',
            addrAct: 1,
            agent: '',
            major: '',
            certificateNo: '',
            professionNo: '',
            to2tal: '',
            data2List: [],
            pg2Count: 10,
            pg2Index: 1,

            sorts: [
                { id: 1, label: '代理人数', type: 2 }
            ],
            dataList: [],
            sort: 1, 
            loading: false,
            total: 0,
            now: 1,
            pgCount: 10,
            pgIndex: 1,
            agency: '',
            query: {}
        }
    },
    created() {
    },
    mounted() {
        this.getquery()
        this.searchpage()
        this.searchAgent()
    },
    methods: {
        handleCurrentChange(i) {
            this.pgIndex = i
            this.searchpage()
        },
        handleCurrent2Change(i){
            this.pg2Index = i
            this.searchAgent()
        },
        toinfo(it) {
            this.$router.push({ name: 'AgencyInfo', params: { id: it.institutionCode } })
        },
        getquery() {
            // const re = {}
            if (this.$route.query) {
                const q = this.$route.query
                for (var k in q) {
                    if (q.hasOwnProperty(k)) {
                        this['query'][k] = q[k]
                    }
                }
                if (q['sort']) {
                    this.sort = q['sort'] - 0
                }
                if (q['agency']) {
                    this.agency = q['agency']
                }
                
            }
        },
        AgentFn(){
            this.pg2Index = 1
            this.searchAgent()
        },
        searchAgent(){
            const reds = {}
            reds.pgIndex = this.pg2Index
            reds.pgCount = this.pg2Count
            // reds.zhsort = this.zhsort
            reds.agent = this.agent
            reds.major = this.major
            reds.certificateNo = this.certificateNo
            reds.professionNo = this.professionNo
            const query = Object.assign({}, reds)
            this.$router.replace({ query: query })
            this.getAgentList(query)
        },
        searchpage(isreset) {
            const ret = {}
            ret.pgIndex = isreset ? 1 : this.pgIndex
            ret.pgCount = this.pgCount
            ret.sort = this.sort
            ret.institutionName = this.institutionName
            ret.legal = this.legal
            ret.institutionCode = this.institutionCode
            if (this.addrAct !== 1) {
                if (this.addrAct === 2) {
                    ret.xiamen = '是'
                } else {
                    ret.xiamen = '否'
                }
            }
            const query = Object.assign({}, ret)
            this.$router.replace({ query: query })
            this.getOrderList(query)
        },
        addrFn(k) {
            this.addrAct = k
            this.searchpage(true)
        },
        sortFn(k){
            if (k === 1) {
                if (this.sort === 2 || this.sort === '') {
                    this.sort = 1
                } else {
                    this.sort = 2
                }
            }
            if (k === 2) {
                if (this.sort === 4 || this.sort === '' || this.sort < 3) {
                    this.sort = 3
                } else {
                    this.sort = 4
                }
            }
            this.searchpage(true)
        },
        getOrderList(paramsData) {
            paramsData = paramsData || {}
            this.loading = true
            this.$shttp.get(listUrl, { params: paramsData })
            .then(resp => {
                this.loading = false
                var data = resp
                this.dataList = data.elements
                this.pgIndex = data.pageNum || 1
                this.total = data.totalElements
            })
            .catch(err => {
                this.loading = false
                Toast(err.response.data.msg)
            })
        },
        getAgentList(paramsData){
            paramsData = paramsData || {}
            this.loading = true
            this.$shttp.get(list2Url, { params: paramsData })
            .then((resp) => {
                this.loading = false
                var data = resp
                this.data2List = data.elements
                this.pg2Index = data.pageNum || 1
                this.to2tal = data.totalElements
            })
            .catch((err) => {
                this.loading = false
                Toast(err.response.data.msg)
            })
        }
    }
}
</script>
<style lang="less" scoped>
.serviceagent {
    background-color: #F2F2F2;
    font-family: 'PingFangSC-Semibold','PingFang SC';
    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    h3, p {
        padding: 0;
        margin: 0;
    }
    .fr {
        float: right;
    }
    .cxTitles{
        margin: 0 auto;
        background: #fff;
        display: flex;
        font-size: 18px;
        padding: 0 24px;
        border-bottom: 1px solid #dcdcdc;
        color: #333;
        div:last-child{
            margin-left: 36px;
        }
        div{
            padding: 18px 0;
            cursor: pointer;
        }
        .active{
            font-weight: bold;
            border-bottom: 2px solid #2F72D1;
        }
    }
    .addrs{
        display: flex;
        background: #fff;
        margin: 0 auto;
        padding: 0 24px 17px;
        font-size: 14px;
        align-items: center;
        span{
            padding: 0 4px;
            border-left: 4px solid #2F72D1;
            margin-right: 30px;
            height: 14px;
            line-height: 14px;
        }
        div{
            display: inline-block;
            padding: 0 20px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            cursor: pointer;
        }
        .active{
            background: #2F72D1;
            color: #fff;
        }
    }
    .searchs{
        padding: 0 24px;
        align-items: center;
        margin: 0 auto;
        padding: 28px 24px;
        background: #fff;
        font-size: 14px;
        span{
            margin-right: 10px;
        }
        div{
            display: flex;
            align-items: center;
            margin: 10px 0;
            span{
                width: 70px;
            }
            input {
                width: 197px;
                height: 30px;
                line-height: 30px;
                border-radius: 3px;
                border: 1px solid #ccc;
                padding-left: 6px;
            }
        }
        .searchBtn{
            display: flex;
            justify-content: center;
            font-size: 0.42667rem;
            color: #fff;
            background: #2F72D1;
            width: 3.12rem;
            height: 0.93333rem;
            line-height: 0.93333rem;
            text-align: center;
            border-radius: 0.05333rem;
            cursor: pointer;
            border: 0;
            margin: 0 auto;
        }
    }
    .topsearch {
        height: 100px;
        padding-top: 24px;
        background-color: #fff;
    }
    .topsearchtitle {
        height: 42px;
        padding: 0 15px;
        margin-bottom: 24px;
        > h3 {
            line-height: 42px;
            font-size: 16px;
            color: #333;
            font-weight: 600;
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
    .searchlist {
        padding: 20px 0 0;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        background: #fff;
        .organizationList{
            padding: 0 24px;
            .organizations{
                overflow-x: auto;
            }
            .organizationTit{
                display: flex;
                justify-content: space-between;
                div{
                    font-size: 18px;
                    color: #333;
                    font-weight: bold;
                }
                .searchBtn{
                    font-size: 16px;
                    color: #fff;
                    background: #2F72D1;
                    width: 117px;
                    height: 35px;
                    line-height: 35px;
                    display: inline-block;
                    text-align: center;
                    border-radius: 2px;
                    cursor: pointer;
                    border: 0;
                }
            }
            .organizationTables{
                // width: 1000px;
                width: 100%;
                border: 1px solid #e9e9e9;
                margin-top: 34px;
                font-size: 14px;
                margin-bottom: 40px;
                .organizationTheader>tr{
                    background: #6198E7;
                    height: 45px;
                    color: #fff;
                    img{
                        margin-left: 8px;
                    }
                    .soPor{
                        cursor: pointer;
                        i{
                            display: inline-block;
                            width: 6px;
                        }
                        .active{
                            color: red;
                        }
                    }
                    .zgzh{
                        cursor: pointer;
                    }
                }
                .trCur{
                    cursor: pointer;
                    .links{
                        color: #1989fa;
                        text-decoration: none;
                    }
                }
                .trCur:hover{
                    background: #f5f7fa;
                }
                .organizationTheader th,.organizationTbody td{
                    text-align: center;
                }
                .organizationTbody>tr{
                    color: #333;
                    height: 45px;
                    border-bottom: 1px solid #e9e9e9;
                }
            }
        }
    }
    .nosearchdata {
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 16px;
        background-color: #fff;
    }
    .mypagination {
        overflow: hidden; 
    }
}
</style>


