<template>
  <div id="mobileServiceOrg">
    <van-row>
      <form action="/">
        <van-search
          v-model="name"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </form>
    </van-row>
    <van-row class="my-row" type="flex" align="center">
      <van-col :span="12">
        <order-button title="销量排序" @changeSort="changeNumSort"></order-button>
      </van-col>
    </van-row>

    <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="data.length !== 0">
      <template slot="content">
        <van-empty description="没有内容" v-if="data.length === 0"/>
        <div class="container" v-else>
          <van-row type="flex" justify="space-between" class="my-list-layout-row"
                   v-for="(outItem,outIndex) in data"
                   :key="outIndex">
            <recommend-service-org-card
              v-for="(item,index) in outItem"
              :key="item.id"
              :item="item"
            ></recommend-service-org-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>
  </div>
</template>

<script>
  import OrderButton from '../../components/general/OrderButton'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import RecommendServiceOrgCard from '../../components/card/RecommendServiceOrgCard'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, changeArr } from '@/utils/util'
  import _ from 'lodash'

  export default {
    name: 'MobileServiceOrg',
    components: { RecommendServiceOrgCard, RecommendOrganization, OrderButton },
    data() {
      return {
        data: [],
        url: '/zscq/portal/getAgencyPageByName',
        formParam: {
          name: ''
        },
        ipagination: {
          current: 1,
          pageSize: 52,
          showQuickJumper: true,
          hideOnSinglePage: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        value: '',
        name: ''
      }
    },
    created() {
      this.getData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      onSearch(val) {
        this.formParam.name = this.name
        this.ipagination.current = 1
        this.getData(this.getParam(this.formParam, this.ipagination))
      },
      onCancel() {
      },
      changeNumSort(item) {
        this.formParam.serviceOrderNumSort = item
        this.getData(this.getParam(this.formParam, this.ipagination))
      },
      btnClick() {

      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      getData(param) {
        if (!this.url) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            if (!param.serviceOrderNumSort) {
              this.data = _.shuffle(res.result.records)
            } else {
              this.data = res.result.records
            }
            this.data = changeArr(this.data, 2)
          }
        }).finally(() => {
        })
      },
      handleTableChange(page) {
        this.ipagination.current = page
        this.getData(this.getParam(this.formParam, this.ipagination))
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileServiceOrg {
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
    .container {
      padding-top: 10px;
    }
  }
</style>