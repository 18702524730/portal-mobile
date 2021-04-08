<template>
  <div id="articleMessage">
    <div class="container">
      <div>
        <div style="text-align: center" class="data-title">
          <p style="white-space: pre-wrap;">{{item.title}}</p>
          <span>发布时间:&nbsp;<span>{{item.releaseDate | changeDate }}</span></span>
        </div>
        <hr>
      </div>
      <div v-html="item.content"
           style="white-space: pre-wrap;word-break: break-all;" class="html-content">
      </div>
      <div class="fileUrls-a">
        <template v-for="(file, index) in fileUrls">
          <a :href="file" style="display: block;margin-left: 20px;" :key="index">
            <van-icon name="orders-o"/>&nbsp;附件 {{index + 1}} : {{file.substr(file.lastIndexOf('/') + 1)}}</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'ArticleMessage',
    data() {
      return {
        item: {},
        url: '/zscq/portal/getInformationById',
        amountUrl: '/zscq/portal/informationPageviewsAdd',
        fileUrls: []
      }
    },
    created() {
      if (this.$route.query && this.$route.query.keyRoute === 'MobileSpecialMessage') {
        this.url = '/zscq/portal/special/getSpecialMessageChildById'
        this.amountUrl = '/zscq/portal/special/SpecialMessageChildPageViewsAdd'
      } else if (this.$route.query && this.$route.query.keyRoute === 'MobileNewsConsult') {
        this.url = '/zscq/portal/policies/getPoliciesRegulationsById'
        this.amountUrl = '/zscq/portal/policies/policiesRegulationsPageViewsAdd'
      }
      this.getInfo()
    },
    methods: {
      getInfo() {
        const param = {
          id: this.$route.query.id
        }
        this.$showLoading({
          title: '加载中。。。'
        })
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            const data = res.result
            let content = data.content
            if (content) {
              content = content.replace(/(\d+)rem/g, function(s, t) {
                s = s.replace('rem', '')
                const value = Number(s) / 2.5 // 1pt = 1px
                return value + 'rem'
              })
            }
            data.content = content
            this.item = data
            if (this.item !== undefined && this.item !== {}) {
              if (this.item.fileUrl !== undefined && this.item.fileUrl !== null && this.item.fileUrl !== '') {
                const urls = this.item.fileUrl.split(',')
                urls.forEach(file => {
                  file = window._CONFIG['downloadUrl'] + '/' + file
                  this.fileUrls.push(file)
                })
              }
            }

            // 成功后得新加一条浏览记录
            getActionUpdateKeyword(this.amountUrl, param)
          } else {
            this.$notify({ type: 'warning', message: res.message })
          }
          this.$cancelLoading()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #articleMessage {
    .data-title {
      span {
        color: #999999;
        font-size: 14px;
      }
      p {
        padding-top: 20px;
        font-size: 18px;
        font-weight: 900;
      }
    }
    .fileUrls-a {
      a {
        font-size: 14px;
      }
      padding-bottom: 10px;
    }

    .html-content {
      margin-bottom: 10px;
      font-size: 14px;
      font-family: sans-serif;
      color: #000000;
      /deep/ img{
        max-width: 100%;
      }
    }
  }
</style>