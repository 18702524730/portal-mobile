<template>
  <div id="swipeMap">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in adList" :key="item.id">
        <a @click="carouselBtn(item)">
          <img
            v-lazy="getImgNewView(item.picture)"
            alt="轮播图"  :onerror="defaultImg">
        </a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: "SwipeMap",
    data() {
      return {
        defaultImg: 'this.src=\'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png\'',
        url: '/zscq/portal/advertclickNumAdd'
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
      carouselBtn(item) {
        getActionUpdateKeyword(this.url, { id: item.id }).then((res) => {
          if (res.success) {
            // 回写成功
          } else {
            this.$notify({ type: 'danger', message: res.message })
          }
        })
        window.open(item.url, '_blank')
      },
      getImgNewView(text) {
        return getImgNewView(text)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";
  #swipeMap {
    background-color: @main-bg-color;
    img {
      height: 288/2px;
      width: 100%;
    }
  }
</style>