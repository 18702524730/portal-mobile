<template>
    <div class="navsystembox">
        <!-- <div class="agentbox">
            <div class="agentmsg">专利导航数据图表</div>
        </div> -->
        <div class="agentlistbox">
            <div class="latest">
                <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in datas" :key="index">
                    <div class="picbox" @click="toinfo(item)">
                        <div class="imgbox"><img :src="item.coverUrl" alt="" /></div>
                        <div class="intrmsg">
                            <h3 class="agentname">{{item.title}}</h3>
                            <!-- <p>2018-02-03</p> -->
                        </div>
                    </div>
                </van-swipe-item>
                </van-swipe>
            </div>
            <h3>最新专利导航分析</h3>
            <ul class="agentlist clearfix">
                <li v-for="item in dataList" :key="item.id" @click="toinfo(item)">
                    <div class="imgbox"><img :src="item.coverUrl" alt="" /></div>
                    <div class="intrmsg">
                        <h3 class="agentname">{{item.title}}</h3>
                        <!-- <p>2018-02-03</p> -->
                    </div>
                </li>
            </ul>
            <div class="mypagination" v-if="total > 8 && !loading">
                <van-pagination
                v-model="pgIndex"
                :total-items="total"
                :show-page-size="3"
                @change="handleCurrentChange"
                force-ellipses
                />
            </div>
        </div>
        <div class="sebemask" v-if="loading">
            <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
        </div>
    </div>
</template>
<script>
import Filters from '@utils/filters.js'
const recomUrl = '/api/findRecommend'
const listUrl = '/api/findPatentArticleList'
export default {
    data() {
        return {
            pgIndex: 1,
            pgCount: 20,
            agency: null,
            total: 0,
            loading: false,
            time: new Date(),
            dataList: [],
            datas: []
        }
    },
    filters: {
        dateFormat: Filters.formatDate.datesFormat
    },
    created() {
        this.agency = this.$route.params.id
        this.getquery()
        this.getRecom()
        this.searchpage()
    },
    methods: {
        getRecom() {
            const data = {
                type: 1
            }
            this.$shttp.get(recomUrl, { params: data }).then(res => {
                this.datas = res
            }).catch(() => {})
        },
        getquery() {
        var re = {}
            if (this.$route.query) {
                var q = this.$route.query
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
        handleCurrentChange(i) {
            this.pgIndex = i
            this.searchpage()
        },
        searchpage() {
            this.query.pgIndex = this.pgIndex
            this.query.pgCount = this.pgCount
            this.query.sortType = 2
            this.query.type = 1
            this.$router.replace({ query: this.query })
            this.getOrderList(this.query)
        },
        getOrderList(paramsData) {
            paramsData = paramsData || {}
            this.loading = true
            this.$shttp
                .get(listUrl, { params: paramsData })
                .then(resp => {
                this.loading = false
                var data = resp
                var dataList = data.elements
                this.dataList = dataList
                this.pgIndex = data.pageNo || 1
                this.total = data.totalElements
            })
            .catch(err => {
            this.loading = false
            this.$message(err.response.data.msg)
            })
        },
        toinfo(it) {
            this.$router.push({ name: 'PatentNavSysInfo', params: { id: it.number } })
        }
    }
}
</script>
<style lang="less" scoped>
.navsystembox {
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
    .agentbox {
        background-color: #f5f5f5;
        .agentmsg {
            width: 1200px;
            height: 60px;
            margin-left: auto;
            margin-right: auto;
            line-height: 60px;
            font-size: 14px;
            font-weight: 600;
        }
    }
    .agentlistbox {
        padding: 15px;
        > h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: normal;
        }
        .picbox {
        position: relative;
        width: 345px;
        height: 300px;
        .imgbox {
            width: 100%;
            height: 100%;
            background-color: #ccc;
            > img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .intrmsg {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 10px;
            background: rgba(0, 0, 0, 0.7);
            font-size: 12px;
            color: #fff;
            .agentname {
                color: #fff;
                font-weight: 500;
                font-size: 14px;
                line-height: 18px;
            }
        }
        }
    }
    .agentlist {
        > li {
            position: relative;
            width: 345px;
            height: 240px;
            margin-bottom: 12px;
            border-radius: 3px;
            .imgbox {
                width: 100%;
                height: 100%;
                background-color: #ccc;
                > img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .intrmsg {
                position: absolute;
                box-sizing: border-box;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 10px;
                background: rgba(0, 0, 0, 0.7);
                font-size: 12px;
                color: #fff;
                .agentname {
                    color: #fff;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 18px;
                }
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


