<template>
  <div id="mobileFriendLink">
    <div class="container">
      <h2>友情链接</h2>
      <van-row type="flex" justify="space-between" v-for="(item,index) in itemList" :key="index">
        <van-col :span="12" v-for="(innerItem,innerIndex) in item" :key="innerItem.key + innerIndex">
          <a :href="innerItem.link">
            <img :src="innerItem.img" :alt="innerItem.alt">
          </a>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MobileFriendLink",
    data() {
      return {
        itemList: [
          [
            {
              key: 1,
              img: require('@/assets/images/home/harf4.png'),
              alt: "国家知识产权局",
              link: 'http://www.cnipa.gov.cn'
            },
            {
              key: 2,
              img: require('@/assets/images/home/harf3.png'),
              alt: "SIPOP",
              link: 'http://www.sipop.cn/'
            },
          ],
          [
            {
              key: 3,
              img: require('@/assets/images/home/harf2.png'),
              alt: "SIPC",
              link: 'http://www.sipc26.com/'
            },
            {
              key: 4,
              img: require('@/assets/images/home/harf1.png'),
              alt: "厦门科技创新创业综合综合服务平台",
              link: 'http://www.xmistec.com/'
            },
          ],
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #mobileFriendLink {
    overflow: hidden;
    background-color: @main-bg-color;
    padding-bottom: 68/2px;
    img {
      width: 328/2px;
      height: 98/2px;
    }
  }
</style>