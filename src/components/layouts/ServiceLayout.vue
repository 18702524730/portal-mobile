<template>
  <div id="serviceLayout">
    <mobile-service-menu></mobile-service-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileServiceMenu from '../navigation/MobileServiceMenu'
  export default {
    name: 'ServiceLayout',
    components: { MobileServiceMenu }
  }
</script>

<style scoped lang="less">
  #serviceLayout {

  }
</style>