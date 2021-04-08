<template>
  <div id="mobileServiceProject">
    <van-row class="my-row" type="flex" align="center">
      <van-col :span="6">
        <order-button title="销量排序" @changeSort="changeSort($event,'serviceOrderNumSort')"></order-button>
      </van-col>
      <van-col :span="6">
        <order-button title="价格排序" @changeSort="changeSort($event,'moneySort')"></order-button>
      </van-col>
      <van-col :span="6">
        <order-button title="评分排序" @changeSort="changeSort($event,'avgScoreSort')"></order-button>
      </van-col>
      <van-col :span="6" class="my-col">
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
            <service-project-card
              v-for="(item,index) in innerItem"
              :item="item"
              :key="item.id"
              @func="refresh"
            >
            </service-project-card>
          </van-row>
        </div>

      </template>
    </recommend-organization>

    <van-popup v-model="show" position="right" style="height: 100%;width: 75%" class="my-popup"
               get-container="#mobileServiceProject" :safe-area-inset-bottom="false">
      <van-row class="my-popup-content">
        <service-project-form ref="myForm" :already-data="alreadyData"></service-project-form>
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
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import ServiceProjectCard from '../../components/card/ServiceProjectCard'

  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, cloneObject, arrayToStringObj, changeArr } from '@/utils/util'
  import ServiceProjectForm from '../../components/form/ServiceProjectForm'

  export default {
    name: 'MobileServiceProject',
    components: { ServiceProjectForm, ServiceProjectCard, RecommendOrganization, OrderButton },
    data() {
      return {
        show: false,
        data: [],
        getDataUrl: '/zscq/portal/agencyProductRecommendList',
        formParam: {
          avgScoreSort: '',
          moneySort: '',
          serviceOrderNumSort: '',
          isUseVoucher: '',
          serviceTypeIds: ''
        },
        ipagination: {
          current: 1,
          pageSize: 16,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },

        getSelectDataUrl: '/zscq/portal/getParentTreeNodeById',
        alreadyData: []
      }
    },
    created() {
      if (this.$route.query.keyId) {
        this.formParam.serviceTypeIds = this.$route.query.keyId
        this.loadSelectData(this.formParam.serviceTypeIds)
      } else {
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      }

    },
    methods: {
      async loadSelectData(id) {
        this.$showLoading({
          title: '加载中。。'
        })

        const res = await getActionUpdateKeyword(this.getSelectDataUrl, { id: id })
        if (res.success) {
          console.info('哇哈哈哈123')
          console.info(res)
          this.alreadyData = res.result
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }

        const param = this.handleParam(this.formParam)
        const resTwo = await getActionUpdateKeyword(this.getDataUrl, param)
        if (resTwo.success) {
          this.ipagination.total = resTwo.result.total
          this.data = changeArr(resTwo.result.records, 2)
        } else {
          this.$notify({ type: 'danger', message: resTwo.message })
        }
        this.$cancelLoading()
      },
      refresh() {
        const param = this.handleParam(this.formParam)
        this.loadData(param)
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
      btnClick() {
        this.show = true
      },
      changeSort(sort, type) {
        this.formParam[`${type}`] = sort
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      async loadData(param) {
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getActionUpdateKeyword(this.getDataUrl, param)
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

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileServiceProject {
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
    .my-content {
      padding-top: 32/2px;
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