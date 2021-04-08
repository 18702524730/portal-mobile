<template>
  <div class="sebecomWidth">
    <div class="ordinarypsearch">
      <div class="logobox">
        <div class="logo">
          <img src="@assets/img/zl.png" alt="" />
        </div>
        <div class="textbox">
          专利检索
        </div>
      </div>
      <div class="search-box">
        <!-- <div class="senior">
          <span  @click="tosenior" class="jiansuo">高级搜索</span><span @click="toexpression" class="bdsjiansuo">表达式检索 <span class="new">NEW <span class="sanjiao"></span></span></span>
        </div> -->
        <div class="left-search">
          <div class="btnboxs">
            <input type="text" v-model="cont" placeholder="请输入要查询的内容" >
            <span @click="onSearch">搜索</span>
          </div>
          <div class="areas">
            <van-checkbox-group v-model="checkedCities" direction="horizontal">
              <van-checkbox :name="it.value" shape="square" v-for="it in options" :key="it.value">{{it.label}}</van-checkbox>
            </van-checkbox-group>
          </div>
          <div class="shili">
            <div class="fl">示例</div>
            <div class="shiliright">
              <div>申请号 cn201210190399 或 cn201210190399.5</div>
              <div>公开号 cn103483447 或 WO2019011331</div>
              <div>申请人 厦门大学</div>
              <div>关键词 hpv</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { judgeState } from '@/utils/util'
import { Toast } from 'vant'
export default {
  inject: ['headLogin'],
  data() {
    return {
      checkedCities: ['cn', 'docdb'],
      options: [
        { label: '国内', value: 'cn' },
        { label: '国外及港澳台地区', value: 'docdb' }
      ],
      cont: ''
    }
  },
  mounted() {
  },
  methods: {
    onSearch() {
      if (!this.cont) {
        Toast('请输入要查询的内容')
        return
      }
      if (!judgeState()) {
        const obj = { name: 'PatentSearchList' }
        const obk = {
          'query': {
            all: this.cont,
            searchType: 1,
            category: this.checkedCities.length === 0 ? '' : this.checkedCities.length === 2 ? '' : this.checkedCities[0]
          }
        }
        this.headLogin('goto', obj ,obk)
        return
      }
      const re = {}
      re.all = this.cont
      re.searchType = 1
      if (this.checkedCities.length === 0 || this.checkedCities.length === 2) {
        re.category = ''
      } else {
        re.category = this.checkedCities[0]
      }
      console.log(re)
      this.$router.push({ name: 'PatentSearchList', query: re })
    },
    tosenior() {
      this.$router.push({ name: 'SeniorSearchShibei' })
    },
    toexpression() {
      this.$router.push({ name: 'ExpressionSearchShibei' })
    }
  }
}
</script>

<style lang="less" scoped>
.sebecomWidth {
  .fl {
    float: left;
  }
  .shili {
    width: 100%;
    color: #ccc;
    font-size: 12px;
    background-color: #fff;
  }
  .shiliright {
    margin-left: 40px;
  }
  .color-red {
    color: red;
  }
  .ordinarypsearch {
    padding: 80px 15px 80px;
    background-color: #fff;
    min-height: 300px;
    .logobox {
      width: 150px;
      margin: 0 auto 80px;
      
      overflow: hidden;
      p {
        font-size: 20px;
        color: #001833;
        /* text-align: center; */
        line-height: 26px;
        font-weight: 600;
      }
      .textbox {
        float: left;
        padding-left: 15px;
        line-height: 34px;
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }
    }
    .logo {
      float: left;
      width: 34px;
      height: 34px;
      > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .search-box {
    width: 100%;
    .senior {
      height: 32px;
      margin: 0;
      line-height: 32px;
      color: #1890ff;
      cursor: pointer;
      font-size: 16px;
      .jiansuo {
        margin-right: 20px;
      }
      .bdsjiansuo {
        position: relative;
        .new {
          position: absolute;
          right: 0;
          top: -32px;
          width: 60px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          color: #fff;
          font-size: 16px;
          background-color: #f66;
          border-radius: 2px;
          .sanjiao {
            position: absolute;
            left: 26px;
            bottom: -6px;
            width: 0;
            height: 0;
            overflow: hidden;
            border-width: 6px 6px 0;
            border-color: #f66 transparent;
            border-style: solid dashed;
          }
        }
      }
    }
  }
  .left-search {
    position: relative;
    width: 100%;
    .btnboxs {
      display: flex;
      width: 100%;
      > input {
        box-sizing: border-box;
        flex: 1;
        height: 40px;
        padding: 5px 10px;
        border: 1px solid #f5f5f5;
        border-radius: 2px;
        font-size: 14px;
        line-height: 30px;
      }
      > span {
        display: inline-block;
        width: 80px;
        height: 40px;
        background-color: #1890ff;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
      }
    }
    
  }
  .areas {
    width: 100%;
    padding-top: 10px;
    font-size: 12px;
    margin-bottom: 10px;
  }
}
</style>
