<template>
<div class="sebecomWidth">
      <div class="ordinarypsearch">
          <div class="logobox">
              <div class="logo">
                  <img src="@assets/img/ws.png" alt="">
              </div>
              <div class="textbox">
                    <p>法律文书检索</p>
              </div>
          </div>
        <div class="search-boxs">
            <div class="lawtabbox">
                <span :class="{ active: type === '2' }" @click="type = '2'">复审无效</span><span @click="type = '1'" :class="{ active: type === '1' }">裁判文书</span>
            </div>
            <div class="left-search">
                <div class="btnboxs">
                    <input type="text" v-model="cont" placeholder="请输入要查询的专利申请号" >
                    <span @click="onSearch">搜索</span>
                </div>
                <div class="shili">
                    <div>示例： 200930172778</div>
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
            type: '2',
            cont: ''
        }
    },
    mounted() {
    },
    methods: {
        onSearch(val) {
            
            if (!this.cont) {
                Toast('请输入要查询的专利申请号')
                return
            }
            if (!judgeState()) {
                const obj = { name: 'LawSearchList' }
                const obk = {
                    'query': {
                        applicationDocNum: this.cont,
                        type: this.type === "复审无效" ? 2 : 1
                    }
                }
                this.headLogin('goto', obj,obk)
                return
            }
            const re = {}
            re.applicationDocNum = this.cont
            re.type = this.type
            this.$router.push({ name: 'LawSearchList', query: re })
        }
    }
}
</script>

<style lang ='less'>
.sebecomWidth {
    .fl {
        float: left;
    }
    p {
        padding: 0;
        margin: 0
    }
    .ordinarypsearch {
        padding: 80px 15px;
        min-height: 300px;
        background-color: #fff; 
        .logobox {
            width: 200px;
            margin: 0 auto 80px;
            text-align: center;
            p {
                font-size: 20px;
                color: #001833;
                /* text-align: center; */
                line-height: 34px;
                font-weight: 600;
            }
            .textbox {
                float: left;
                padding-left: 15px;
                line-height: 34px;
                font-size: 20px;
                font-weight: bold;
                color: #000
            }
        }
        .logo {
            float: left;
            width: 34px;
            height: 34px;
            >img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    .lawtabbox {
        font-size: 0;
        > span {
            display: inline-block;
            width: 75px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background-color: #f5f5f5;
            color: #666;
            font-size: 14px;
            &.active {
                background-color: #1890ff;
                color: #fff;
            }
        }
    }
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
    .shili {
        padding-top: 10px;
        font-size: 12px;
        color: #ccc;
    }
}

</style>