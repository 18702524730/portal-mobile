<template>
  <div>
    <van-overlay
      :show="isShow"
      :custom-style="{
        background: 'rgb(255, 255, 255, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '300px',
        zIndex:'9999'
      }"
    >
      <van-loading size="24px" color="#4994df">
        <span style="color:#4994df">{{ title || '加载中···' }}</span>
      </van-loading>
    </van-overlay>
  </div>
</template>

<script>
  export default {
    name: 'Loading'
  }
</script>

<style scoped>

</style>