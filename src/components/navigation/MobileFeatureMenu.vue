<template>
  <div id="mobileFeatureMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="重点行业专利库" name="IndustryShiBeiPort" :to="{name:'IndustryShiBeiPort'}" v-if="isAdmin">
      </van-tab>
      <van-tab title="专利导航报告" name="PatentShiBeiPort" :to="{name:'PatentShiBeiPort'}">
      </van-tab>
      <van-tab title="专利导航分析" name="PatentNavSys" :to="{name:'PatentNavSys'}">
      </van-tab>
      <van-tab title="专利价值评价" name="PatentEvaluation" :to="{name:'PatentEvaluation'}" v-if="isAdmin">
      </van-tab>
      <van-tab title="专利资产评估" name="PatentAssess" :to="{name:'PatentAssess'}" v-if="isAdmin">
      </van-tab>
      <van-tab title="培训信息" name="MobileTrainMessage" :to="{name:'MobileTrainMessage'}" v-if="isAdmin">
      </van-tab>
      <van-tab title="专家库" name="MobileProfessorBank" :to="{name:'MobileProfessorBank'}" v-if="isAdmin">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { isLoginAndAdmin } from '@/utils/role'

  export default {
    name: 'MobileFeatureMenu',
    data() {
      return {
        activeName: '',
        isAdmin: this.isLoginAndAdmin()
      }
    },
    methods: {
      isLoginAndAdmin
    },
    watch: {
      '$route': {
        handler(data) {
          let activeName = ''
          switch (data.name) {
            case 'MobileTrainMessage':
            case 'MobileTrainArticleMessage':
              activeName = 'MobileTrainMessage'
              // activeName = 'MobileTrainArticleMessage'
              break
            case 'MobileProfessorBank':
              activeName = 'MobileProfessorBank'
              break
            case 'IndustryShiBeiPort':
            case 'IndustryInfo':
              activeName = 'IndustryShiBeiPort'
              break
            case 'PatentShiBeiPort':
            case 'PatentNavDetail':
              activeName = 'PatentShiBeiPort'
              break
            case 'PatentEvaluation':
            case 'PatentEvaluationInfo':
              activeName = 'PatentEvaluation'
              break
            case 'PatentAssess':
            case 'PatentAssessInfo':
              activeName = 'PatentAssess'
              break
            case 'PatentNavSys':
            case 'PatentNavSysInfo':
              activeName = 'PatentNavSys'
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

  #mobileFeatureMenu {
    .tab-style();
  }
</style>