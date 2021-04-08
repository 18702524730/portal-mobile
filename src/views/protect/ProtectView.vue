<template>
  <div id="protectView">
    <div class="my-main-content">
      <van-collapse v-model="activeName" accordion class="my-collapse" v-for="(item,index) in data"
                    :key="item.type">
        <van-collapse-item :title="item.typeName" :name="item.type">
          <van-cell :title="innerItem.title" is-link v-for="(innerItem,innerIndex) in item.childData"
                    :key="innerItem.id" @click="clickDetails(item.typeName, innerItem)"/>
        </van-collapse-item>
      </van-collapse>
    </div>
    <help-center-details ref="helpDetails"></help-center-details>
  </div>

</template>

<script>
  import HelpCenterDetails from '../../components/details/HelpCenterDetails'
  import { getActionUpdateKeyword } from '@/api/manage'

  export default {
    name: 'ProtectView',
    components: { HelpCenterDetails },
    data() {
      return {
        url: '/zscq/portal/safeguarding/safeguardingRightList',
        type: '',
        data: [],
        item: {},
        addUrl: '/zscq/portal/safeguarding/browseStatistics',
        result: 0,

        loading: false,
        allData: [],
        activeName: ""
      }
    },
    methods: {
      async clickDetails(title, item){
        this.$refs.helpDetails.showPopup(title, item)
        const res = await getActionUpdateKeyword(this.addUrl, { id: item.id })
        if (res.success) {
          this.result = res.result
        }
      },
      async loadData() {
        this.$showLoading({
          title: '加载中。。。'
        })
        if (this.allData.length > 0) {
          const allObj = this.allData.filter(item => item.module === this.type)[0]
          this.data = allObj.data
          this.item = {}
        } else {
          const res = await getActionUpdateKeyword(this.url)
          if (res.success) {
            this.allData = res.result
            const resObj = res.result.filter(item => item.module === this.type)[0]
            this.data = resObj.data
            this.item = {}
          } else {
            this.$notify({ type: 'danger', message: res.message })
          }
        }
        if (this.data.length > 0){
          this.activeName = this.data[0].type
          console.info(this.activeName)
          console.info('hahahaha')
        }
        this.$cancelLoading()
      }
    },
    watch: {
      '$route': {
        handler(to, from) {
          switch (to.name) {
            case 'MobileNewFastActivist':
              this.type = '1'
              break
            case 'MobileMultDisputeResolution':
              this.type = '2'
              break
            case 'MobileActivistNetwork':
              this.type = '3'
              break
            case 'MobileOverseasRights':
              this.type = '4'
              break
            case 'MobileNewActivistResources':
              this.type = '5'
              break
          }
          this.loadData()
        },
        immediate: true
      }
    }

  }
</script>

<style scoped lang="less">
  #protectView {

  }
</style>