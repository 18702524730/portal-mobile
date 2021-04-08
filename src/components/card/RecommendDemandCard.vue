<template>
  <div id="recommendDemandCard" @click="cardClick(item)">
    <div class="inner-container" :class="[haveBottom?'bottom-div':'top-div']">
      <van-row class="card-img">
        <van-image
          class="my-img"
          round
          lazy-load
          :src="getImgView(item[`${itemKey[0]}`])"
          fit="cover"
        />
      </van-row>
      <van-row class="card-content">
        <h2>
          <span class="van-multi-ellipsis--l2">{{item[`${itemKey[1]}`]}}</span>
        </h2>
        <p><span class="van-ellipsis"><span>{{column[0]}}:</span><span>{{item[`${itemKey[2]}`]}}</span></span></p>
        <p v-if="column[1] !== '项目成熟度'">
          <span class="van-ellipsis"><span>{{column[1]}}:</span><span>{{item[`${itemKey[3]}`]}}</span></span></p>
        <p  v-if="!isBrand"><span class="van-ellipsis"><span>{{column[2]}}:</span><span>{{item[`${itemKey[4]}`]}}</span></span></p>
        <p class="price-p"><span class="van-ellipsis"><span>{{column[3]}}:</span><span>{{newMoney}}</span></span></p>
        <van-row class="my-bottom-row">
          <van-row type="flex" class="bottom-row" justify="space-between" align="center" v-if="haveBottom">
            <van-col :span="14">
              <van-icon name="clock-o"/>
              <span>{{item.publishTime | changeDate}}</span></van-col>
            <van-col :span="10" style="text-align: right">
                <span v-if="!item.collection"><van-icon name="star-o"
                                                        @click.stop="yesOrNoCollection(item)"/>收藏</span>
              <span class="collect-span" v-else><van-icon name="star"
                                                          @click.stop="yesOrNoCollection(item)"/>已收藏</span>
            </van-col>

          </van-row>
        </van-row>

      </van-row>
    </div>
    <demand-project-details ref="detailsRef" v-if="item.supplyRequirementType === '4'" @func="triggerFunc"></demand-project-details>
    <demand-patent-details ref="detailsRef" v-if="item.supplyRequirementType === '5'" @func="triggerFunc"></demand-patent-details>
    <demand-brand-details ref="detailsRef" v-if="item.supplyRequirementType === '6'" @func="triggerFunc"></demand-brand-details>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import DemandProjectDetails from '../details/DemandProjectDetails'
  import DemandPatentDetails from '../details/DemandPatentDetails'
  import DemandBrandDetails from '../details/DemandBrandDetails'

  export default {
    name: 'RecommendDemandCard',
    components: { DemandBrandDetails, DemandPatentDetails, DemandProjectDetails },
    inject: ['headLogin'],
    props: {
      haveBottom: {
        type: Boolean,
        default: false
      },
      bottomData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      column: {
        type: Array,
        default: () => [
          '所属行业',
          '技术领域',
          '交易方式',
          '交易价格'
        ]
      },
      itemKey: {
        type: Array,
        default: () => [
          'imgUrl',
          'title',

          'belongIndustryName',
          'technicalFieldName',
          'intendedOperationModeName',
          'money'
        ]
      },
      isBrand: {
        type: Boolean,
        default: false
      },
      keyRoute: {
        type: String,
        default: 'PatentDetails'
      }
    },
    data() {
      return {
        defaultIcon: require('@/assets/images/defaultImg.png'),
        loginBtn: false
      }
    },
    methods: {
      triggerFunc(){
        this.$emit("func")
      },
      cardClick(item) {
        this.$refs.detailsRef.showPopup(item.id)
      },
      getImgNewView(text) {
        return getImgNewView(text)
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
      },
      yesOrNoCollection(item) {
        if (this.loginBtn) {
          return
        }
        if (judgeState()) {
          if (isAdmin()) {
            this.$notify({ type: 'warning', message: '您没有权限，暂时不能操作!' })
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper(this.keyRoute)
        } else {
          // 没有登录，则先进行登录
          this.$notify({ type: 'warning', message: '请先进行登录！' })
          this.headLogin()
        }
      },
      collectOper(keyRoute) {
        const that = this
        that.loginBtn = true
        let collectionChildType = '1'
        switch (keyRoute) {
          case 'SupplyProjectDetails':
            collectionChildType = '1'
            break
          case 'SupplyPatentDetails':
            collectionChildType = '2'
            break
          case 'SupplyBrandDetails':
            collectionChildType = '3'
            break
          case 'ProjectDetails':
            collectionChildType = '4'
            break
          case 'PatentDetails':
            collectionChildType = '5'
            break
          case 'BrandDetails':
            collectionChildType = '6'
            break
        }
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
          collectionChildType: collectionChildType,
          id: this.item.id
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              that.$notify({ message: '收藏成功！', type: 'success', duration: 2000 })
            } else {
              that.$notify({ message: '取消收藏成功！', type: 'success', duration: 2000 })
            }
            that.$emit('func')
          } else {
            that.$notify({ type: 'warning', message: res.message })
          }
        }).finally(() => {
          that.loginBtn = false
        })
      }
    },
    computed: {
      'newMoney': function() {
        if (this.item.transactionPrice === '0') {
          return '面议'
        } else {
          return this.item.money
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #recommendDemandCard {
    width: 330/2px;
    background-color: #ffffff;
    .top-div {
    }
    .bottom-div {
      .van-icon::before {
        vertical-align: middle;
      }
      .my-bottom-row {

      }
      .bottom-row {
        color: @main-font-color2;
        font-size: 18/2px;
        line-height: 26px;
        span {
          font-size: 18/2px;
          span:nth-child(1) {
            vertical-align: middle;
            padding-right: 5/2px;
          }
          span:nth-child(2) {
          }
        }
        .collect-span {
          color: #ff3300;
        }
      }
    }
    .card-img {
      text-align: center;
      padding-top: 38/2px;
      padding-bottom: 40/2px;
      .my-img {
        width: 158/2px;
        height: 158/2px;
      }
    }
    .card-content {
      h2, p {
        margin: 0;
        padding: 0;
        width: 100%;
      }
      h2 {
        height: 36px;
        font-weight: 400;
        color: @main-font-color;
        margin-bottom: 5px;
        display: flex;
        &>span{
          font-size: 13px;
          line-height: 18px;
        }
      }
      p {
        font-size: 18/2px;
        color: #898989;
        line-height: 18px;
        display: flex;
      }
      .price-p {
        span:nth-child(2) {
          color: #ff3300;
        }
        margin-bottom: 5px;
      }
    }
  }
</style>