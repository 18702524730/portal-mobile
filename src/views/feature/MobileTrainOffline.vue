<template>
  <div id="mobileTrainOffline">
    <van-popup v-model="detailsShow" position="right" class="my-popup" safe-area-inset-bottom get-container="#app">
      <van-nav-bar
        title="沙龙活动"
        left-arrow
        @click-left="onClickLeft"
        :fixed="false"
        placeholder
        class="bar-head"
      >
      </van-nav-bar>
      <div class="my-main-content">
        <div class="content-form">
          <van-row class="search-head">
            <van-row type="flex" align="center">
              <van-col :span="20">
                <van-field v-model="form.title" label="活动名称" placeholder="请输入活动名称" clearable/>
                <van-cell title="发布时间" @click="show = true">
                  <template #default>
                    {{date}}
                  </template>
                  <template #right-icon>
                    <van-icon name="arrow" class="arrow=icon" style="display: flex;align-items: center;padding-left: 10px;" v-if="date === ''"/>
                    <van-icon name="cross" class="cross=icon" style="display: flex;align-items: center;padding-left: 10px;" v-else @click.stop="resetDate"/>
                  </template>
                </van-cell>
                <van-calendar v-model="show" type="range" @confirm="onConfirm"
                              get-container="#app"
                              ref="myCalendar" :min-date="minDate"/>

                <van-row>
                  <van-field name="radio" label="分类：" class="my-select">
                    <template #input>
                      <van-radio-group v-model="form.activityStatus" direction="horizontal">
                        <van-row style="width: 100%">
                          <van-col :span="8">
                            <van-radio :name="1" @click="radioBtn">预告</van-radio>
                          </van-col>
                          <van-col :span="8">
                            <van-radio :name="2" @click="radioBtn">进行中</van-radio>
                          </van-col>
                          <van-col :span="8">
                            <van-radio :name="3" @click="radioBtn">已结束</van-radio>
                          </van-col>
                        </van-row>
                      </van-radio-group>
                    </template>
                  </van-field>
                </van-row>
              </van-col>
              <van-col :span="4">
                <van-button type="info" size="small" round class="my-btn-default" @click="handleSubmit">搜索</van-button>
              </van-col>
            </van-row>
          </van-row>
        </div>

        <recommend-organization title="" :have-more="false" :have-page="data.length > 0" :pagination="ipagination"
                                key-route-name="MobileTrainCourse">
          <template slot="content">
            <van-empty description="没有内容" v-if="data.length === 0"/>
            <div class="container my-content" v-else>
              <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in data"
                       :key="innerIndex"
                       class="my-class-row">
                <offline-card
                  v-for="(item,index) in innerItem"
                  :item="item"
                  :key="item.id"
                  :have-img="true"
                ></offline-card>
              </van-row>
            </div>
          </template>
        </recommend-organization>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import moment from 'moment'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import OfflineCard from '../../components/card/OfflineCard'
  import { filterObj, cloneObject, changeArr } from '@/utils/util'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'MobileTrainOffline',
    components: { OfflineCard, RecommendOrganization },
    data() {
      return {
        minDate: new Date(1970, 0, 1),
        detailsShow: false,

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
        formParam: {
          activityDate_begin: '',
          activityDate_end: '',
          title: '',
          activityStatus: ''
        },
        form: {
          activityDate_begin: '',
          activityDate_end: '',
          title: '',
          activityStatus: ''
        },
        date: '',
        show: false,
        url: '/zscq/portal/training/offlineSalonPageList',
        selectRadioType: ''
      }
    },
    created() {
      this.handleSubmit()
    },
    methods: {
      showPopup(id) {
        this.detailsShow = true
      },
      onClickLeft() {
        this.detailsShow = false
      },
      formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`
      },
      onConfirm(date) {
        const [start, end] = date
        this.show = false
        this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
        this.form.activityDate_begin = moment(date[0]).format('YYYY-MM-DD')
        this.form.activityDate_end = moment(date[1]).format('YYYY-MM-DD')
      },
      resetDate() {
        this.$refs.myCalendar.reset()
        this.date = ''
        this.form.activityDate_begin = ''
        this.form.activityDate_end = ''
      },
      handleSubmit() {
        this.ipagination.current = 1
        Object.assign(this.formParam, this.form)
        this.loadData(this.handleParam(this.formParam))
      },
      handleParam(param) {
        const that = this
        that.formParam = param

        let newParam = cloneObject(param)
        newParam.pageNo = that.ipagination.current
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)

        return newParam
      },
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      async loadData(param) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.url, param)
        if (res.success) {
          this.data = changeArr(res.result.records, 2)
          this.ipagination.total = res.result.total
        } else {
          this.$notify({ type: 'danger', message: '请求失败' })
        }
        this.$cancelLoading()
      },
      radioBtn() {
        if (this.selectRadioType === '') {
          this.selectRadioType = this.form.activityStatus
        } else if (this.selectRadioType === this.form.activityStatus) {
          this.selectRadioType = ''
          this.form.activityStatus = ''
        } else {
          this.selectRadioType = this.form.activityStatus
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileTrainOffline {

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

    .my-content {
      padding: 15px 0;
      .my-class-row {
        padding-bottom: 15px;
      }
    }

    .content-form {
      background-color: #ffffff;
      .my-btn-default {
        background-color: @main-color;
        border-color: @main-color;
      }
      padding-bottom: 10px;

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
  }
</style>