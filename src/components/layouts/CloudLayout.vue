<template>
  <div id="cloudLayout">
    <mobile-cloud-menu></mobile-cloud-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileCloudMenu from "@/components/navigation/MobileCloudMenu"
  export default {
    name: "CloudLayout",
    components: { MobileCloudMenu }
  }
</script>

<style scoped lang="less">
</style>