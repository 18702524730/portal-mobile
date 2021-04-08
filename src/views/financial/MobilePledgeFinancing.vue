<template>
  <div id="mobilePledgeFinancing">
    <swipe-map :adList="advertList"></swipe-map>
    <div class="message-div container">
      <van-tabs v-model="active" animated background="#EBECF7" title-inactive-color="#141414" type="card"
                :ellipsis="false">
        <template slot="nav-right">
          <div class="my-more">

          </div>

        </template>
        <van-tab title="融资动态" name="1">
          <vue-seamless-scroll :data="pledgesData" class="seamless-warp" :class-option="classOption">
            <van-row v-for="(item,index) in pledgesData" :key="item.id" class="my-row-two">
              <span>•</span>
              <span class="van-ellipsis financing-title-p">{{item.enterpriseNameC}}</span>
              <span></span>
              <!--<span class="van-ellipsis financing-type-p">{{item.projectName | filterData}}</span>-->
              <span class="van-ellipsis financing-money-p">{{item.quota | numChange}}</span>
              <span class="van-ellipsis financing-time-p">{{item.orderTime | changeDate}}</span>
            </van-row>
          </vue-seamless-scroll>
        </van-tab>
      </van-tabs>
    </div>

    <div class="message-div container message-div-two">
      <van-tabs v-model="active" animated background="#EBECF7" title-inactive-color="#141414" type="card"
                :ellipsis="false">
        <template slot="nav-right">
          <div class="my-more">
            <a @click="moreClick">
              <span class="more-span">查看更多</span><img src="../../assets/images/home/next.png" alt="查看更多"
                                                      class="span-img">
            </a>
          </div>

        </template>
        <van-tab title="资讯中心" name="1">
          <van-row v-for="(item,index) in infoData" :key="item.id" class="my-row" @click="rowClick(item)">
            <span>•</span>
            <span class="van-ellipsis">{{item.title }}</span>
            <span>{{item.releaseDate | changeDate}}</span>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>

    <div class="platform-achievements">
      <h2 class="my-center-header-h container">平台成果</h2>
      <van-row class="my-four-row">
        <van-col :span="6">
          <div style="color: #FFFB00">
            <span class="large-p">
              17.11 <span class="my-type">亿元</span>
            </span><br/>
            <span class="middle-p">累计融资申请额</span>
          </div>
        </van-col>
        <van-col :span="6">
          <div>
            <span class="large-p">
              685 <span class="my-type">笔</span>
            </span><br/>
            <span class="middle-p">累计融资申请量</span>
          </div>
        </van-col>
        <van-col :span="6">
          <div>
            <span class="large-p">
              5.42 <span class="my-type">亿元</span>
            </span><br/>
            <span class="middle-p">一年融资融资额</span>
          </div>
        </van-col>
        <van-col :span="6">
          <div>
            <span class="large-p">
              217 <span class="my-type">笔</span>
            </span><br/>
            <span class="middle-p">一年融资量</span>
          </div>
        </van-col>
      </van-row>
      <van-row class="my-three-row">
        <van-col :span="8">
          <div>
            <span class="large-p">
              870 <span class="my-type">家</span>
            </span><br/>
            <span class="middle-p">注册企业</span>
          </div>
        </van-col>
        <van-col :span="8">
          <div>
            <span class="large-p">
              4 <span class="my-type">项</span>
            </span><br/>
            <span class="middle-p">金融产品</span>
          </div>
        </van-col>
        <van-col :span="8">
          <div>
            <span class="large-p">
              25 <span class="my-type">家</span>
            </span><br/>
            <span class="middle-p">入驻金融机构</span>
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="financing-project container">
      <h2>融资产品</h2>

      <van-row class="img-row">
        <van-image :src="require('../../assets/images/financial/p2.png')" class="my-image"
                   @click="clickCard(productData[0])"></van-image>
      </van-row>
      <van-row class="img-row">
        <van-image :src="require('../../assets/images/financial/p1.png')" class="my-image"
                   @click="clickCard(productData[1])"></van-image>
      </van-row>
      <van-row class="img-row img-row-last">
        <van-image :src="require('../../assets/images/financial/p3.png')" class="my-image"
                   @click="clickCard(productData[2])"></van-image>
      </van-row>
    </div>

    <recommend-organization title="合作机构" :have-more="true" :have-page="false" style="background-color: #ffffff"
                            key-route-name="MobileMoreBank">
      <template slot="content">
        <div class="my-btn-group">
          <van-button size="mini" round :type="`${value === '1'?'primary':'default'}`"
                      @click="btnClick('1')">合作银行
          </van-button>
          <van-button size="mini" round :type="`${value === '2'?'primary':'default'}`"
                      @click="btnClick('2')">担保机构
          </van-button>
          <van-button size="mini" round :type="`${value === '3'?'primary':'default'}`" @click="btnClick('3')">
            保险机构
          </van-button>
          <van-button size="mini" round :type="`${value === '4'?'primary':'default'}`" @click="btnClick('4')">
            评估机构
          </van-button>
        </div>
        <van-empty description="没有内容" v-if="bankList.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" v-for="(innerItem,innerIndex) in bankList"
                   :key="innerIndex"
                   class="my-class-row" :gutter="17">
            <van-col
              v-for="(item,index) in innerItem"
              :key="index"
              :span="8">
              <bank-card
                :item="item"
              ></bank-card>
            </van-col>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <pledge-financing-details ref="financingModal"></pledge-financing-details>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { changeArr, filterObj } from '@/utils/util'
  import { getImgNewView } from '@/utils/role'
  import SwipeMap from '../../components/general/SwipeMap'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import BankCard from '../../components/card/BankCard'
  import PledgeFinancingDetails from '../../components/details/PledgeFinancingDetails'

  function myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value)
  }

  export default {
    name: 'MobilePledgeFinancing',
    components: { PledgeFinancingDetails, BankCard, RecommendOrganization, SwipeMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '8'
        },
        adLoading: false,
        advertList: [],


        pledgesUrl: '/zscq/portal/lastestPortalPledges',
        formParam: {
          num: 30
        },
        pledgesData: [],
        pledgesLoading: false,

        infoUrl: '/zscq/portal/informationRecommendList',
        infoFormParam: {
          num: 6,
          informationType: '8'
        },
        infoData: [],
        infoLoading: false,

        productUrl: '/zscq/portal/pledgeFinancingProducts',
        productData: [],

        value: '1',
        orgUrl: '/zscq/portal/getPledgeFinancingProductOrgByType',
        bankList: [],
        orgLoading: false,
        orgParam: {
          type: '1'
        },
        active: '1'
      }
    },
    created() {
      this.getAllAdverts()
      this.loadPortalPledgesData()
      this.loadInfoData()
      this.loadProductData()
      this.loadOrgData()
    },
    methods: {
      moreClick() {
        this.$router.push({ name: 'MobileFinancialConsultShow' })
      },
      rowClick(item) {
        this.$router.push({
          name: 'MobileFinancialConsultArticleMessage',
          query: { id: item.id, keyRoute: 'MobilePledgeFinancing' }
        })
      },
      clickCard(item) {
        this.$refs.financingModal.showPopup(item)
      },
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      async loadPortalPledgesData() {
        if (!this.pledgesUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.pledgesLoading = true
        const res = await getActionUpdateKeyword(this.pledgesUrl, this.formParam)
        if (res.success) {
          this.pledgesData = res.result
          for (const a of this.pledgesData) {
            let startName = ''
            let endName = ''
            if (a.enterpriseName) {
              if (a.enterpriseName.startsWith('厦门') || a.enterpriseName.startsWith('福建')) {
                startName = a.enterpriseName.slice(0, 3)
                endName = a.enterpriseName.slice(-2)
              } else {
                if (a.enterpriseName.length >= 6) {
                  startName = a.enterpriseName.slice(0, 1)
                  endName = a.enterpriseName.slice(-2)
                } else if (a.enterpriseName.length >= 4) {
                  startName = a.enterpriseName.slice(0, 1)
                  endName = a.enterpriseName.slice(-2)
                } else if (a.enterpriseName.length >= 2) {
                  startName = a.enterpriseName.slice(0, 1)
                  endName = a.enterpriseName.slice(-1)
                } else {
                  startName = '**'
                  endName = '**'
                }
              }
            }
            a.enterpriseNameC = startName + '****' + endName
          }
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.pledgesLoading = false
      },
      async loadInfoData() {
        if (!this.infoUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.infoLoading = true
        const res = await getActionUpdateKeyword(this.infoUrl, this.infoFormParam)
        if (res.success) {
          this.infoData = res.result
          console.info(res)
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.infoLoading = false
      },
      async loadProductData() {
        const res = await getActionUpdateKeyword(this.productUrl)
        if (res.success) {
          const productData = res.result
          this.productData.push(productData.filter(item => item.productType === '2')[0])
          this.productData.push(productData.filter(item => item.productType === '1')[0])
          this.productData.push(productData.filter(item => item.productType === '3')[0])
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
      },
      async loadOrgData(type = '1') {
        this.orgParam.type = type
        this.orgLoading = true
        const res = await getActionUpdateKeyword(this.orgUrl, this.orgParam)
        if (res.success) {
          this.bankList = changeArr(res.result.slice(0, 12), 3)
        }
        this.orgLoading = false
        console.info(res)
        console.info('哈哈哈哈')
      },
      handleTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      getAllAdverts() {
        if (!this.adUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      },
      getBankList() {
        this.bankList = changeArr(this.bankList, 3)
      },
      btnClick(a) {
        this.value = a
        this.loadOrgData(a)
      }
    },
    filters: {
      filterData(data) {
        if (data === undefined || data === null) {
          return '无'
        }
        return data
      },
      numChange(data) {
        if (myIsNaN(data)) {
          return data.toFixed(2) + '万元'
        } else {
          return 0
        }
      }
    },
    computed: {

      classOption() {
        return {
          step: 0.5, // 数值越大速度滚动越快
          limitMoveNum: 7 // 开始无缝滚动的数据量 this.dataList.length
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobilePledgeFinancing {
    background-color: @main-bg-color;
    .message-div {
      border: 1Px solid #EBECF7;
      margin-top: 15px;
      .my-more {
        width: 80%;
        padding-right: 27/2px;
        font-size: 24/2px;
        line-height: 24px;

        .more-span {
          color: #898989;
          padding-right: 5/2px;
          cursor: pointer;
        }
        .span-img {
          width: 13/2px;
          height: 22/2px;
          cursor: pointer;
        }
        a {
          height: 77/2px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }

      /deep/ .van-tab--active {
        color: @main-color;
        border-bottom: 2px solid @main-color;
      }
      /deep/ .van-tabs__line {
        background-color: @main-color;
      }

      /deep/ .van-tabs__nav--card {
        .van-tab.van-tab--active {
          background-color: #EBECF7;
        }
      }

      /deep/ .van-tab__pane {
        height: 451/2px;
        padding-top: 15/2px;
      }
      /deep/ .van-tabs__wrap {
        height: 77/2px;
      }

      /deep/ .van-tabs__nav--card {
        height: 77/2px;
        border: none;
        margin: 0;
        border-radius: 0;
        .van-tab {
          border-right: none;
          border-left: none;
        }
      }

      /deep/ .van-tab {
        padding: 0;
        margin: 0 40/2px;
      }
      .my-row {
        display: flex;
        align-items: center;
        padding-left: 29/2px;
        height: 70/2px;
        span:nth-child(1) {
          color: #B4B4B4;
          padding-right: 5px;
          font-size: 20px;
        }
        span:nth-child(2) {
          width: 460/2px;
          display: inline-block;
          font-size: 24/2px;
          padding-right: 66/2px;
        }
        span:nth-child(3) {
          color: @main-font-color2;
          font-size: 14/2px;
        }
      }
      .my-row-two {
        display: flex;
        align-items: center;
        padding-left: 29/2px;
        height: 70/2px;
        font-size: 24/2px;
        span:nth-child(1) {
          color: #B4B4B4;
          padding-right: 5px;
          font-size: 20px;
        }
        span:nth-child(2) {
          color: @main-font-color;
          width: 45%;
        }
        span:nth-child(3) {
          color: @main-color;
        }
        span:nth-child(4) {
          color: #FF3300;
          width: 30%;
        }
        span:nth-child(5) {
          color: @main-font-color2;
          font-size: 14/2px;
        }
      }
    }
    .message-div-two {
      margin-bottom: 15px;
    }

    .platform-achievements {
      background: url("../../assets/images/financial/group.png") no-repeat;
      background-size: 100% 100%;
      color: #ffffff;

      h2 {
        margin: 0;
        padding: 15px;
      }
      height: 235px;
      & > div {
        text-align: center;
        font-size: 8px;
        .large-p {
          font-size: 35/2px;
        }
        .my-type {
          font-size: 8px;
        }
      }
      position: relative;
      .my-four-row {
        position: absolute;
        width: 100%;
        top: 80px;
      }
      .my-three-row {
        position: absolute;
        top: 175px;
        left: 40px;
        width: 80%;
      }
    }

    .financing-project {
      h2 {
        margin: 0;
        padding: 15px 0;
      }
    }
    .img-row {
      height: 111px;
      width: 100%;
      .my-image {
        height: 111px;
      }
    }
    .img-row-last {
      margin-bottom: 30px;
    }

    .cooperation-org {
      background-color: #ffffff;
      h2 {
        margin: 0;
        padding: 15px;
      }
    }
    .my-btn-group {
      line-height: 0;
      margin: 0 15px 15px;
      .van-button {
        font-size: 12px;
        padding: 0 13px;
      }
      .van-button--primary {
        background-color: @main-color;
        border-color: @main-color;
        color: #ffffff;
      }
      .van-button--default {

      }
    }
    .my-class-row {
      margin-bottom: 10px;
    }
  }
</style>