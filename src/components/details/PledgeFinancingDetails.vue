<template>
  <div id="pledgeFinancingDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          title="产品详情"
          left-arrow
          @click-left="onClickLeft"
          :fixed="false"
          placeholder
          class="bar-head"
        >
        </van-nav-bar>
        <div class="my-main-content">
          <table class="my-table" cellspacing="0" cellpadding="0">
            <tr>
              <td class="table-title">产品名称:</td>
              <td class="table-content"><span>{{item.name}}</span></td>
            </tr>
            <tr>
              <td class="table-title">最高额度:</td>
              <td class="table-content"><span>{{item.maxQuota}}万</span></td>
            </tr>
            <tr>
              <td class="table-title">产品特点:</td>
              <td class="table-content"><span>{{item.characteristic}}</span></td>
            </tr>
            <tr>
              <td class="table-title">产品简介:</td>
              <td class="table-content"><span>{{item.remark}}</span></td>
            </tr>
            <tr>
              <td class="table-title">适用用户:</td>
              <td class="table-content"><span>{{item.applyUser}}</span></td>
            </tr>
          </table>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'PledgeFinancingDetails',
    data() {
      return {
        detailsShow: false,
        item: {},
        active: '1'
      }
    },
    methods: {
      showPopup(item) {
        this.detailsShow = true
        this.item = item
      },
      onClickLeft() {
        this.detailsShow = false
      }
    }

  }
</script>

<style scoped lang="less">
  @import "details";

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .bar-head {
      height: 7%;
    }
    .my-main-content {
      height: 93%;
      overflow-y: auto;
      background-color: #ffffff;
      .my-table {
        margin: 15px;
        font-size: 12px;
        border-top: 1Px solid #e8e8e8;
        border-left: 1Px solid #e8e8e8;
        .table-title {
          width: 30%;
          vertical-align: middle;
          background-color: #fafafa;
          text-align: center;
        }

        td {
          padding: 10px;
          border-right: 1Px solid #e8e8e8;
          border-bottom: 1Px solid #e8e8e8;
        }
      }
    }
  }
</style>