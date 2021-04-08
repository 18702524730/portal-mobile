<template>
  <div id="mobileServiceMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="服务大厅" name="MobileServiceCenter" :to="{name:'MobileServiceCenter'}">
      </van-tab>
      <van-tab title="服务机构" name="MobileServiceOrg" :to="{name:'MobileServiceOrg'}">
      </van-tab>
      <van-tab title="服务项目" name="MobileServiceProject" :to="{name:'MobileServiceProject'}">
      </van-tab>
      <!--<van-tab title="服务券" name="MobileDemandCenter" :to="{name:'MobileDemandCenter'}">-->
      <!--</van-tab>-->
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MobileServiceMenu',
    data() {
      return {
        activeName: 'MobileTradingCenter'
      }
    },
    watch: {
      '$route': {
        handler(data) {
          let activeName = ''
          switch (data.name) {
            case 'MobileServiceCenter':
              activeName = 'MobileServiceCenter'
              break
            case 'MobileServiceOrg':
              activeName = 'MobileServiceOrg'
              break
            case 'MobileServiceProject':
              activeName = 'MobileServiceProject'
              break
          }
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

  #mobileServiceMenu {
    .tab-style();
  }
</style>