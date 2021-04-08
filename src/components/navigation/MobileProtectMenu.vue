<template>
  <div id="mobileProtectMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="快速维权" name="MobileNewFastActivist" :to="{name:'MobileNewFastActivist'}">
      </van-tab>
      <van-tab title="多元化纠纷解决" name="MobileMultDisputeResolution" :to="{name:'MobileMultDisputeResolution'}">
      </van-tab>
      <van-tab title="全国维权援助网络" name="MobileActivistNetwork" :to="{name:'MobileActivistNetwork'}">
      </van-tab>
      <van-tab title="海外维权" name="MobileOverseasRights" :to="{name:'MobileOverseasRights'}">
      </van-tab>
      <van-tab title="维权资源" name="MobileNewActivistResources" :to="{name:'MobileNewActivistResources'}">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MobileProtectMenu',
    data() {
      return {
        activeName: 'MobileFastActivist'
      }
    },
    watch: {
      '$route': {
        handler(data) {
          const activeName = data.name
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

  #mobileProtectMenu {
    .tab-style();
  }
</style>