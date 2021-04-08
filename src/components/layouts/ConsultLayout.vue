<template>
  <div id="consultLayout">
    <mobile-consult-menu></mobile-consult-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileConsultMenu from '../navigation/MobileConsultMenu'
  export default {
    name: 'ConsultLayout',
    components: { MobileConsultMenu }
  }
</script>

<style scoped lang="less">
  #consultLayout {

  }
</style>