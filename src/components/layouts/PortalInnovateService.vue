<template>
  <div id="portalInnovateService">
    <mobile-innovate-menu></mobile-innovate-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileInnovateMenu from '@/components/navigation/MobileInnovateMenu'

  export default {
    name: 'PortalInnovateService',
    components: { MobileInnovateMenu }
  }
</script>

<style scoped lang="less">
</style>
