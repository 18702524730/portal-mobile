<template>
  <div id="caseShowDetails">
    <van-nav-bar
      :title="tagName(item.orderType) + item.transactionContent"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-row class="content-card">
      <van-row>
        <van-image :src="getImgNewView(item.ipInfo.imgUrl)" lazy-load class="my-image"
                   v-if="JSON.stringify(item.ipInfo) !== '{}'"/>
      </van-row>
      <van-row class="title container">
        <h3 class="van-ellipsis">{{ item.orderType | tagName }}{{ item.transactionContent }}</h3>
        <div v-if="item.orderType === '2'" class="my-content">
          <van-row :gutter="12" class="content-row">
            <van-col :span="12" class="van-ellipsis">
              <span>所属行业：</span>
              <span>{{ item.ipInfo.belongIndustryName}}</span>
            </van-col>
            <van-col :span="12" class="van-ellipsis">
              <span>意向运营方式：</span>
              <span>{{ item.ipInfo.intendedOperationModeName}}</span>
            </van-col>
          </van-row>
          <van-row :gutter="12" class="content-row">
            <van-col :span="12" class="van-ellipsis">
              <span>项目所在地：</span>
              <span>{{ item.ipInfo.madeAreaCodeName |changeData}}</span>
            </van-col>
          </van-row>
        </div>
        <div v-else-if="item.orderType === '3'" class="my-content">
          <van-row :gutter="12" class="content-row">
            <van-col :span="12" class="van-ellipsis">
              <span>技术领域：</span>
              <span>{{ item.ipInfo.technicalFieldName }}</span>
            </van-col>
            <van-col :span="12" class="van-ellipsis">
              <span>所属行业：</span>
              <span>{{ item.ipInfo.belongIndustryName}}</span>
            </van-col>
          </van-row>
          <van-row :gutter="12" class="content-row">
            <van-col :span="12" class="van-ellipsis">
              <span>合作区域：</span>
              <span>{{ item.ipInfo.cooperationAreaName }}</span>
            </van-col>
            <van-col :span="12" class="van-ellipsis">
              <span>专利类型：</span>
              <span>{{ item.ipInfo.patentTypeName }}</span>
            </van-col>
          </van-row>
          <van-row :gutter="12" class="content-row">
            <van-col :span="12" class="van-ellipsis">
              <span>意向运营方式：</span>
              <span>{{ item.ipInfo.intendedOperationModeName }}</span>
            </van-col>
          </van-row>
        </div>
        <div v-else class="my-content">
          <van-row :gutter="12" class="content-row">
            <van-col :span="12" class="van-ellipsis">
              <span>商标类别：</span>
              <span>{{ item.ipInfo.trademarkTypeName}}</span>
            </van-col>
            <van-col :span="12" class="van-ellipsis">
              <span>行业需求：</span>
              <span>{{ item.ipInfo.belongIndustryName}}</span>
            </van-col>
          </van-row>
          <van-row :gutter="12" class="content-row">
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
      </van-row>
    </van-row>

    <van-row>
      <content-body title="案例背景" :contentArr="[{content:item.caseBackground}]" v-if="item.caseBackground"></content-body>
    </van-row>
    <van-row>
      <content-body title="案例实施过程" :contentArr="[{content:item.caseImplementProcess}]"
                    v-if="item.caseImplementProcess"></content-body>
    </van-row>
    <van-row>
      <content-body title="案例分析" :contentArr="[{content:item.caseAnalysis}]" v-if="item.caseAnalysis"></content-body>
    </van-row>
    <van-row>
      <content-body title="案例亮点" :contentArr="[{content:item.caseHighlights}]" v-if="item.caseHighlights"></content-body>
    </van-row>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import ContentBody from '../general/ContentBody'

  export default {
    name: 'CaseShowDetails',
    components: { ContentBody },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    methods: {
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
      onClickLeft() {
        this.$emit('func')
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
  @import "details";

  #caseShowDetails {
    margin-bottom: 10px;
  }
</style>