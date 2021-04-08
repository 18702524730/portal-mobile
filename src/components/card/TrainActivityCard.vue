<template>
  <div id="trainActivityCard" @click="clickItem(item)">
    <van-row>
      <van-image
        lazy-load
        :src="getImgNewView(item.imgUrl)"
        class="card-img"></van-image>
    </van-row>

    <div class="card-content">
      <van-row type="flex" align="center" class="head-title">
        <van-col :span="20">
          <p class="content-title van-ellipsis">{{item.name}}</p>
        </van-col>
        <van-col :span="4" style="text-align: right" class="my-collect">
          <span v-if="!item.collection"><van-icon name="star-o"
                                                  @click.stop="yesOrNoCollection(item)"/></span>
          <span class="collect-span" v-else><van-icon name="star"
                                                      @click.stop="yesOrNoCollection(item)"/></span>
        </van-col>
      </van-row>
      <div class="main-content">
        <p v-if="item.firstVideoName" class="van-ellipsis">
          1.{{item.firstVideoName}}
        </p>
        <p v-else></p>
        <p v-if="item.secondVideoName" class="van-ellipsis">
          2.{{item.secondVideoName}}
        </p>
        <p v-else></p>
      </div>
    </div>

    <div class="card-footer">
      <van-row>
        <van-col :span="16">
          <van-row type="flex" align="center">
            <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png"/>
            <span class="van-ellipsis">主讲：{{item.beTheSpeaker}}</span>
          </van-row>
        </van-col>
        <van-col :span="8" style="text-align: right">
          {{item.signUpNum}}人报名
        </van-col>
      </van-row>
    </div>

    <train-course-details ref="courseRef" @func="triggerFunc"></train-course-details>
  </div>
</template>

<script>
  import { getImgNewView, isAdmin } from '@/utils/role'
  import TrainCourseDetails from '../../views/feature/TrainCourseDetails'
  import { judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'TrainActivityCard',
    inject: ['headLogin'],
    components: { TrainCourseDetails },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView,
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
        getActionUpdateKeyword('/user/portalCollection/yesOrNoCollection', {
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
      clickItem(item) {
        this.$refs.courseRef.showPopup(item.id)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #trainActivityCard {
    width: 330/2px;
    background-color: #ffffff;
    .card-img {
      width: 100%;
      height: 90px;
    }
    .card-content {
      padding: 0 10px;
      .head-title {
        padding-bottom: 10px;
      }
    }
    .card-footer {
      padding: 0 10px 10px;
    }
    p {
      margin: 0;
    }
    .content-title {
      font-size: 12px;
      color: @main-font-color;
    }

    .my-collect {
      font-size: 12px;
      span {
        display: inline-block;
        .van-icon {
          vertical-align: middle;
        }
      }
    }
    .collect-span {
      color: #ff3300;
    }
    .main-content, .card-footer {
      font-size: 10px;
      color: #888888;
    }
    .main-content {
      height: 55/2px;
      margin-bottom: 10px;
    }
  }
</style>