<template>
  <div id="mobileServiceNavigation">
    <div class="container">
      <h2>服务导航</h2>
      <van-row type="flex" justify="space-between" class="my-row" v-for="(item,index) in cardList" :key="index">
        <van-col v-for="(innerItem,innerIndex) in item" :key="innerIndex + index" :span="6">
          <div class="my-div">
            <div>
              <img :src="innerItem.img" :alt="innerItem.alt" class="row-img" @click="clickBtn(innerItem)">
            </div>
            <div>
              <span class="card-span" v-html="innerItem.html"></span>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MobileServiceNavigation',
    data() {
      return {
        cardList: [
          [
            {
              img: require('../../assets/images/home/icon1.png'),
              router: 'MobileServiceCenter',
              html: '找服务<br/><br/>',
              alt: '找服务',
              canUse: true
            },
            {
              img: require('../../assets/images/home/icon2.png'),
              router: 'MobileTradingCenter',
              html: '找项目<br/><br/>',
              alt: '找项目',
              canUse: true
            },
            {
              img: require('../../assets/images/home/icon3.png'),
              router: 'MobileFinancialService',
              html: '找资金<br/><br/>',
              alt: '找资金',
              canUse: true
            },
            {
              img: require('../../assets/images/home/icon4.png'),
              router: 'MobileNewsConsult',
              html: '找政策<br/><br/>',
              alt: '找政策',
              canUse: true
            }
          ],
          [
            {
              img: require('../../assets/images/home/icon5.png'),
              router: 'MobilePatentSearchShiBei',
              html: '知识产权检索<br/><br/>',
              alt: '知识产权检索',
              canUse: false
            },
            {
              img: require('../../assets/images/home/icon6.png'),
              router: 'MobileCareCenter',
              html: 'IP管家<br/><br/>',
              alt: 'IP管家',
              canUse: true
            },
            {
              img: require('../../assets/images/home/icon7.png'),
              router: 'MobileServiceVoucher',
              html: '小微企业<br/>IP托管服务券',
              alt: '小微企业IP托管服务券',
              canUse: false
            },
            {
              img: require('../../assets/images/home/icon8.png'),
              router: 'MobilePatentShiBeiPort',
              html: '重点产业<br/>专利导航报告',
              alt: '重点产业专利导航报告',
              canUse: false
            }
          ]
        ]
      }
    },
    methods: {
      clickBtn(item) {
        if (item.canUse) {
          this.$router.push({ name: item.router })
        } else {
          this.$notify({ type: 'primary', message: '建设中。。。' })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #mobileServiceNavigation {
    padding-bottom: 42/2px;
    background-color: @main-bg-color;
    overflow: hidden;
    color: #333333;
    font-size: 20/2px;
    a {
      color: #333333;
    }
    .my-div {
    }
    .my-row {
      text-align: center;
      img {
        width: 87/2px;
        height: 87/2px;

      }
    }
  }
</style>