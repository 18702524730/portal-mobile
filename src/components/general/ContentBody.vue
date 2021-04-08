<template>
  <div id="contentBody">
    <van-row class="head container">
      <h2>
        {{title}}
      </h2>
    </van-row>
    <van-row class="content">
      <van-row class="container" v-if="!selfContent">
        <van-row v-for="(item,index) in contentArr" :key="index">
          <h3 v-if="item.littleTitle !== ''">{{item.littleTitle}}</h3>
          <span v-if="!item.isHtml">{{item.content}}</span>
          <span v-else v-html="item.content" style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;" class="html-content"></span>
        </van-row>

      </van-row>
      <van-row class="container" v-else>
        <slot name="selfContent"></slot>
      </van-row>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: 'ContentBody',
    props: {
      title: {
        type: String,
        default: '项目供应内容'
      },
      contentArr: {
        type: Array,
        default: () => {
          return []
        }
      },
      selfContent: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #contentBody {
    background-color: @main-bg-color;
    .head {
      h2 {
        font-weight: normal;
        color: #001833;
        font-size: 16px;
      }
    }
    .content {
      .html-content{
        font-size: 14px;
        /deep/ img{
          max-width: 100%;
        }
      }
      h3 {
        font-size: 13px;
        font-weight: normal;
        padding: 0 7px;
        background-color: @main-bg-color;
        margin: 0;
        margin-bottom: 10px;
      }
      span{
        display: inline-block;
        padding-left: 7px;
      }
      padding: 10px 0;
      background-color: #ffffff;
      color: #666666;
      font-size: 12px;
      line-height: 24px;
    }
  }
</style>