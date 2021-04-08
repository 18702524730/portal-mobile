<template>
    <div class="sebecomWidth">
      <div class="ordinarypsearch">
          <div class="logobox">
              <div class="logo">
                  <img src="@assets/img/sb.png" alt="">
              </div>
              <div class="textbox">
                商标检索
              </div>
          </div>
        <div class="search-box">
            <div class="left-search">
                <div class="btnboxs">
                    <input type="text" v-model="cont" placeholder="请输入要查询的商标名称、申请号等" >
                    <span @click="onSearch">搜索</span>
                </div>
                <div class="shili">
                    <div class="fl">示例</div>
                    <div class="shiliright">
                        <div>商标名称 银鹭</div>
                        <div>申请号  34674512</div>
                        <div>申请人  厦门银鹭食品集团有限公司 </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>  
</template>

<script>
import { Toast } from 'vant'
import { judgeState } from '@/utils/util'
export default {
    inject: ['headLogin'],
    data() {
        return {
            cont: ''
        }
    },
    mounted() {
    },
    methods: {
        onSearch() {
            if (!this.cont) {
                Toast('请输入要查询的商标名称、申请号等')
                return
            }
            if (!judgeState()) {
                const obj = { name: 'TrademarkSearchShiBei' }
                const obk = {
                'query': {
                    q: this.cont
                }
                }
                this.headLogin('goto', obj ,obk)
                return
            }
            const re = {}
            re.q = this.cont
            this.$router.push({ name: 'TrademarkSearchShiBei', query: re })
        }
    }
}
</script>

<style lang ='less' scoped>
.sebecomWidth {
    font-size: 12px;
    .fl {
        float: left;
    }
    .shili {
        padding-top: 15px;
        width:100%;
        color: #ccc;
        font-size: 12px;
        background-color: #fff;
    }
    .shiliright {
        margin-left: 50px;
    }
    .color-red {
        color: red;
    }
    .ordinarypsearch {
        padding: 80px 15px 80px;
        min-height: 300px;
        background-color: #fff; 
        .logobox {
            width: 150px;
            margin: 0 auto 80px;
            text-align: center;
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
    .left-search {
        position: relative;
        width: 100%;
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
}
</style>