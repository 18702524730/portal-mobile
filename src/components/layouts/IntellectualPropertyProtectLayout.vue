<template>
  <div id="intellectualPropertyProtectLayout">
    <mobile-protect-menu></mobile-protect-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileProtectMenu from '@/components/navigation/MobileProtectMenu'
  export default {
    name: "IntellectualPropertyProtectLayout",
    components: { MobileProtectMenu }
  }
</script>

<style scoped lang="less">
  #intellectualPropertyProtectLayout {

  }
</style>