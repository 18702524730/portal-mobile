<template>
    <div class="iplivebox">
        <div class="liveconts">
        <div class="beforecont">
            <div class="nowlive" v-if="bannerlist.length">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="(item,index) in bannerlist" :key="index">
                        <a :href="item.advertisementLink" target="_bank" v-if="item.advertisementLink">
                            <div class="nowlive">
                                
                                <img :src="item.advertisementPic" alt="">
                                <div class="titbox">
                                    <span>{{item.advertisementName}}</span> <span class="mark">直播</span>
                                </div>
                                
                            </div>
                        </a>
                        <div class="nowlive" v-else>
                            <img :src="item.advertisementPic" alt="">
                            <div class="titbox">
                                <span>{{item.advertisementName}}</span> <span class="mark">直播</span>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <h3 class="beforetit" v-if="total">往期直播</h3>
            <ul class="beforelist" v-if="total">
                <li @click="toinfo(item)" v-for="item in listIsLiveBefore" :key="item.id">
                    <div class="leftpic">
                        <img :src="item.liveCover" alt="">
                    </div>
                    <div class="rightcont">
                        <div class="itemtit">
                            <h3>{{item.liveName}}</h3>
                            <p>{{item.liveStartTime | dateFormat}}</p>
                        </div>
                        <div class="itemcont">
                            {{item.remarks}}
                        </div>
                    </div>
                </li>
            </ul>
            <!-- <div class="nosearchdata" v-if="!total">
                暂无数据
            </div> -->
        </div>
        <div class="hotcont">
            <h3 class="hotest"><span>最热直播</span><span class="hot">hot</span></h3>
            <ul class="hotlist" v-if="listIsLive.length">
                <li v-for="item in listIsLive" :key="item.id" @click="toinfo(item)">
                    <div class="leftpic">
                        <img :src="item.liveCover" alt="">
                        <span class="live">直播</span>
                    </div>
                    <div class="title">{{item.liveName}}</div>
                </li>
            </ul>
            <h3 class="yugao">直播预告</h3>
            <ul class="recordlist" v-if="listIsLivePre.length">
                <li v-for="item in listIsLivePre" :key="item.id">
                    <div class="leftday">
                        <h3 class="date">{{item.liveStartTime | monthdayFormat}}</h3>
                        <p class="time">{{item.liveStartTime | hourminFormat}}</p>
                    </div>
                    <div class="rtitle">
                        {{item.liveName}}
                    </div>
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>
import filters from '@utils/filters.js'
const listUrl = '/api/pictorial/selectIpLiveFromTop'
export default {
    data() {
        return {
            loading: false,
            pgCount: 10,
            pgIndex: 1,
            total: 0,
            bannerlist: [],
            listIsLiveBefore: [],
            listIsLive: [],
            listIsLivePre: []
        }
    },
    filters: {
        dateFormat: filters.formatDate.dateFormathm,
        monthdayFormat: filters.formatDate.monthdayFormat,
        hourminFormat: filters.formatDate.hourminFormat
    },
    methods: {
        handleCurrentChange(i) {
            this.pgIndex = i
            this.searchlist()
        },
        searchlist() {
            const data = {
                pgIndex: this.pgIndex,
                pgCount: this.pgCount
            }
            this.loading = true
            this.$shttp.get(listUrl, { params: data }).then(res => {
                this.loading = false
                this.bannerlist = res.listBanner || []
                this.listIsLiveBefore = res.listIsLiveBefore || []
                this.listIsLive = res.listIsLive || []
                this.listIsLivePre = res.listIsLivePre || []
                this.total = res.totalElements
            }).catch(err => {
                this.loading = false
                this.$messagesebe.error(err.response.data.msg || '获取失败')
            })
        },
        toinfo(it) {
            this.$router.push({ name: 'MobileIPLiveInfo', params: { id: it.id } })
        }
    },
    created() {
        this.searchlist()
    }
}
</script>

