<template>
  <div id="mobileFastActivist">
    <swipe-map :ad-list="advertList"></swipe-map>
    <van-row :gutter="8">
      <van-col :span="8" class="col-img">
        <a href="http://www.xm12330.com/view/pc/online_ask.html" target="_blank">
          <img src="../../assets/img/p1.png" alt="在线咨询">
        </a>
      </van-col>
      <van-col :span="8" class="col-img">
        <a href="http://www.xm12330.com/view/pc/rights_assistance.html" target="_blank">
          <img src="../../assets/img/p2.png" alt="维权援助">
        </a>
      </van-col>
      <van-col :span="8" class="col-img">
        <a href="http://www.xm12330.com/view/pc/disput_resolution.html" target="_blank">
          <img src="../../assets/img/p3.png" alt="纠纷调解">
        </a>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import SwipeMap from '../../components/general/SwipeMap'

  export default {
    name: 'MobileFastActivist',
    components: { SwipeMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '10'
        },
        adLoading: false,
        advertList: []
      }
    },
    created() {
      this.getAllAdverts()
    },
    methods: {
      getAllAdverts() {
        if (!this.adUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #mobileFastActivist{
    .col-img{
      img{
        width: 100%;
      }
    }
  }
</style>