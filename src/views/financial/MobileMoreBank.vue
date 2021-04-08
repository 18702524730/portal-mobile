<template>
  <div id="mobileMoreBank">
    <van-row>
      <van-image :src="require('../../assets/images/financial/banner.jpg')" class="my-image"></van-image>
    </van-row>

    <recommend-organization :title="orgItem.titleName" :have-more="false" :have-page="false" v-for="(orgItem,orgIndex) in itemList" :key="orgItem.titleName" v-if="orgItem.bankList.length > 0">
      <template slot="content">
        <div class="my-content">
          <van-row type="flex" v-for="(innerItem,innerIndex) in orgItem.bankList"
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
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { changeArr } from '@/utils/util'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import BankCard from '../../components/card/BankCard'

  export default {
    name: 'MobileMoreBank',
    components: { BankCard, RecommendOrganization },
    data() {
      return {
        orgUrl: '/zscq/portal/getPledgeFinancingProductOrgByType',
        itemList: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData() {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.orgUrl)
        if (res.success) {
          const result = res.result
          for (const key in result) {
            let titleName = ''
            const obj = {}
            switch (key) {
              case '1':
                titleName = '合作银行'
                break
              case '2':
                titleName = '担保机构'
                break
              case '3':
                titleName = '保险机构'
                break
              case '4':
                titleName = '评估机构'
                break
            }
            obj.titleName = titleName
            obj.bankList = changeArr(result[key], 3)
            this.itemList.push(obj)
          }
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileMoreBank {
    .my-image{
      height: 288/2px;
    }
    .my-content{
      background-color: #ffffff;
      padding: 10px 15px 5px;
    }
  }
</style>