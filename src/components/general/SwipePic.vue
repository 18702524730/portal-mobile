<template>
  <div id="swipePic">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in adList" :key="index">
        <a :href="item.bannerUrl" target="_blank" v-if="item.bannerUrl">
          <img :src="item.bannerPic"
            alt="轮播图" >
        </a>
        <img :src="item.bannerPic" v-else alt="轮播图">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: "SwipeMap",
    data() {
      return {
        defaultImg: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      }
    },
    props: {
      adList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";
  #swipePic {
    background-color: @main-bg-color;
    img {
      height: 288/2px;
      width: 100%;
    }
  }
</style>