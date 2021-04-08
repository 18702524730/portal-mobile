<template>
  <div id="serviceProjectForm">

    <van-row class="my-form-card">
      <h3>服务分类</h3>
      <van-cell title="选择服务分类" @click="showServicePopup" is-link/>

      <van-row v-if="selectItems.length > 0">
        <van-tag type="primary">{{selectItems[selectItems.length - 1].text}}</van-tag>
      </van-row>
    </van-row>

    <van-row class="my-form-card">
      <h3>小微企业服务券</h3>
      <van-checkbox v-model="filter.isUseVoucher" shape="square">可用</van-checkbox>
    </van-row>

    <van-row class="my-form-card">
      <h3>交易价格</h3>
      <van-button v-for="(item,index) in dictList.pantentMoney.dictOptions" :key="index"
                  @click="clickBtn('pantentMoney',item.value)"
                  :class="[filter.pantentMoney === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>
    <van-search v-model="filter.keyword" placeholder="输入关键字搜索..."
                @search="onSearch"
                @clear="onCancel">

    </van-search>

    <service-popup ref="myService" :items="dictList.serviceTypeIds.dictOptions"
                   @func="transmitServiceData" :already-data="alreadyData"></service-popup>
  </div>
</template>

<script>
  import ServicePopup from '../popup/ServicePopup'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'ServiceProjectForm',
    components: { ServicePopup },
    props: {
      alreadyData: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        filter: {
          serviceTypeIds: '',
          pantentMoney: '',
          keyword: null,
          isUseVoucher: false
        },
        dictList: {
          pantentMoney: {
            dictCode: 'pro_amout',
            dictOptions: []
          },
          serviceTypeIds: {
            dictCode: 'serviceTypeTree',
            dictOptions: []
          }
        },
        dictUrl: '/zscq/portal/getDictInfo',
        selectItems: [],
        value: ''
      }
    },
    created() {
      this.selectItems = JSON.parse(JSON.stringify(this.alreadyData))
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
    },
    methods: {
      clickBtn(type, id) {
        if (this.filter[`${type}`] === id) {
          this.filter[`${type}`] = ''
        } else {
          this.filter[`${type}`] = id
        }
      },
      showServicePopup() {
        this.$refs.myService.showPopup()
      },
      initDictData(item) {
        // 根据字典Code, 初始化字典数组
        const param = { code: item.dictCode }
        getActionUpdateKeyword(this.dictUrl, param).then((res) => {
          if (res.success) {
            item.dictOptions = res.result
          }
        })
      },
      transmitServiceData(items) {
        this.selectItems = items
        const length = this.selectItems.length
        if (length > 0) {
          this.filter.serviceTypeIds = this.selectItems[length - 1].id
        } else {
          this.filter.serviceTypeIds = ''
        }
      },
      onSearch() {
      },
      onCancel() {
        this.filter.keyword = ''
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";
  @import "form";

  #serviceProjectForm {
    .van-checkbox {
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
</style>