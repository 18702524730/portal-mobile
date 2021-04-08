<template>
  <div id="recommendMessageCard" @click="btnClick(item)">
    <van-row class="card-img">
      <van-image
        class="my-img"
        lazy-load
        :src="getImgNewView(item.articleIcons)"
      />
    </van-row>
    <div class="inner-container">
      <van-row class="card-content">
        <h2 class="van-multi-ellipsis--l2">{{item.title}}</h2>
        <p class="van-ellipsis">{{item.releaseDate | changeDate}}</p>
      </van-row>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'RecommendMessageCard',
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      routeName: {
        type: String,
        default: ''
      }
    },
    methods: {
      btnClick(item) {
        this.$router.push({ name: this.routeName, query: { id: item.id } })
      },
      getImgNewView(text) {
        return getImgNewView(text)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #recommendMessageCard {
    background-color: #ffffff;
    width: 330/2px;
    height: 320/2px;
    .card-img {
      text-align: center;
      padding: 5px;
      height: 187/2px;
      .my-img {
        width: 100%;
        height: 100%;
      }

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
        min-height: 48/2px;
      }
      p {
        font-size: 18/2px;
        color: @main-font-color2;
      }
    }
  }
</style>