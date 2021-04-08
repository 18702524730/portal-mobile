<template>
  <div id="mobilePolicyList">
    <van-row class="card-head container" type="flex" justify="space-between" align="center">
      <van-col class="head-title">
        {{tabsData.lawsTypeName}}
      </van-col>
    </van-row>
    <van-row class="message-content">
      <van-row class="btn-group">
        <van-button :type="index === parseInt(tabsData.selectItem)?'info':'default'" size="mini"
                    v-for="(item,index) in tabsData.data" :key="tabsData.lawsType +'-' + item.lawsTypeChild"
                    @click="btnClick(tabsData,item, index)">{{item.lawsTypeNameChild}}
        </van-button>
      </van-row>
      <message-list :data="data" :pagination="ipagination" :have-page="data.length > 0" @func="refresh"
                    :columns="columns" :have-search="true" :key-route="keyRoute"></message-list>
    </van-row>

  </div>
</template>

<script>
  import { filterObj } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import MessageList from '../../components/list/MessageList'

  export default {
    name: 'MobilePolicyList',
    components: { MessageList },
    data() {
      return {
        url: '/zscq/portal/policies/policiesRegulationsMoreList',
        tabUrl: '/zscq/portal/policies/policiesRegulationsList',
        formParam: {
          lawsType: this.$route.query.lawsType,
          lawsTypeChild: this.$route.query.lawsTypeChild,
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
        data: [],
        sort: {
          publishDateSort: 'desc'
        },

        keyRoute: 'MobileNewsConsult',
        columns: [
          {
            title: '标题',
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
        tabsData: {},
        activeKey: this.$route.query.lawsType,
        activeKeyChild: this.$route.query.lawsTypeChild,
        selectItem: this.$route.query.selectItem
      }
    },
    created() {
      this.loadTabData()
      this.loadData(this.getParam(this.formParam, this.ipagination))
    },
    methods: {
      btnClick(outItem, item, selectItem) {
        this.activeKeyChild = item.lawsTypeChild
        this.tabsData.selectItem = selectItem
        this.againLoad()
      },
      againLoad() {
        this.formParam = {
          lawsType: this.activeKey,
          lawsTypeChild: this.activeKeyChild,
          keyword: ''
        }
        this.ipagination = {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        }
        this.sort = {
          publishDateSort: 'desc'
        }
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      refresh(keyword, sort) {
        this.formParam.keyword = keyword
        this.sort.publishDateSort = sort === undefined ? 'desc' : sort
        this.ipagination.current = 1
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      async loadTabData() {
        if (!this.tabUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        const res = await getActionUpdateKeyword(this.tabUrl)
        if (res.success) {
          const data = res.result
          let allData = []
          allData = data.filter(item => item.lawsType === this.formParam.lawsType)[0]
          allData.selectItem = this.selectItem
          this.tabsData = allData
          console.info(this.tabsData)
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        console.info(res)
        console.info('wahahaha')
      },
      loadData(param) {
        if (!this.url) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        getActionUpdateKeyword(this.url, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = res.result.records
            this.data.forEach(info => {
              info.key = info.id
            })
          }
        }).finally(() => {
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

  #mobilePolicyList {
    background-color: @main-bg-color;
    .card-head {
      padding: 5px 0;
      .head-title {
        color: #001833;
        font-size: 16px;
      }
      .head-more {
        color: #898989;
        font-size: 12px;
        display: flex;
        align-items: center;
        .span-img {
          width: 13/2px;
          height: 22/2px;
          cursor: pointer;
        }
      }
    }
    .message-content {
      padding: 10px 15px;
      background-color: #ffffff;
      font-size: 12px;
      .btn-group{
        padding-bottom: 10px;
      }
      .van-button {
        border-radius: 10px;
        padding: 0 5px;
        font-size: 12px;
      }
      .van-button--info {
        background-color: @main-color;
        border-color: @main-color;
      }
      .van-button--mini + .van-button--mini {
        margin-left: 10px;
      }
      .my-row {
        display: flex;
        align-items: center;
        height: 70/2px;
        span:nth-child(1) {
          color: #B4B4B4;
          padding-right: 5px;
        }
        span:nth-child(2) {
          width: 510/2px;
          display: inline-block;
          font-size: 24/2px;
          padding-right: 66/2px;
        }
        span:nth-child(3) {
          color: @main-font-color2;
          font-size: 14/2px;
        }
      }
    }
  }
</style>