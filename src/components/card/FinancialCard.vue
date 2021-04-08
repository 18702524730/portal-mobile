<template>
  <div id="financialCard" @click="cardBtn(item)">
    <van-row class="card-head">
      <van-image :src="getImgNewView(item.serviceImgUrl)"
                 class="my-img"
                 lazy-load/>
    </van-row>

    <van-row class="title">
      <p class="van-ellipsis">
        {{item.serviceName}}
      </p>
    </van-row>

    <financial-project-details ref="detailsModal"></financial-project-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import FinancialProjectDetails from '../details/FinancialProjectDetails'

  export default {
    name: 'FinancialCard',
    components: { FinancialProjectDetails },
    props: {
      item: {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
      getImgNewView,
      cardBtn(item) {
        this.$refs.detailsModal.showPopup(item.orgId, item.id)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #financialCard {
    background-color: #ffffff;
    margin-bottom: 10px;

    width: 165px;
    .my-img {
      width: 165px;
      height: 90px;
    }
    p {
      margin: 0;
    }
    .title {
      color: @main-font-color;
      font-size: 14px;
      padding: 0 10px 10px;
      text-align: center;
    }
  }
</style>