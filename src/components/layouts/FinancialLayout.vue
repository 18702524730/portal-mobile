<template>
  <div id="financialLayout">
    <mobile-financial-menu></mobile-financial-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileFinancialMenu from '../navigation/MobileFinancialMenu'
  export default {
    name: 'FinancialLayout',
    components: { MobileFinancialMenu }
  }
</script>

<style scoped lang="less">
  #financialLayout {
  }
</style>