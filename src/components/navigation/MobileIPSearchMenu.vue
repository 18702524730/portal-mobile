<template>
  <div id="mobileTradingMenu">
    <van-tabs v-model="activeName" title-inactive-color="#333333" title-active-color="#2F72D1" background="#EBECF7"
              color="#2F72D1" class="my-tab">
      <van-tab title="专利检索" name="PatentSearchShiBei" :to="{name:'PatentSearchShiBei'}">
      </van-tab>
      <van-tab title="商标检索" name="BrandSearchShiBei" :to="{name:'BrandSearchShiBei'}">
      </van-tab>
      <van-tab title="法律文书" name="LawSearchShibei" :to="{name:'LawSearchShibei'}">
      </van-tab>
      <van-tab title="地理标志" name="MobileGeographySign" :to="{name:'MobileGeographySign'}">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'MobileIPSearchMenu',
    data() {
      return {
        activeName: 'MobileGeographySign'
      }
    },
    watch: {
      '$route': {
        handler(data) {
          let activeName = ''
          switch (data.name) {
            case "PatentSearchShiBei":
            case "PatentSearchList":
            case "PatentSearchDetail":
            case "SeniorSearchShibei":
            case "ExpressionSearchShibei":
              activeName = "PatentSearchShiBei"
              break
            case "BrandSearchShiBei":
            case "TrademarkSearchShiBei":
            case "TrademarkSearchDetail":
              activeName = "BrandSearchShiBei"
              break
            case "LawSearchShibei":
            case "LawSearchList":
            case "LawSearchDetail":
              activeName = "LawSearchShibei"
              break
            case 'MobileGeographySign':
              activeName = 'MobileGeographySign'
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

  #mobileTradingMenu {
    .tab-style();
  }
</style>