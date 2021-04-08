<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import enquireScreen from '@/utils/device'
  import { mixinDevice } from '@/utils/mixin.js'

  export default {
    data() {
      return {}
    },
    mixins: [mixinDevice],
    created() {
      const that = this
      enquireScreen(deviceType => {
        // tablet
        if (deviceType === 0) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
        } else if (deviceType === 1) {
          // mobile
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
        } else {
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
        }

      })
    },
    mounted() {
        // 如果设备手机，重定向到手机端
      if (this.isMobile()) {
      } else {
        window.open(window._CONFIG['pcURL'],'_self')
      }
    },
    methods: {}
  }
</script>

<style lang="less">
.sebemask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba( 0, 0, 0 , 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .van-loading__text {
    color: #f5f5f5;
  }
}
</style>
