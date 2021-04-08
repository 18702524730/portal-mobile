<template>
  <div id="insuranceCard"  @click="cardBtn(item)">
    <van-row class="card-img">
      <van-image
        class="my-img"
        lazy-load
        :src="getImgNewView(item.productImage)"
        fit="cover"
      />
    </van-row>
    <van-row class="card-content">
      <p class="van-ellipsis">{{item.name}}</p>
    </van-row>

    <insurance-details ref="detailsRef"></insurance-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import InsuranceDetails from '../details/InsuranceDetails'

  export default {
    name: 'InsuranceCard',
    components: { InsuranceDetails },
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

  #insuranceCard {
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
    }
  }
</style>