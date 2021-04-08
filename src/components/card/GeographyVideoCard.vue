<template>
  <div id="geographyVideoCard">
    <van-row :gutter="12">
      <van-col :span="10">
        <van-image
          class="my-img"
          :src="getImgNewView(item.videoImgUrl)"
        />
      </van-col>
      <van-col :span="14" class="my-content">
        <van-row class="my-link">
          <a :href="item.link" target="_blank" class="van-multi-ellipsis--l2">
            {{item.title}}
          </a>
        </van-row>
        <van-row class="van-ellipsis">
          <span class="title-col">来源：</span><span class="content-col">{{item.source}}</span>
        </van-row>
        <van-row class="van-ellipsis">
          <span class="title-col">发布时间：</span><span class="content-col">{{item.publishDate}}</span>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'GeographyVideoCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #geographyVideoCard {
    .my-img{
      width: 100%;
      height: 181/2px;
    }
    .my-content{
      font-size: 12px;
    }
    .my-row {
      margin-bottom: 5px;
      padding-top: 10px;
    }
    .my-link {
      min-height: 50px;
      a {
        text-decoration: underline;
        color: @main-color;
      }

    }
  }
</style>