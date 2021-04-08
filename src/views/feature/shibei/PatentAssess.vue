<template>
    <div class="patentassessmentsebe">
        <div class="searchbgbox">
            <div class="searchbox">
                <div class="intrbox">
                    <h2>专利资产评估系统</h2>
                    <p>本评估系统基于《收益现值评估法》结合专利价值评估为依据设计的。</p>
                    <p>运用货币时间值的概念，将在一定年限内归属于专利技术创造的年净收益按照一定的收益率折现成基础现值。辅以专利价值评价体系从技术、法律、市场三大维度，进行科学、合理、公正的推算专利整体剩余价值。</p>
                    <div class="imgbox">

                    </div>
                </div>
                <div class="inputbox">
                    <h3>专利资产评估</h3>
                    <p>专利号</p>
                    <div class="formitembox">
                        <input placeholder="请输入专利号、申请号、公开号" v-model="patentNo" />
                        <div class="errbox" v-if="keyFormatError">
                            请输入正确的专利公开号（格式："CN"+数字）
                        </div>
                    </div>
                    <p>年净收益（万元）</p>
                    <div class="formitembox">
                        <input placeholder="请输入该专利近一年创造的年净收益" v-model="patentCount" />
                        <div class="errbox" v-if="nocount">
                            请输入年净收益（数字）
                        </div>
                    </div>
                    <div class="calacbtn" @click="patentassess">开始计算</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            patentNo: '',
            nocount: false,
            patentCount: '',
            keyFormatError: false
        }
    },
    
    methods: {
        patentassess() {
            this.keyFormatError = false
            this.nocount = false
            if (!this.patentNo || !(/^[cC][nN][0-9]+$/.test(this.patentNo))) {
               this.keyFormatError = true
            }
            if (!this.patentCount || !(/(^\d+$)|(^\d+\.\d+$)/.test(this.patentCount))) {
               this.nocount = true
            }
            if (!this.keyFormatError && !this.nocount) {
                // localStorage.setItem('patentAssessNum', this.patentNo)
                this.$router.push({ name: 'PatentAssessInfo', params: { num: this.patentNo, count: this.patentCount } })
            }
            
        }
    }
}
</script>

<style lang="less">
.patentassessmentsebe {
    ul,
    h2,
    h3 {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .searchbgbox {
        background-color: #f5f5f5;
        .intrbox {
            color: #333;
            padding: 15px 15px;
            margin-bottom: 15px;
            // background-color: #fff;
            > h2 {
                margin-bottom: 15px;
                font-size:18px;
                font-weight:500;
                line-height:28px;
            }
            > p {
                font-size: 14px;
                line-height: 20px;
                margin-bottom: 9px;
            }
            .imgbox {
                height: 100px;
                width: 100%;
                background: url('../../../assets/img/zic.png') center center no-repeat;
                background-size: 100% 100%;
            }
        }
        .inputbox {
            height: 300px;
            padding: 15px 15px;
            background-color: #fff;
            > h3 {
                margin-bottom: 12px;
                font-size:16px;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:28px;
                text-align: center;
            }
            > p {
                margin-bottom: 3px;
                height:22px;
                font-size:14px;
                color:rgba(51,51,51,1);
                line-height:22px;
            }
            .formitembox {
                position: relative;
                margin-bottom: 24px;
                height: 42px;
                > input {
                    float: left;
                    width: 330px;
                    height: 18px;
                    padding: 6px;
                    font-size: 14px;
                    font-weight: normal;
                    border: 1px solid #ccc;
                    border-radius: 2px;
                }
                .errbox {
                    position: absolute;
                    left: 0;
                    top: 30px;
                    font-size: 12px;
                    line-height: 24px;
                    color: #f00;
                }
            }
            .calacbtn {
                height: 42px;
                margin-top: 30px;
                background-color: #2F72D1;
                color: #fff;
                border-radius: 3px;
                font-size: 16px;
                line-height: 42px;
                text-align: center;
            }
        }
    }
}
</style>
