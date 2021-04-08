<template>
  <div id="geographicDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="item.productName"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
          :fixed="false"
          placeholder
          class="bar-head"
        >
          <template #right>
            <van-row class="right-btn">
              <van-row>
                <van-icon :name="item.collection?'star':'star-o'" :class="{'collect-span':item.collection}" class="icon-size"/>
              </van-row>
              <van-row>
                {{!item.collection?'收藏':'已收藏'}}
              </van-row>
            </van-row>

          </template>
        </van-nav-bar>
        <div class="my-main-content">
          <van-row class="content-card">
            <van-row>
              <van-image :src="getImgNewView(item.productImg)" class="my-image"/>
            </van-row>
            <van-row class="title container">
              <h3 class="van-multi-ellipsis--l2">{{ item.productName }}</h3>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="24" class="van-ellipsis">
                    <span>产品性质：</span>
                    <span>{{ item.productNatureName}}</span>
                  </van-col>
                </van-row>
              </div>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="24" class="van-ellipsis">
                    <span>项目类型：</span>
                    <span>{{ item.typeName}}</span>
                  </van-col>
                </van-row>
              </div>
              <van-row class="my-time" type="flex" align="center">
                <van-icon name="location-o"/>
                <span class="van-ellipsis">{{ item.areaName}}</span>
              </van-row>
            </van-row>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" :ellipsis="false">
              <van-tab title="简介详情" name="1">
                <van-row class="my-content html-content" v-html="item.remark"
                         style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">
                </van-row>
              </van-tab>
              <van-tab title="相册" name="2">
                <recommend-organization title="" :have-more="false" class="other-project"
                                        style="background-color: #ffffff">
                  <template slot="content">
                    <div>
                      <van-row type="flex" justify="space-between" class="my-list-layout-row"
                               v-for="(outItem,outIndex) in item.photoData"
                               :key="outIndex">
                        <van-row v-for="(data,index) in outItem" :key="data">
                          <van-image
                            :src="getImgNewView(data)"
                            class="my-little-image">
                          </van-image>
                        </van-row>
                      </van-row>
                    </div>
                  </template>
                </recommend-organization>
              </van-tab>
              <van-tab title="质量技术要求" name="3">
                <van-row class="my-content html-content" v-html="item.qualityTechnicalRequirements"
                         style="white-space: pre-wrap;word-break: break-all;overflow-x: auto">
                </van-row>
              </van-tab>
              <van-tab title="标准（规范）" name="4">
                <van-row class="my-content">
                  <ul>
                    <li v-for="(file,index) in item.fileUrls" :key="index">
                      <a :href="file" :key="index" class="my-a">
                        {{file.substr(file.lastIndexOf('/') + 1) | changeData}}
                      </a>
                    </li>
                  </ul>
                </van-row>
              </van-tab>
              <van-tab title="核准企业" name="5">
                <div class="ant-descriptions ant-descriptions-bordered"
                     v-if="item.portalGeoAppEnts && item.portalGeoAppEnts.length > 0">
                  <div class="ant-descriptions-view">
                    <table cellspacing="0" cellpadding="0">
                      <tr class="ant-descriptions-row">
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">企业名称</th>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">核准公告号</th>
                      </tr>
                      <tr class="ant-descriptions-row"
                          v-for="(innerItem,innerIndex) in item.portalGeoAppEnts" :key="innerItem.key">
                        <td class="ant-descriptions-item-content">
                          <span class="van-multi-ellipsis--l2">{{innerItem.name}}</span>
                        </td>
                        <td class="ant-descriptions-item-content">
                          <span class="van-multi-ellipsis--l2">{{innerItem.approvalAnnouncementNo}}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </van-tab>
              <van-tab title="相关新闻报告" name="6">
                <van-row class="my-content">
                  <van-empty  description="没有内容" v-if="!item.portalGeoReports || item.portalGeoReports.length === 0"></van-empty>
                  <message-list :data="item.portalGeoReports" :columns="columns" :border="true" v-else></message-list>
                </van-row>
              </van-tab>
              <van-tab title="相关视频" name="7">
                <van-row v-for="(data,index) in item.portalGeoVideos" :key="data.id">
                  <geography-video-card :item="data"
                                        ></geography-video-card>
                </van-row>
              </van-tab>
            </van-tabs>
          </van-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import { judgeState, changeArr, filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../general/RecommendOrganization'
  import MessageList from '../list/MessageList'
  import GeographyVideoCard from '../card/GeographyVideoCard'

  export default {
    name: 'GeographicDetails',
    components: { GeographyVideoCard, MessageList, RecommendOrganization },
    inject: ['headLogin'],
    data() {
      return {
        detailsShow: false,
        loginBtn: false,

        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        item: {},
        url: '/zscq/portal/queryGeoIndicationDetailById',

        id: '',
        active: '1',
        columns: [
          {
            title: '相关新闻报告',
            dataIndex: 'title'
          },
          {
            title: '发布时间',
            dataIndex: 'publishDate',
            sorter: true,
            width: '30%'
          }
        ]
      }
    },
    created() {
    },
    methods: {
      showPopup(id) {
        this.detailsShow = true
        this.loadData(id)
        this.id = id
      },
      getImgNewView,
      onClickRight() {
        if (this.loginBtn) {
          return
        }
        if (judgeState()) {
          if (isAdmin()) {
            this.$notify({ type: 'warning', message: '您没有权限，暂时不能操作!' })
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper(this.keyRoute)
        } else {
          // 没有登录，则先进行登录
          this.$notify({ type: 'warning', message: '请先进行登录！' })
          this.headLogin()
        }
      },
      collectOper(keyRoute) {
        const that = this
        that.loginBtn = true
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          id: this.item.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$notify({ message: '收藏成功！', type: 'success', duration: 2000 })
            } else {
              that.$notify({ message: '取消收藏成功！', type: 'success', duration: 2000 })
            }
            that.loadData(that.item.id)
            that.$emit('func')
          } else {
            that.$notify({ type: 'warning', message: res.message })
          }
        }).finally(() => {
          that.loginBtn = false
        })
      },
      onClickLeft() {
        this.detailsShow = false
      },
      async loadData(id) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.url, { id: id })
        if (res.success) {
          this.item = res.result
          this.item.photoData = this.item.productImg.split(',')
          this.item.photoData = changeArr(this.item.photoData, 2)

          const fileUrls = []
          if (this.item.standard !== undefined && this.item.standard !== null && this.item.standard !== '') {
            const urls = this.item.standard.split(',')
            urls.forEach(file => {
              file = window._CONFIG['downloadUrl'] + '/' + file
              fileUrls.push(file)
            })
          }
          this.item.fileUrls = fileUrls

        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
        console.info(res)
        console.info('good')
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current - 1
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      }
    },
    filters: {
      changeData(value) {
        if (value || value === '0') {
          const arr = value.split('/')
          if (arr.length > 0) {
            const fileNames = arr[arr.length - 1].split('.')
            const hz = fileNames[fileNames.length - 1] // 后缀名
            let lastValue = fileNames[0]
            const index = lastValue.lastIndexOf('_')
            lastValue = lastValue.substring(0, index)

            return lastValue + '.' + hz
          } else {
            return value
          }
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  #geographicDetails {
  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .my-little-image {
      height: 180/2px;
      width: 330/2px;
    }
    .right-btn {
      font-size: 10px;
      color: @main-font-color2;
      text-align: center;
      .collect-span {
        color: #ff3300;
      }
    }
    .bar-head {
      height: 7%;
    }
    .my-main-content {
      height: 93%;
      overflow-y: auto;
    }
    .content-card {
      .money-span {
        color: #ff3300;
      }
    }

    .my-tab {
      margin-top: 10px;
      background-color: #ffffff;
      /deep/ .van-tab {
        font-size: 12px;
        font-weight: normal;
      }
      /deep/ .van-tabs__line {
        height: 2px;
      }
      /deep/ .van-tabs__content {
        border-top: 2px solid @main-bg-color;
        padding: 15px;
        color: #666666;
      }
      h3 {
        font-size: 13px;
        font-weight: normal;
        padding: 0 7px;
        background-color: @main-bg-color;
        margin: 0;
        margin-bottom: 10px;
      }
    }

    .tabbar-btn {
      width: 100%;
      .van-col {
        height: 100%;
      }
      .van-button {
        width: 100%;
        height: 100%;
        border: none;
        font-size: 18px;
      }
      .contact-btn {
        color: @main-color;
      }
      .buy-btn {
        background-color: #EB4826;
        color: #ffffff;
      }
    }

    table {
      margin: 0;
      th {
        font-weight: normal;
        font-size: 9px;
        color: #515A6E;
      }
    }

    .ant-descriptions-bordered .ant-descriptions-row {
      border-bottom: 1Px solid #e8e8e8;
    }

    .ant-descriptions-bordered .ant-descriptions-item-label, .ant-descriptions-bordered .ant-descriptions-item-content {
      padding: 6px;
      border-right: 1Px solid #e8e8e8;
    }

    .ant-descriptions-bordered .ant-descriptions-item-label {
      background-color: #fafafa;
      text-align: center;
    }

    .ant-descriptions-view {
      width: 100%;
      overflow: auto;
      border-radius: 4px;
    }

    .ant-descriptions-item-content {
      font-size: 7px;
      display: table-cell;
      color: #515A6E;
      text-align: center;
      a {
        text-decoration: underline;
        color: rgba(0, 0, 0, 0.65);
        &:hover {
          color: @main-color;
        }
      }
    }
    .ant-descriptions-bordered .ant-descriptions-row:last-child {
      border-bottom: none;
    }
    .ant-descriptions-bordered .ant-descriptions-view > table {
      table-layout: auto;
    }
    .ant-descriptions-view table {
      width: 100%;
      table-layout: fixed;
    }
    .ant-descriptions-row > th, .ant-descriptions-row > td {
      padding-bottom: 5px;
    }
    .ant-descriptions-bordered .ant-descriptions-view {
      border: 1Px solid #e8e8e8;
      border-right: none;
    }
    .ant-descriptions-item-content {
    }
    .my-two {
      padding: 12px 0;
    }
    .other-project {
      h2 {
        font-weight: normal;
        font-size: 14px;
        margin: 12px 15px;
      }
    }

    ul {
      li {
        list-style-type: inherit;
        color: @main-color;
        line-height: 25px;
        a {
          text-decoration: underline;
          color: #333333;
          &:hover {
            color: @main-color;
          }
        }
        span {
          color: #333333;
          line-height: 30px;
        }
      }
    }

    .html-content{
      font-size: 14px;
      /deep/ img{
        max-width: 100%;
      }
    }
  }

</style>