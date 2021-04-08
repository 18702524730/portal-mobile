<template>
  <div class="seniorsearchsebe">
    <div class="seniorconditions">
      <div class="countries">
        <div class="all">
          <van-checkbox shape="square" v-model="all">全部国家和地区</van-checkbox>
        </div>
        <div class="allcountry">
          <div class="each" v-for="(item, index) in list" :key="index">
            <van-checkbox shape="square" v-model="item.ischeck" @change="dosome(item)">
                <span class="countryiconbox" v-if="item.icon"><img :src="item.icon" alt=""/></span><span style="vertical-align:middle;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block;max-width:150px;">{{ item.valueName }}</span><span style="vertical-align:middle">({{ item.value }})</span>
            </van-checkbox>
            <div style="padding-left: 30px;" v-if="item.list">
              <van-checkbox-group v-model="item.checked" @change="check(item)">
                <van-checkbox shape="square" v-for="t in item.list" :name="t.value" :key="t.value">{{ t.valueName }}</van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="tabsbtn">
          <span  @click="qiehuan('1')"  :class="{active: current === '1'}">简单检索</span>
          <span  @click="qiehuan('2')"  :class="{active: current === '2'}">高级检索</span>
          <span  @click="qiehuan('3')"  :class="{active: current === '3'}">表达式检索</span>
        </div>
        <div v-if="current === '2'" class="forms">
        <div class="forms clearfix">
          <van-cell-group>
            <van-field v-model="cobj.an" label="申请号" placeholder="请输入申请号" />
            <van-field v-model="cobj.pn" label="公开(公告)号" placeholder="请输入公开(公告)号" />
            <van-field v-model="cobj.applicantSearch" label="申请人" placeholder="请输入申请人/专利权人" />
            <van-field v-model="cobj.in" label="发明人" placeholder="请输入发明人" />
            <van-field v-model="cobj.startTime" label="申请日期" placeholder="请输入申请日期" />
            <van-field v-model="cobj.ti" label="名称" placeholder="请输入名称" />
            <van-field v-model="cobj.ab" label="摘要" placeholder="请输入摘要" />
            <van-field v-model="cobj.cl" label="权利要求" placeholder="请输入权利要求" />
            <van-field v-model="cobj.ic" label="IPC分类号" placeholder="请输入IPC分类号" />
            <van-field v-model="cobj.agentOrgSearch" label="代理机构" placeholder="请输入代理机构" />
            <van-field v-model="cobj.agentSearch" label="代理人名称" placeholder="请输入代理人名称" />
            <van-field v-model="cobj.dz" label="申请人地址" placeholder="请输入申请人地址" />
          </van-cell-group>
        </div>
        <div class="btnbox">
          <span class="confirm" @click="haschecked">确定</span>
          <span class="reset" @click="resets">重置</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { judgeState } from '@utils/util.js'
import { Toast } from 'vant'
const cityUrl = '/api/queryProvinceCity'
const condition = {
  an: null,
  pn: null,
  applicantSearch: null,
  in: null,
  cl: null,
  ab: null,
  ic: null,
  agentOrgSearch: null,
  agentSearch: null,
  ti: null,
  dz: null
}

