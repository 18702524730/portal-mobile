<template>
  <div id="mobileTrainCourse">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <van-nav-bar
        title="培训课程"
        left-arrow
        @click-left="onClickLeft"
        :fixed="false"
        placeholder
        class="bar-head"
      >
      </van-nav-bar>
      <div class="my-main-content">
        <div class="content-form">
          <van-field name="radio" label="类型：" class="my-select">
            <template #input>
              <van-radio-group v-model="filter.type" direction="horizontal">
                <van-row v-for="(outerItem,outerIndex) in dictList.type.dictOptions" :key="outerIndex"
                         style="width: 100%">
                  <van-col :span="8" v-for="(item,index) in outerItem" :key="item.value">
                    <van-radio :name="item.value" @click="radioBtn">{{item.text}}</van-radio>
                  </van-col>
                </van-row>
              </van-radio-group>
            </template>
          </van-field>

          <van-field name="radio" label="分类：" class="my-select">
            <template #input>
              <van-radio-group v-model="filter.classification" direction="horizontal">
                <van-row v-for="(outerItem,outerIndex) in dictList.classification.dictOptions" :key="outerIndex"
                         style="width: 100%">
                  <van-col :span="8" v-for="(item,index) in outerItem" :key="item.value">
                    <van-radio :name="item.value" @click="radioBtn2">{{item.text}}</van-radio>
                  </van-col>
                </van-row>
              </van-radio-group>
            </template>
          </van-field>

          <van-field name="radio" label="名称：" class="my-search">
            <template #input>
              <van-search v-model="filter.kwText" placeholder="输入名称搜索..."
                          @search="onSearch"
                          @clear="onCancel" show-action shape="round">
                <template #action>
                  <div @click="onSearch">搜索</div>
                </template>
              </van-search>
            </template>
          </van-field>
        </div>

        <recommend-organization title="" :have-more="false" :have-page="data.length > 0" :pagination="ipagination"
                                key-route-name="MobileTrainCourse">
          <template slot="content">
            <van-empty description="没有内容" v-if="data.length === 0"/>
            <div class="container my-content" v-else>
              <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in data"
                       :key="innerIndex"
                       class="my-class-row">
                <train-activity-card
                  v-for="(item,index) in innerItem"
                  :item="item"
                  :key="item.id"
                  @func="refresh"
                ></train-activity-card>
              </van-row>
            </div>
          </template>
        </recommend-organization>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import TrainActivityCard from '../../components/card/TrainActivityCard'
  import { filterObj, cloneObject, arrayToStringObj, changeArr } from '@/utils/util'

  export default {
    name: 'MobileTrainCourse',
    components: { TrainActivityCard, RecommendOrganization },
    data() {
      return {
        detailsShow: false,
        dictList: {
          type: {
            dictCode: 'course_type',
            dictOptions: []
          },
          classification: {
            dictCode: 'course_classification',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        radio: '',
        selectRadio: '',
        radioType: '',
        selectRadioType: '',
        filter: {
          type: '',
          classification: '',
          kwText: ''
        },

        tableUrl: '/zscq/portal/courseSearch',
        data: [],
        ipagination: {
          current: 1,
          pageSize: 6,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        formParam: {}
      }
    },
    created() {
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
      this.refresh()
    },
    methods: {
      refresh() {
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            console.info(res)
            item.dictOptions = changeArr(res.result, 3)
          }
        })
      },
      showPopup(id) {
        this.detailsShow = true
      },
      onClickLeft() {
        this.detailsShow = false
      },
      onSearch() {
        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
      },
      onCancel() {
        this.filter.kwText = ''
        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current - 1
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)
        newParam = arrayToStringObj(newParam)

        return newParam
      },
      loadData(param) {
        if (!this.tableUrl) {
          this.$notify({ type: 'danger', message: '请设置tableUrl.demandUrl属性' })
          return
        }
        this.$showLoading({
          title: '加载中。。。'
        })
        getActionUpdateKeyword(this.tableUrl, param).then((res) => {
          if (res.success) {
            this.ipagination.total = res.result.total
            this.data = changeArr(res.result.records, 2)
          }
          console.info('我又来了')
          console.info(this.data)
        }).finally(() => {
          this.$cancelLoading()
        })
      },
      radioBtn() {
        if (this.selectRadioType === ""){
          this.selectRadioType = this.filter.type
        } else if (this.selectRadioType === this.filter.type) {
          this.selectRadioType = ""
          this.filter.type = ""
        } else {
          this.selectRadioType = this.filter.type
        }

        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
      },
      radioBtn2() {
        if (this.selectRadio === ""){
          this.selectRadio = this.filter.classification
        } else if (this.selectRadio === this.filter.classification) {
          this.selectRadio = ""
          this.filter.classification = ""
        } else {
          this.selectRadio = this.filter.classification
        }

        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileTrainCourse {

  }

  .my-popup {
    background-color: @main-bg-color;
    height: 100%;
    width: 100%;

    .right-btn {
      font-size: 10px;
      color: @main-font-color2;
      text-align: center;
      .collect-span {
        color: #ff3300;
      }
    }
    .bar-head {
      height: 7%;
    }
    .my-main-content {
      height: 93%;
      overflow-y: auto;
    }

    .content-form {
      .van-search {
        padding: 0;
        width: 100%;
      }
      .van-search__content {
        background-color: #ffffff;
        border: 2Px solid #f7f8fa;
      }
      .van-search__action {
        color: @main-font-color;
        font-size: 12px;
      }
      .my-search {
        /deep/ .van-field__control--custom {
          height: 0.64rem
        }
      }

      /deep/ .van-radio-group {
        width: 100%;
      }
      /deep/ .van-cell__title {
        span {
          color: #666666;
        }
      }
      /deep/ .van-field__label {
        width: 1.5rem;
      }
      .van-cell {
        font-size: 12px;
      }
      /deep/ .van-radio__icon {
        font-size: 12px;
      }
      .van-field__control {
        color: @main-font-color;
      }
      /deep/ .van-radio__icon--checked .van-icon {
        background-color: @main-color;
        border-color: @main-color;
      }
    }

    .my-content {
      padding: 15px 0;
      .my-class-row {
        padding-bottom: 15px;
      }
    }
  }
</style>