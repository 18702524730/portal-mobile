<template>
  <div id="professorCard" @click="cardClick(item)">
    <div>
      <van-row class="card-img" type="flex" align="center" justify="center">
        <van-image
          class="my-img"
          round
          lazy-load
          :src="getImgNewView(item.imgUrl)">
        </van-image>
      </van-row>

      <van-row class="card-content">
        <van-row class="title-name">
          <h2 class="van-ellipsis">
            {{item.name}}
          </h2>
        </van-row>
        <van-row class="certification-name">
          <h3 class="van-ellipsis">
            行业资深{{item.workingYearsStr}}年
          </h3>
        </van-row>

        <van-row class="main-content">
          <p class="van-multi-ellipsis--l3" v-if="item.selfDescription">
            {{item.selfDescription}}
          </p>
          <p v-else class="my-else">
            无
          </p>
        </van-row>
        <van-row type="flex" align="center" justify="end" class="city-name">
          <van-icon name="location-o"/>
          <span>{{item.cityName}}</span>
        </van-row>
      </van-row>
    </div>
    <professor-details ref="detailsRef"></professor-details>
  </div>
</template>

<script>
  import { getImgNewView } from '@/utils/role'
  import ProfessorDetails from '../details/ProfessorDetails'
  import { judgeState } from '@/utils/util'

  export default {
    name: 'ProfessorCard',
    components: { ProfessorDetails },
    inject: ['headLogin'],
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      getImgNewView,
      cardClick(item) {
        if (judgeState()) {
          // 登录了才触发
          this.$refs.detailsRef.showPopup(item.id)
        } else {
          // 没有登录，则先进行登录
          this.$notify({ type: 'warning', message: '请先进行登录！' })
          this.headLogin()
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #professorCard {
    background-color: #ffffff;
    width: 330/2px;
    text-align: center;
    .card-img {
      .my-img {
        width: 80px;
        height: 80px;
      }
      height: 232/2px;
      width: 100%;
    }

    .card-content {
      padding: 0 10px 10px;
      .title-name {
        margin-bottom: 8px;
      }
      .certification-name {
        margin-bottom: 18px;
      }
      h2 {
        margin: 0;
        font-size: 15px;
        color: @main-font-color;
        font-weight: normal;
      }
      h3 {
        margin: 0;
        font-weight: normal;
        font-size: 12px;
        color: #333333;
      }
      p {
        margin: 0;
        font-size: 10px;
        line-height: 15px;
        color: #898989;
      }
      .main-content {
        height: 45px;
        margin-bottom: 23px;
      }
      .city-name {
        color: #898989;
        font-size: 10px;
      }
      .my-else {
        text-align: center;
        line-height: 45px;
      }
    }
  }
</style>