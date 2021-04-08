<template>
  <div id="offlineCard" @click="cardClick(item)">
    <van-row class="my-image">
      <van-image
        lazy-load
        :src="getImgNewView(item.activityIcons)"
        class="card-img"></van-image>

      <div class="my-time" v-if="haveImg">
        <div v-if="item.activityStatus === '1'">
          <img src="../../assets/images/s2.png" alt="预告">
        </div>
        <div v-else-if="item.activityStatus === '2'">
          <img src="../../assets/images/s1.png" alt="进行中">
        </div>
        <div v-else>
          <img src="../../assets/images/s3.png" alt="已结束">
        </div>
      </div>
    </van-row>

    <van-row class="my-content">
      <h3 class="van-multi-ellipsis--l2">{{item.title}}</h3>
      <p class="van-ellipsis">活动时间：{{ item.beginDate }}</p>
      <p class="p-place">
        <van-icon name="location-o"/>
        <span class="van-ellipsis"> {{ item.activityAddress }}</span>
      </p>
    </van-row>

    <offline-details ref="detailsRef"></offline-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import OfflineDetails from '../details/OfflineDetails'

  export default {
    name: 'OfflineCard',
    components: { OfflineDetails },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      haveImg: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getImgNewView,
      cardClick(item) {
        console.info(item)
        this.$refs.detailsRef.showPopup(item.id)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #offlineCard {
    width: 330/2px;
    background-color: #ffffff;
    .card-img {
      width: 100%;
      height: 90px;
    }
    h3, p {
      margin: 0;
      font-weight: normal;
    }
    h3 {
      font-size: 12px;
      color: @main-font-color;
      line-height: 16px;
      height: 32px;
    }
    p {
      font-size: 10px;
      line-height: 18px;
      color: #888888;
    }
    .p-place {
      display: flex;
      align-items: center;
    }
    .my-content {
      padding: 0 5px 10px;
    }

    .my-image {
      position: relative;
    }
    .my-time {
      width: 32px;
      height: 32px;
      position: absolute;
      top: -3px;
      right: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>