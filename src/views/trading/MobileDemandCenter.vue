<template>
  <div id="mobileDemandCenter">
    <van-row class="my-row" type="flex" align="center">
      <van-col :span="8">
        <order-button title="发布时间排序" @changeSort="changeTimeSort"></order-button>
      </van-col>
      <van-col :span="8">
        <order-button title="价格排序" @changeSort="changeMoneySort"></order-button>
      </van-col>
      <van-col :span="8" class="my-col">
        <div @click="btnClick">
          <span>筛选</span>
          <span><van-icon name="filter-o"/></span>
        </div>
      </van-col>
    </van-row>

    <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="data.length !== 0">
      <template slot="content">
        <van-empty description="没有内容" v-if="data.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in data"
                   :key="innerIndex"
                   class="my-class-row">
            <recommend-demand-card
              v-for="(item,index) in innerItem"
              :item="item"
              :column="column"
              :item-key="itemKeyList"
              :is-brand="isBrand"
              :key="item.id"
              :have-bottom="true"
              :key-router="keyRoute"
              @func="refresh"
            ></recommend-demand-card>
          </van-row>
        </div>

      </template>
    </recommend-organization>

    <van-popup v-model="show" position="right" style="height: 100%;width: 75%" class="my-popup"
               get-container="#mobileSupplyCenter" :safe-area-inset-bottom="false">
      <van-row class="my-popup-content">
        <supply-project-form ref="myForm" demand-or-supply="demand"></supply-project-form>
      </van-row>
      <van-row class="my-btn-group">
        <van-col :span="12" class="my-btn-col">
          <van-button @click="cancelBtn">取消</van-button>
        </van-col>
        <van-col :span="12" class="my-btn-col">
          <van-button class="my-btn-primary" @click="confirmBtn">确认</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
  import OrderButton from '../../components/general/OrderButton'
  import SupplyProjectForm from '../../components/form/SupplyProjectForm'
  import RecommendOrganization from '../../components/general/RecommendOrganization'

  import { filterObj, cloneObject, arrayToStringObj, changeArr } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendDemandCard from '../../components/card/RecommendDemandCard'

  export default {
    name: 'MobileDemandCenter',
    data() {
      return {
        show: false,
        column: [
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
        ],

        url: '/zscq/portal/requirementSearch',
        data: [],
        ipagination: {
          current: 1,
          pageSize: 12,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        formParam: {
          supplyRequirementType: '4'
        },
        allParam: {
          orderParam: {
            publishDateSort: '',
            moneySort: ''
          }
        },
        keyRoute: 'ProjectDetails'
      }
    },
    components: { RecommendDemandCard, RecommendOrganization, SupplyProjectForm, OrderButton },
    created() {
      const param = this.handleParam(this.formParam)
      this.loadData(param)
    },
    methods: {
      refresh() {
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      changeTimeSort(item) {
        console.info(item)
        this.allParam.orderParam.publishDateSort = item
      },
      changeMoneySort(item) {
        this.allParam.orderParam.moneySort = item
      },
      btnClick() {
        this.show = true
      },
      cancelBtn() {
        this.show = false
      },
      confirmBtn() {
        this.formParam = this.$refs.myForm.filter
        this.show = false
        this.ipagination.current = 1
        this.refresh()
      },
      async loadData(param) {
        console.info('wahahaha')
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getActionUpdateKeyword(this.url, param)
        console.info(res)
        if (res.success) {
          this.ipagination.total = res.result.total
          this.data = changeArr(res.result.records, 2)
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current - 1
        newParam.pageSize = that.ipagination.pageSize

        newParam.publishDateSort = that.allParam.orderParam.publishDateSort
        newParam.moneySort = that.allParam.orderParam.moneySort

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      }
    },
    watch: {
      allParam: {
        handler(newData, oldData) {
          const param = this.handleParam(this.formParam)
          this.loadData(param)
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileDemandCenter {
    .my-row {
      border-bottom: 1px solid @main-bg-color;
      height: 80/2px;
      .my-col {
        text-align: center;
        color: #333333;
        div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        span {
          font-size: 24/2px;
        }
      }
    }
    .my-class-row {
      padding-bottom: 32/2px;
    }
    .my-content{
      padding-top:32/2px;
    }
  }

  .my-popup {
    background-color: @main-bg-color;
    .my-popup-content {
      height: 93%;
      overflow-y: auto;
    }
    .my-btn-group {
      height: 7%;
      .my-btn-col {
        height: 100%;
      }
      .van-button {
        height: 100%;
        width: 100%;
        color: #666666;
        font-size: 15px;
        border: none;
      }
      .van-button--default {
        border-radius: 0;
      }
      .my-btn-primary {
        color: #ffffff;
        background-color: @main-color;
        border-radius: 0;
      }
    }
  }
</style>