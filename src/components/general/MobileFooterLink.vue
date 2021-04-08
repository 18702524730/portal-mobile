<template>
  <div id="mobileFooterLink">
    <div class="container">
      <van-row type="flex" justify="center">
        <ul>
          <li><a @click="clickBtn('1')">新手入门</a></li>
          <li><a @click="clickBtn('3')">帮助中心</a></li>
          <li><a @click="clickBtn('4')">免责说明</a></li>
        </ul>
      </van-row>
      <van-row type="flex" justify="center">
        <p class="first-p">
          指导单位：厦门市市场监督管理局（知识产权局）
        </p>
      </van-row>
      <van-row type="flex" justify="center">
        <p class="last-p">版权所有：厦门知识产权投资有限公司 闽ICP备19025062号-1</p>
      </van-row>

    </div>

    <mobile-help-center ref="helpPopup"></mobile-help-center>
  </div>
</template>

<script>
  import MobileHelpCenter from '../../views/general/MobileHelpCenter'

  export default {
    name: 'MobileFooterLink',
    components: { MobileHelpCenter },
    methods: {
      clickBtn(openKeys) {
        this.$refs.helpPopup.showPopup(openKeys)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #mobileFooterLink {
    padding-top: 15/2px;
    background-color: black;
    font-size: 24/2px;
    overflow: hidden;
    a {
      color: #fff;
    }
    ul {
      margin-left: auto;
      margin-right: auto;
      li {
        float: left;
        padding-left: 5px;
        padding-right: 5px;
        line-height: 10px;
      }
      li:nth-child(2) {
        border-right: 0.5px solid #fff;
        border-left: 0.5px solid #fff;
      }
    }
    p {
      font-size: 20/2px;
      margin: 0;
      color: #8b8b8e;
    }
    .first-p {
      padding-top: 5px;
    }
    .last-p {
      padding-bottom: 5px;
    }
  }
</style>