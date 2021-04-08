<template>
  <div id="recommendSupplyCard" @click="cardClick(item)">
    <div class="container" :class="[haveBottom?'bottom-div':'top-div']">
      <van-row :gutter="26" type="flex">
        <van-col class="card-img">
          <img
            v-lazy="getImgNewView(item[`${itemKey[0]}`])"
            alt="供应图片">
        </van-col>
        <van-col class="card-content">
          <h2 class="van-ellipsis">{{item[`${itemKey[1]}`]}}</h2>
          <p class="van-ellipsis" v-if="!onlyMoney"><span>{{column[0]}}:</span><span>{{item[`${itemKey[2]}`]}}</span>
          </p>
          <p class="van-ellipsis" v-if="column[1] !== '项目成熟度' && !onlyMoney"><span>{{column[1]}}:</span><span>{{item[`${itemKey[3]}`]}}</span>
          </p>
          <p v-if="!isBrand && !onlyMoney"><span class="van-ellipsis"><span>{{column[2]}}:</span><span>{{item[`${itemKey[4]}`]}}</span></span>
          </p>
          <p class="price-p"><span class="van-ellipsis "><span>{{column[3]}}:</span><span>{{newMoney}}</span></span></p>
          <van-row class="my-bottom-row" :class="onlyMoney?'only-money-row':''">
            <van-row type="flex" class="bottom-row" justify="space-between" align="center" v-if="haveBottom">
              <van-col :span="12">
                <van-icon name="clock-o"/>
                <span>{{item.publishTime | changeDate}}</span></van-col>
              <van-col :span="12" style="text-align: end">
                <span v-if="!item.collection"><van-icon name="star-o"
                                                        @click.stop="yesOrNoCollection(item)"/>收藏</span>
                <span class="collect-span" v-else><van-icon name="star"
                                                            @click.stop="yesOrNoCollection(item)"/>已收藏</span>
              </van-col>

            </van-row>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <supply-project-details ref="detailsRef" v-if="item.supplyRequirementType === '1'" @func="triggerFunc"></supply-project-details>
    <supply-patent-details ref="detailsRef" v-else-if="item.supplyRequirementType === '2'" @func="triggerFunc"></supply-patent-details>
    <supply-brand-details ref="detailsRef" v-else-if="item.supplyRequirementType === '3'" @func="triggerFunc"></supply-brand-details>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import SupplyProjectDetails from '../details/SupplyProjectDetails'
  import SupplyPatentDetails from '../details/SupplyPatentDetails'
  import SupplyBrandDetails from '../details/SupplyBrandDetails'

  export default {
    name: 'RecommendSupplyCard',
    components: { SupplyBrandDetails, SupplyPatentDetails, SupplyProjectDetails },
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
      onlyMoney: {
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

  #recommendSupplyCard {
    background-color: #ffffff;
    margin-bottom: 1px;
    overflow: hidden;
    .top-div {
    }

    .bottom-div {
      .van-icon::before {
        vertical-align: middle;
      }
      .my-bottom-row {
        width: 225px;
        margin-bottom: 5px;
      }
      .only-money-row {
        margin-top: 20px;
      }
      .bottom-row {
        width: 100%;
        color: @main-font-color2;
        font-size: 18/2px;
        line-height: 18/2px;

        .collect-span {
          color: #ff3300;
        }
      }
    }
    .card-img {
      padding-top: 10px;
      img {
        width: 100%;
        height: 141/2px;
      }
      width: 214/2px;
    }
    .card-content {
      width: (690-214)/2px;
      h2, p {
        margin: 0;
        width: 100%;
      }
      h2 {
        font-size: 26/2px;
        padding-top: 15/2px;
        padding-bottom: 15/2px;
        font-weight: 400;
        color: @main-font-color;
      }
      p {
        font-size: 18/2px;
        color: #898989;
        line-height: 30/2px;
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