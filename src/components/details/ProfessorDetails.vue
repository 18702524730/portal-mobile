<template>
  <div id="professorDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <div style="height: 100%">
        <van-nav-bar
          title=""
          left-arrow
          @click-left="onClickLeft"
          :fixed="false"
          placeholder
          class="bar-head"
        >
        </van-nav-bar>
        <div class="my-main-content">
          <van-row class="content-card" type="flex" align="center">
            <van-col class="img-content">
              <van-image :src="getImgNewView(item.imgUrl)" class="my-image" round/>
            </van-col>
            <van-col class="main-content">
              <van-row type="flex" justify="space-between" align="center">
                <van-col :span="13" class="name-class van-ellipsis">
                  {{item.name}}
                </van-col>
                <van-col :span="11">
                  <van-row class="place-class" type="flex" align="center" justify="end">
                    <van-icon name="location-o"/>
                    <span class="van-ellipsis">{{item.cityName}}</span>
                  </van-row>
                </van-col>
              </van-row>

              <van-row class="some-content">
                工作经验：{{item.workingYearsStr}}年
              </van-row>
              <van-row class="some-content van-ellipsis">
                提供服务: {{item.provideServiceName }}
              </van-row>
            </van-col>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab" type="line" :border="false" line-width="68px">
              <van-tab title="专家详情" name="1">
                <h3>简介</h3>
                <van-row class="my-content">
                  <p class="van-ellipsis">所在行业：{{ item.industryName}}</p>
                  <p class="van-ellipsis">擅长技能：{{ item.goodAtSkillsName}}</p>
                  <p class="van-ellipsis">职业资格：{{ item.title}}</p>
                </van-row>
                <h3>自述</h3>
                <van-row class="my-content">
                  <p>{{ item.selfDescription}}</p>
                </van-row>
              </van-tab>
            </van-tabs>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab my-two-tab" type="line" :border="false" line-width="102px">
              <van-tab title="专家著作展示" name="1">
                <van-row v-for="(innerItem,index) in item.portalExpertBooks" :key="innerItem.id" class="my-row" @click="rowClick(item)" v-if="item.portalExpertBooks">
                  <span>•</span>
                  <span class="van-ellipsis">{{innerItem.bookName }}</span>
                </van-row>
              </van-tab>
            </van-tabs>
          </van-row>

          <van-row>
            <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                      color="#2F72D1" class="my-tab my-two-tab" type="line" :border="false"  line-width="119px">
              <van-tab title="专家发表的文章" name="1">
                <van-row v-for="(innerItem,index) in item.portalExpertArticles" :key="innerItem.id" class="my-row" @click="rowClick(item)" v-if="item.portalExpertArticles">
                  <span>•</span>
                  <span class="van-ellipsis">{{innerItem.title }}</span>
                </van-row>
              </van-tab>
            </van-tabs>
          </van-row>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'ProfessorDetails',
    data() {
      return {
        url: '/zscq/portal/getExpertDetail',
        detailsShow: false,
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
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.url, { id: id })
        if (res.success) {
          this.item = res.result
        }
        this.$cancelLoading()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "details";

  #professorDetails {

  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .right-btn {
      font-size: 10px;
      color: @main-font-color2;
      text-align: center;
      .collect-span {
        color: #ff3300;
      }
    }
    .bar-head {
      height: 7%;
    }
    .my-main-content {
      height: 93%;
      overflow-y: auto;
    }
    .content-card {
      height: 223/2px;
      margin-top: 12px;
      .img-content {
        width: 30%;
        text-align: center;
      }
      .main-content {
        width: 70%;
        padding-right: 10px;
        .place-class {
          color: @main-font-color2;
          font-size: 9px;
        }
        .name-class {
          font-size: 18px;
          font-weight: normal;
          line-height: 30px;
        }
        .some-content {
          font-size: 12px;
          color: #333333;
          line-height: 24px;
        }
      }
      .my-image {
        width: 80px;
        height: 80px;
      }
    }


    .my-tab {
      margin-top: 10px;
      background-color: #ffffff;
      /deep/ .van-tab {
        font-size: 16px;
        font-weight: normal;
      }
      /deep/ .van-tabs__content {
        border-top: 2px solid @main-bg-color;
        padding: 15px;
        color: #666666;
      }
      /deep/ .van-tabs__wrap {
        width: 30%;
      }
      /deep/ .van-tabs__line {
        height: 2px;
      }
        h3 {
        font-size: 13px;
        font-weight: normal;
        padding: 0 7px;
        background-color: @main-bg-color;
        margin: 0;
        margin-bottom: 10px;
      }
      .my-content{
        padding-left: 7px;
      }
    }
    .my-two-tab{
      /deep/ .van-tabs__wrap {
        width: 40%;
      }
    }
    .my-row {
      display: flex;
      align-items: center;
      padding-left: 29/2px;
      height: 70/2px;
      span:nth-child(1) {
        color: #B4B4B4;
        padding-right: 5px;
        font-size: 20px;
      }
      span:nth-child(2) {
        display: inline-block;
        font-size: 24/2px;
        padding-right: 66/2px;
      }
    }
  }
</style>