<template>
  <div id="mobileSpecialList">
    <van-row>
      <van-image
        class="my-img"
        :src="getImgNewView(specialMessage.specialCover)"
      />
    </van-row>
    <div class="inner-title">
      <p class="p-title van-multi-ellipsis--l2">{{specialMessage.specialName}}</p>
      <p>{{specialMessage.createTime | changeDate}}</p>
    </div>

    <van-row>
      <message-list :data="data" :pagination="ipagination" :have-page="data.length > 0" @func="refresh" :key-route="keyRoute"></message-list>
    </van-row>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj } from '@/utils/util'
  import MessageList from '../../components/list/MessageList'

  export default {
    name: 'MobileSpecialList',
    components: { MessageList },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        url: '/zscq/portal/special/specialMessageChildPageList',
        formParam: {
          portalSpecialMessageId: this.$route.query.id,
          keyword: ''
        },
        ipagination: {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        sort: {
          publishDateSort: 'desc'
        },
        keyRoute: 'MobileSpecialMessage',
        columns: [
          {
            title: '文章标题',
            dataIndex: 'title',
            width: '70%',
            scopedSlots: { customRender: 'my-content' }
          },
          {
            title: '发布时间',
            dataIndex: 'releaseDate',
            sorter: true,
            width: '30%'
          }
        ],
        specialMessage: {},
        data: []
      }
    },
    created() {
      this.loadData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      getImgNewView(text) {
        return getImgNewView(text)
      },
      refresh(keyword, sort) {
        this.formParam.keyword = keyword
        this.sort.publishDateSort = sort === undefined ? 'desc' : sort
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      loadData(param) {
        if (!this.url) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.$showLoading({
          title: '加载中。。。'
        })
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.pageList.total
            this.data = res.result.pageList.records
            this.data.forEach(info => {
              info.key = info.id
            })
            this.specialMessage = res.result.specialMessage
          }
          this.$cancelLoading()
        }).finally(() => {
          this.$cancelLoading()
        })
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam, this.sort)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(pagination) {
        this.ipagination.current = pagination
        this.loadData(this.getParam(this.formParam, this.ipagination))
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileSpecialList {
    .my-img {
      width: 100%;
      height: 222px;
    }

    .inner-title {
      padding: 12px;
      p {
        margin: 0;
      }
      p:nth-child(1) {
        font-size: 18px;
        line-height: 24px;
        color: @main-font-color;
      }
      p:nth-child(2) {
        padding-top: 12px;
        font-size: 12px;
        color: @main-font-color2;
      }
    }
  }
</style>