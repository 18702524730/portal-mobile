<template>
  <div id="tradingLayout">
    <mobile-trading-menu></mobile-trading-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileTradingMenu from "@/components/navigation/MobileTradingMenu"
  export default {
    name: "TradingLayout",
    components: { MobileTradingMenu }
  }
</script>

<style scoped lang="less">
  #tradingLayout {

  }
</style>