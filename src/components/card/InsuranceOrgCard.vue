<template>
  <div id="insuranceOrgCard" @click="cardBtn(item)">
    <van-row class="card-img">
      <van-image
        class="my-img"
        lazy-load
        :src="getImgNewView(item.logo)"
        fit="cover"
      />
    </van-row>
    <van-row class="card-content">
      <p class="van-ellipsis">{{item.name}}</p>
      <van-row class="city-p" type="flex" align="center">
        <van-icon name="location-o"/>
        <span class="van-ellipsis">{{item.cityName}}</span>
      </van-row>
    </van-row>

    <insurance-org-details ref="detailsRef"></insurance-org-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import InsuranceOrgDetails from '../details/InsuranceOrgDetails'

  export default {
    name: 'InsuranceOrgCard',
    components: { InsuranceOrgDetails },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView,
      cardBtn(item) {
        this.$refs.detailsRef.showPopup(item.id)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #insuranceOrgCard {
    background-color: #ffffff;
    width: 165px;
    .card-img {
      .my-img {
        width: 100%;
        height: 90px;
      }
      line-height: 0;
    }
    .card-content {
      padding: 10px;
      p {
        margin: 0;
        color: @main-font-color;
        font-size: 12px;
      }
      .city-p {
        margin-top: 10px;
        color: @main-font-color2;
        font-size: 10px;
      }
    }
  }
</style>