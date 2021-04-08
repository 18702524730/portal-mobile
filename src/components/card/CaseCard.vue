<template>
  <div id="caseCard">
    <div class="container">
      <van-row type="flex" justify="space-between" @click="clickCard(item)">
        <van-col class="card-img">
          <van-image :src="getImgNewView(item.ipInfo.imgUrl)" lazy-load class="my-image"
                     v-if="JSON.stringify(item.ipInfo) !== '{}'"/>
        </van-col>
        <van-col class="card-content">
          <van-row class="card-title">
            <h3 class="van-multi-ellipsis--l2">
              {{ item.orderType | tagName }}{{ item.transactionContent }}
            </h3>
          </van-row>
          <div v-if="item.orderType === '2'" class="my-content">
            <van-row :gutter="12">
              <van-col :span="12" class="van-ellipsis">
                <span>所属行业：</span>
                <span>{{ item.ipInfo.belongIndustryName}}</span>
              </van-col>
              <van-col :span="12" class="van-ellipsis">
                <span>意向运营方式：</span>
                <span>{{ item.ipInfo.intendedOperationModeName}}</span>
              </van-col>
            </van-row>
            <van-row :gutter="12">
              <van-col :span="12" class="van-ellipsis">
                <span>项目所在地：</span>
                <span>{{ item.ipInfo.madeAreaCodeName |changeData}}</span>
              </van-col>
            </van-row>
          </div>
          <div v-else-if="item.orderType === '3'" class="my-content">
            <van-row :gutter="12">
              <van-col :span="12" class="van-ellipsis">
                <span>技术领域：</span>
                <span>{{ item.ipInfo.technicalFieldName }}</span>
              </van-col>
              <van-col :span="12" class="van-ellipsis">
                <span>所属行业：</span>
                <span>{{ item.ipInfo.belongIndustryName}}</span>
              </van-col>
            </van-row>
            <van-row :gutter="12">
              <van-col :span="12" class="van-ellipsis">
                <span>合作区域：</span>
                <span>{{ item.ipInfo.cooperationAreaName }}</span>
              </van-col>
              <van-col :span="12" class="van-ellipsis">
                <span>专利类型：</span>
                <span>{{ item.ipInfo.patentTypeName }}</span>
              </van-col>
            </van-row>
            <van-row :gutter="12">
              <van-col :span="12" class="van-ellipsis">
                <span>意向运营方式：</span>
                <span>{{ item.ipInfo.intendedOperationModeName }}</span>
              </van-col>
            </van-row>
          </div>
          <div v-else class="my-content">
            <van-row :gutter="12">
              <van-col :span="12" class="van-ellipsis">
                <span>商标类别：</span>
                <span>{{ item.ipInfo.trademarkTypeName}}</span>
              </van-col>
              <van-col :span="12" class="van-ellipsis">
                <span>行业需求：</span>
                <span>{{ item.ipInfo.belongIndustryName}}</span>
              </van-col>
            </van-row>
            <van-row :gutter="12">
              <van-col :span="12" class="van-ellipsis">
                <span>组合类型：</span>
                <span>{{ item.ipInfo.combinationCategoryName }}</span>
              </van-col>
            </van-row>
          </div>
          <van-row class="my-time" type="flex" align="center">
            <van-icon name="clock-o"/>
            {{ item.orderTime | changeDate}}
          </van-row>
        </van-col>
      </van-row>


      <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
        <case-show-details :item="item" @func="closeDetails"></case-show-details>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import CaseShowDetails from '../details/CaseShowDetails'

  export default {
    name: 'CaseCard',
    components: { CaseShowDetails },
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
        detailsShow: false
      }
    },
    methods: {
      closeDetails() {
        this.detailsShow = false
      },
      clickCard(item) {
        this.detailsShow = true
      },
      getImgNewView(text) {
        return getImgNewView(text)
      }
    },
    filters: {
      tagName(value) {
        let name = ''
        if (value) {
          switch (value) {
            case '2':
              name = '【项目】'
              break
            case '3':
              name = '【专利】'
              break
            case '4':
              name = '【商标】'
              break
            default:
          }
        }
        return name
      },
      changeData(value) {
        if (value) {
          const arr = value.split('/')
          return arr[arr.length - 1]
        }
        return value
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #caseCard {
    background-color: #ffffff;
    border: 1px solid @main-bg-color;
    padding: 10px 0;
    .card-img {
      .my-image {
        width: 214/2px;
        height: 141/2px;
      }
    }
    .card-content {
      width: 220px;
      .card-title {
        h3 {
          font-weight: normal;
          color: @main-font-color;
          font-size: 13px;
          line-height: 15px;
          height: 30px;
          margin: 0;
        }
      }
      .my-content {
        word-break: break-all;
        color: #898989;
        font-size: 9px;
        line-height: 20px;
      }
      .my-time {
        font-size: 9px;
        color: #898989;
      }
    }
  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%
  }
</style>