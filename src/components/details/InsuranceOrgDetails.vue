<template>
  <div id="insuranceOrgDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          :title="item.name"
          left-arrow
          @click-left="onClickLeft"
          :fixed="false"
          placeholder
          class="bar-head"
        >
        </van-nav-bar>
        <div class="my-main-content">
          <van-row class="content-card">
            <van-row>
              <van-image :src="getImgNewView(item.logo)" class="my-image"/>
            </van-row>
            <van-row class="title container">
              <h3 class="van-ellipsis">{{ item.name }}</h3>
              <div class="my-content">
                <van-row :gutter="12" class="content-row" type="flex" align="center">
                  <span>认证情况：</span>
                  <van-image
                    :src="require(item.isRealName === '0'?'../../assets/images/financial/g42.png' : '../../assets/images/financial/g41.png')"
                    fit="contain" class="img-content"/>
                </van-row>
                <van-row :gutter="12" class="content-row">
                  <van-col :span="24" class="van-ellipsis">
                    <span>成立时间：</span>
                    <span>{{ item.startDate | changeDate}}</span>
                  </van-col>
                </van-row>
              </div>
            </van-row>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" line-width="68px">
              <van-tab title="机构简介" name="1">
                <div v-html="item.introduction" style="white-space: pre-wrap;word-break: break-all;overflow-x: auto"
                     class="introduction">
                </div>
              </van-tab>
            </van-tabs>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" line-width="68px">
              <van-tab title="主营业务" name="1">
                <div v-html="item.business" style="white-space: pre-wrap;word-break: break-all;overflow-x: auto"
                     class="introduction">
                </div>
              </van-tab>
            </van-tabs>
          </van-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { getImgNewView } from '@/utils/role'

  export default {
    name: 'InsuranceOrgDetails',
    data() {
      return {
        detailsShow: false,
        url: '/zscq/portal/ipManage/orgInsuranceDetail',
        item: {},
        active: '1'
      }
    },
    methods: {
      getImgNewView,
      showPopup(id) {
        this.detailsShow = true
        this.loadData(id)
      },
      onClickLeft() {
        this.detailsShow = false
      },
      async loadData(id) {
        this.loading = true
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.url, { id: id })
        if (res.success) {
          this.item = res.result
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  #insuranceOrgDetails {

  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .bar-head {
      height: 7%;
    }
    .bar-footer {
      height: 7.5%;
    }
    .my-main-content {
      height: 93%;
      overflow-y: auto;
    }

    .my-tab {
      margin-top: 10px;
      background-color: #ffffff;
      .van-tab__text {
      }
      /deep/ .van-tab {
        font-size: 16px;
        font-weight: normal;
      }
      /deep/ .van-tabs__line {
        height: 2px;
      }
      .van-tabs__nav .van-tabs__nav--line {
        width: 50%;
      }
      /deep/ .van-tabs__content {
        border-top: 2px solid @main-bg-color;
        padding: 15px;
        color: #666666;
      }
      /deep/ .van-tabs__wrap {
        width: 30%;
      }
      h3 {
        font-size: 13px;
        font-weight: normal;
        padding: 0 7px;
        background-color: @main-bg-color;
        margin: 0;
        margin-bottom: 10px;
      }
      .my-content {
        padding-left: 7px;
      }
    }
    .title {
      margin-top: 10px;
    }
    .introduction {
      font-size: 14px;
    }
    .img-content {
      height: 15px;
      width: 74px;
    }
  }
</style>