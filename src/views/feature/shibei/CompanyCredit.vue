<template>
    <div class="companycreditsebe">
        <div class="searchbox">
            <h3>企业信用查询</h3>
            <div class="companyname">
                <input type="text" placeholder="请输入企业名称、统一社会信用代码" v-model="cname" >
                <span class="bluebtn" @click="tolist">搜索</span>
            </div>
            <div class="hotnames">
                <h3 class="hotsearch">热搜：</h3>
                <div class="hotbox clearfix">
                    <span v-for="(item, index) in hotlist" :key="index" @click="hotsearch(item)">{{item}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
const hotUrl = '/api/queryHotSearchOfEnterpriseCredit'
export default {
    data() {
        return {
            hotlist: [],
            cname: ''
        }
    },
    created() {
        this.gethot()
    },
    methods: {
        hotsearch(it) {
            this.cname = it
            this.tolist()
        },
        gethot() {
            this.$shttp.get(hotUrl).then(res => {
                this.hotlist = res
            })
        },
        tolist() {
            if (!this.cname) {
                Toast("请输入企业名称、统一社会信用代码查询")
                return 
            }
            this.$router.push({ name: 'CompanyCreditList', params: { cn: this.cname } })
        }
    }
}
</script>

<style lang="less">
.companycreditsebe {
    padding: 30px 15px 15px;
    height: 200px;
    background-color: #fff;
    h3, p {
        padding: 0;
        margin: 0;
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
    .searchbox {
        > h3 {
            font-size: 18px;
            font-weight: normal;
            color: #333;
            margin-bottom: 34px;
            text-align: center;
        }
        .hotnames {
            display: flex;
            padding-top: 20px;
            .hotsearch {
                width: 60px;
                line-height: 20px;
                color: #333;
                font-size: 14px;
            }
            .hotbox {
                flex: 1;
            }
        }
        .hotbox {
            color: #333;
            font-size: 12px;
            > span {
                float: left;
                margin-right: 6px;
                line-height: 20px;
                color: #999;
            }
        }
    }
}
</style>
