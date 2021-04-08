<template>
  <div id="mobileProfessorBank">
    <div class="professor-form">
      <van-field name="radio" label="类型：" class="my-select">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="zscqType" @click="radioBtn">知识产权专家</van-radio>
            <van-radio name="zyjsType" @click="radioBtn">专业技术专家</van-radio>
          </van-radio-group>

          <!--<van-button @click="cleanBtn" size="mini">重置</van-button>-->
        </template>
      </van-field>
      <van-row v-if="radio !== '' && dictList[`${radio}`]" class="my-form-card">
        <van-button v-for="(item,index) in dictList[`${radio}`].dictOptions" :key="index"
                    @click="clickBtn(radio,item.value)"
                    :class="[filter.type === item.value?'van-button-selected':'']">
          {{item.text}}
        </van-button>
      </van-row>
      <van-field name="radio" label="名称：" class="my-search">
        <template #input>
          <van-search v-model="filter.keyword" placeholder="输入关键字搜索..."
                      @search="onSearch"
                      @clear="onCancel" show-action shape="round">
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </template>
      </van-field>
    </div>

    <div class="professor-table">
      <recommend-organization title="" :have-more="false" :pagination="ipagination" :have-page="data.length !== 0">
        <template slot="content">
          <van-empty description="没有内容" v-if="data.length === 0"/>
          <div class="container my-content" v-else>
            <van-row type="flex" justify="space-between" v-for="(innerItem,innerIndex) in data"
                     :key="innerIndex"
                     class="my-class-row">
              <professor-card
                v-for="(item,index) in innerItem"
                :item="item"
                :key="item.id">
              </professor-card>
            </van-row>
          </div>
        </template>
      </recommend-organization>
    </div>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import RecommendOrganization from '../../components/general/RecommendOrganization'
  import ProfessorCard from '../../components/card/ProfessorCard'
  import { filterObj, cloneObject, arrayToStringObj, changeArr } from '@/utils/util'

  export default {
    name: 'MobileProfessorBank',
    components: { ProfessorCard, RecommendOrganization },
    data() {
      return {
        filter: {
          type: '',
          kwText: ''
        },
        dictList: {
          zscqType: {
            dictCode: 'zscq_expert',
            dictOptions: []
          },
          zyjsType: {
            dictCode: 'zyjs_expert',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        radio: '',


        url: '/zscq/portal/expertPage',
        ipagination: {
          current: 1,
          pageSize: 12,
          showQuickJumper: true,
          total: 0,
          onChange: page => {
            this.handleTableChange(page)
          }
        },
        data: [],
        formParam: {},
        selectRadioType: ''
      }
    },
    created() {
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
      this.handleTableChange(1)
    },
    methods: {
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            item.dictOptions = res.result
          }
        })
      },
      onSearch() {
        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
      },
      onCancel() {
        this.filter.keyword = ''
        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
      },
      clickBtn(radio, value) {
        if (this.filter.type === value) {
          this.filter.type = ''
        } else {
          this.filter.type = value
        }
        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
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
      handleTableChange(page) {
        this.ipagination.current = page
        const param = this.handleParam(this.formParam)
        this.loadData(param)
      },
      async loadData(param) {
        if (!this.url) {
          this.$notify({ type: 'danger', message: 'url有问题!' })
          return
        }
        const res = await getActionUpdateKeyword(this.url, param)
        if (res.success) {
          this.data = changeArr(res.result.records, 2)
          this.ipagination.total = res.result.total
        } else {
          this.$notify({ type: 'danger', message: res.message })
        }
        this.$cancelLoading()
      },
      cleanBtn() {
        this.radio = ''
        this.filter.type = ''
        Object.assign(this.formParam, this.filter)
        this.handleTableChange(1)
      },
      radioBtn() {
        if (this.selectRadioType === '') {
          this.selectRadioType = this.radio
        } else if (this.selectRadioType === this.radio) {
          this.selectRadioType = ''
          this.filter.type = ''
          this.radio = ''

          Object.assign(this.formParam, this.filter)
          this.handleTableChange(1)
        } else {
          this.selectRadioType = this.radio
        }

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../components/index";
  @import "../../components/form/form";

  #mobileProfessorBank {
    .professor-form {
      .van-search {
        padding: 0;
        width: 100%;
      }
      .van-search__content {
        background-color: #ffffff;
        border: 2Px solid #f7f8fa;
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
      .van-search__action {
        color: @main-font-color;
        font-size: 12px;
      }
      .my-search {
        /deep/ .van-field__control--custom {
          height: 0.64rem
        }
      }
    }

    .my-class-row {
      padding-bottom: 32/2px;
    }
    .my-content {
      padding-top: 32/2px;
    }

    .my-form-card {
      padding-top: 0;
      .van-button {
        margin-bottom: 0;
        margin: 5px;
      }
    }
  }
</style>