export default {
  // inject: ['loginNotReload'],
  data() {
    return {
      sqh: false,
      helpshow: false,
      options: [],
      date1: '',
      date2: '',
      expression: '',
      selectopts: [
        'AND','OR','NOT'
      ],
      sf: [],
      'ap-province': '',
      'ap-city': '',
      hasprovince: true,
      all: true,
      label: ['普通搜索', '高级搜索'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      cities: [
        { name: '国内', key: '1' },
        { name: '国外', key: '2' }
      ],
      checkedCities: [],
      cont: '',
      cobj: { ...condition },
      ishow: false,
      current: '2',
      
      checklist: [],
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      checkedKeys: [],
      curSelectedSmallIdList: [],
      sqdate: 0,
      gkdate: 0,
      
      tabs: [
        { name: '简单检索', id: 1 },
        { name: '高级检索', id: 2 },
        { name: '检索式检索', id: 3 }
      ],
      list: [
        {
          field: 'dac',
          value: 'CN',
          valueName: '中国',
          count: 15329459,
          percent: '55.95',
          ischeck: false,
          checked: [],
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/CN.png',
          list: [
            { field: 'f-kind', value: '01', valueName: '发明专利', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '02', valueName: '实用新型', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '03', valueName: '外观设计', count: 5812932, percent: '37.92', icon: null }
          ]
        },
        {
          field: 'dac',
          value: 'US',
          valueName: '美国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/US.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'JP',
          valueName: '日本',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/JP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'KR',
          valueName: '韩国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/KR.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'EP',
          valueName: '欧专局',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/EP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'WO',
          valueName: '世界知识产权组织',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/WO.png',
          ischeck: false,
          list: null
        },
        // {
        //     field: "dac", value: "GB", valueName: "英国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/GB.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "FR", valueName: "法国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/FR.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "RU", valueName: "俄罗斯",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/RU.png",
        //     ischeck: false,
        //     list: null
        // },
        {
          field: 'dac',
          value: 'ELSE',
          valueName: '其他国家和地区',
          count: 1559,
          percent: '5.95',
          icon: null,
          ischeck: false,
          list: null
        }
      ]
      
    }
  },
  watch: {
    all() {
      this.list.forEach(item => {
        item.ischeck = this.all
        this.dosome(item)
        if (item.ischeck) {
          const arr = []
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                arr.push(it.value)
              }
            })
          }
          item.checked = arr
        } else {
          item.checked = []
        }
      })
    }
  },
  methods: {
    
    getcity() {
      this.$shttp.get(cityUrl).then(res => {
        console.log(res)
        this.options = res
      })
    },
    doshow() {
      console.log(11111)
    },
    qiehuan(num) {
      
      if (num === '1') {
        this.$router.push({ name: 'PatentSearchShiBei' })
      } 
      if (num === '3') {
        // if (!judgeState()) {
        //   this.loginNotReload()
        //   return
        // }
        this.$router.push({ name: 'ExpressionSearchShibei' })
      }
    },
    getkeys() {
      const re = []
      let type = []
      this.list.forEach(item => {
        if (item.ischeck) {
          re.push(item.value)
          if (item.checked && item.checked.length) {
            type = [...item.checked]
          }
        }
      })
      return { re, type }
    },
    dosome(it) {
      if (it.value === 'CN') {
        if (it.ischeck) {
          this.hasprovince = true
          const arr = []
          if (it['list'] && it['list'].length > 0) {
            it['list'].forEach(w => {
              arr.push(w['value'])
            })
          }
          it.checked = arr
        } else {
          this.hasprovince = false
          it.checked = []
        }
      }
    },
    haschecked() {
      const re = this.getkeys().re
      const type = this.getkeys().type
      if (this.date1) {
        this.cobj.applicationDateStart = this.totimestamp(this.date1[0])
        this.cobj.applicationDateEnd = this.totimestamp(this.date1[1])
      }
      if (this.date2) {
        this.cobj.publishDateStart = this.totimestamp(this.date2[0])
        this.cobj.publishDateEnd = this.totimestamp(this.date2[1])
      }
      if (this.sf.length) {
        if (this.sf.length === 1) {
          this.cobj['apProvince'] = this.sf[0]
        }
        if (this.sf.length === 2) {
          this.cobj['apProvince'] = this.sf[0]
          this.cobj['apCity'] = this.sf[1]
        }
      }

      const aa = this.isempty(this.cobj)
      if (aa) {
        Toast('请输入一个筛选条件')
        return
      }
      this.cobj.searchType = 2
      if (re.length) {
        const str = re.join(',')
        this.cobj.dac = str
      }
      if (type.length) {
        const strt = type.join(',')
        this.cobj['fKind'] = strt
      }
      // this.$store.dispatch('set_patent', this.cobj);
      // this.$nextTick(()=>{
      //     this.$router.push({name:'patentsearch'})
      // })
      this.$router.push({ path: '/portal/search/patent-searchlist', query: this.cobj })
      console.log(re, type)
      console.log(this.cobj)
    },
    totimestamp(t) {
      var date = new Date(t)
      return t ? date.getTime() : null
    },
    isempty(obj) {
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          if (obj[p]) {
            return false
          }
        }
      }
      return true
    },
    resets() {
      this.cobj = { ...condition }
      this.date1 = ''
      this.date2 = ''
      this.sf = []
      this.checkall()
    },
    check(it) {
      if (it['checked'].length > 0) {
        it['ischeck'] = true
        this.hasprovince = true
      } else {
        it['ischeck'] = false
        this.hasprovince = false
      }
    },
    checkall() {
      if (this.all) {
        this.hasprovince = true
        this.list.forEach(item => {
          item.ischeck = this.all
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                item.checked.push(it.value)
              } else {
                item.checked = []
              }
            })
          }
        })
      }
    },
  },
  mounted() {
    this.checkall()
    this.getcity()
  }
}
</script>

<style lang="less">
.countryiconbox {
  display: inline-block;
  width: 20px;
  height: 19px;
  padding: 2px 0;
  margin-right: 10px;
  margin-left: 5px;
  vertical-align: middle;
  img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
}
.seniorsearchsebe {
  padding: 30px 15px;
  background-color: #fff;
  font-size: 12px;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  
  .tabsbtn {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0;
    > span {
      display: inline-block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-right: 5px;
      background-color: #E9E9E9;
      color: #333;
      font-size: 14px;
      cursor: pointer;
      &.active {
        background-color: #2F72D1;
        color: #fff;
      }
    }
  }
  .popbox {
    display: none;
    position: absolute;
    top: 44px;
    width: 100%;
    padding: 15px 10px;
    border-radius: 3px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 0 4px #ccc;
    color: #666;
    z-index: 9;
    > p {
      line-height: 20px;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.seniorconditions {
  .countries {
    width: 100%;
    height: 360px;
    border: 1px solid #eee;
    .van-checkbox {
      margin: 5px 0;
    }
    .all {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .allcountry {
      padding: 10px;
    }
    .each {
      &:first-child {
        border-bottom: 1px solid #eee;
      }
    }
  }
  .forms {
    width: 100%;
  }
}
.btnbox {
  text-align: center;
  padding-top: 30px;
  span {
    display: inline-block;
    width: 120px;
    height: 30px;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border-radius: 4px;
  }
  .confirm {
    background-color: #379dea;
    color: #fff;
    margin-right: 30px;
  }
  .reset {
    border: 1px solid #eee;
    border-radius: 2px;
    color: #999;
  }
}
</style>
