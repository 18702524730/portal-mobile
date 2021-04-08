<template>
  <div id="mobileIPInsurance">
    <swipe-map :adList="advertList"></swipe-map>
    <recommend-organization title="保险产品" :have-more="false" :pagination="productIpagination"
                            :have-page="productData.length !== 0">
      <template slot="content">
        <van-empty description="没有内容" v-if="productData.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in productData"
                   :key="innerIndex"
                   class="my-class-row">
            <insurance-card
              v-for="(item,index) in innerItem"
              :item="item"
              :key="item.id">
            </insurance-card>
          </van-row>
        </div>

      </template>
    </recommend-organization>

    <recommend-organization title="保险机构" :have-more="false" :pagination="orgIpagination"
                            :have-page="orgData.length !== 0">
      <template slot="content">
        <van-empty description="没有内容" v-if="orgData.length === 0"/>
        <div class="container my-content" v-else>
          <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in orgData"
                   :key="innerIndex"
                   class="my-class-row">
            <insurance-org-card
              v-for="(item,index) in innerItem"
              :item="item"
              :key="item.id">
            </insurance-org-card>
          </van-row>
        </div>

      </template>
    </recommend-organization>
  </div>
</template>

<script>
  import SwipeMap from '../../components/general/SwipeMap'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, changeArr } from '@/utils/util'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import InsuranceCard from '../../components/card/InsuranceCard'
  import InsuranceOrgCard from '../../components/card/InsuranceOrgCard'

  export default {
    name: 'MobileIPInsurance',
    components: { InsuranceOrgCard, InsuranceCard, RecommendOrganization, SwipeMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '9'
        },
        adLoading: false,
        advertList: [],


        productData: [],

        productUrl: '/zscq/portal/ipManage/productInsuranceList',
        productFormParam: {},
        productIpagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page, 'product')
          }
        },
        productLoading: {
          spinning: false
        },

        orgData: [],

        orgUrl: '/zscq/portal/ipManage/orgInsuranceList',
        orgFormParam: {},
        orgIpagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page, 'org')
          }
        },
        orgLoading: {
          spinning: false
        }
      }
    },
    created() {
      this.getAllAdverts()
      this.loadProductData(this.getParam(this.productFormParam, this.productIpagination))
      this.loadOrgData(this.getParam(this.orgFormParam, this.orgIpagination))
    },
    methods: {
      async loadProductData(param) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.productUrl, param)
        if (res.success) {
          this.productData = changeArr(res.result.records, 2)
          this.productIpagination.total = res.result.total
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      async loadOrgData(param) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.orgUrl, param)
        if (res.success) {
          this.orgData = changeArr(res.result.records, 2)
          this.orgIpagination.total = res.result.total
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      getAllAdverts() {
        if (!this.adUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
        }).finally(() => {
        })
      },
      handleTableChange(page, type) {
        if (type === 'org') {
          this.orgIpagination.current = page
          this.loadOrgData(this.getParam(this.orgFormParam, this.orgIpagination))
        } else {
          this.productIpagination.current = page
          this.loadProductData(this.getParam(this.productFormParam, this.productIpagination))
        }
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileIPInsurance {
    .my-class-row{
      padding-bottom: 10px;
    }
  }
</style>