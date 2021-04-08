<template>
  <div id="mobileCareCenter">
    <swipe-map :ad-list="advertList"></swipe-map>

    <van-row class="card-list">
      <van-col class="card-col" v-for="(item,index) in dictOptions" :key="index" @click="imgBtn">
        <van-row class="contain-image">
          <van-image fit="contain" :src="item.imgUrl" class="my-image"></van-image>
        </van-row>
        <van-row class="contain-title">
          <span>{{item.title}}</span>
        </van-row>
      </van-col>
    </van-row>

    <related-message-list :data="data" :have-page="data.length > 0" :pagination="ipagination"></related-message-list>
  </div>
</template>

<script>
  import { filterObj, judgeState } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'
  import SwipeMap from '../../components/general/SwipeMap'
  import RelatedMessageList from '../../components/list/RelatedMessageList'

  import { isInstitution2 } from '@/utils/role'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from '@/store/mutation-types'

  export default {
    name: 'MobileCareCenter',
    components: { RelatedMessageList, SwipeMap },
    inject: ['headLogin'],
    data() {
      return {
        url: '/zscq/portal/informationList',
        formParam: {
          informationType: '5'
        },
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          spinning: false
        },
        data: [],

        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '5'
        },
        adLoading: false,
        advertList: [],
        dictOptions: [
          {
            title: '专利分类管理',
            imgUrl: require('../../assets/images/general/1_03.png')
          },
          {
            title: '年费期限监控',
            imgUrl: require('../../assets/images/general/1_05.png')
          },
          {
            title: '年费缴费辅助',
            imgUrl: require('../../assets/images/general/1_07.png')
          },
          {
            title: '专利运营机会',
            imgUrl: require('../../assets/images/general/1_09.png')
          },
          {
            title: '信息定向推送',
            imgUrl: require('../../assets/images/general/1_11.png')
          }
        ]
      }
    },
    created() {
      this.loadData(this.getParam(this.formParam, this.ipagination))
      this.getAllAdverts()
    },
    methods: {
      imgBtn() {
        if (judgeState()) {
          if (isInstitution2()) {
            const path = '/trusteeship/portalPatentTrusteeship/trusteeshipCenter'

            const token = Vue.ls.get(ACCESS_TOKEN)
            const newUrl = window._CONFIG['userCenterToURL'] + '?token=' + token + '&redirectUrl=' + path
            window.open(newUrl)

          } else {
            this.$notify({ type: 'warning', message: '您没有权限，暂时不能操作!' })
          }
        } else {
          this.$notify({ type: 'warning', message: '请先进行登录!' })
          this.headLogin()
        }
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
          }
          this.$cancelLoading()
        }).finally(() => {
          this.$cancelLoading()
        })
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      handleTableChange(page, key) {
        this.ipagination.current = page
        this.loadData(this.getParam(this.formParam, this.ipagination))
      },
      getAllAdverts() {
        if (!this.adUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        this.adLoading = true
        getActionUpdateKeyword(this.adUrl, this.adParam).then((res) => {
          if (res.success) {
            this.advertList = res.result
          }
          this.adLoading = false
        }).finally(() => {
          this.adLoading = false
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileCareCenter {
    .card-list {
      background-color: @main-bg-color;
      padding-bottom: 10px;
      .card-col {
        text-align: center;
      }
      .my-image {
        height: 42px;
        width: 33px;
      }
      .card-col {
        width: 20%;
        .contain-title {
          font-size: 10px;
          color: #666666;
          text-align: center;
        }
      }
    }
  }
</style>