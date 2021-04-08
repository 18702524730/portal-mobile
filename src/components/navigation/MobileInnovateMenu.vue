<template>
  <div id="mobileInnovateMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="大数据监测" name="BigData" :to="{name:'BigData'}">
      </van-tab>
      <van-tab title="企业评价" name="CompanyEvaluation" :to="{name:'CompanyEvaluation'}">
      </van-tab>
      <van-tab title="企业画像" name="CompanyPortrait" :to="{name:'CompanyPortrait'}">
      </van-tab>
      <van-tab title="企业信用" name="CompanyCredit" :to="{name:'CompanyCredit'}">
      </van-tab>
      <van-tab title="服务机构" name="ServiceAgencies" :to="{name:'ServiceAgencies'}">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { isLoginAndAdmin } from '@/utils/role'

  export default {
    name: 'MobileInnovateMenu',
    data() {
      return {
        activeName: ''
      }
    },
    created() {
      if (!isLoginAndAdmin()) {
        this.$router.push({ name: 'MobileHome' })
      }
    },
    watch: {
      '$route': {
        handler(data) {
          let activeName = ''
          switch (data.name) {
            case 'CompanyEvaluation':
            case 'CompanyEvaluationInfo':
              activeName = 'CompanyEvaluation'
              break
            case 'CompanyPortrait':
            case 'CompanyPortraitList':
            case 'CompanyPortraitInfo':
              activeName = 'CompanyPortrait'
              break
            case 'CompanyCredit':
            case 'CompanyCreditList':
            case 'CompanyCreditInfo':
              activeName = 'CompanyCredit'
              break
            case 'BigData':
              activeName = 'BigData'
              break
            case 'ServiceAgencies':
            case 'AgencyInfo':
              activeName = 'ServiceAgencies'
              break
          }
          this.activeName = activeName
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";
  @import "navigation";

  #mobileInnovateMenu {
    .tab-style();
  }
</style>