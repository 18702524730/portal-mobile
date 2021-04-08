<template>
  <div id="geographicForm">
    <van-search v-model="filter.keyword" placeholder="请输入搜索关键词"/>

    <van-row class="my-form-card">
      <h3>类别</h3>

      <van-button v-for="(item,index) in dictList.productNature.dictOptions" :key="index"
                  @click="clickBtn('productNature',item.value,false)"
                  :class="[filter.productNature === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>

    <van-row class="my-form-card">
      <h3>国家</h3>

      <van-button v-for="(item,index) in dictList.countryType.dictOptions" :key="index"
                  @click="clickBtn('countryType',item.value)"
                  :class="[filter.countryType === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>

    <van-row class="my-form-card">
      <h3>类目</h3>

      <van-button v-for="(item,index) in dictList.type.dictOptions" :key="index"
                  @click="clickBtn('type',item.value)"
                  :class="[filter.type === item.value?'van-button-selected':'']">
        {{item.text}}
      </van-button>
    </van-row>

    <van-row class="my-form-card" v-show="filter.countryType === '1'">
      <h3>地域</h3>

      <van-row>
        <van-tag type="primary" v-for="(item,index) in activeItems" :key="item.code" @close="close(item)" closeable>
          {{item.name}}
        </van-tag>
      </van-row>

      <van-cell title="选择地点" @click="showAreaPopup" id="my-calendar" is-link/>

    </van-row>


    <van-popup
      get-container="#app"
      position="bottom"
      round
      v-model="show"
      @close="closePopup">
      <van-area
        title="选择地域"
        :area-list="dictList.area.dictOptions"
        :columns-placeholder="['请选择', '请选择', '请选择']"
        @confirm="confirmArea"
        @cancel="cancelArea"
        visible-item-count="7"
        ref="myArea"
      />
    </van-popup>
  </div>
</template>

<script>
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'GeographicForm',
    components: {},
    data() {
      return {
        filter: {
          productNature: '1',
          countryType: '',
          type: '',
          keyword: null,
          area: ''
        },
        dictList: {
          productNature: {
            dictCode: 'product_nature',
            dictOptions: []
          },
          countryType: {
            dictCode: 'country_type',
            dictOptions: []
          },
          type: {
            dictCode: 'geo_indication_type',
            dictOptions: []
          },
          area: {
            dictCode: 'threeLocationSameLevel',
            dictOptions: {}
          }

        },
        dictUrl: '/zscq/portal/getDictInfo',

        allLocation: [],
        activeItems: [],
        areaOptions: [],
        show: false
      }
    },
    created() {
      for (const item in this.dictList) {
        this.initDictData(this.dictList[item])
      }
    },
    methods: {
      close(item) {
        this.activeItems = this.activeItems.filter(a => a.code !== item.code)
        this.transmitData()
      },
      closePopup() {
        this.$refs.myArea.reset()
      },
      cancelArea() {
        this.$refs.myArea.reset()
        this.show = false
      },
      confirmArea(arr) {
        const selectArr = []
        for (const a of arr) {
          if (a) {
            if (a.code) {
              selectArr.push(a)
            }
          }
        }
        if (selectArr.length > 0) {
          this.activeItems.push(selectArr[selectArr.length - 1])
        }
        this.transmitData()
        this.cancelArea()
      },
      showAreaPopup() {
        this.show = true
        // this.$refs.myArea.showPopup()
      },
      transmitData() {
        const arr = this.activeItems.map(item => item.code)
        this.filter.area = arr.join(',')
      },
      clickBtn(type, id, canClean = true) {
        if (this.filter[`${type}`] === id && canClean) {
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
            console.info(res.result)
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";
  @import "form";

  #geographicForm {
    .van-search {
      margin-bottom: 10px;
    }
  }
</style>