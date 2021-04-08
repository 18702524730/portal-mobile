<template>
  <div id="mobileTradingMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="交易大厅" name="MobileTradingCenter" :to="{name:'MobileTradingCenter'}">
      </van-tab>
      <van-tab title="供应信息" name="MobileSupplyCenter" :to="{name:'MobileSupplyCenter'}">
      </van-tab>
      <van-tab title="需求信息" name="MobileDemandCenter" :to="{name:'MobileDemandCenter'}">
      </van-tab>
      <van-tab title="项目专区" name="MobileProjectZone" :to="{name:'MobileProjectZone'}">
      </van-tab>
      <van-tab title="案例展示" name="MobileCaseShow" :to="{name:'MobileCaseShow'}">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MobileTradingMenu',
    data() {
      return {
        activeName: 'MobileTradingCenter'
      }
    },
    watch: {
      '$route': {
        handler(data) {
          let activeName = ''
          switch (data.name) {
            case 'MobileTradingCenter':
              activeName = 'MobileTradingCenter'
              break
            case 'MobileSupplyCenter':
            case 'MobileSupplyPatentCenter':
            case 'MobileSupplyBrandCenter':
              activeName = 'MobileSupplyCenter'
              break
            case 'MobileDemandCenter':
            case 'MobileDemandPatentCenter':
            case 'MobileDemandBrandCenter':
              activeName = 'MobileDemandCenter'
              break
            case 'MobileProjectZone':
              activeName = 'MobileProjectZone'
              break
            case 'MobileCaseShow':
              activeName = 'MobileCaseShow'
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

  #mobileTradingMenu {
    .tab-style();
  }
</style>