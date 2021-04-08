<template>
  <div id="projectZoneCard">
    <div class="container">
      <van-row type="flex" justify="space-between"  @click="onClick(item)">
        <van-col class="card-img">
          <van-image :src="getImgNewView(item.articleIcons)" lazy-load class="my-image"/>
        </van-col>
        <van-col class="card-content">
          <van-row class="card-title">
            <h3 class="van-ellipsis">
              {{item.title}}
            </h3>
          </van-row>
          <div class="my-content">
            <van-row>
              <span class="van-multi-ellipsis--l2">
                {{ item.content | filterData}}
              </span>
            </van-row>
          </div>

          <van-row class="my-time" type="flex" align="center">
            <van-icon name="clock-o"/>
            {{item.releaseDate | changeDate}}
          </van-row>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'ProjectZoneCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      onClick(item){
        window.open(item.detailPageUrl)
      },
      getImgNewView(text) {
        return getImgNewView(text)
      }
    },
    filters: {
      filterData(data) {
        if (!data) {
          return '无'
        }
        return data
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #projectZoneCard {
    background-color: #ffffff;
    border: 1px solid @main-bg-color;
    padding: 10px 0;
    .card-img {
      .my-image {
        width: 214/2px;
        height: 141/2px;
      }
    }
    .card-content {
      width: 220px;
      .card-title {
        h3 {
          font-weight: normal;
          color: @main-font-color;
          font-size: 13px;
          line-height: 15px;
          margin: 0;
        }
      }
      .my-content {
        padding: 10px 0;
        word-break: break-all;
        color: #898989;
        font-size: 9px;
        line-height: 15px;
        height: 30px;
      }
      .my-time {
        font-size: 9px;
        color: #898989;
      }
    }
  }
</style>