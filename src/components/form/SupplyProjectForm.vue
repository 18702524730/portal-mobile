<template>
  <div id="supplyProjectForm">
    <van-row class="my-form-card">
      <h3>交易类别</h3>
      <van-button v-for="(item,index) in dictList.supplyRequirementType.dictOptions" :key="index"
                  @click="clickType(item.value)"
                  :class="[filter.supplyRequirementType === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>

    <van-row class="my-form-card">
      <h3>所属行业</h3>
      <van-cell title="选择所属行业" @click="showIndustryPopup" id="my-calendar" is-link/>

      <van-row v-if="selectItems.length > 0">
        <van-tag type="primary">{{selectItems[selectItems.length - 1].text}}</van-tag>
      </van-row>
    </van-row>

    <van-row class="my-form-card">
      <h3>项目地点</h3>
      <van-cell title="选择地点" @click="showAreaPopup" id="my-calendar" is-link/>

      <van-row>
        <van-tag type="primary" v-for="(item,index) in activeItems" :key="item.id">{{item.text}}</van-tag>
      </van-row>
    </van-row>

    <van-row class="my-form-card">
      <h3>项目类型</h3>
      <van-button v-for="(item,index) in dictList.projectType.dictOptions" :key="index"
                  @click="clickBtn('projectType',item.value)"
                  :class="[filter.projectType === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>

    <van-row class="my-form-card">
      <h3>意向运营方式</h3>
      <van-button v-for="(item,index) in dictList.intendedOperationMode.dictOptions" :key="index"
                  @click="clickBtn('intendedOperationMode',item.value)"
                  :class="[filter.intendedOperationMode === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>

    <van-row class="my-form-card">
      <h3>交易价格</h3>
      <van-button v-for="(item,index) in dictList.pantentMoney.dictOptions" :key="index"
                  @click="clickBtn('pantentMoney',item.value)"
                  :class="[filter.pantentMoney === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>

    <van-row class="my-form-card">
      <h3>发布时间</h3>
      <van-button v-for="(item,index) in dictList.publishDateType.dictOptions" :key="index"
                  @click="clickBtn('publishDateType',item.value)"
                  :class="[filter.publishDateType === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>

      <van-cell title="自定义" :value="date" @click="onDisplay" id="my-calendar" is-link/>
      <van-row style="text-align: end">
        <van-button size="mini" class="my-btn-default" @click="resetDate">重置日期</van-button>
      </van-row>
      <van-search v-model="filter.keyword" placeholder="输入关键字搜索..."
                  @search="onSearch"
                  @clear="onCancel">
        <!--<template #action>-->
        <!--<div @click="onSearch">搜索</div>-->
        <!--</template>-->
      </van-search>

    </van-row>

    <van-calendar
      v-model="dateShow"
      type="range"
      @confirm="onConfirm"
      get-container="#app"
      :min-date="minDate"
      ref="myCalendar"
    />

    <area-popup :items="dictList.location.dictOptions" ref="myArea" :all-items="allLocation"
                @func="transmitData"></area-popup>

    <industry-popup :items="dictList.belongIndustry.dictOptions" ref="myIndustry"
                    @func="transmitIndustryData"></industry-popup>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'
  import moment from 'moment'
  import AreaPopup from '../popup/AreaPopup'
  import IndustryPopup from '../popup/IndustryPopup'

  export default {
    name: 'SupplyProjectForm',
    components: { IndustryPopup, AreaPopup },
    props: {
      demandOrSupply: {
        type: String,
        default: 'supply'
      }
    },
    data() {
      return {
        minDate: new Date(1970, 0, 1),
        filter: {
          supplyRequirementType: '1',
          belongIndustry: '',
          madeAreaCode: '',
          projectMaturity: '',
          projectType: '',
          intendedOperationMode: '',
          pantentMoney: '',
          publishDateType: '',
          keyword: null,
          startDate: '',
          endDate: ''
        },
        dictList: {
          supplyRequirementType: {
            dictCode: 'supply_type',
            dictOptions: []
          },
          belongIndustry: {
            dictCode: 'belong_industry',
            dictOptions: []
          },
          location: {
            dictCode: 'location',
            dictOptions: []
          },
          projectMaturity: {
            dictCode: 'pro_maturity',
            dictOptions: []
          },
          projectType: {
            dictCode: 'pro_type',
            dictOptions: []
          },
          intendedOperationMode: {
            dictCode: 'intended_operation_mode',
            dictOptions: []
          },
          pantentMoney: {
            dictCode: 'pro_amout',
            dictOptions: []
          },
          publishDateType: {
            dictCode: 'publish_time_type',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',

        date: '',
        dateShow: false,
        value: '',

        allLocation: [],
        activeItems: [],
        selectItems: []
      }
    },
    created() {
      if (this.demandOrSupply === 'demand') {
        this.dictList.supplyRequirementType.dictCode = 'requirement_type'
        this.filter.supplyRequirementType = '4'
      }
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
    },
    methods: {

      showIndustryPopup() {
        this.$refs.myIndustry.showPopup()
      },
      showAreaPopup() {
        this.$refs.myArea.showPopup()
      },
      transmitData(items) {
        this.activeItems = items
        const arr = this.activeItems.map(item => item.id)
        this.filter.madeAreaCode = arr.join(',')
      },
      transmitIndustryData(items) {
        this.selectItems = items
        const length = this.selectItems.length
        if (length > 0) {
          this.filter.belongIndustry = this.selectItems[length - 1].id
        } else {
          this.filter.belongIndustry = ''
        }
        console.info('哇哈哈哈哈')
      },
      clickType(id) {
        // 路由跳转
        let name = ''
        switch (id) {
          case '1':
            name = 'MobileSupplyCenter'
            break
          case '2':
            name = 'MobileSupplyPatentCenter'
            break
          case '3':
            name = 'MobileSupplyBrandCenter'
            break
          case '4':
            name = 'MobileDemandCenter'
            break
          case '5':
            name = 'MobileDemandPatentCenter'
            break
          case '6':
            name = 'MobileDemandBrandCenter'
            break
        }
        if (id === this.filter.supplyRequirementType) {
          return
        }
        this.$router.push({ name: name })
      },
      clickBtn(type, id) {
        if (this.filter[`${type}`] === id) {
          this.filter[`${type}`] = ''
        } else {
          this.filter[`${type}`] = id
        }
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            item.dictOptions = res.result
            if (item.dictCode === 'location') {
              for (const a of item.dictOptions) {
                if (a.children.length === 0) {
                  a.children = [a]
                }
                this.allLocation = [...this.allLocation, ...a.children]
              }
            }
          }
        })
      },
      onConfirm(date) {
        const [start, end] = date
        this.dateShow = false
        this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
        this.filter.startDate = moment(date[0]).format('YYYY-MM-DD')
        this.filter.endDate = moment(date[1]).format('YYYY-MM-DD')
        this.filter.publishDateType = ''
      },
      onDisplay() {
        this.dateShow = true
      },
      formatDate(date) {
        return `${date.getFullYear().toString().slice(2,4)}/${date.getMonth() + 1}/${date.getDate()}`
      },
      resetDate() {
        this.$refs.myCalendar.reset()
        this.date = ''
        this.filter.startDate = ''
        this.filter.endDate = ''
      },
      onSearch() {
      },
      onCancel() {
        this.filter.keyword = ''
      }
    },
    watch: {
      filter: {
        handler(newData, oldData) {
          if (newData.publishDateType !== '') {
            this.resetDate()
          }

        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";
  @import "form";

  #supplyProjectForm {

  }
</style>