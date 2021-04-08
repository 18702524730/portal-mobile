<template>
  <div id="serviceProjectCard" @click="btnCard(item)">
    <van-row class="card-head">
      <van-image :src="getImgNewView(item.imgUrl)"
                 class="my-img"
                 lazy-load/>
      <img src="../../assets/images/quan.png" alt="券" class="quan-img" v-if="item.voucher">
    </van-row>

    <van-row class="card-content">
      <van-row class="title van-ellipsis">
        {{item.title}}
      </van-row>
      <van-row class="money van-ellipsis">
        {{newMoney}}
      </van-row>

      <hr/>
      <van-row class="org van-ellipsis">
        {{item.orgName}}
      </van-row>

      <van-row type="flex" align="center" class="bottom-row">
        <van-col :span="12" class="my-collection">
          <span v-if="!item.collection"><van-icon name="star-o"
                                                  @click.stop="yesOrNoCollection(item)"/>收藏</span>
          <span class="collect-span" v-else><van-icon name="star"
                                                      @click.stop="yesOrNoCollection(item)"/>已收藏</span>
        </van-col>
        <van-col :span="12">
          <van-button class="my-btn-primary" icon='user-circle-o' type='info' @click.stop="confirmBtn" size="mini">联系卖家
          </van-button>
        </van-col>
      </van-row>
    </van-row>

    <contact-popup ref="contactMeRef"></contact-popup>
    <service-project-details ref="detailsRef" @func="triggerFunc"></service-project-details>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import ContactPopup from '../popup/ContactPopup'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import ServiceProjectDetails from '../details/ServiceProjectDetails'

  export default {
    name: 'ServiceProjectCard',
    components: { ServiceProjectDetails, ContactPopup },
    inject: ['headLogin'],
    props: {
      item: {
        type: Object,
        default: () => {
        }
      },
      isService: {
        type: Boolean,
        default: () => {
          return true
        }
      }
    },
    data() {
      return {
        loginBtn: false
      }
    },
    methods: {
      triggerFunc() {
        this.$emit('func')
      },
      yesOrNoCollection() {
        if (this.loginBtn) {
          return
        }
        if (judgeState()) {
          if (isAdmin()) {
            this.$notify({ type: 'warning', message: '您没有权限，暂时不能操作!' })
            return
          }
          // 登录了，直接触发收藏或者不收藏
          this.collectOper()
        } else {
          // 没有登录，则先进行登录
          this.$notify({ type: 'warning', message: '请先进行登录！' })
          this.headLogin()
        }
      },
      collectOper() {
        const that = this
        that.loginBtn = true
        const collectionChildType = '7'
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
      },
      confirmBtn() {
        if (judgeState()) {
          this.$refs.contactMeRef.showPopup(this.item.orgId, '-1')
        } else {
          this.$notify({ type: 'warning', message: '请先进行登录!' })
          this.headLogin()
        }
      },
      getImgNewView(text) {
        return getImgNewView(text)
      },
      btnCard(item) {
        if (this.isService) {
          // 如果是服务，就调用服务的路由
          console.info(item)
          this.$refs.detailsRef.showPopup(item.orgId, item.id)
        } else {
          this.$emit('func', item.id)
        }
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
  @import "../index";

  #serviceProjectCard {
    background-color: #ffffff;
    margin-bottom: 10px;

    width: 165px;
    .my-img {
      width: 165px;
      height: 90px;
    }
    .card-head {
      position: relative;
      .quan-img {
        height: 38/2px;
        position: absolute;
        top: -19/2px;
        right: -10/2px;
      }
    }
    .card-content {
      padding: 0 10px 10px;
      .title {
        color: @main-font-color;
        font-size: 14px;
      }
      .money {
        color: #ff3300;
        font-size: 12px;
      }
      hr {
        margin: 6px 0;
        background-color: #E6E6E6;
      }
      .org {
        font-size: 10px;
        color: #666666;
        margin-bottom: 10px;
      }
      .bottom-row {
        font-size: 10px;
        line-height: 10px;
        color: @main-font-color2;
        button {
          font-size: 10px;
          width: 100%;
        }
        .my-collection {
          span {
            display: flex;
            align-items: center;
            vertical-align: middle;
            padding-right: 5/2px;
          }
        }

        .collect-span {
          color: #ff3300;
        }
      }
    }
  }
</style>