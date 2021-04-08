<template>
  <div id="relatedMessageList">
    <h2 class="container">{{titleName}}</h2>
    <div class="my-content">
      <van-empty description="没有内容" v-if="data.length === 0"/>
      <van-row v-for="(item,index) in data" :key="item.id" v-else type="flex" @click="clickCell(item)" :gutter="10">
        <van-col class="left-image" :span="8">
          <van-image class="my-image" :src="getImgNewView(item.articleIcons)" lazy-load></van-image>
        </van-col>
        <van-col class="right-content"  :span="16">
          <van-row class="title van-multi-ellipsis--l2">
            {{item.title}}
          </van-row>
          <van-row class="text">
            {{item.releaseDate | changeDate}}
          </van-row>
        </van-col>
      </van-row>
    </div>
    <van-pagination v-model="pagination.current" :total-items="pagination.total" :items-per-page="pagination.pageSize"
                    v-if="havePage" force-ellipses
                    @change="pagination.onChange"/>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'RelatedMessageList',
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      havePage: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Object,
        default: () => {
          return {
            current: 1,
            pageSize: 12,
            total: 0,
            onChange: page => {
            }
          }
        }
      },
      routeName: {
        type: String,
        default: 'CareCenterArticleMessage'
      },
      keyRoute: {
        type: String,
        default: 'MobileCareCenter'
      },
      titleName: {
        type: String,
        default: '相关政策'
      }
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      },
      clickCell(item) {
        const newPage = this.$router.resolve({
          name: this.routeName,
          query: { id: item.id, keyRoute: this.keyRoute }
        })
        window.open(newPage.href, '_blank')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #relatedMessageList {
    background-color: @main-bg-color;
    overflow: hidden;
    .my-content {
      padding: 15px;
      background-color: #ffffff;
      .left-image {
        .my-image {
          width: 100%;
          height: 65px;
        }
        padding-right: 15px;
      }
      .right-content {
        .title {
          color: #333333;
          font-size: 14px;
          line-height: 18px;
          height: 36px;
        }
        .text {
          padding-top: 15px;
          color: @main-font-color2;
          font-size: 12px;
        }
      }
    }
  }
</style>