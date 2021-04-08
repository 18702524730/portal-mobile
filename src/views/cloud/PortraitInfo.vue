<template>
  <div class="articlecontsebe" :class="{ haspd: from === 1 }">
    <div class="article">
      <h3>{{ info.articleTitle }}</h3>
      <div class="source">
        <span>{{ info.createTime | dateFormat }}</span>
      </div>
      <div class="cont" id="contbox" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
import filters from '@utils/filters.js'
const detailUrl = '/api/pictorial/selectIpPortraitList'
// import $ from 'jquery'
export default {
// inject: ['reload'],  
  data() {
    return {
      id: '',
      info: {},
      zb: '',
      from: 1
    }
  },
  filters: {
    dateFormat: filters.formatDate.dateFormathm
  },
  methods: {
    toback() {
      this.$router.go(-1)
    },
    getDetail() {
      const data = {
        id: this.id
      }
      this.$shttp.get(detailUrl, { params: data }).then(res => {
        const resdata = res
        this.info = resdata
      })
    }
  },
  created() {
    // window.scrollTo(0,0)
    this.id = this.$route.params.id
    this.getDetail()
  }
}
</script>

<style lang="less">
.articlecontsebe {
  background-color: #f5f6f7;
  .article {
    min-height: 300px;
    background-color: #fff;
    padding: 20px 15px;

    > h3 {
      font-size: 18px;
      color: #333;
      line-height: 25px;
      margin-bottom: 10px;
      text-align: center;
    }
    .source {
      text-align: center;
      font-size: 16px;
      color: #999;
      line-height: 22px;
      margin-bottom: 20px;
      > span:first-child {
        margin-right: 20px;
      }
    }
    .cont {
      font-size: 14px;
      color: #333;
      line-height: 20px;
      img {
        max-width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
