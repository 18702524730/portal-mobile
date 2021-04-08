<template>
    <div class="ipliveinfobox">
        <div class="livetitle">
            图文直播：{{liveinfo.liveName}}
        </div>
        <div class="liveconts">
            <div class="hotcont">
                <div class="livemsg">
                    <h3>{{liveinfo.liveName}}</h3>
                    <div class="intr">
                        {{liveinfo.remarks}}
                    </div>
                    <p>
                        时间：{{liveinfo.liveStartTime | dateFormat}}
                    </p>
                    <p>
                        地点：{{liveinfo.address}}
                    </p>
                </div>
                <h3 class="hotest"  v-if="hotpic.length"><span>热点图片</span><span class="hot">hot</span></h3>
                <ul class="hotlist" v-if="hotpic.length">
                    <li v-for="item in hotpic" :key="item.id">
                        <div class="leftpic">
                            <img :src="item.picture" alt="">
                        </div>
                        <div class="title">{{item.content}}</div>
                    </li>
                </ul>
            </div>
            <div class="beforecont">
                <h3 class="recordtype"><span v-for="(item, index) in typelist" :key="index" @click="changetype(item)" :class="{ active: type === item.id }">{{item.name}}</span></h3>
                <ul class="recordlist" v-if="total">
                    <li v-for="item in dataList" :key="item.id">
                        <div class="leftday">
                            <h3 class="date">{{item.createTime | monthdayFormat}}</h3>
                            <p class="time">{{item.createTime | hourminFormat}}</p>
                        </div>
                        <div class="rtitle">
                            <p v-if="item.content">{{item.content}}</p>
                            <div class="picbox" v-if="item.picture">
                                <img :src="item.picture" alt="">
                            </div>
                            <div class="dianping" v-if="item.evaluate">
                                <h3>专家点评</h3>
                                <p class="content">{{item.evaluate}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="nosearchdata" v-if="!total">
                    暂无数据
                </div>
            </div>
        
        </div>
    </div>
</template>
<script>
import filters from '@utils/filters.js'
// import { setTimeout } from 'timers'
const listUrl = '/api/pictorial/selectContent'
const detailUrl = '/api/pictorial/selectIpLive'
export default {
    data() {
        return {
            loading: false,
            pgCount: 10,
            pgIndex: 1,
            total: 0,
            dataList: [],
            type: 0,
            id: '',
            hotpic: [],
            liveinfo: {},
            timer: null,
            typelist: [
                { id: 0, name: '全部' },
                { id: 1, name: '图片' },
                { id: 2, name: '点评' }
            ]
        }
    },
    filters: {
        dateFormat: filters.formatDate.dateFormathm,
        monthdayFormat: filters.formatDate.monthdayFormat,
        hourminFormat: filters.formatDate.hourminFormat
    },
    beforeRouteLeave(to, from, next) {
        clearTimeout(this.timer)
        next()
    },
    created() {
        this.id = this.$route.params.id
        this.getdetail()
        this.searchlist(true)
        this.gethot()
    },
    methods: {
        handleCurrentChange(i) {
            this.pgIndex = i
            this.searchlist()
        },
        changetype(it) {
            this.type = it.id
            this.searchlist(true)
        },
        getdetail() {
            const data = {
                id: this.id
            }
            this.$shttp.get(detailUrl, { params: data }).then(res => {
                this.liveinfo = res
                // if (res.liveState === 2) {
                //     this.timer = setTimeout(() => {
                //         this.searchlist()
                //         this.getdetail()
                //     }, 10000)
                // }
            })
        },
        gethot() {
            const data = {
                pgIndex: 1,
                pgCount: 4,
                ipLiveId: this.id,
                isActive: 3
            }
            this.$shttp.get(listUrl, { params: data }).then(res => {
                this.hotpic = res.elements || []
            })
        },
        searchlist(isreset) {
            const data = {
                pgIndex: isreset ? 1 : this.pgIndex,
                pgCount: this.pgCount,
                ipLiveId: this.id,
                isActive: this.type
            }
            if (data.isActive === 0) {
                delete data.isActive
            }
            this.loading = true
            this.$shttp.get(listUrl, { params: data }).then(res => {
                this.loading = false
                this.dataList = res.elements
                this.total = res.totalElements
            }).catch(err => {
                this.loading = false
                this.$messagesebe.error(err.response.data.msg || '获取失败')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.ipliveinfobox {
    background-color: #F2F2F2;
    // font-family:'PingFangSC-Medium','PingFang SC';
    .fl {
        float: left;
    }
    .fr {
        float: right;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    h3, p {
        margin: 0;
        padding: 0;
    }
    .livetitle {
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        padding: 0 15px;
        background: url('../../assets/img/livebg.png') center center no-repeat;
        background-size: 100% 100%;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        color: #fff;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .liveconts {
        padding-top: 10px;
        .beforecont {
            width: 100%;
        }
        .recordtype {
            height: 20px;
            padding: 15px;
            color: #999;
            background-color: #fff;
            font-size: 16px;
            font-weight: normal;
            > span {
                float: left;
                margin-right: 30px;
                line-height: 20px;
                cursor: pointer;
                &.active {
                    color: #333;
                }
            }
            
        }
        .hotlist {
            box-sizing: border-box;
            width: 100%;
            padding: 0 15px;
            background-color: #fff;
            padding-bottom: 12px;
            > li {
                padding: 8px 0;
                margin-bottom: 8px;
            }
            .leftpic {
                width: 100%;
                height: 180px;
                margin-bottom: 10px;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .live {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 40px;
                    height: 20px;
                    background-color: #FF1919;
                    line-height: 20px;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                }
            }
            .title {
                font-size: 14px;
                font-weight: normal;
                line-height: 20px;
                color: #333;
            }
        }
        .hotcont {
            width: 100%;
            padding-bottom: 10px;
            .hotest {
                height: 25px;
                padding-top: 10px;
                padding-left: 15px;
                background-color: #fff;
                color: #333;
                font-size: 18px;
                font-weight: 500;
                > span {
                    float: left;
                    line-height: 25px;
                }
                .hot {
                    font-size: 14px;
                    height: 20px;
                    margin-top: 2px;
                    line-height: 20px;
                    padding: 0 5px;
                    background-color: #FF1919;
                    margin-left: 10px;
                    color: #fff;
                    font-weight: normal
                }
            }
        }
        .livemsg {
            padding: 15px;
            background-color: #2F72D1;
            color: #fff;
            > h3 {
                padding-bottom: 12px;
                margin-bottom: 10px;
                color: #fff;
                border-bottom: 1px solid #aaa;
                font-size:18px;
                font-weight:500;
                line-height:25px;
            }
            .intr {
                font-size: 14px;
                line-height: 20px;
                margin-bottom: 15px;
            }
            > p {
                font-size: 14px;
                line-height: 20px;
            }
        }
        .recordlist {
            background-color: #fff;
            padding: 0 15px 15px;
            margin-bottom: 20px;
            > li {
                display: flex;
                padding: 15px 0 15px 15px;
                border-bottom: 1px solid #e9e9e9;
                &:last-child {
                    border-bottom: none;
                }
            }
            .leftday {
                width: 60px;
                margin-right: 10px;
                font-size: 14px;
                color: #999;
                .date {
                    position: relative;
                    height: 20px;
                    line-height: 20px;
                    color: #999;
                    &:before{
                        position: absolute;
                        left: -15px;
                        top: 0;
                        content: '';
                        height: 16px;
                        border-left: 4px solid #2F72D1;
                    }
                }
                .time {
                    line-height: 20px;
                    color: #999;
                }
            }
            .rtitle {
                flex: 1;
                font-size: 14px;
                color: #333;
                line-height: 20px;
                .picbox {
                    width: 100%;
                    height: 100px;
                    margin-top: 5px;
                    background-color: #ccc;
                    > img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .dianping {
                    padding: 10px;
                    margin-top: 10px;
                    background-color: #F4F4F4;
                    > h3 {
                        font-size: 16px;
                        margin-bottom: 12px;
                        font-weight: 500;
                    }
                    .content {
                        font-size: 14px;
                        line-height: 20px;
                        color: #666;
                    }
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
