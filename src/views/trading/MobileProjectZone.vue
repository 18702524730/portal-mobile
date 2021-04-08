<template>
  <div id="mobileProjectZone">
    <van-row class="search-head">
      <van-row type="flex" align="center" :gutter="12">
        <van-col :span="19">
          <van-field v-model="form.title" label="专区名称" placeholder="请输入专区名称" clearable/>
          <van-cell title="发布时间"  @click="show = true">
            <template #default>
              {{date}}
            </template>
            <template #right-icon>
              <van-icon name="arrow" class="arrow=icon" style="display: flex;align-items: center;padding-left: 10px;"
                        v-if="date === ''"/>
              <van-icon name="cross" class="cross=icon" style="display: flex;align-items: center;padding-left: 10px;"
                        v-else @click.stop="resetDate"/>
            </template>
          </van-cell>
          <van-calendar v-model="show" type="range" @confirm="onConfirm"
                        get-container="#app"
                        ref="myCalendar" :min-date="minDate"/>
        </van-col>
        <van-col :span="5">
          <van-button type="info" size="small" round class="my-btn-default" @click="handleSubmit">搜索</van-button>
        </van-col>
      </van-row>

    </van-row>
    <recommend-organization title="" :haveMore="false" :pagination="ipagination" :have-page="data.length !== 0">
      <template slot="content">
        <van-empty description="没有内容" v-if="data.length === 0"/>
        <div v-else>
          <project-zone-card v-for="(item,index) in data" :key="item.id" :item="item"></project-zone-card>
        </div>
      </template>
    </recommend-organization>
  </div>
</template>

<script>
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import ProjectZoneCard from '../../components/card/ProjectZoneCard'
  import moment from 'moment'
  import { getActionUpdateKeyword } from '@/api/manage'
  import { filterObj, cloneObject } from '@/utils/util'

  export default {
    name: 'MobileProjectZone',
    components: { ProjectZoneCard, RecommendOrganization },
    data() {
      return {
        minDate: new Date(1970, 0, 1),
        date: '',
        show: false,
        data: [],
        url: '/zscq/portal/ipManage/projectLibraryList',
        ipagination: {
          current: 1,
          pageSize: 10,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        loading: {
          delay: 500,
          spinning: false
        },
        formParam: {
          releaseDate_begin: '',
          releaseDate_end: '',
          title: ''
        },
        form: {
          releaseDate_begin: '',
          releaseDate_end: '',
          title: ''
        }
      }
    },
    created() {
      this.handleSubmit()
    },
    methods: {
      handleSubmit() {
        this.ipagination.current = 1
        Object.assign(this.formParam, this.form)
        this.loadData(this.handleParam(this.formParam))
      },
      async loadData(param) {
        this.$showLoading({
          title: '加载中。。。'
        })
        const res = await getActionUpdateKeyword(this.url, param)
        if (res.success) {
          this.data = res.result.records
          this.ipagination.total = res.result.total
        } else {
          this.$notify({
            type: 'danger', message: res.message
          })
        }
        this.$cancelLoading()
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
        newParam.pageNo = that.ipagination.current
        newParam.pageSize = that.ipagination.pageSize

        newParam = filterObj(newParam)

        return newParam
      },
      formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`
      },
      onConfirm(date) {
        const [start, end] = date
        this.show = false
        this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
        this.form.releaseDate_begin = moment(date[0]).format('YYYY-MM-DD')
        this.form.releaseDate_end = moment(date[1]).format('YYYY-MM-DD')
      },
      resetDate() {
        this.$refs.myCalendar.reset()
        this.date = ''
        this.form.releaseDate_begin = ''
        this.form.releaseDate_end = ''
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";

  #mobileProjectZone {
    background-color: @main-bg-color;
    .search-head {
      background-color: #ffffff;
      margin-bottom: 10px;
      .my-btn-default {
        background-color: @main-color;
        border-color: @main-color;
      }
      padding-bottom: 10px;
    }
  }
</style>