<template>
  <div id="mobileCloudMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7" color="#2F72D1" class="my-tab">
      <van-tab title="云画报" name="MobileCloud" :to="{name:'MobileCloud'}">
      </van-tab>
      <van-tab title="IP图文直播" name="MobileIPLive" :to="{name:'MobileIPLive'}">
      </van-tab>
      <van-tab title="IP画像" name="MobilePortrait" :to="{name:'MobilePortrait'}">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: "MobileCloudMenu",
    data() {
      return {
        activeName: 'MobileCloud'
      }
    },
    watch: {
      "$route": {
        handler(data) {
          switch (data.name) {
            case "MobileCloud":
            case "MobileCloudPaperList":
            case "MobileCloudPaperInfo":
              this.activeName = "MobileCloud"
              break
            case "MobileIPLive":
            case "MobileIPLiveInfo":
              this.activeName = "MobileIPLive"
              break
            case "MobilePortrait":
            case "MobilePortraitInfo":
              this.activeName = "MobilePortrait"
              break
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";
  #mobileCloudMenu {
    padding-top: 15/2px;
    padding-bottom: 15/2px;
    background-color: @main-bg-color;
    /deep/ .van-tab__text--ellipsis{
      font-size: 24/2px;
    }
    /deep/ .van-tabs__nav--card {
      .van-tab {
        border: 1px solid @main-color;
      }
    }
  }
</style>