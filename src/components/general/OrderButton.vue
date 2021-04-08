<template>
  <div id="orderButton">
    <div style="display:flex;align-items:center;justify-content: center" class="my-div" @click="clickBtn">
      <span style="text-align:left;padding: 0 5px;" class="my-span">{{title}}</span>
      <span style="display:flex;flex-direction:column;justify-content:center;position:relative;">
      <van-icon name="arrow-up" :class="{'blue':isActiveType === '1'}"
                style="" class="my-icon"/>
      <van-icon name="arrow-down" :class="{'blue':isActiveType === '2'}"
                style="" class="my-icon"/>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderButton',
    props: {
      title: {
        type: String,
        default: '默认排序'
      }
    },
    data() {
      return {
        isActive1: false,
        isActive2: false,
        isActive: false,
        isActiveType: '0'
      }
    },
    methods: {
      initBtn() {
        console.info('123123')
        this.isActiveType = '0'
      },
      clickBtn() {
        let sort = ''
        switch (this.isActiveType) {
          case '0':
            sort = 'asc'
            this.isActiveType = '1'
            break
          case '1':
            sort = 'desc'
            this.isActiveType = '2'
            break
          case '2':
            sort = ''
            this.isActiveType = '0'
            break
        }
        this.$emit('changeSort', sort)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #orderButton {
    .my-div {
      text-align: center;
    }
    .my-span {
      color: #333333;
      font-size: 24/2px;
    }
    .my-icon {
      font-size: 6px;
      font-weight: bold;
    }

    .blue {
      color: @main-color;
    }
  }
</style>