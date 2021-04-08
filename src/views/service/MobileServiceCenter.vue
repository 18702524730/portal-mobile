<template>
  <div id="mobileServiceCenter">
    <swipe-map :ad-list="advertList"></swipe-map>

    <van-row class=" my-navigation">
      <van-row class="container" :gutter="5">
        <van-col :span="8">
          <a href="http://www.xmipop.com/portal/message/article-message?id=1273887543113261057&keyRoute=SpecialMessage"
             target="_blank">
            <img src="../../assets/images/ss1.png" alt="导航">
          </a>
        </van-col>
        <van-col :span="8">
          <a href="http://www.xmipop.com/portal/message/article-message?id=1277165938706194434&keyRoute=SpecialMessage"
             target="_blank">
            <img src="../../assets/images/ss2.png" alt="导航">
          </a>
        </van-col>
        <van-col :span="8">
          <a href="http://ggfw.cnipa.gov.cn:8010/PatentCMS_Center/" target="_blank">
            <img src="../../assets/images/ss3.png" alt="导航">
          </a>
        </van-col>
      </van-row>
    </van-row>

    <recommend-organization title="推荐服务" key-route-name="MobileServiceProject" v-if="serviceData.length > 0">
      <template slot="content">
        <div class="container">
          <van-row type="flex" justify="space-between" class="my-list-layout-row"
                   v-for="(outItem,outIndex) in serviceData"
                   :key="outIndex">
            <recommend-service-card
              v-for="(item,index) in outItem"
              :key="item.id"
              :item="item"
            ></recommend-service-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <recommend-organization title="推荐服务机构" key-route-name="MobileServiceOrg" v-if="agencyData.length > 0">
      <template slot="content">
        <div class="container">
          <van-row type="flex" justify="space-between" class="my-list-layout-row"
                   v-for="(outItem,outIndex) in agencyData"
                   :key="outIndex">
            <recommend-service-org-card
              v-for="(item,index) in outItem"
              :key="item.id"
              :item="item"
            ></recommend-service-org-card>
          </van-row>
        </div>
      </template>
    </recommend-organization>

    <van-button class="my-btn-filter" @click="filterBtn">
      <van-row>
        <van-icon class="iconfont" class-prefix='icon' name='filter'/>
      </van-row>
      <van-row>
        筛选
      </van-row>
    </van-button>


    <van-popup v-model="show" position="right" style="height: 100%;width: 100%" class="my-popup"
               get-container="#mobileServiceCenter" :safe-area-inset-bottom="false">
      <van-row class="my-popup-content">
        <van-nav-bar
          title="筛选"
          left-text="返回"
          left-arrow
          @click-left="cancelBtn"
        />
        <van-row class="my-result">
          <van-row>选择：</van-row>
          <van-row class="select-content">
            <van-row class="second-row">
              <template v-for="(item,index) in selectTab">
                <span v-if="index !== 0" :key="index"> > </span>
                <van-tag
                  closeable
                  size="mini"
                  type="primary"
                  @close="close(index)"
                  :key="item.id"
                >{{item.title}}
                </van-tag>

              </template>
            </van-row>
          </van-row>
        </van-row>

        <van-row>
          <van-col :span="10">
            <van-sidebar v-model="activeKey" @change="onChange">
              <van-sidebar-item
                :title="item.title"
                v-for="(item,index) in tableList"
                :key="item.id"
              />
            </van-sidebar>
          </van-col>
          <van-col :span="14" class="sidebar-content"
                   v-if="tableList && tableList[`${activeKey}`] && tableList[`${activeKey}`].children.length > 0">
            <van-row v-for="(item,index) in tableList[`${activeKey}`].children" :key="item.id">
              <p class="title" @click="clickP(item)"
                 :class="[selectTab[1] && selectTab[1].id === item.id?'p-selected':'']">
                {{item.title}}
              </p>
              <van-row>
                <van-button v-for="(innerItem,innerIndex) in item.children" :key="innerItem.id"
                            @click="selectChild(item,innerItem)"
                            :class="[selectTab[2] && selectTab[2].id === innerItem.id?'van-button-selected':'']">
                  {{innerItem.title}}
                </van-button>
              </van-row>
            </van-row>
          </van-col>
        </van-row>
      </van-row>
      <van-row class="my-btn-group">
        <van-col :span="12" class="my-btn-col">
          <van-button @click="cancelBtn">取消</van-button>
        </van-col>
        <van-col :span="12" class="my-btn-col">
          <van-button class="my-btn-primary" @click="confirmBtn">确认</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
  import SwipeMap from '../../components/general/SwipeMap'
  import { getActionUpdateKeyword } from '@/api/manage'
  import _ from 'lodash'
  import { filterObj, changeArr } from '@/utils/util'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import RecommendServiceCard from '../../components/card/RecommendServiceCard'
  import RecommendServiceOrgCard from '../../components/card/RecommendServiceOrgCard'

  export default {
    name: 'MobileServiceCenter',
    components: { RecommendServiceOrgCard, RecommendServiceCard, RecommendOrganization, SwipeMap },
    data() {
      return {
        adUrl: '/zscq/portal/advertList',
        adParam: {
          position: '2'
        },
        adLoading: false,
        advertList: [],

        serviceTimer: null,
        agencyTimer: null,
        serviceData: [],
        agencyData: [],
        url: {
          serviceUrl: '/zscq/portal/agencyProductRecommendList',
          agencyUrl: '/zscq/portal/getAgencyPage'
        },
        serviceFormParam: {
          recommend: 1
        },
        serviceIpagination: {
          current: 1,
          pageSize: 16,
          total: 0,
          hideOnSinglePage: true,
          onChange: page => {
            this.handleTableChange(page, 'service')
          }
        },
        serviceLoading: {
          spinning: false
        },

        agencyFormParam: {
          recommend: 1
        },
        agencyIpagination: {
          current: 1,
          pageSize: 16,
          total: 0,
          hideOnSinglePage: true,
          onChange: page => {
            this.handleTableChange(page, 'agency')
          }
        },
        agencyLoading: {
          spinning: false
        },
        show: false,

        activeKey: '-1',
        tabUrl: '/zscq/portal/getServiceTypeTreeNode',
        tableList: [],
        selectTab: []
      }
    },
    beforeDestroy() {

    },
    created() {
      this.getAllAdverts()
      this.loadData()
      this.getServiceData(this.getParam(this.serviceFormParam, this.serviceIpagination))
      this.getAgencyData(this.getParamNo(this.agencyFormParam, this.agencyIpagination))
    },
    methods: {
      close(index) {
        if (index === 0) {
          this.activeKey = '-1'
        }
        this.selectTab = this.selectTab.slice(0, index)
      },
      clickP(item) {
        if (this.selectTab.length > 1) {
          if (this.selectTab[1].id === item.id) {
            return true
          }
        }
        this.selectTab = [this.tableList[`${this.activeKey}`], item]

      },
      selectChild(item, childrenItem) {
        this.selectTab = [this.tableList[`${this.activeKey}`], item, childrenItem]
      },
      loadData() {
        getActionUpdateKeyword(this.tabUrl).then((res) => {
          if (res.success) {
            this.tableList = res.result
            console.info(this.tableList)
          } else {
            this.$notify({ type: 'warning', message: res.message })
          }

        })
      },
      onChange(index) {
        const item = this.tableList[index]
        if (this.selectTab.length > 0 && this.selectTab[0].id === item.id) {
          return true
        }
        this.selectTab = [item]
      },
      confirmBtn() {
        let keyId = ''
        if (this.selectTab.length > 0) {
          keyId = this.selectTab[this.selectTab.length - 1].id
        }
        this.$router.push({ name: 'MobileServiceProject', query: { keyId: keyId } })
      },
      cancelBtn() {
        this.show = false
      },
      filterBtn() {
        this.show = true
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
      },
      getServiceData(param) {
        const that = this
        if (!that.url.serviceUrl) {
          that.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        getActionUpdateKeyword(that.url.serviceUrl, param).then((res) => {
          if (res.success) {
            that.serviceIpagination.total = res.result.total
            that.serviceData = changeArr(_.shuffle(res.result.records).slice(0, 8), 2)

          }
        }).finally(() => {
        })
      },
      getAgencyData(param) {
        const that = this
        if (!this.url.agencyUrl) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        getActionUpdateKeyword(this.url.agencyUrl, param).then((res) => {
          if (res.success) {
            that.agencyIpagination.total = res.result.total
            that.agencyData = changeArr(_.shuffle(res.result.records).slice(0, 8), 2)
          }

        }).finally(() => {
        })
      },
      handleTableChange(page, key) {
        switch (key) {
          case 'service':
            this.serviceIpagination.current = page
            this.getServiceData(this.getParam(this.serviceFormParam, this.serviceIpagination))
            break
          case 'agency':
            this.agencyIpagination.current = page
            this.getAgencyData(this.getParamNo(this.agencyFormParam, this.agencyIpagination))
            break
        }
      },
      getParam(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current - 1
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      },
      getParamNo(formParam, ipagination) {
        const param = Object.assign({}, formParam)
        param.pageNo = ipagination.current
        param.pageSize = ipagination.pageSize
        return filterObj(param)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  .my-navigation {
    background-color: @main-bg-color;
    img {
      width: 100%;
      height: 60px;
    }
  }

  .my-btn-filter {
    font-size: 10px;
    color: #ffffff;
    background-color: @main-color;
    border-radius: 50%;
    height: 49px;
    width: 49px;
    position: fixed;
    right: 19px;
    bottom: 200px;
    border: none;
    .iconfont {
      font-size: 25px;
    }
  }

  .my-popup {
    .my-popup-content {
      height: 93%;
      overflow-y: auto;
    }
    .my-btn-group {
      height: 7%;
      .my-btn-col {
        height: 100%;
      }
      .van-button {
        height: 100%;
        width: 100%;
        color: #666666;
        font-size: 15px;
        border: none;
      }
      .van-button--default {
        border-radius: 0;
      }
      .my-btn-primary {
        color: #ffffff;
        background-color: @main-color;
        border-radius: 0;
      }
    }
  }

  .van-sidebar {
    width: 100%;
    .van-sidebar-item--select::before {
      background-color: @main-color;
    }
    .van-sidebar-item--select {
      color: @main-color;
    }

  }

  .van-sidebar-item {
    font-size: 15px;
  }

  .sidebar-content {
    padding: 0 20px;
    .title {
      color: #333333;
      font-size: 15px;
    }
    .van-button {
      height: 28px;
      background-color: #e6e6e6;
      font-size: 13px;
      color: #666666;
      margin: 0 15px 15px 0;
    }
    .van-button-selected {
      background-color: @main-color;
      color: #ffffff;
    }
    .p-selected {
      color: @main-color;
    }
  }

  .my-result {
    font-size: 16px;
    padding: 10px;
    .select-content {
      font-size: 16px;
      .van-tag {
        margin-bottom: 5px;
      }
      .first-row {
        margin: 0 5px;
      }
      .second-row {
        margin: 5px 10px;
      }
    }
  }
</style>