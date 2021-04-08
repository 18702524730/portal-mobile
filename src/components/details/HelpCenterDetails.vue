<template>
  <div id="helpCenterDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="title"
          left-arrow
          @click-left="onClickLeft"
          :fixed="false"
          placeholder
          class="bar-head"
        >
        </van-nav-bar>
        <div class="my-main-content container">
          <h3>{{item.title}}</h3>
          <div class="html-content" v-html="item.content"></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'HelpCenterDetails',
    data() {
      return {
        detailsShow: false,
        title: '',
        item: {}
      }
    },
    created() {
    },
    methods: {
      showPopup(title, item) {
        this.detailsShow = true
        this.title = title
        this.item = item
      },
      onClickLeft() {
        this.detailsShow = false
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  #helpCenterDetails {

  }

  .my-popup {
    background-color: #ffffff;
    height: 100%;
    width: 100%;

    .bar-head {
      height: 7%;
    }

    .my-main-content {
      height: 93%;
      overflow-y: auto;
      padding-bottom: 10px;
      h3{
        margin: 0;
        text-align: center;
        color: @main-font-color;
        font-size: 16px;
        font-weight: normal;
        padding: 30px 0;
      }
      .html-content{
        font-size: 14px;
        color: #666666;
        /deep/ img{
          max-width: 100%;
        }
      }
    }
  }
</style>