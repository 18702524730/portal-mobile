<template>
  <div id="trainCourseDetails">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <van-nav-bar
        :title="item.name"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        :fixed="false"
        placeholder
        class="bar-head"
      >
        <template #right>
          <van-row class="right-btn">
            <van-row>
              <van-icon :name="item.collection?'star':'star-o'" :class="{'collect-span':item.collection}" class="icon-size"/>
            </van-row>
            <van-row>
              {{!item.collection?'收藏':'已收藏'}}
            </van-row>
          </van-row>

        </template>
      </van-nav-bar>
      <div class="my-main-content" v-if="detailsShow">
        <div class="video-div">
          <video :src="getImgView(selectVideo.videoUrl)" controls v-if="haveVideo"
                 id="videoPlayer"></video>
          <img src="../../assets/images/novideo.png" alt="无视频" v-else>
        </div>
        <div class="video-content">
          <p>
            <span v-if="JSON.stringify(selectVideo) !== '{}'" class="van-ellipsis">{{selectVideo.numName}}</span>
            <span v-else>无</span>
          </p>
          <van-row class="type-row">
            <van-col :span="12">
              课程类型：{{item.typeName}}
            </van-col>
            <van-col :span="12">
              课程分类：{{item.classificationName}}
            </van-col>
          </van-row>
        </div>

        <div class="course-content">
          <h3>课程信息</h3>
          <p class="van-ellipsis course-title">{{item.name}}</p>
          <van-row type="flex" align="center" class="course-row">
            <van-col :span="18" class="course-main">
              <van-row type="flex" align="center">
                <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png"/>
                <span class="van-ellipsis">主讲：{{item.beTheSpeaker}}</span>
                <span style="min-width: 30%;text-align: right;" class="van-ellipsis">
                  <span class="person-num">{{item.signUpNum}}</span>人报名
                </span>
              </van-row>
            </van-col>
            <van-col :span="6" style="text-align: right">
              <van-button @click.stop="applyCourse(item)" size="small"
                          class="my-btn" :disabled="applyBtn">
                {{ itemTitle }}
              </van-button>
            </van-col>
          </van-row>
        </div>

        <div class="other-content">
          <van-tabs v-model="active" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                    color="#2F72D1" class="my-tab" type="line" :border="false">
            <van-tab title="课程简介" name="1">
              <h3>课程简介</h3>
              <van-row class="my-content">
                {{item.remark}}
              </van-row>
              <h3>课程详情</h3>
              <van-row class="my-content">
                <div v-html="item.detail"
                     style="white-space: pre-wrap;word-break: break-all;overflow-x: auto;" class="html-content"></div>
              </van-row>
            </van-tab>
            <van-tab title="课程目录" name="2">
              <van-row class="my-content">
                <ul v-if="item.portalCourseVideos && item.portalCourseVideos.length > 0" class="my-video-group">
                  <li v-for="(innerItem,index) in item.portalCourseVideos" :key="index"
                      @click="videoClick(innerItem)"
                      :class="[innerItem.status === '2'? 'success-video':'',innerItem.id === selectVideo.id?'select-video':'']"
                      class="van-ellipsis">
                    <span style="width: 14px;display: inline-block;">
                      <van-icon name="success" v-if="innerItem.status == '2'"/>
                    </span>
                    {{innerItem.numName}}
                  </li>
                </ul>
              </van-row>
            </van-tab>
            <van-tab title="已报名用户" name="3">
              <van-row v-for="(outItem,outIndex) in userList" :key="outIndex" class="my-row-two">
                <van-col v-for="(item,index) in outItem" :key="index" :span="6" class="user-content">
                  <van-row>
                    <van-image :src="getImgView2(item)" round class="avatar"></van-image>
                  </van-row>
                </van-col>
              </van-row>
            </van-tab>
          </van-tabs>
        </div>

        <div class="other-content">
          <van-tabs v-model="active2" title-inactive-color="#666666" title-active-color="#2F72D1" background="#ffffff"
                    color="#2F72D1" class="my-tab" type="line" :border="false">
            <van-tab title="讲师其他课程" name="1">
              <div class="my-content">
                <van-row v-for="(innerItem,innerIndex) in otherList" :key="innerItem.id"
                         class="my-row" @click="rowClick(innerItem)">
                  <span>•</span>
                  <span class="van-ellipsis">{{innerItem.name }}</span>
                </van-row>
              </div>
            </van-tab>
            <van-tab title="课件下载" name="2">
              <template v-for="(file, index) in fileUrls">
                <a :href="file" :key="index" class="my-a">
                  <van-icon name="description"/>
                  <span class="van-ellipsis">{{file.substr(file.lastIndexOf('/') + 1) | changeData}}</span></a>
              </template>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { judgeState, changeArr } from '@/utils/util'
  import { isAdmin } from '@/utils/role'

  export default {
    name: 'TrainCourseDetails',
    inject: ['headLogin'],
    data() {
      return {
        item: {},
        selectVideo: {},
        fileUrls: [],
        spinning: false,

        dataUrl: '/zscq/portal/queryDetailById',
        otherDataUrl: '/zscq/portal/courseSearch',
        userDataUrl: '/zscq/portal/getSignUpUserHeadUrl',

        updateUrl: '/training/portalCourseSignup/updateStatus',
        videoPlayUrl: '/zscq/portal/videoViewCal',
        applyUrl: '/training/portalCourse/signUp',

        userList: [],
        otherList: [],
        applyBtn: false,
        collectBtn: false,

        videoTime: '',
        haveVideo: true,

        playOne: [],
        successOne: [],
        detailsShow: false,
        active: '1',
        active2: '1'
      }
    },
    methods: {
      showPopup(id) {
        // 如果没有登录，需要退到培训课程页面
        if (!judgeState()) {
          this.headLogin()
        } else {
          this.loadData(id)
          this.loadUsersData(id)
          this.detailsShow = true
        }
      },
      onClickLeft() {
        this.detailsShow = false
        if (document.getElementById('videoPlayer')) {
          const that = this
          document.getElementById('videoPlayer').removeEventListener('play', that.play)
          document.getElementById('videoPlayer').removeEventListener('ended', that.ended)
        }
      },
      async play() {
        if (this.playOne.indexOf(this.selectVideo.id) === -1) {
          // 只统计一次
          const res = await getActionUpdateKeyword(this.videoPlayUrl, { id: this.selectVideo.id })
          if (res.success) {
            this.playOne.push(this.selectVideo.id)
          }
        }
      },
      async ended() {
        if (this.successOne.indexOf(this.selectVideo.id) === -1) {
          // 只统计一次
          const res = await getActionUpdateKeyword(this.updateUrl, {
            courseId: this.selectVideo.courseId,
            courseVideoId: this.selectVideo.id
          })
          if (res.success) {
            this.successOne.push(this.selectVideo.id)
            this.selectVideo.status = '2'
          }
        }
      },
      onClickRight() {
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
            that.loadData(this.item.id)
            that.$emit('func')
          } else {
            that.$notify({ type: 'warning', message: res.message })
          }
        }).finally(() => {
          that.loginBtn = false
        })
      },
      async applyCourse(item) {
        if (judgeState()) {
          if (isAdmin()) {
            this.$notify({ type: 'warning', message: '您没有权限，暂时不能操作!' })
            return
          }
          this.applyBtn = true
          // 登录了，直接触发收藏或者不收藏
          const res = await getActionUpdateKeyword(this.applyUrl, { id: item.id })
          if (res.success) {
            if (item.signUp) {
              this.$notify({ type: 'success', message: '报名成功！' })
              item.signUp = false
              item.signUpNum += 1
            } else {
              this.$notify({ type: 'success', message: '取消报名成功！' })
              item.signUp = true
              item.signUpNum -= 1
            }
            this.loadUsersData(item.id)
          }
          this.applyBtn = false
        } else {
          // 没有登录，则先进行登录
          this.$notify({ type: 'warning', message: '请先进行登录！' })
          this.headLogin()
        }
      },
      videoClick(item) {
        this.selectVideo = item
      },
      async loadData(id) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.dataUrl, { id: id })
        if (res.success) {
          this.item = res.result
          this.item.portalCourseVideos = this.item.portalCourseVideos === null ? [] : this.item.portalCourseVideos
          if (this.item.portalCourseVideos && this.item.portalCourseVideos.length === 0) {
            this.haveVideo = false
          }
          for (const a in this.item.portalCourseVideos) {
            this.item.portalCourseVideos[a].numName = (Number(a) + 1) + '：' + (this.item.portalCourseVideos[a].name ? this.item.portalCourseVideos[a].name : '')
            if (a === '0') {
              this.selectVideo = this.item.portalCourseVideos[a]
            }
          }
          if (this.item.fileUrl !== undefined && this.item.fileUrl !== null && this.item.fileUrl !== '') {
            const urls = this.item.fileUrl.split(',')
            urls.forEach(file => {
              file = window._CONFIG['downloadUrl'] + '/' + file
              this.fileUrls.push(file)
            })
          }
          const otherRes = await getActionUpdateKeyword(this.otherDataUrl, {
            id: this.$route.query.itemId,
            beTheSpeaker: res.result.beTheSpeaker
          })
          if (otherRes.success) {
            this.otherList = otherRes.result.records
          }
          this.$nextTick(() => {
            console.info(document.getElementById('videoPlayer'))
            if (document.getElementById('videoPlayer')) {
              const that = this
              document.getElementById('videoPlayer').addEventListener('play', that.play, false)
              document.getElementById('videoPlayer').addEventListener('ended', that.ended, false)
            }
          })
        }
        this.$cancelLoading()
      },
      getImgView(text) {
        if (!text) {
          return require('../../assets/images/user.png')
        }
        if (text && text.indexOf('http') === 0) {
          return text
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['videoUrl'] + '/' + text
      },
      async loadUsersData(id) {
        const res = await getActionUpdateKeyword(this.userDataUrl, { courseId: id, num: 8 })
        if (res.success) {
          this.userList = changeArr(res.result, 4)
        }
      },
      getImgView2(text) {
        if (!text) {
          return 'https://b.yzcdn.cn/vant/icon-demo-1126.png'
        }
        if (text && text.indexOf(',') > 0) {
          text = text.substring(0, text.indexOf(','))
        }
        return window._CONFIG['imgDomainURL'] + '/' + text
      }
    },
    computed: {
      itemTitle() {
        if (!this.item.signUp) {
          return '取消报名'
        } else {
          return '课程报名'
        }
      }
    },
    filters: {
      changeData(value) {
        if (value || value === '0') {
          const arr = value.split('/')
          if (arr.length > 0) {
            const fileNames = arr[arr.length - 1].split('.')
            const hz = fileNames[fileNames.length - 1] // 后缀名
            let lastValue = fileNames[0]
            const index = lastValue.lastIndexOf('_')
            lastValue = lastValue.substring(0, index)

            return lastValue + '.' + hz
          } else {
            return value
          }
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #trainCourseDetails {
    background-color: @main-bg-color;
    .right-btn {
      font-size: 10px;
      color: @main-font-color2;
      text-align: center;
      .collect-span {
        color: #ff3300;
      }
      .icon-size{
        font-size: 12px;
      }
    }
  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;
    h3, p {
      margin: 0;
    }

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
      width: 100%;
    }
    .content-card {
      .money-span {
        color: #ff3300;
      }
    }

    .video-div {
      width: 100%;
      video, img {
        background-color: #FFFFFF;
        width: 100%;
        height: 200px;
      }
    }
    .video-content {
      padding: 15px;
      background-color: #ffffff;
      p {
        color: @main-font-color;
        font-size: 16px;
        line-height: 18px;
        padding-bottom: 16px;
        display: flex;
      }
      .type-row {
        font-size: 12px;
        color: #888888;
      }
    }

    .course-content {
      padding: 15px;
      margin-top: 10px;
      background-color: #ffffff;
      h3 {
        font-size: 16px;
        color: #001833;
        font-weight: 500;
        padding-bottom: 15px;
      }
      p:nth-child(2) {
        font-size: 16px;
        color: @main-font-color;
        line-height: 18px;
      }
      .course-row {
        margin-top: 10px;
      }
      .course-main {
        font-size: 10px;
        line-height: 18px;
        color: #888888;
        .person-num {
          color: #FF3300;
        }
      }
      .my-btn {
        width: 100%;
        font-size: 12px;
        color: #FF3300;
        border-color: #ff3300;
        height: 28px;
        background-color: #fceae9;
      }
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
      /deep/ .van-tabs__content {
        border-top: 2px solid @main-bg-color;
        padding: 15px;
        color: #666666;
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
        .html-content {
          font-size: 12px;
          color: #666666;
          /deep/ img{
            max-width: 100%;
          }
        }
        padding-left: 7px;
        font-size: 12px;
        color: #666666;
        padding-bottom: 15px;
        .my-row {
          display: flex;
          align-items: center;
          height: 70/2px;
          span:nth-child(1) {
            color: #B4B4B4;
            padding-right: 5px;
            font-size: 20px;
          }
          span:nth-child(2) {
            width: 540/2px;
            display: inline-block;
            font-size: 24/2px;
          }
        }
      }
      .my-row-two {
        padding-bottom: 10px;
      }
      .user-content {
        text-align: center;
        font-size: 12px;
        color: @main-font-color;
        .avatar {
          width: 133/2px;
          height: 133/2px;
          border: 1Px solid #E6E6E6;
        }
      }
    }
    .other-content {
      .my-a {
        font-size: 12px;
        color: @main-color;
        display: flex;
        align-items: center;
        margin-left: 10px;
        line-height: 24px;
      }
      .my-video-group {
        list-style: none;
        li {
          line-height: 32px;
          padding: 0 10px;
        }
      }
      .success-video {
        color: @main-color;
      }
      .select-video {
        color: #FFFFFF;
        background-color: @main-color;
      }
    }
  }
</style>