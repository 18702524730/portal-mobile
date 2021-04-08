<template>
  <div id="geographyCard" @click="cardClick(item)">
    <van-row class="card-img">
      <van-image
        class="my-img"
        lazy-load
        :src="getImgView(changeImg(item.productImg))"
        fit="cover"
      />
    </van-row>
    <van-row class="content">
      <van-row class="title-row">
        <span class="van-ellipsis" style="display: block">{{item.productName}}</span>
      </van-row>
      <van-row class="place-row" type="flex" align="center">
        <van-icon name="location-o"/>
        <span class="place van-ellipsis">{{item | filterData}}</span>
      </van-row>
    </van-row>
    <geographic-details ref="detailsRef" ></geographic-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import GeographicDetails from '../details/GeographicDetails'

  export default {
    name: 'GeographyCard',
    components: { GeographicDetails },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      cardClick(item) {
        console.info(item)
        this.$refs.detailsRef.showPopup(item.id)
      },
      getImgView(text) {
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      changeImg(data) {
        if (data) {
          const arr = data.split(',')
          return arr[0]
        }
      }
    },
    filters: {
      filterData(data) {
        if (data.countryType === '1') {
          // 国内的数据
          const arr = data.areaName.split('/')
          return arr[0]
        } else {
          return data.areaName
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #geographyCard {
    background-color: #ffffff;
    width: 165px;
    .card-img{
    }
    .my-img {
      width: 165px;
      height: 181/2px;
    }
    .content {
      padding: 0 10px 10px 10px;
      background-color: #ffffff;
      .title-row{
        margin-bottom: 10px;
        font-size: 12px;
        color: @main-font-color;
      }
      .place-row{
        font-size: 9px;
        color: @main-font-color2;
      }
    }
  }
</style>