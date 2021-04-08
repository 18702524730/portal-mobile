<template>
  <div id="bankCard">
    <van-row>
      <van-image :src="getImgNewView(item.imgUrl)" class="my-image"></van-image>
    </van-row>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'BankCard',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView
    }
  }
</script>

<style scoped lang="less">
  #bankCard {
    .my-image{
      width: 104px;
      height: 35px;
      border: 1Px solid #EBECF7;
    }
  }
</style>