<style lang="less" scoped>
.iplivebox {
    background-color: #F2F2F2;
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
    .liveconts {
        .beforecont {
            width: 100%;
            padding-bottom: 5px;
        }
        .nowlive {
            position: relative;
            width: 100%;
            height: 468/2px;
            img {
                display: block;
                width: 100%;
                height: 468/2px;
            }
            .titbox {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 15px;
                line-height: 20px;
                // background: rgba(0, 0, 0, 0.5);
                overflow: hidden;
                > span {
                    float: left;
                    font-size: 14px;
                    color: #fff;
                    margin-right: 10px;
                    font-weight: 500;
                    max-width: 75%;
                }
                .mark {
                    height: 20px;
                    padding: 0 10px;
                    background-color: #FF1919;
                    font-weight: normal;
                    margin: 0;
                }
            }
        }
        .beforetit {
            height: 52px;
            line-height: 52px;
            padding-left: 24px;
            color: #fff;
            background-color: #2F72D1;
            font-size: 14px;
            font-weight: 500;
        }
        .beforelist {
            min-width: 320px;
            margin-bottom: 10px;
            background-color: #fff;
            > li {
                display: flex;
                padding-top: 24px;
                padding-bottom: 24px;
                border-bottom: 1px solid #E9E9E9;
                cursor: pointer;
                &:last-child {
                    border-bottom: none;
                }
            }
            .rightcont {
                flex: 1;
                .itemtit {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    > h3 {
                        height: 25px;
                        line-height: 25px;
                        font-size: 18px;
                        font-weight: normal;
                    }
                    > p {
                        font-size: 12px;
                        color: #999;
                        line-height: 25px;
                    }
                }
                .itemcont {
                    line-height: 20px;
                    height: 60px;
                    font-size: 14px;
                    font-weight: normal;
                    color: #666;
                }
            }
            .leftpic {
                width: 150px;
                height: 100px;
                margin-right: 24px;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .hotlist {
            padding: 0 24px;
            background-color: #fff;
            padding-bottom: 12px;
            > li {
                display: flex;
                padding: 16px 0;
                border-bottom: 1px solid #F2F2F2;
                cursor: pointer;
                &:last-child {
                    border-bottom: none;
                }
            }
            .leftpic {
                position: relative;
                width: 120px;
                height: 80px;
                margin-right: 10px;
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
                flex: 1;
                font-size: 16px;
                font-weight: normal;
                line-height: 22px;
                color: #333;
            }
        }
        .yugao {
            padding: 0 24px 20px;
            font-size: 18px;
            font-weight: 500;
            color: #333;
            background-color: #fff;
        }
        .hotcont {
            width: 100%;
            .hotest {
                height: 65px;
                padding-left: 24px;
                background-color: #2F72D1;
                color: #fff;
                font-size: 18px;
                font-weight: 500;
                > span {
                    float: left;
                    line-height: 65px;
                }
                .hot {
                    font-size: 14px;
                    height: 20px;
                    margin-top: 22px;
                    line-height: 20px;
                    padding: 0 5px;
                    background-color: #FF1919;
                    margin-left: 10px;
                    font-weight: normal
                }
            }
        }
        .recordlist {
            background-color: #fff;
            padding: 0 24px 24px;
            > li {
                display: flex;
                padding: 15px 0 15px 15px;
                border-top: 1px solid #e9e9e9;
                &:last-child {
                    border-bottom: 1px solid #e9e9e9;
                }
            }
            .leftday {
                width: 60px;
                margin-right: 30px;
                font-size: 16px;
                color: #333;
                .date {
                    position: relative;
                    height: 22px;
                    line-height: 22px;
                    &:before{
                        position: absolute;
                        left: -15px;
                        top: 3px;
                        content: '';
                        height: 16px;
                        border-left: 7px solid #2F72D1;
                    }
                }
                .time {
                    line-height: 22px;
                    color: #666;
                }
            }
            .rtitle {
                flex: 1;
                font-size: 16px;
                color: #333;
                line-height: 22px;
            }
        }
    }
    .nosearchdata {
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        background-color: #fff;
    }
}
</style>
