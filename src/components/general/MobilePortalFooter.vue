<template>
  <div id="mobilePortalFooter">
    <div class="container">
      <van-row :gutter="16">
        <van-col :span="14">
          <h2>相关链接</h2>
          <ul>
            <li><a href="https://scjg.xm.gov.cn/" target="_blank">厦门市市场监督管理局(知识产权局)</a></li>
            <li><a href="http://www.xm12330.com/" target="_blank">厦门知识产权维权援助中心</a></li>
            <li><a href="http://www.xmsme.cn/" target="_blank">厦门市中小企业公共服务平台</a></li>
          </ul>
          <h2>其他</h2>
          <ul>
            <li><a @click="clickBtn('4')">关于我们</a></li>
            <li><a @click="clickBtn('4')">联系我们</a></li>
          </ul>
        </van-col>
        <van-col :span="10">
          <h2 class="h-img">
            <img src="@/assets/images/home/wx.png" alt="公众号">
          </h2>
          <p>周一至周五:08:30-17:00</p>
          <p class="p-bold">0592-3576688</p>
          <p>客服QQ1:2235515915</p>
          <p>客服QQ2:2964633698</p>
        </van-col>
      </van-row>
    </div>
    <mobile-help-center ref="helpPopup"></mobile-help-center>
  </div>
</template>

<script>
  import MobileHelpCenter from '../../views/general/MobileHelpCenter'
  export default {
    name: 'MobilePortalFooter',
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
  #mobilePortalFooter {
    background-color: #37405E;
    color:rgba(255,255,255,1);
    font-size: 20/2px;
    padding-bottom: 20px;
    a{
      color:rgba(255,255,255,1);
    }
    img{
      height: 191/2px;
      width: 191/2px;
    }
    .p-bold{
      font-weight: bold;
    }
    li{
      margin-bottom: 16px;
    }
    .h-img{
      margin-bottom: 0;
    }
  }
</style>