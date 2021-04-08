<template>
  <div id="mobileGeographySign">
    <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="data.length !== 0">
      <template slot="content">
        <van-empty description="没有内容" v-if="data.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in data"
                   :key="innerIndex"
                   class="my-class-row">
            <geography-card
              v-for="(item,index) in innerItem"
              :item="item"
              :key="item.id">
            </geography-card>
          </van-row>
        </div>

      </template>
    </recommend-organization>

    <van-popup v-model="show" position="right" style="height: 100%;width: 75%" class="my-popup"
               get-container="#mobileGeographySign" :safe-area-inset-bottom="false">
      <van-row class="my-popup-content">
        <geographic-form ref="myForm"></geographic-form>
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

    <van-button class="my-btn-filter" @click="filterBtn">
      <van-row>
        <van-icon class="iconfont" class-prefix='icon' name='filter'/>
      </van-row>
      <van-row>
        筛选
      </van-row>
    </van-button>
  </div>
</template>

<script>
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import GeographyCard from '../../components/card/GeographyCard'
  import { filterObj, cloneObject, arrayToStringObj, changeArr } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import GeographicForm from '../../components/form/GeographicForm'

  export default {
    name: 'MobileGeographySign',
    components: { GeographicForm, GeographyCard, RecommendOrganization },
    data() {
      return {
        show: false,
        data: [],

        tableUrl: '/zscq/portal/geoIndicationSearch',
        formParam: {
          productNature: '1'
        },
        ipagination: {
          current: 1,
          pageSize: 12,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        }
      }
    },
    created() {
      this.loadData(this.handleParam(this.formParam))
    },
    methods: {
      refresh() {
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      cancelBtn() {
        this.show = false
      },
      filterBtn() {
        this.show = true
      },
      confirmBtn() {
        this.formParam = this.$refs.myForm.filter
        this.show = false
        this.ipagination.current = 1
        this.refresh()
      },
      handleTableChange(pagination) {
        this.ipagination.current = pagination
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
      loadData(param) {
        if (!this.tableUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.$showLoading({
          title: '加载中。。。'
        })
        getActionUpdateKeyword(this.tableUrl, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = changeArr(res.result.records, 2)
          }
        }).finally(() => {
          this.$cancelLoading()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileGeographySign {
    .my-content {
      padding-top: 7.5px;
    }
    .my-class-row {
      padding-bottom: 32/2px;
    }
    .my-btn-filter {
      font-size: 10px;
      color: #ffffff;
      background-color: @main-color;
      border-radius: 50%;
      height: 49px;
      width: 49px;
      position: fixed;
      right: 19px;
      bottom: 200px;
      border: none;
      .iconfont {
        font-size: 25px;
      }
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