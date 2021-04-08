<template>
  <div class="cloudpagesebe">
    <div class="commonWidth clearfix">
      <!-- <div class="leftyearlist">
        <div class="itemyear" v-for="(item, index) in yearlist" :key="index">
          <h3 class="year" @click="openitem(item)">
            {{ item.year }}年
            <span class="iconbox"
              ><i class="el-icon-arrow-down" v-if="!item.isopen"></i><i class="el-icon-arrow-up" v-if="item.isopen"></i
            ></span>
          </h3>
          <ul v-if="item.list && item.isopen" class="itemlist">
            <li v-for="(v, k) in item.list" :key="k" :class="{ active: v.id === nowid }" @click.stop="searchitem(v)">
              {{ v.title }}
            </li>
          </ul>
        </div>
      </div> -->
      <div class="rightcontitem">
        <div class="topview clearfix">
          <div class="imgbox">
            <img :src="detailInfo.xipopPictorialJournalVO.journalCover" alt="" />
          </div>
          <ul class="intr">
            <li>画报刊号：{{ detailInfo.xipopPictorialJournalVO.journalNo }}</li>
            <li>主办信息：{{ detailInfo.xipopPictorialJournalVO.info }}</li>
            <li>画报期号：{{ detailInfo.xipopPictorialJournalVO.journalIssue }}</li>
          </ul>
        </div>
        <div class="bottomlist">
          <div class="mulu">
            <h2>目录</h2>
          </div>
          <div class="artbox">
            <div v-for="(item, key) in articlelist" :key="key" class="article">
              <h3>{{ item.itemName }}</h3>
              <ul v-if="item.xipopPictorialArticleVOList" class="titlelist">
                <li v-for="(t, k) in item.xipopPictorialArticleVOList" :key="k" @click="toarticle(t)">
                  {{ t.articleTitle }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const detailUrl = '/api/pictorial/articleDetail'
const infourl = '/api/pictorial/journalAndarticleDetail/{id}'
const tlistUrl = '/api/pictorial/journalList'
const yearlist = '/api/pictorial/journalYearList'
// import $ from 'jquery'
export default {
  data() {
    return {
      yearlist: [],
      articlelist: [],
      detailInfo: {
        xipopPictorialJournalVO: {},
        xipopPictorialArticleListVOList: []
      },
      nowid: '',
      nowyear: ''
    }
  },
  methods: {
    openitem(it) {
      if (it.isopen) {
        it.isopen = false
      } else {
        this.yearlist.forEach(item => {
          item.isopen = false
        })
        it.isopen = true

        this.getlist(it.year)
      }
    },
    searchitem(it) {
      this.nowid = it.id
      this.$router.replace({ name: 'MobileCloudPaperList', params: { id: this.nowid, year: this.nowyear } })
      this.getdetail(it.id)
    },
    async getyears() {
      return await this.$shttp.get(yearlist)
    },
    async getlist(year) {
      const data = {
        journalYear: year,
        pgIndex: 1,
        pgCount: 12
      }
      const resp = await this.getyears()
      const years = resp
      const arr = []

      this.$shttp.get(tlistUrl, { params: data }).then(res => {
        const datas = res.elements
        const qarr = []
        datas.forEach(item => {
          qarr.push({
            title: item['journalIssue'],
            id: item['id']
          })
        })
        years.forEach(item => {
          arr.push({
            year: item,
            list: [],
            isopen: false
          })
        })
        arr.forEach(item => {
          if (item['year'] === year) {
            item['list'] = qarr
            item.isopen = true
          }
        })
        this.yearlist = arr
        console.log(arr, qarr)
      })
    },
    getdetail(id) {
      this.$shttp.get(infourl.replace('{id}', id)).then(res => {
        this.detailInfo = res
        if (res.xipopPictorialArticleListVOList) {
          this.articlelist = res.xipopPictorialArticleListVOList
        }
      })
    },
    toarticle(it) {
      // console.log(it.id)
      // const openUrl = `/portal/cloud/cloud-paperinfo/${it.id}/1`
      // window.open(openUrl)
      this.$router.push({ name: 'MobileCloudPaperInfo', params: { lmid: it.id, from: 1 } })
    }
  },
  mounted() {
    this.nowid = this.$route.params.id
    this.nowyear = this.$route.params.year
    this.getlist(this.nowyear)
    this.getdetail(this.nowid)
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="less">
.cloudpagesebe {
  background-color: #f5f6f7;
  .commonWidth {
    width: 100%;
    margin: 0 auto;
  }
  .fl {
      float: left;
  }
  .fr {
      float: right;
  }
  ul {
      padding: 0;
      margin: 0;
      list-style: none;
  }
  .leftyearlist {
    width: 210px;
    background-color: #fff;
    color: #333;
    // .itemyear{
    //     border-bottom: 1px solid #eee;
    // }
    .year {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
      cursor: pointer;
      .iconbox {
        float: right;
      }
    }
    .itemlist {
      max-height: 566px;
      overflow-y: auto;
      cursor: pointer;

      > li {
        padding-left: 68px;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        margin: 6px 0;
        &:hover {
          background-color: rgba(47, 114, 209, 0.06);
          color: #2f72d1;
          border-right: 2px solid #2f72d1;
        }
        &.active {
          background-color: rgba(47, 114, 209, 0.06);
          color: #2f72d1;
          border-right: 2px solid #2f72d1;
        }
      }
    }
  }
  .rightcontitem {
    width: 100%;
    .topview {
      padding: 15px;
      margin-bottom: 10px;
      background-color: #fff;
      .imgbox {
        width: 228px;
        height: 308px;
        // background-color: #ccc;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .intr {
        padding: 10px 0;
        font-size: 14px;
        color: #333;
        > li {
          line-height: 20px;
          margin-bottom: 10px;
        }
      }
    }
    .bottomlist {
      background-color: #fff;
      padding: 10px 0 0;
      .artbox {
        // max-height: 500px;
        padding-bottom: 20px;
        overflow-y: auto;
      }
      .mulu {
        padding-left: 15px;
        border-bottom: 1px solid #eee;
        > h2 {
          width: 60px;
          text-align: center;
          padding-bottom: 5px;
          border-bottom: 3px solid #d8d8d8;
          font-size: 16px;
          color: #333;
          line-height: 22px;
        }
      }
      .article {
        padding: 10px 15px;
        > h3 {
          font-size: 16px;
          color: #2f72d1;
          line-height: 22px;
          margin-bottom: 10px;
        }
        .titlelist {
          li {
            line-height: 20px;
            margin-bottom: 10px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            &:hover {
              color: #2f72d1;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
