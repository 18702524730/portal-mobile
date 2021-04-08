<template>
    <div class="angencyinfobox">
        <div class="offices" v-if="data2List.xipopInstitutionDTO">
            <div class="officeTitle">{{data2List.xipopInstitutionDTO.institutionName}}</div>
            <div class="officeList">
                <div>
                    <div>机构代码：{{data2List.xipopInstitutionDTO.institutionCode}}</div>
                    <div>联系电话：{{data2List.xipopInstitutionDTO.phone}}</div>
                    <div>法定代表人：{{data2List.xipopInstitutionDTO.legal}}</div>
                    <div>成立时间：{{data2List.xipopInstitutionDTO.establishTime}}</div>
                    <div>机构地址：{{data2List.xipopInstitutionDTO.address}}</div>
                </div>
                <div>
                    <div>代理师总数：{{data2List.xipopInstitutionDTO.agentNumber}}</div>
                    <div>同时取得专利代理执业资格和律师执业资格人数：{{data2List.xipopInstitutionDTO.obtainNumber}}</div>
                </div>
                <div>
                    <div>服务机构状态：{{data2List.xipopInstitutionDTO.institutionState}}</div>
                </div>
                <div>
                    <div>成立年限：{{data2List.xipopInstitutionDTO.establishYear}}</div>
                </div>
            </div>
        </div>
        <div class="agentlistbox">
            <div class="mingpian">人员名片</div>
            <ul class="agentlist clearfix">
                <li v-for="item in data2List.xipopAgentDTOList" :key="item.id">
                    <div class="touxiang">
                        <div class="txImg"><img :src="item.sex==1?require('../../../assets/img/nv.png'):require('../../../assets/img/nan.png')" alt=""></div>
                        <div class="txName">
                            <div>{{item.agent}}</div>
                            <div>{{item.major}}</div>
                        </div>
                    </div>
                    <div class="blist">性别：{{item.sex | sexFormat}}</div>
                    <div class="blist">执业年限：{{item.practiceYear}}</div>
                    <div class="blist">执业证号：{{item.certificateNo}}</div>
                    <div class="blist">执业备案号：{{item.professionNo}}</div>
                    <div class="blist">是否取得律师执业资格：{{item.obtain==0?'否':item.obtain==1?'是':''}}</div>
                </li>
            </ul>
        </div>
        <div class="sebemask" v-if="loading">
            <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
        </div>
    </div>
</template>
<script>
import Filters from '@utils/filters.js'
const list2Url = '/api/findXipopInstitutionDetail'
export default {
    data() {
        return {
            agency: null,
            loading: false,
            time: new Date(),
            data2List: []
        }
    },
    filters: {
        dateFormat: Filters.formatDate.datesFormat,
        sexFormat: Filters.sexFormat
    },
    created() {
        this.agency = this.$route.params.id
        this.sear2ch()
    },
    methods: {
        sear2ch(isf) {
            const data = {
                institutionCode: this.agency
            }
            this.loading = true
            this.$shttp.get(list2Url, { params: data }).then(res => {
                this.loading = false
                this.data2List = res
                console.log(this.data2List)
            }).catch(err => {
                this.loading = false
                this.$messagesebe.error(err.response.data.msg || '获取数据失败')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.angencyinfobox {
    background: #f5f6f7;
    padding-bottom: 20px;
    .offices{
        background: #fff;
        padding: 24px;
        margin: 0 auto;
        .officeTitle{
            color: #333;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
        }
        .officeList{
            color: #333;
            font-size: 14px;
            margin-top: 10px;
            >div{
                max-width: 360px;
                >div{
                    line-height: 20px;
                    margin: 10px 0;
                }
            }
        }
    }
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
    .agentlistbox {
        padding: 24px 24px 30px;
        margin: 20px auto;
        background: #fff;
        .mingpian{
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin-bottom: 33px;
        }
    }
    .clearfix::after{
        clear: both;
        content: "";
        display: block;
    }
    .agentlist {
        > li {
            float: left;
            width: 230px;
            margin: 0 29px 20px;
            padding: 20px;
            border-radius: 3px;
            box-shadow: 0px 5px 19px 0px rgba(0, 0, 0, 0.05);
            font-size: 14px;
            .touxiang{
                display: flex;
                margin-bottom: 24px;
                min-height: 80px;
                .txImg{
                    width: 62px;
                }
                .txName{
                    margin-left: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    color: #333;
                    >div:last-child{
                        font-size: 14px;
                        color: #2F72D1;
                        font-weight: 500;
                        margin-top: 8px;
                    }
                }
            }
            .blist{
                margin-top: 9px;
            }
            &:nth-child(4n) {
                // margin-right: 0;
            }
            .agentname {
                margin-bottom: 10px;
                font-weight: 500;
                font-size: 16px;
            }
        }
    }
    .personmsg {
        margin-bottom: 10px;
        font-size: 0;
        > span {
            display: inline-block;
            font-size: 14px;
            vertical-align: top;
        }
        .msglabel {
            width: 100px;
            color: #999;
        }
        .msgcont {
            max-width: 140px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #333;
        }
    }
}
</style>


