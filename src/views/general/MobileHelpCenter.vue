<template>
  <div id="mobileHelpCenter">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          title="帮助中心"
          left-arrow
          @click-left="onClickLeft"
          :fixed="false"
          placeholder
          class="bar-head"
        >
        </van-nav-bar>
        <div class="my-main-content">
          <van-collapse v-model="activeName" accordion class="my-collapse" v-for="(item,index) in data"
                        :key="item.itemValue">
            <van-collapse-item :title="item.itemText" :name="item.itemValue">
              <van-cell :title="innerItem.title" is-link v-for="(innerItem,innerIndex) in item.helpList"
                        :key="innerItem.code" @click="clickDetails(item.itemText,innerItem)"/>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </van-popup>

    <help-center-details ref="helpDetails"></help-center-details>

  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import HelpCenterDetails from '../../components/details/HelpCenterDetails'

  export default {
    name: 'MobileHelpCenter',
    components: { HelpCenterDetails },
    data() {
      return {
        url: '/zscq/portal/getHelpInfo',
        data: [],
        activeName: '2',
        detailsShow: false
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      clickDetails(title, item) {
        this.$refs.helpDetails.showPopup(title, item)
      },
      showPopup(openKeys) {
        this.detailsShow = true
        this.activeName = openKeys
      },
      onClickLeft() {
        this.detailsShow = false
      },
      loadData() {
        getActionUpdateKeyword(this.url).then((res) => {
          if (res.success) {
            this.data = res.result
            console.info(this.data)
          } else {
            this.$notify({ type: 'danger', message: res.message })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileHelpCenter {

  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .bar-head {
      height: 7%;
    }

    .my-main-content {
      margin-top: 10px;
      height: 93%;
      overflow-y: auto;
    }
    /deep/ .van-collapse-item__title > .van-cell__title > span {
      border-left: 2.5Px solid @main-color;
      padding-left: 10px;
      color: #001833;
      font-size: 15px;
    }
    .my-collapse {
      margin-bottom: 10px;
    }
  }
</style>