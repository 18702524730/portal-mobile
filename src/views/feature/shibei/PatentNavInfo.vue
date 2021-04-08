<template>
  <div class="patentnavinfobox">
    <div class="detailbox">
      <h3>{{ info.title }}</h3>
      <div class="intr">
        <span>{{ info.publishTime | dateFormat }}</span>
        <span>{{ info.author }}</span>
        <!-- <span>国际商报</span> -->
      </div>
      <div class="cont" id="contbox" v-html="info.content"></div>
    </div>
    <div class="sebemask" v-if="loading">
      <van-loading type="spinner" vertical  color="#f5f5f5">加载中</van-loading>
    </div>
  </div>
</template>

<script>
import filters from '@utils/filters.js'
const detailUrl = '/api/findPatentArticleDetail/{number}'
export default {
  data() {
    return {
      info: {},
      loading: false
      // cont:''
    }
  },
  filters: {
    dateFormat: filters.formatDate.datesFormat
  },
  mounted() {
    this.getdetail()
  },
  methods: {
    getdetail() {
      this.loading = true
      this.$shttp
        .get(detailUrl.replace('{number}', this.$route.params.id))
        .then(res => {
          this.loading = false
          this.info = res
        })
        .catch(err => {
          this.loading = false
          this.$messagesebe.error(err.response.data.msg)
        })
    }
  }
}
</script>

<style lang="less">
.patentnavinfobox {
  background-color: #f5f6f7;
  .detailbox {
    background-color: #fff;
    padding: 15px;
    h3 {
      text-align: center;
      color: #333;
      margin-bottom: 10px;
      // height:30px;
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
    }
    .intr {
      text-align: center;
      margin-bottom: 30px;
      color: #999;
      height: 22px;
      font-size: 12px;
      font-weight: 400;
      line-height: 22px;
      span {
        margin-right: 10px;
      }
    }
    .cont {
      color: #999;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      img {
        max-width: 100%;
        // margin-bottom: 10px;
      }
    }
  }
}
</style>
