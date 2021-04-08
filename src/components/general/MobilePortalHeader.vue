<template>
  <div id="mobilePortalHeader">
    <iframe id="child" :src="userCenterUrl" hidden></iframe>
    <div class="container">
      <van-row type="flex" justify="space-between">
        <van-col span="12">
          <img src="@/assets/images/home/logo.png" alt="logo" class="img-log" @click="toHome">
        </van-col>
        <van-col span="12" class="search-size">
          <van-row type="flex" justify="end">
            <van-col :span="6">
              <div class="div-btn" @click="showSearchPopup">
                <div>
                  <img src="@/assets/images/home/search.png" alt="搜索">
                </div>
                <div>
                  <span>搜索</span>
                </div>
              </div>
            </van-col>
            <van-col :span="8">
              <div class="div-btn" @click="showPopup">
                <div>
                  <img src="@/assets/images/home/user.png" alt="用户中心">
                </div>
                <div>
                  <span>用户中心</span>
                </div>
              </div>
            </van-col>
            <van-col :span="6" v-if="state">
              <div class="div-btn" @click="quitBtn">
                <div>
                  <img src="@/assets/images/home/exit.png" alt="退出">
                </div>
                <div>
                  <span>退出</span>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>

    <van-popup v-model="show" position="right" closeable
               close-icon-position="top-left" class="my-popup" safe-area-inset-bottom>
      <mobile-login @close="show = !show" @message="updateCenter"></mobile-login>

    </van-popup>

    <search-details ref="searchRef"></search-details>
  </div>
</template>

<script>
  import MobileLogin from './MobileLogin'
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  import SearchDetails from '../details/SearchDetails'
  import { judgeState } from '@/utils/util'
  import {
    ACCESS_TOKEN, USER_INFO
  } from '@/store/mutation-types'
  import Vue from 'vue'

  export default {
    name: 'MobilePortalHeader',
    components: { SearchDetails, MobileLogin },
    inject: ['reload'],
    data() {
      return {
        state: false,
        show: false,
        searchShow: false,
        userCenterUrl: window._CONFIG['userCenterURL'] + '/portal/listener'
      }
    },
    created() {
      // 第一次渲染，判断是否处于登录状态
      this.judgeState()
    },
    mounted() {
      this.loginOrLogoutEmit()
    },
    methods: {
      ...mapActions(['Logout']),
      ...mapMutations(['setIsLoginPage']),
      ...mapGetters(['userInfo']),
      postMessage(type) {
        // 登录和退出登录需要触发
        this.loginOrLogoutEmit()
        const iframe = document.getElementById('child')
        if (iframe) {
          if (type) {
            const token = { token: Vue.ls.get(ACCESS_TOKEN) }
            iframe.contentWindow.postMessage(token, this.userCenterUrl)
          } else {
            // 退出登录
            const token = { token: false }
            iframe.contentWindow.postMessage(token, this.userCenterUrl)
          }
        }
      },
      updateCenter() {
        this.postMessage(true)
        this.judgeState()
      },
      showSearchPopup() {
        this.$refs.searchRef.showPopup()
      },
      showPopup() {
        // // 如果已经登录，直接跳转到后台
        if (!judgeState()) {
          // 如果登录了，直接可以跳转到后台
          this.show = !this.show
          this.postMessage(judgeState())
        } else {
          this.judgeToCenter()
        }
      },
      judgeToCenter() {
        const token = Vue.ls.get(ACCESS_TOKEN)
        const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token
        window.open(newUrl, '_self')
      },
      toHome() {
        this.$router.push({ name: 'MobileHome' })
      },
      loginOrLogoutEmit() {
        // 先清除缓存
        const arr = ['avatar', 'uid', 'whisper_referrer', 'uName']
        for (const a of arr) {
          localStorage.removeItem(a)
        }
        // 判断之前先隐藏
        if (!judgeState()) {
          // eslint-disable-next-line
          whisperChat.init()
          const arr = ['avatar', 'uid', 'whisper_referrer', 'uName']
          for (const a of arr) {
            localStorage.removeItem(a)
          }
        } else {
          const user = this.userInfo()
          let avatar = '/static/common/images/kefu/2.png'
          if (user.avatar) {
            avatar = window._CONFIG['imgDomainURL'] + '/' + user.avatar
          }
          // eslint-disable-next-line
          whisperChat.init({
            uid: user.id,
            uName: user.realname,
            avatar: avatar
          })

          // eslint-disable-next-line
          if (whisperChat && whisperChat.hideChatDiv) {
            // eslint-disable-next-line
            whisperChat.hideChatDiv()
          }
        }
      },
      quitBtn() {
        const that = this
        this.$dialog.confirm({
          title: '退出登录',
          message: '确认退出登录'
        })
          .then(() => {
            // on confirm
            that.Logout({}).then(() => {
              that.reload()
              // 移除本地缓存的用户信息
              that.judgeState()
              Vue.ls.remove(USER_INFO)
              that.postMessage(false)
            }).catch(err => {
              that.$notify({
                type: 'danger',
                message: err.message
              })
            })
          })
          .catch(() => {
            // on cancel
          })
      },
      judgeState() {
        this.state = judgeState()
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #mobilePortalHeader {
    margin-top: 12.5px;
    font-size: 18/2px;
    .img-log {
      width: 331/2px;
      height: 84/2px;
    }
    .col-btn {
      text-align: end;
    }
    .div-btn {
      img {
        height: 29/2px;
        width: 29/2px;
      }
      text-align: center;
      span {
        color: #666666;
        font-weight: 400;

      }

    }
    .my-popup {
      background-color: #fafafc;
      height: 100%;
      width: 100%
    }

    .search-size {
      margin-top: 7.5px;
    }
  }
</style>