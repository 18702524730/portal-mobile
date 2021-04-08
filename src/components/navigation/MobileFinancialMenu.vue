<template>
  <div id="mobileFinancialMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="一带一路引导资金" name="MobileFinancialService" :to="{name:'MobileFinancialService'}">
      </van-tab>
      <van-tab title="质押融资" name="MobilePledgeFinancing" :to="{name:'MobilePledgeFinancing'}">
      </van-tab>
      <van-tab title="IP保险" name="MobileIPInsurance" :to="{name:'MobileIPInsurance'}">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MobileFinancialMenu',
    data() {
      return {
        activeName: 'MobileTrainMessage'
      }
    },
    watch: {
      '$route': {
        handler(data) {
          let activeName = ''
          switch (data.name) {
            case 'MobileFinancialService':
            case 'MobileFinancialServiceArticleMessage':
              activeName = 'MobileFinancialService'
              break
            case 'MobilePledgeFinancing':
            case 'MobileMoreBank':
            case 'MobileFinancialConsultArticleMessage':
            case 'MobileFinancialConsultShow':
              activeName = 'MobilePledgeFinancing'
              break
            case 'MobileIPInsurance':
              activeName = 'MobileIPInsurance'
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

  #mobileFinancialMenu {
    .tab-style();
  }
</style>