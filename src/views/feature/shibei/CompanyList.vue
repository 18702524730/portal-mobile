<template>
    <div class="companyportraitlist">
        <div class="topresult">
            <h3 class="result">{{`关于“${showname}”共有${total}条结果`}}</h3>
            <div class="companyname">
                <input type="text" placeholder="请输入企业名称、统一社会信用代码" v-model="cname" >
                <span class="bluebtn" @click="search(true)">搜索</span>
            </div>
        </div>
        <ul class="companylist">
            <li v-for="(item, index) in dataList" :key="index"  @click="toinfo(item.assessId)">
                <h3>{{item.enterpriseName}}</h3>
                <div class="companyinfo">
                    <div>统一社会信用代码： <span class="cont">{{item.creditCode}}</span></div>
                    <div>组织机构代码：<span class="cont">{{item.orgCode}}</span></div>
                    <div>法定代表人：<span class="cont">{{item.legalPerson}}</span></div>
                </div>
            </li>
        </ul>
        <div class="nosearchdata" v-if="!total && !loading">
            暂无数据
        </div>
        <div v-if="total > 10 && !loading">
            <van-pagination
            v-model="pgIndex"
            :total-items="total"
            :show-page-size="3"
            @change="handleCurrentChange"
            force-ellipses
            />
        </div>
        <div class="sebemask" v-if="loading">
            <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
const listUrl = '/api/queryEnterprisePortraitList'
export default {
    data() {
        return {
            pgIndex: 1,
            pgCount: 10,
            total: 0,
            cname: '',
            showname: '',
            loading: false,
            dataList: []
        }
    },
    created() {
        this.cname = this.$route.params.cn
        this.showname = this.cname
        this.search(true)
    },
    methods: {
        search(isf) {
            const data = {
                pgIndex: isf ? 1 : this.pgIndex,
                pgCount: this.pgCount,
                keyword: this.cname
            }
            this.loading = true
            this.$shttp.get(listUrl, { params: data }).then(res => {
                this.loading = false
                this.showname = this.cname
                this.dataList = res.elements
                this.total = res.totalElements
                this.pgIndex = res.pageNum || 1
            }).catch(err => {
                this.loading = false
                Toast(err.response.data.msg || '获取数据失败')
            })
        },
        handleCurrentChange(i) {
            this.pgIndex = i
            this.search()
        },
        toinfo(id) {
            this.$router.push({ name: 'CompanyPortraitInfo', params: { id: id } })
        }
    }
}
</script>

<style lang="less" scoped>
.companyportraitlist {
    background-color: #F2F2F2;
    .fl {
        float: left;
    }
    .fr {
        float: right;
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
            font-size: 14px;
            color: #333;
            font-weight: 600
        }
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
    .companylist {
        padding: 0;
        margin-bottom: 10px;
        list-style: none;
        > li {
            padding: 18px 15px;
            background-color: #fff;
            margin-bottom: 6px;
            > h3 {
                font-size: 16px;
                color: #333;
                font-weight: 600;
                line-height: 25px;
                margin-bottom: 15px;
            }
            .companyinfo {
                font-size: 14px;
                color: #999;
                line-height: 20px;
                .cont {
                    color: #666;
                    font-size: 14px;
                }
            }
        }
    }
    .nosearchdata {
        height: 100px;
        line-height: 100px;
        font-size: 16px;
        text-align: center;
        background-color: #fff;
        color: #666;
    }
    .mypagination {
        overflow: hidden;
    }
}
</style>

