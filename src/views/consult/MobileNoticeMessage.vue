<template>
  <div id="mobileNoticeMessage">
    <message-list :data="data" :pagination="ipagination" :have-page="data.length > 0" @func="refresh"
                  :columns="columns" :have-search="true" :key-route="keyRoute"></message-list>
  </div>
</template>

<script>
  import MessageList from '../../components/list/MessageList'
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'


  export default {
    name: 'MobileNoticeMessage',
    components: { MessageList },
    data() {
      return {
        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '2',
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
        keyRoute: 'MobileNoticeMessage',
        columns: [
          {
            title: '公告标题',
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
        data: []
      }
    },
    created() {
      this.loadData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      refresh(keyword, sort) {
        this.formParam.keyword = keyword
        this.sort.publishDateSort = sort === undefined ? 'desc' : sort
        this.ipagination.current = 1
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
            this.ipagination.total = res.result.total
            this.data = res.result.records
            this.data.forEach(info => {
              info.key = info.id
            })
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
  #mobileNoticeMessage {

  }
</style>