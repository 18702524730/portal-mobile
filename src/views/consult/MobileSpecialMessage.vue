<template>
  <div id="mobileSpecialMessage">
    <van-row>
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
    <recommend-organization title="" :have-more="false" :pagination="recommendIpagination"
                            :have-page="recommentData.length !== 0">
      <template slot="content">
        <van-empty description="没有内容" v-if="recommentData.length === 0"/>
        <div class="container" v-else>
          <van-row type="flex" justify="space-between" class="my-list-layout-row"
                   v-for="(outItem,outIndex) in recommentData"
                   :key="outIndex">
            <message-card
              v-for="(item,index) in outItem"
              :key="item.id"
              :item="item"
            ></message-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, changeArr } from '@/utils/util'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import MessageCard from '../../components/card/MessageCard'

  export default {
    name: 'MobileSpecialMessage',
    components: { MessageCard, RecommendOrganization },
    data() {
      return {
        url: {
          recommentUrl: '/zscq/portal/special/specialMessagePageList'
        },
        keyword: '',
        recommendParam: {
          keyword: ''
        },
        recommendIpagination: {
          current: 1,
          pageSize: 12,
          total: 0,
          hideOnSinglePage: true,
          onChange: page => {
            this.handleMessageTableChange(page)
          }
        },
        remommendLoading: {
          spinning: false
        },
        recommentData: []
      }
    },
    created() {
      this.getRecommendInfos(this.getParam(this.recommendParam, this.recommendIpagination))
    },
    methods: {
      onSearch() {
        this.recommendParam.keyword = this.keyword
        this.recommendIpagination.current = 1
        this.getRecommendInfos(this.getParam(this.recommendParam, this.recommendIpagination))
      },
      getRecommendInfos(param) {
        if (!this.url.recommentUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.remommendLoading.spinning = true
        this.$showLoading({
          title: '加载中。。'
        })
        getActionUpdateKeyword(this.url.recommentUrl, param).then((res) => {
          if (res.success) {
            this.recommentData = res.result.records
            this.recommendIpagination.total = res.result.total
            this.recommentData.forEach(item => {
              item.articleIcons = item.specialCover
              item.title = item.specialName
              item.releaseDate = item.createTime
            })
            this.recommentData = changeArr(this.recommentData, 2)
            console.info(res)
            console.info('哈哈哈哈')
          }
          this.$cancelLoading()
          this.remommendLoading.spinning = false
        }).finally(() => {
          this.$cancelLoading()
          this.remommendLoading.spinning = false
        })
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleMessageTableChange(page) {
        this.recommendIpagination.current = page
        this.getRecommendInfos(this.getParam(this.recommendParam, this.recommendIpagination))
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileSpecialMessage {
    .container {
      padding-top: 10px;
    }
  }
</style>