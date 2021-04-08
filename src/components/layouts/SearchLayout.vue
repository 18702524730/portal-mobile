<template>
  <div id="searchLayout">
    <mobile-i-p-search-menu></mobile-i-p-search-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileIPSearchMenu from '../navigation/MobileIPSearchMenu'
  export default {
    name: 'SearchLayout',
    components: { MobileIPSearchMenu }
  }
</script>

<style scoped lang="less">
  #searchLayout {

  }
</style>