<template>
  <div id="mobileTradingCenter">
    <swipe-map :adList="advertList"></swipe-map>
    <recommend-organization title="交易动态" key-route-name="MobileProjectCenter" :have-more="false">
      <template slot="content">
        <div class="container my-dynamic">
          <van-row type="flex" justify="space-between" class="my-row" align="center" v-for="(item,index) in fiveArr"
                   :key="item.id">
            <!--<van-col class="my-col-first">-->
            <!--<van-image class="my-img" src="https://img.yzcdn.cn/vant/cat.jpeg" round fit="cover"/>-->
            <!--</van-col>-->
            <van-col class="my-col-second">
              <van-row>
                <van-col class="my-inner-row" :span="24">
                  <div class="cell-title van-ellipsis">
                    {{item.serviceName}}
                  </div>
                  <div class="cell-value van-ellipsis">
                    作者：{{item.supplyUser}}
                  </div>
                </van-col>
                <van-col class="cell-label my-inner-row" :span="24">
                  <!--<div class="van-ellipsis div-first">CN108182648A</div>-->
                  <div class="van-ellipsis div-second">交易金额：￥****元</div>
                  <div class="van-ellipsis div-third">{{item.orderTime}}</div>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </template>
    </recommend-organization>
    <recommend-organization title="供应信息" :key-route-name="supplyActiveName">
      <template slot="content">
        <van-tabs v-model="supplyActiveName" color="#2F72D1" title-inactive-color="#333333" title-active-color="#2F72D1"
                  line-width="1rem">
          <van-tab :title="outItem.title" :key="outItem.value" :name="outItem.name"
                   v-for="(outItem,outIndex) in pageList">
            <van-empty description="没有内容" v-if="outItem.dataList.length === 0"/>
            <recommend-supply-card
              v-else
              v-for="(item,index) in outItem.dataList"
              :item="item"
              :column="getKey(item,'column')"
              :item-key="getKey(item,'key')"
              :is-brand="getKey(item,'brand')"
              :key="index"
            ></recommend-supply-card>
          </van-tab>
        </van-tabs>
      </template>
    </recommend-organization>

    <recommend-organization title="需求信息" :key-route-name="demandActiveName">
      <template slot="content">
        <van-tabs v-model="demandActiveName" color="#2F72D1" title-inactive-color="#333333" title-active-color="#2F72D1"
                  line-width="1rem">
          <van-tab :title="outItem.title" :key="outItem.value" :name="outItem.name"
                   v-for="(outItem,outIndex) in pageDemandList">
            <van-empty description="没有内容" v-if="outItem.dataList.length === 0"/>
            <div class="container" v-else>
              <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in outItem.dataList"
                       :key="innerIndex"
                       class="my-class-row">
                <recommend-demand-card
                  v-for="(item,index) in innerItem"
                  :item="item"
                  :column="getKey(item,'column')"
                  :item-key="getKey(item,'key')"
                  :is-brand="getKey(item,'brand')"
                  :key="item.id"
                ></recommend-demand-card>
              </van-row>
            </div>
          </van-tab>
        </van-tabs>
      </template>
    </recommend-organization>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { changeArr } from '@/utils/util'

  import SwipeMap from '../../components/general/SwipeMap'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import RecommendSupplyCard from '../../components/card/RecommendSupplyCard'
  import RecommendDemandCard from '../../components/card/RecommendDemandCard'

  export default {
    name: 'MobileTradingCenter',
    components: {
      RecommendDemandCard,
      RecommendSupplyCard,
      RecommendOrganization,
      SwipeMap
    },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        supplyUrl: '/zscq/portal/supplyRecommendSearch',
        demandUrl: '/zscq/portal/requirementRecommendSearch',
        adParam: {
          position: '6'
        },
        adLoading: false,
        advertList: [],
        supplyActiveName: 'MobileSupplyCenter',
        demandActiveName: 'MobileDemandCenter',
        columnType: {
          'project': {
            columnList: [
              '所属行业',
              '项目成熟度',
              '意向运营方式',
              '交易价格'
            ],
            isBrand: false,
            itemKeyList: [
              'imgUrl',
              'title',

              'belongIndustryName',
              'projectMaturityName',
              'intendedOperationModeName',
              'money'
            ]
          },
          'patent': {
            columnList: [
              '所属行业',
              '技术领域',
              '意向运营方式',
              '交易价格'
            ],
            isBrand: false,
            itemKeyList: [
              'imgUrl',
              'title',

              'belongIndustryName',
              'technicalFieldName',
              'intendedOperationModeName',
              'money'
            ]
          },
          'brand': {
            columnList: [
              '商标类别',
              '行业需求',
              '所属行业',
              '交易价格'
            ],
            isBrand: true,
            itemKeyList: [
              'imgUrl',
              'title',

              'trademarkTypeName',
              'belongIndustryName',
              'belongIndustryName',
              'money'
            ]
          }
        },
        pageList: [
          {
            dataList: [],
            value: '1',
            title: '项目',
            name: 'MobileSupplyCenter'
          },
          {
            dataList: [],
            value: '2',
            title: '专利',
            name: 'MobileSupplyPatentCenter'
          },
          {
            dataList: [],
            value: '3',
            title: '商标',
            name: 'MobileSupplyBrandCenter'
          }
        ],
        pageDemandList: [
          {
            dataList: [],
            value: '4',
            title: '项目',
            name: 'MobileDemandCenter'
          },
          {
            dataList: [],
            value: '5',
            title: '专利',
            name: 'MobileDemandPatentCenter'
          },
          {
            dataList: [],
            value: '6',
            title: '商标',
            name: 'MobileDemandBrandCenter'
          }
        ],
        fiveRecordUrl: '/zscq/portal/lastestFiveRecords',
        fiveArr: []
      }
    },
    created() {
      this.getAllAdverts()
      for (const a of this.pageList) {
        this.loadData(a, this.supplyUrl)
      }
      for (const a of this.pageDemandList) {
        this.loadData(a, this.demandUrl, true)
      }
      this.getFiveRecord()
    },
    methods: {
      getFiveRecord() {
        getActionUpdateKeyword(this.fiveRecordUrl).then((res) => {
          if (res.success) {
            const arr = res.result
            this.fiveArr = arr
          }
        })
      },
      getKey(item, key) {
        let type = ''
        switch (item.supplyRequirementType) {
          case '1':
          case '4':
            type = 'project'
            break
          case '2':
          case '5':
            type = 'patent'
            break
          case '3':
          case '6':
            type = 'brand'
            break
        }
        if (key === 'column') {
          return this.columnType[`${type}`].columnList
        } else if (key === 'key') {
          return this.columnType[`${type}`].itemKeyList
        } else if (key === 'brand') {
          return this.columnType[`${type}`].isBrand
        }
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
      loadData(item, url, change = false) {
        const param = { supplyRequirementType: item.value }
        getActionUpdateKeyword(url, param).then((res) => {
          if (res.success) {
            const a = res.result
            if (change) {
              item.dataList = changeArr(a.slice(0, 4), 2)
            } else {
              item.dataList = a.slice(0, 4)
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileTradingCenter {
    .my-row {
      background-color: #ffffff;
      height: 97/2px;
      .my-img {
        width: 66/2px;
        height: 66/2px;
        position: absolute;
        top: 50%;
        margin-top: -33/2px;
        margin-left: 20/2px;
      }
      .my-col-second {
        width: 100%;
        padding-top: 10/2px;
        .cell-title {
          color: #333333;
          font-size: 24/2px;
          font-weight: 400;
          width: 414/2px;
        }
        .cell-value {
          color: @main-font-color2;
          font-size: 16/2px;
          width: 79px;
        }
      }
      .my-col-first, .my-col-second {
        height: 100%;
      }
      .my-col-first {
        position: relative;
      }
      .van-cell {
        padding: 0;
      }
      .my-inner-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20/2px;
      }
      .cell-label {
        padding-left: 10px;
        color: @main-font-color2;
        font-size: 18/2px;
        .div-first {
          width: 124/2px;
        }
        .div-second {
        }
        .div-third {
          text-align: end;
        }
      }
      .small-font {
        font-size: 18px;
        -webkit-transform-origin: 0;
        -webkit-transform: scale(0.50);
      }
    }
    /deep/ [class*=van-hairline]::after {
      border: 1Px solid #ebedf0;
    }
    .container {
      margin-top: 20/2px;
    }
    .my-class-row {
      padding-bottom: 32/2px;
    }

    .my-dynamic {
      border-top: 5px solid @main-color;
      margin-top: 0;
    }
  }
</style>