<template>
  <div id="recommendOrganization">
    <a href="http://www.xmipop.com/portal/message/article-message?id=1250603073077747713&keyRoute=SpecialMessage"
       target="_blank" v-if="haveImg">
      <img src='../../assets/images/home/bg.png' alt="如何申请专利商标、商标、版权" class="gif-img">
    </a>
    <div class="my-h container" v-if="title !== ''">
      <h2>{{ title }}</h2>
      <div v-if="haveMore">
        <a @click="moreClick">
          <span class="more-span">查看更多</span><img src="../../assets/images/home/next.png" alt="查看更多" class="span-img">
        </a>
      </div>
    </div>

    <slot name="content"></slot>

    <van-pagination v-model="pagination.current" :total-items="pagination.total" :items-per-page="pagination.pageSize"
                    v-if="havePage" force-ellipses
                    @change="pagination.onChange"/>
  </div>
</template>

<script>
  export default {
    name: 'RecommendOrganization',
    props: {
      title: {
        type: String,
        default: '推荐项目 • 供应信息'
      },
      keyRouteName: {
        type: String,
        default: 'MobileSupplyProjectMessage'
      },
      haveImg: {
        type: Boolean,
        default: false
      },
      haveMore: {
        type: Boolean,
        default: true
      },
      havePage: {
        type: Boolean,
        default: false
      },
      pagination: {
        type: Object,
        default: () => {
          return {
            current: 1,
            pageSize: 12,
            total: 0,
            onChange: page => {
            }
          }
        }
      },
      isRouter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    methods: {
      moreClick() {
        if (this.isRouter) {
          this.$router.push({ name: this.keyRouteName })
        } else {
          this.$emit("openPopup")
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #recommendOrganization {
    background-color: @main-bg-color;
    .gif-img {
      width: 100%;
      height: 106/2px;
      background-color: #ffffff;
    }
    .my-h {
      height: 99/2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h {
        color: #001833;
      }
      a {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 24/2px;
        font-weight: normal;
        .more-span {
          color: #898989;
          padding-right: 5/2px;
          cursor: pointer;
        }
        .span-img {
          width: 13/2px;
          height: 22/2px;
          cursor: pointer;
        }
      }
    }

  }
</style>