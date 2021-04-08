<template>
  <div id="recommendServiceOrgCard" @click="cardClick(item)">
    <van-row class="card-img">
      <van-image
        lazy-load
        class="my-img"
        fit="contain"
        :src="getImgNewView(item.logo)"
      />
    </van-row>
    <div class="inner-container">
      <van-row class="card-content">
        <h2 class="van-ellipsis">{{item.name}}</h2>
        <p class="van-multi-ellipsis--l2 my-two">主营业务:{{item.serviceContentName}}</p>
        <p class="van-ellipsis">{{item.cityName}}</p>
      </van-row>
    </div>

    <service-org-details ref="detailsRef"></service-org-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import ServiceOrgDetails from '../details/ServiceOrgDetails'

  export default {
    name: "RecommendServiceOrgCard",
    components: { ServiceOrgDetails },
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
    },
    methods: {
      cardClick(item) {
        this.$refs.detailsRef.showPopup(item.id)
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #recommendServiceOrgCard {
    background-color: #ffffff;
    width: 330/2px;
    .card-img {
      text-align: center;
      height: 187/2px;
      .my-img {
        width: 100%;
        height: 100%;
      }
      margin-bottom: 5px;
    }
    .card-content {
      padding-bottom: 10px;
      width: 100%;
      h2, p {
        margin: 0;
        padding: 0;
        width: 100%;
      }
      h2 {
        font-size: 24/2px;
        font-weight: 400;
        color: @main-font-color;
        margin-bottom: 5px;
      }
      p {
        font-size: 18/2px;
        color: #898989;
      }
      .my-two{
        height: 36px;
        line-height: 18px;
      }
    }
  }
</style>