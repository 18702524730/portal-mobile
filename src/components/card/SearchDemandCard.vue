<template>
  <div id="searchDemandCard"  @click="cardClick(item)">
    <van-row class="card-img">
      <van-image
        class="my-img"
        round
        lazy-load
        :src="getImgView(item.imgUrl)"
        fit="cover"
      />
    </van-row>

    <van-row class="card-content my-container">
      <h2><span class="van-multi-ellipsis--l2">{{item.title}}</span></h2>
      <p><span class="industry van-ellipsis">行业：<span>{{item.belongIndustryName}}</span></span></p>

      <van-row type="flex" align="center" class="bottom-row">
        <van-col :span="12">
          <span class="money van-ellipsis">{{newMoney}}</span>
        </van-col>
        <van-col :span="12" class="time">
          {{item.publishTime | changeDate}}
        </van-col>
      </van-row>
    </van-row>

    <demand-project-details ref="detailsRef" v-if="item.supplyRequirementType === '4'" @func="triggerFunc"></demand-project-details>
    <demand-patent-details ref="detailsRef" v-if="item.supplyRequirementType === '5'" @func="triggerFunc"></demand-patent-details>
    <demand-brand-details ref="detailsRef" v-if="item.supplyRequirementType === '6'" @func="triggerFunc"></demand-brand-details>
  </div>
</template>

<script>
  import DemandProjectDetails from '../details/DemandProjectDetails'
  import DemandPatentDetails from '../details/DemandPatentDetails'
  import DemandBrandDetails from '../details/DemandBrandDetails'
  export default {
    name: 'SearchDemandCard',
    components: { DemandBrandDetails, DemandPatentDetails, DemandProjectDetails },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        defaultIcon: require('../../assets/images/defaultImg.png')
      }
    },
    methods: {
      triggerFunc(){

      },
      cardClick(item) {
        this.$refs.detailsRef.showPopup(item.id)
      },
      getImgView(text) {
        if (text === null) {
          text = this.defaultIcon
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      }
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return '￥' + this.item.money
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #searchDemandCard {
    width: 330/2px;
    background-color: #ffffff;
    .card-img {
      text-align: center;
      padding-top: 38/2px;
      padding-bottom: 40/2px;
      .my-img {
        width: 158/2px;
        height: 158/2px;
      }
    }
    .my-container{
      padding: 0 10px 10px;
    }
    .card-content {
      h2, p {
        margin: 0;
        padding: 0;
        width: 100%;
      }
      h2 {
        font-size: 13px;
        font-weight: 400;
        color: @main-font-color;
        line-height: 18px;
        height: 36px;
        display: flex;
      }
      p {
        padding-top: 5px;
        font-size: 18/2px;
        color: #898989;
        line-height: 30/2px;
        .industry{
          span{
            color: @main-color;
          }
        }
        display: flex;
      }
    }
    .money{
      color: #ff3300;
      display: block;
      font-size: 12px;
    }
    .bottom-row{
      font-size: 10px;
      margin-top: 5px;
    }
    .time{
      text-align: right;
    }
  }
</style>