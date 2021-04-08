<template>
  <div class="articlecontsebe" :class="{ haspd: from === 1 }">
    <div v-if="from === 2" class="fromadmin">
      <h3>
        查看文章 <span @click="pagerefresh"><i class="el-icon-refresh"></i> 刷新</span
        ><span @click="toback"><i class="el-icon-close"></i> 关闭</span>
      </h3>
    </div>
    <div class="article">
      <h3>{{ info.articleTitle }}</h3>
      <div class="source">
        <span>{{ zb }}</span>
        <!-- <span v-if="from===2">{{info.itemName}}</span> -->
        <span>{{ info.journalIssue }}</span>
      </div>
      <div class="cont" id="contbox" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
const detailUrl = '/api/pictorial/articleDetail'
const infoUrl = '/api/pictorial/selectJournalInfo'
// import $ from 'jquery'
export default {
  inject: ['reload'],  
  data() {
    return {
      id: '',
      info: {},
      zb: '',
      from: ''
    }
  },
  methods: {
    toback() {
      this.$router.go(-1)
    },
    pagerefresh() {
      this.reload()
    },
    getinfo() {
      const data = {
        id: this.id
      }
      this.$shttp.get(infoUrl, { params: data }).then(res => {
        this.zb = res.info
      })
    },
    getDetail() {
      const data = {
        id: this.id,
        from: this.from
      }
      this.$shttp.get(detailUrl, { params: data }).then(res => {
        const resdata = res
        this.info = resdata
      })
    }
  },
  created() {
    // window.scrollTo(0,0)
    this.id = this.$route.params.lmid
    this.from = this.$route.params.from
    this.getDetail()
    this.getinfo()
  }
}
</script>

<style lang="less">
.articlecontsebe {
  background-color: #f5f6f7;
  padding-bottom: 20px;
  overflow: hidden;
  ul,
  p,
  h3 {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .haspd {
    padding-top: 20px;
  }
  .fromadmin {
    height: 60px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    color: #333;
    > h3 {
      width: 100%;
      padding: 15px 0;
      margin: 0 auto;
      line-height: 30px;
      font-size: 14px;
      span {
        float: right;
        margin-left: 10px;
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ccc;
        color: #999;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
  .article {
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    min-height: 300px;
    background-color: #fff;
    padding: 10px 10px;

    > h3 {
      font-size: 32/2px;
      color: #333;
      line-height: 50/2px;
      margin-bottom: 10px;
      text-align: center;
    }
    .source {
      text-align: center;
      font-size: 16px;
      color: #999;
      line-height: 22px;
      margin-bottom: 30px;
      > span:first-child {
        margin-right: 20px;
      }
    }
    .cont {
      font-size: 14px;
      color: #333;
      line-height: 20px;
      p {
        width: 100%;
      }
      img {
        max-width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
