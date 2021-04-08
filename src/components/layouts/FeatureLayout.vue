<template>
  <div id="FeatureLayout">
    <mobile-feature-menu></mobile-feature-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import MobileFeatureMenu from "@/components/navigation/MobileFeatureMenu"
  export default {
    name: "FeatureLayout",
    components: { MobileFeatureMenu }
  }
</script>

<style scoped lang="less">
</style>
