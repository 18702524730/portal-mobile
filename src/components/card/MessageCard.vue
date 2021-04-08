<template>
  <div id="messageCard">
    <van-row class="my-card"  @click="onClick(item)">
      <van-row class="img-head">
        <van-image
          lazy-load
          class="my-img"
          :src="getImgNewView(item.articleIcons)"
        />
      </van-row>
      <van-row class="my-content">
        <p class="van-multi-ellipsis--l2 title-p">
          {{item.title}}
        </p>
        <p class="time-p">
          {{item.releaseDate | changeDate}}
        </p>
      </van-row>
    </van-row>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'MessageCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      },
      onClick(item){
        this.$router.push({ name: 'MobileSpecialList', query: { id: item.id } })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #messageCard {
    background-color: #ffffff;
    width: 165px;
    .img-head{
      width: 100%;
    }
    .my-img {
      height: 90px;
      padding: 3px;
    }
    .my-content {
      padding: 0 10px 10px;
      p{
        margin: 0;
      }
    }
    .title-p {
      height: 32px;
      line-height: 16px;
      font-size: 12px;
      color: @main-font-color;
    }
    .time-p {
      font-size: 9px;
      color: @main-font-color2;
      padding-top: 10px;
    }
  }
</style>