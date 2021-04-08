<template>
  <div id="supplyProjectDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="item.projectName"
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
                <van-icon :name="item.collection?'star':'star-o'" class="icon-size"
                          :class="{'collect-span':item.collection}"/>
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
              <van-image :src="getImgNewView(item.imgUrl)" class="my-image"/>
            </van-row>
            <van-row class="title container">
              <h3 class="van-multi-ellipsis--l2">{{ item.projectName }}</h3>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="12" class="van-ellipsis">
                    <span>所属行业：</span>
                    <span>{{ item.belongIndustryName}}</span>
                  </van-col>
                  <van-col :span="12" class="van-ellipsis">
                    <span>意向运营方式：</span>
                    <span>{{ item.intendedOperationModeName}}</span>
                  </van-col>
                </van-row>
              </div>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="12" class="van-ellipsis">
                    <span>项目类型：</span>
                    <span>{{ item.projectTypeName}}</span>
                  </van-col>
                  <van-col :span="12" class="van-ellipsis">
                    <span>交易价格：</span>
                    <span class="money-span">{{ newMoney }}</span>
                  </van-col>
                </van-row>
              </div>
              <div class="my-content">
                <van-row :gutter="12" class="content-row">
                  <van-col :span="12" class="van-ellipsis">
                    <span>项目所在地：</span>
                    <span>{{ item.madeAreaCodeName}}</span>
                  </van-col>
                  <van-col :span="12" class="van-ellipsis" v-if="statusMes">
                    <span>状态：</span>
                    <span>{{ item.statusName}}</span>
                  </van-col>
                </van-row>
              </div>
              <van-row class="my-time" type="flex" align="center">
                <van-icon name="clock-o"/>
                {{ item.publishTime | changeDate}}
              </van-row>
            </van-row>
          </van-row>
          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" line-width="68px">
              <van-tab title="项目详情" name="1">
                <h3>基本信息</h3>
                <van-row class="my-content">
                  <p class="van-ellipsis">项目名称：{{ item.projectName}}</p>
                  <p class="van-ellipsis">展示有效期：{{ item.startDate | dateFormat}}至{{ item.deadlineDate | dateFormat}}</p>
                  <p class="van-ellipsis">所属行业：{{ item.belongIndustryName}}</p>
                  <p class="van-ellipsis">项目所在地：{{ item.madeAreaCodeName }}</p>
                </van-row>
                <h3>项目内容</h3>
                <van-row class="my-inner-tabs">
                  <van-tabs v-model="innerActive" title-inactive-color="#666666" title-active-color="#2F72D1"
                            background="#ffffff" color="#2F72D1" class="my-tab" :class="item.portalSupplyProjectZscqs && item.portalSupplyProjectZscqs.length > 0?'':'hide-tab'" type="line" :border="false">
                    <van-tab title="专利" name="1">
                      <div class="ant-descriptions ant-descriptions-bordered"
                           v-if="item.portalSupplyProjectPatents && item.portalSupplyProjectPatents.length > 0">
                        <div class="ant-descriptions-view">
                          <table cellspacing="0" cellpadding="0">
                            <tr class="ant-descriptions-row">
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">申请号</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">专利权人</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">法律状态</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">专利名称</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">专利类型</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">权利证明</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">委托证明</th>
                            </tr>
                            <tr class="ant-descriptions-row"
                                v-for="(innerItem,innerIndex) in item.portalSupplyProjectPatents" :key="innerItem.key">
                              <td class="ant-descriptions-item-content">{{innerItem.applyNo}}</td>
                              <td class="ant-descriptions-item-content">{{innerItem.patenter}}</td>
                              <td class="ant-descriptions-item-content">{{
                                filterMultiDictText(innerItem.status,'patent_status')}}
                              </td>
                              <td class="ant-descriptions-item-content">{{innerItem.patentName}}</td>
                              <td class="ant-descriptions-item-content">
                                {{filterMultiDictText(innerItem.patentType,'patent_type')}}
                              </td>
                              <td class="ant-descriptions-item-content">
                                <span>
                                  <a :href="urlDownload + innerItem.qlzm">{{innerItem.qlzm | changeData}}</a>
                                </span>
                              </td>
                              <td class="ant-descriptions-item-content">
                                <span>
                                  <a :href="urlDownload + innerItem.wtzm">{{innerItem.wtzm | changeData}}</a>
                                </span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div v-else>
                        <van-empty description="没有内容"/>
                      </div>
                    </van-tab>
                    <van-tab title="其他知识产权" name="2" v-if="item.portalSupplyProjectZscqs && item.portalSupplyProjectZscqs.length > 0">
                      <div class="ant-descriptions ant-descriptions-bordered"
                           v-if="item.portalSupplyProjectZscqs && item.portalSupplyProjectZscqs.length > 0">
                        <div class="ant-descriptions-view">
                          <table cellspacing="0" cellpadding="0">
                            <tr class="ant-descriptions-row">
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">知识产权名称</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">权利证明</th>
                              <th class="ant-descriptions-item-label ant-descriptions-item-colon">委托证明</th>
                            </tr>
                            <tr class="ant-descriptions-row"
                                v-for="(innerItem,innerIndex) in item.portalSupplyProjectPatents" :key="innerItem.key">
                              <td class="ant-descriptions-item-content">{{innerItem.name}}</td>
                              <td class="ant-descriptions-item-content">
                                <span>
                                  <a :href="urlDownload + innerItem.qlzm">{{innerItem.qlzm | changeData}}</a>
                                </span>
                              </td>
                              <td class="ant-descriptions-item-content">
                                <span>
                                  <a :href="urlDownload + innerItem.wtzm">{{innerItem.wtzm | changeData}}</a>
                                </span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div v-else>
                        <van-empty description="没有内容"/>
                      </div>
                    </van-tab>
                  </van-tabs>
                  <van-row class="my-content my-two" type="flex" align="center">
                    <van-col :span="5">项目简介：</van-col>
                    <van-col :span="19">
                      <span v-html="item.projectRemark"
                            style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;"
                            class="html-content"></span>
                    </van-col>
                  </van-row>
                  <van-row class="my-content my-two" type="flex" align="center">
                    <van-col :span="5">项目内容：</van-col>
                    <van-col :span="19">
                      <span v-html="item.projectContent"
                            style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;"
                            class="html-content"></span>
                    </van-col>
                  </van-row>
                  <van-row class="my-content my-two" type="flex" align="center">
                    <van-col :span="5">技术团队：</van-col>
                    <van-col :span="19">
                      <span style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;" class="html-content">{{item.technologyTeamName}}</span>
                    </van-col>
                  </van-row>
                </van-row>
                <h3>项目描述</h3>
                <van-row class="my-content my-two" type="flex" align="center">
                  <van-col :span="10">解决的技术问题：</van-col>
                  <van-col :span="14">
                    <span
                      style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;font-size: 14px">{{item.sloveProblem}}</span>
                  </van-col>
                </van-row>
                <van-row class="my-content my-two" type="flex" align="center">
                  <van-col :span="10">技术领域/适用范围：</van-col>
                  <van-col :span="14">
                    <span
                      style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;font-size: 14px">{{item.technicalField}}</span>
                  </van-col>
                </van-row>
              </van-tab>
              <van-tab title="交易评价" name="2">
                <div class="ant-descriptions ant-descriptions-bordered"
                     v-if="evaluateData.length > 0">
                  <div class="ant-descriptions-view">
                    <table cellspacing="0" cellpadding="0">
                      <tr class="ant-descriptions-row">
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">评价用户/企业</th>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">服务评价</th>
                        <th class="ant-descriptions-item-label ant-descriptions-item-colon">评价内容</th>
                      </tr>
                      <tr class="ant-descriptions-row"
                          v-for="(innerItem,innerIndex) in evaluateData" :key="innerItem.id">
                        <td class="ant-descriptions-item-content">{{innerItem.enterpriseName|filterName}}</td>
                        <td class="ant-descriptions-item-content">
                            <span>
                              <van-rate
                                v-model="innerItem.serveScore"
                                :size="14"
                                color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"
                                allow-half
                              />
                            </span>
                        </td>
                        <td class="ant-descriptions-item-content">
                          {{innerItem.evalContent}}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <van-pagination v-model="ipagination.current" :total-items="ipagination.total"
                                  :items-per-page="ipagination.pageSize" force-ellipses
                                  @change="ipagination.onChange"/>
                </div>
                <div v-else>
                  <van-empty description="没有内容"/>
                </div>
              </van-tab>
            </van-tabs>
          </van-row>
          <van-row>
            <recommend-organization title="" :have-more="false" class="other-project">
              <template slot="content">
                <h2 class="container">持有方其他项目</h2>
                <van-empty description="没有内容" v-if="ownArr.length === 0"/>
                <div class="container" v-else>
                  <van-row type="flex" justify="space-between" class="my-list-layout-row"
                           v-for="(outItem,outIndex) in ownArr"
                           :key="outIndex">
                    <recommend-service-card
                      v-for="(item,index) in outItem"
                      :key="item.id"
                      :item="item"
                      :is-service="false"
                      @func="refresh">
                    </recommend-service-card>
                  </van-row>
                </div>
              </template>
            </recommend-organization>
          </van-row>
        </div>

        <van-tabbar
          placeholder :fixed="false" class="bar-footer">
          <van-row class="tabbar-btn">
            <van-col :span="12">
              <van-button type="default" class="contact-btn" icon="manager-o" @click="contactBtn" :disabled="contact">
                联系卖家
              </van-button>
            </van-col>
            <van-col :span="12">
              <van-button type="default" class="buy-btn" icon="goods-collect" @click="buyService">购买服务</van-button>
            </van-col>
          </van-row>
        </van-tabbar>
      </div>
    </van-popup>
    <contact-popup ref="contactMeRef"></contact-popup>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import { judgeState, changeArr, filterObj, cloneObject, arrayToStringObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { initDictOptions, filterMultiDictText } from '@/components/dict/JDictSelectUtil'
  import RecommendOrganization from '../general/RecommendOrganization'
  import RecommendServiceCard from '../card/RecommendServiceCard'
  import ContactPopup from '../popup/ContactPopup'

  export default {
    name: 'SupplyProjectDetails',
    components: { ContactPopup, RecommendServiceCard, RecommendOrganization },
    inject: ['headLogin'],
    data() {
      return {
        urlDownload: window._CONFIG['domianURL'] + '/sys/common/download/',
        item: {},
        url: '/zscq/portal/getSupplyRequirementDetail',
        supplyRequirementType: 1,
        ownUrl: '/zscq/portal/ownerProjectInfos',
        spinning: false,
        ownArr: [],

        orgUrl: '/zscq/portal/getOrgAgencyByOrgId',
        selectOrg: {},

        statusUrl: '/zscq/portal/getServeOrderStatusStr',
        statusMes: '',

        detailsShow: false,
        loginBtn: false,


        active: '1',
        innerActive: '1',
        dictOptions: {
          patent_type: [],
          patent_status: []
        },

        evaluateData: [],
        getEvaluateUrl: '/zscq/portal/getPortalServeEvalPage',
        formParam: {
          serviceProductId: ''
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        contact: false,
        getMessageUrl: '/zscq/portal/getSupplyRequiermentCreaterInfo'
      }
    },
    methods: {
      refresh(id) {
        this.loadData(id)
        this.formParam.serviceProductId = id
        this.loadEValuate(this.formParam)
      },
      showPopup(id) {
        this.detailsShow = true
        this.initDictConfig()
        this.loadData(id)
        this.formParam.serviceProductId = id
        this.loadEValuate(this.formParam)
      },
      getPhoneByItem(item) {
        this.contact = true
        getActionUpdateKeyword(this.getMessageUrl, {
          type: item.supplyRequirementType,
          id: item.id
        }).then((res) => {
          if (res.success) {
            this.$refs.contactMeRef.showPopup(res.result.orgId ? res.result.orgId : res.result.userId, res.result.userId)
          } else {
            this.$notify({ type: 'danger', message: res.message })
          }
          this.contact = false
        }).finally(() => {
          this.contact = false
        })
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
      addKey(itemArr) {
        for (const i in itemArr) {
          itemArr[i].key = i
        }
      },
      async loadData(id) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.url, {
          supplyRequirementType: this.supplyRequirementType,
          id: id
        })
        if (res.success) {
          this.addKey(res.result.portalSupplyProjectPatents)
          this.addKey(res.result.portalSupplyProjectZscqs)

          this.item = res.result
          this.statusMes = this.item.statusName
        } else {
          this.$notify({ type: 'warning', message: res.message })
        }
        console.info(this.item)

        const ownRes = await getActionUpdateKeyword(this.ownUrl, {
          supplyRequirementType: this.supplyRequirementType,
          id: id,
          createBy: this.item.createBy,
          pageSize: 4
        })
        if (ownRes.success) {
          this.ownArr = ownRes.result.records
          this.ownArr.forEach(a => {
            a.title = a.projectName
          })
          this.ownArr = changeArr(this.ownArr, 2)
        } else {
          this.$notify({ type: 'warning', message: ownRes.message })
        }

        this.$cancelLoading()
      },
      initDictConfig() {
        initDictOptions('patent_status').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'patent_status', res.result)
          }
        })
        initDictOptions('patent_type').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'patent_type', res.result)
          }
        })
      },
      filterMultiDictText(data, dict) {
        if (!data) {
          return ''
        } else {
          return filterMultiDictText(this.dictOptions[`${dict}`], data + '')
        }
      },
      handleTableChange(pagination, filters, sorter) {
        this.ipagination = pagination
        const param = this.handleParam(this.formParam)
        this.loadData(param)
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
      },
      loadEValuate(param) {
        getActionUpdateKeyword(this.getEvaluateUrl, param).then((res) => {
          const dataList = []
          if (res.success) {
            this.ipagination.total = res.result.total
            for (const i in res.result.records) {

              const data = res.result.records[i]
              data.key = i
              dataList.push(data)
            }
          }
          this.evaluateData = dataList
        }).finally(() => {
        })
      },
      buyService() {
        this.$notify({ type: 'primary', message: '请在PC端进行购买操作' })
      },
      contactBtn() {
        if (judgeState()) {
          this.getPhoneByItem(this.item)
        } else {
          this.$notify({ type: 'danger', message: '请先进行登录!' })
          this.headLogin()
        }
      }
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return this.item.money
        }
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
      },
      filterName(value) {
        if (value.anonym === '1' || !value.enterpriseName) {
          return '**********'
        } else {
          return value.enterpriseName.substring(0, 3) + '*******'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  #supplyProjectDetails {

  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

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
    .bar-footer {
      height: 7.5%;
    }
    .my-main-content {
      height: 85.5%;
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
      .van-tab__text {
      }
      /deep/ .van-tab {
        font-size: 16px;
        font-weight: normal;
      }
      /deep/ .van-tabs__line {
        height: 2px;
      }
      .van-tabs__nav .van-tabs__nav--line {
        width: 50%;
      }
      /deep/ .van-tabs__content {
        border-top: 2px solid @main-bg-color;
        padding: 15px;
        color: #666666;
      }
      /deep/ .van-tabs__wrap {
        width: 60%;
      }
      h3 {
        font-size: 13px;
        font-weight: normal;
        padding: 0 7px;
        background-color: @main-bg-color;
        margin: 0;
        margin-bottom: 10px;
      }

      .my-inner-tabs {
        /deep/ .van-tab {
          font-size: 14px;
        }
        /deep/ .van-tabs__wrap {
          width: 100%;
        }
        .hide-tab {
          /deep/ .van-tabs__wrap {
            width: 50%;
          }
        }
      }
      .my-content {
        padding-left: 7px;
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
    .my-two {
      padding: 12px 0;
      .html-content {
        font-size: 14px;
        /deep/ img {
          max-width: 100%;
        }
      }
    }
    .other-project {
      h2 {
        font-weight: normal;
        font-size: 14px;
        margin: 12px 15px;
      }
    }
  }
</style>