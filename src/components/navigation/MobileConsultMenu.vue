<template>
  <div id="mobileConsultMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="政策法规" name="MobileNewsConsult" :to="{name:'MobileNewsConsult'}">
      </van-tab>
      <van-tab title="专题信息" name="MobileSpecialMessage" :to="{name:'MobileSpecialMessage'}">
      </van-tab>
      <van-tab title="公告资讯" name="MobileNoticeMessage" :to="{name:'MobileNoticeMessage'}">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MobileConsultMenu',
    data() {
      return {
        activeName: 'MobileNewsConsult'
      }
    },
    watch: {
      '$route': {
        handler(data) {
          let activeName = ''
          switch (data.name) {
            case 'MobileNewsConsult':
            case 'MobilePolicyList':
              activeName = 'MobileNewsConsult'
              break
            case 'MobileSpecialMessage':
            case 'MobileSpecialList':
              activeName = 'MobileSpecialMessage'
              break
            case 'MobileNoticeMessage':
              activeName = 'MobileNoticeMessage'
              break
            case 'MobileArticleMessage':
              activeName = data.query.keyRoute
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

  #mobileConsultMenu {
    .tab-style();
  }
</style>