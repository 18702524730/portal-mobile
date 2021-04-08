<template>
  <div id="recommendServiceCard" @click="btnCard(item)" :class="border?'cardBorder':''">
    <van-row class="card-img">
      <van-image
        lazy-load
        class="my-img"
        :src="getImgNewView(item.imgUrl)"
      />
      <img src="../../assets/images/quan.png" alt="券" class="quan-img" v-if="item.voucher">
    </van-row>
    <div class="inner-container">
      <van-row class="card-content">
        <h2 class="van-ellipsis">{{item.title }}</h2>
        <p class="van-ellipsis">{{newMoney}}</p>
      </van-row>
    </div>

    <service-project-details ref="detailsRef"></service-project-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import ServiceProjectDetails from '../details/ServiceProjectDetails'

  export default {
    name: 'RecommendServiceCard',
    components: { ServiceProjectDetails },
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      isService: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      border: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    },
    methods: {
      cardClick(item) {

      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      btnCard(item) {
        if (this.isService) {
          // 如果是服务，就调用服务的路由
          console.info(item)
          this.$refs.detailsRef.showPopup(item.orgId,item.id)
        } else {
          this.$emit('func', item.id)
        }
      }
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return '￥' + this.item.money
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #recommendServiceCard {
    background-color: #ffffff;
    width: 330/2px;
    height: 278/2px;
    .card-img {
      text-align: center;
      height: 180/2px;
      position: relative;
      .my-img {
        width: 100%;
        height: 100%;
      }
      .quan-img {
        height: 38/2px;
        position: absolute;
        top: -19/2px;
        right: -10/2px;
      }
      margin-bottom: 5px;
    }
    .card-content {
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
        font-size: 20/2px;
        color: #FC1B1B;
      }
    }
  }
  .cardBorder{
    border: 1Px solid #f5f6f7;
  }
</style>