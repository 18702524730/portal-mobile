<template>
  <div id="multiAreaPopup">
    <van-popup
      position="bottom"
      get-container="#app"
      round
      v-model="show"
      closeable
      style="width: 100%;height: 75%"
      @close="closePopup">
      <van-row class="popup-head">
        <p>请选择地域</p>
      </van-row>

    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'MultiAreaPopup',
    data() {
      return {
        show: false,
        activeIds: [],
        activeItems: [],
        activeIndex: 0
      }
    }
  }
</script>

<style scoped lang="less">

</style>