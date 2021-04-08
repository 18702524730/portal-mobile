<template>
    <div class="patentevaluationpagesebe">
        <div class="searchbgbox">
            <div class="searchbox">
                <h3>专利价值评价系统</h3>
                <div class="btnboxs">
                    <input type="text" v-model="patentNo" placeholder="请输入专利公开号" >
                    <span @click="tolist">搜索</span>
                </div>
                <div v-if="keyFormatError" class="errbox">
                    请输入正确的专利公开号（格式："CN"+数字）
                </div>
            </div>
        </div>
        <ul class="intrnav">
            <li v-for="item in tabs" :key="item.id" :class="{ active: item.id === current }" @click="changenav(item)">{{item.name}}</li>
        </ul>
        <div class="navcont" :class="{ bga: current === 1, bgb: current === 2, bgc: current === 3 }">
            <div v-if="current === item.id" v-for="item in tabs" :key="item.id" >
                <!-- <h2>{{item.name}}</h2>
                <div class="borderbox"></div> -->
                <p>{{item.cont}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                { id: 1, name: '大数据', cont: '以数据分析为基础的评价理念，高度整合全文、审查、诉讼等8类专利信息，客观、公正评估专利价值' },
                { id: 2, name: '专业化', cont: '最专业的评价体系，综合数十类指标，全面考虑专利法律、技术、市场等多方面价值' },
                { id: 3, name: '智能化', cont: '全自动的专利价值评估，权利语义智能解析' }
            ],
            current: 1,
            patentNo: '',
            keyFormatError: false
        }
    },
    methods: {
        hotsearch(it) {
            this.cname = it.name
            this.tolist()
        },
        tolist() {
            this.keyFormatError = false
            if (!this.patentNo || !(/^[cC][nN][0-9]+$/.test(this.patentNo))) {
               this.keyFormatError = true
            }
            if (!this.keyFormatError) {
                localStorage.removeItem('patentEvaluationNum')
                this.$router.push({ name: 'PatentEvaluationInfo', params: { num: this.patentNo } })
            }
            
        },
        changenav(it) {
            this.current = it.id
        }
    }
}
</script>

<style lang="less">
.patentevaluationpagesebe {
    font-size: 14px;
    ul,
    h2 {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .searchbgbox {
        height: 150px;
        background: url('../../../assets/img/pjbg.png') center center no-repeat;
        background-size: auto 100%;
        background-color: #f5f5f5;
    }
    .searchbox {
        padding: 15px;
        > h3 {
            font-size: 16px;
            font-weight: normal;
            color: #333;
            margin-bottom: 15px;
            text-align: center;
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
        .bluebtn {
            background-color: #3073D2;
            border: none;
            border-radius: 0;
            color: #fff;
            width: 110px;
            height: 70px;
            font-size: 25px;
        }
        .errbox {
            padding-top: 10px;
            font-size: 12px;
            color: #f00;
        }
    }
    .intrnav {
        display: flex;
        padding: 5px 15px;
        justify-content: space-between;
        > li {
            font-size: 16px;
            color: #999;
            font-weight: normal;
            cursor: pointer;
            line-height: 28px;
            padding-bottom: 5px;
            &.active {
                color: #3073D2;
                border-bottom: 2px solid #3073D2;
            }
        }
    }
    .navcont {
        height: 100px;
        padding: 15px;
        background-size: auto 100%;
        background-position: right center;
        background-repeat: no-repeat;
        h2 {
            font-size: 20px;
            font-weight: normal;
            color: #333;
            line-height: 22px;
            margin-bottom: 15px;
        }
        .borderbox {
            width: 15px;
            margin-bottom: 15px;
            border-bottom: 5px solid #333;
        }
        p {
            width: 225px;
            font-size: 14px;
            line-height: 22px;
            color: #333;
        }
    }
    .bga {
        background-image: url('../../../assets/img/a.png')
    }
    .bgb {
        background-image: url('../../../assets/img/b.png')
    }
    .bgc {
        background-image: url('../../../assets/img/c.png')
    }
}
</style>
