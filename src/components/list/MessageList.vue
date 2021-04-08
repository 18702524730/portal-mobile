<template>
  <div id="messageList" :class="[border?'border':'']">
    <van-row class="search-content" v-if="haveSearch">
      <form action="/">
        <van-search
          v-model="keyword"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </form>
    </van-row>
    <van-row class="my-head" type="flex" align="center" justify="space-between" v-if="!haveTypeName">
      <van-col :span="12">
        <h2>{{columns[0].title}}</h2>
      </van-col>
      <van-col :span="6" class="my-sort">
        <order-button @changeSort="changeSort($event)" :title="columns[1].title"></order-button>
      </van-col>
    </van-row>
    <van-row v-if="data.length === 0">
      <van-empty description="没有内容"/>
    </van-row>
    <van-row class="content-row" v-else>
      <van-cell v-for="(item,index) in data" :key="item.id" @click="clickCell(item)">
        <template #title>
          <h3 class="van-multi-ellipsis--l2">
            <span v-if="haveTypeName">【{{item.typeName}}】</span>{{item[`${columns[0].dataIndex}`]}}
          </h3>

          <p class="time-content">
            {{item[`${columns[1].dataIndex}`]}}
          </p>
        </template>
      </van-cell>

      <van-pagination v-model="pagination.current" :total-items="pagination.total" :items-per-page="pagination.pageSize"
                      v-if="havePage" force-ellipses
                      @change="pagination.onChange"/>
    </van-row>

  </div>
</template>

<script>
  import OrderButton from '../general/OrderButton'

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title'
    },
    {
      title: '发布时间',
      dataIndex: 'releaseDate'
    }
  ]
  export default {
    name: 'MessageList',
    components: { OrderButton },
    props: {
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      columns: {
        type: Array,
        default: () => {
          return columns
        }
      },
      havePage: {
        type: Boolean,
        default: false
      },
      haveSearch: {
        type: Boolean,
        default: false
      },
      haveTypeName: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Object,
        default: () => {
          return {
            current: 1,
            pageSize: 12,
            total: 0,
            onChange: page => {
            }
          }
        }
      },
      keyRoute: {
        type: String,
        default: 'MobileSpecialMessage'
      },
      routeName: {
        type: String,
        default: 'MobileArticleMessage'
      },
      isLink: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      isSearch: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        keyword: ''
      }
    },
    methods: {
      changeSort(sort) {
        this.$emit('func', this.keyword, sort)
      },
      onSearch() {
        this.$emit('func', this.keyword)
      },
      clickCell(item) {
        if (!this.isSearch) {
          if (!this.isLink) {
            const newPage = this.$router.resolve({
              name: this.routeName,
              query: { id: item.id, keyRoute: this.keyRoute }
            })
            window.open(newPage.href, '_blank')
          } else {
            window.open(item.link, '_blank')
          }
        } else {
          let name = 'MobileArticleMessage'
          let route = this.keyRoute
          switch (item.type) {
            case 'policies':
              route = 'MobileNewsConsult'
              break
            case '2':
              route = 'MobileNoticeMessage'
              break
            case 'special':
              route = 'MobileSpecialMessage'
              break
            case '4':
              route = 'MobileTrainMessage'
              name = 'MobileTrainArticleMessage'
              break
            case '5':
              route = 'MobileCareCenter'
              name = 'CareCenterArticleMessage'
              break
            case '6':
              // 服务券暂时不动
              // route = 'CareCenter'
              // name = 'ServiceArticleMessage'
              break
            case '7':
              route = 'MobileFinancialService'
              name = 'MobileFinancialServiceArticleMessage'
              break
            case '8':
              route = 'MobilePledgeFinancing'
              name = 'MobileFinancialConsultArticleMessage'
              break
            case '9':
              route = 'MobileActivistArticleMessage'
              name = 'MobileActivistResources'
              break
            default:
              route = 'MobileNoticeMessage'
              break
          }
          const newPage = this.$router.resolve({ name: name, query: { id: item.id, keyRoute: route } })
          window.open(newPage.href, '_blank')
        }

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  .border {
    border: 1Px solid @main-bg-color;;
  }

  #messageList {

    .search-content {
      border-top: 1Px solid @main-bg-color;
    }
    .my-head {
      background-color: @main-bg-color;
      padding: 0 16px;
      h2 {
        color: #001833;
        font-size: 18px;
        font-weight: normal;
      }
      .my-sort {
        justify-content: flex-end;
      }
    }
    .content-row {
      .van-cell:not(:last-child)::after {
        left: 0;
      }
      h3 {
        width: 100%;
        color: @main-font-color;
        font-size: 15px;
        line-height: 20px;
        height: 40px;
        font-weight: normal;
        margin: 0;
      }
      p {
        margin: 0;
      }
      .time-content {
        text-align: end;
        color: @main-font-color2;
        font-size: 12px;
      }
    }
  }
</style>