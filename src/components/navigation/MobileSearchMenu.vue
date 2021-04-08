<template>
  <div id="mobileSearchMenu">
    <div class="container">
      <van-row type="flex" align="center" background="#ffffff" title-inactive-color="#666666">
        <van-col class="my-tabs">
          <van-tabs :border="false" :ellipsis="false" type="card" v-model="activeName" @click="clickTabs">
            <van-tab v-for="(menu,index) in menuList" :title="menu.title" :key="index" :name="menu.key"
                     v-if="menu.needAdmin === undefined || (menu.needAdmin === true && isAdmin)">
            </van-tab>
          </van-tabs>
        </van-col>
        <van-col class="my-btn">
          <img src="../../assets/images/home/more.png" alt="" @click="openMenu">
        </van-col>
      </van-row>
    </div>

    <van-popup v-model="show" position="right" style="height: 100%;width: 60%">
      <van-cell size="large" v-for="(outItem,outIndex) in menuList" :key="outIndex"
                v-if="outItem.needAdmin === undefined || (outItem.needAdmin === true && isAdmin)">
        <div slot="title">
          <div class="my-popup-title" @click="clickRoute(getKeyName(outItem.key))">{{ outItem.title }}</div>
        </div>
        <div slot="label" v-if="outItem.children.length > 0">
          <ul>
            <li v-for="(item,index) in outItem.children" :key="item.key" @click="clickRoute(item.key)"
                v-if="item.needAdmin === undefined || (item.needAdmin === true && isAdmin)">{{item.title}}
            </li>
          </ul>
        </div>
      </van-cell>
    </van-popup>
  </div>
</template>

<script>
  import { isLoginAndAdmin } from '@/utils/role'

  export default {
    props: {
      changeLogin: {
        type: Boolean,
        default: true
      }
    },
    name: 'MobileSearchMenu',
    data() {
      return {
        menuList: [
          {
            title: '首页',
            children: [],
            key: 'main:MobileHome'
          },
          {
            title: 'IP检索',
            children: [
              {
                title: '专利',
                key: 'PatentSearchShiBei'
              },
              {
                title: '商标',
                key: 'BrandSearchShiBei'
              },
              {
                title: '法律文书',
                key: 'LawSearchShibei'
              },
              {
                title: '地理标志',
                key: 'MobileGeographySign'
              }
            ],
            key: 'main:PatentSearchShiBei'
          },
          {
            title: '交易中心',
            children: [
              {
                title: '交易大厅',
                key: 'MobileTradingCenter'
              },
              {
                title: '供应信息',
                key: 'MobileSupplyProjectMessage'
              },
              {
                title: '需求信息',
                key: 'MobileProjectCenter'
              },
              {
                title: '项目专区',
                key: 'MobileProjectZone'
              },
              {
                title: '案例展示',
                key: 'MobileCaseShow'
              }
            ],
            key: 'main:MobileTradingCenter'
          },
          {
            title: '服务集市',
            children: [
              {
                title: '服务大厅',
                key: 'MobileServiceCenter'
              },
              {
                title: '服务机构',
                key: 'MobileServiceOrg'
              },
              {
                title: '服务项目',
                key: 'MobileServiceProject'
              },
              {
                title: '服务券(建设中)',
                key: 'developing:MobileServiceVoucher'
              }
            ],
            key: 'main:MobileServiceCenter'
          },
          {
            title: 'IP金融',
            children: [
              {
                title: '一带一路引导资金',
                key: 'MobileFinancialService'
              },
              {
                title: '质押融资',
                key: 'MobilePledgeFinancing'
              },
              {
                title: 'IP保险',
                key: 'MobileIPInsurance'
              }

            ],
            key: 'main:MobileFinancialService'
          },
          {
            title: '知识产权保护',
            children: [
              {
                title: '快速维权',
                key: 'MobileNewFastActivist'
              },
              {
                title: '多元化纠纷解决',
                key: 'MobileMultDisputeResolution'
              },
              {
                title: '全国维权援助网络',
                key: 'MobileActivistNetwork'
              },
              {
                title: '海外维权',
                key: 'MobileOverseasRights'
              },
              {
                title: '维权资源',
                key: 'MobileNewActivistResources'
              },
              {
                title: '行政裁决(建设中)',
                key: 'developing:MobileAdministratiVeverdict'
              }
            ],
            key: 'main:MobileNewFastActivist'
          },
          {
            title: 'IP管家',
            children: [],
            key: 'main:MobileCareCenter'
          },
          {
            title: '云画报',
            children: [
              {
                title: '云画报',
                key: 'MobileCloud'
              },
              {
                title: 'IP图文直播',
                key: 'MobileIPLive'
              },
              {
                title: 'IP画像',
                key: 'MobilePortrait'
              }
            ],
            key: 'main:MobileCloud'
          },
          {
            title: '政策资讯',
            children: [
              {
                title: '政策法规',
                key: 'MobileNewsConsult'
              },
              {
                title: '专题信息',
                key: 'MobileSpecialMessage'
              },
              {
                title: '公告资讯',
                key: 'MobileNoticeMessage'
              }
            ],
            key: 'main:MobileNewsConsult'
          },
          {
            title: '特色服务',
            children: [
              {
                title: '重点行业专利库',
                key: 'IndustryShiBeiPort',
                needAdmin: true
              },
              {
                title: '专利导航报告',
                key: 'PatentShiBeiPort'
              },
              {
                title: '专利导航分析',
                key: 'PatentNavSys'
              },
              {
                title: '专利价值评价',
                key: 'PatentEvaluation',
                needAdmin: true
              },
              {
                title: '专利资产评估',
                key: 'PatentAssess',
                needAdmin: true
              },
              {
                title: '培训信息',
                key: 'MobileTrainMessage',
                needAdmin: true
              },
              {
                title: '专家库',
                key: 'MobileProfessorBank',
                needAdmin: true
              }
            ],
            key: 'main:IndustryShiBeiPort'
          },
          {
            title: '创新检测',
            children: [
              {
                title: '大数据监测',
                key: 'BigData'
              },
              {
                title: '企业评价',
                key: 'CompanyEvaluation'
              },
              {
                title: '企业画像',
                key: 'CompanyPortrait'
              },
              {
                title: '企业信用',
                key: 'CompanyCredit'
              },
              {
                title: '服务机构',
                key: 'ServiceAgencies'
              }
            ],
            key: 'main:BigData',
            needAdmin: true
          }
        ],
        show: false,
        activeName: 'main:MobileHome',
        isAdmin: false
      }
    },
    created() {
    },
    methods: {
      changeAdmin() {
        this.isAdmin = isLoginAndAdmin()
        console.info('admin', this.isAdmin)
      },
      openMenu() {
        this.show = true
      },
      getKeyName(key) {
        const keyArr = key.split('main:')
        return keyArr[1]
      },
      clickRoute(key) {
        console.info(key)
        if (key.indexOf('developing:') > -1) {
          this.$notify({ type: 'primary', message: '建设中。。。' })
        } else {
          this.$router.push({ name: key })
        }
      },
      clickTabs(name, title) {
        const routerName = this.getKeyName(name)
        this.clickRoute(routerName)
      }
    },
    computed: {},
    watch: {
      changeLogin: {
        handler(data) {
          console.info('哈哈哈哈哈')
          if (data){
            this.changeAdmin()
          }
        },
        immediate: true
      },
      '$route': {
        handler(data) {
          switch (data.name) {
            case 'MobileHome':
              this.activeName = 'main:MobileHome'
              break
            case 'MobileTradingCenter':
            case 'MobileSupplyCenter':
            case 'MobileSupplyPatentCenter':
            case 'MobileSupplyBrandCenter':
            case 'MobileDemandCenter':
            case 'MobileCaseShow':
            case 'MobileProjectZone':
              this.activeName = 'main:MobileTradingCenter'
              break
            case 'MobileServiceCenter':
            case 'MobileServiceOrg':
            case 'MobileServiceProject':
              this.activeName = 'main:MobileServiceCenter'
              break
            case 'MobileNewsConsult':
            case 'MobileSpecialMessage':
            case 'MobileNoticeMessage':
            case 'MobileSpecialList':
            case 'MobilePolicyList':
            case 'MobileArticleMessage':
              this.activeName = 'main:MobileNewsConsult'
              break
            case 'MobileCareCenter':
            case 'CareCenterArticleMessage':
              this.activeName = 'main:MobileCareCenter'
              break
            case 'MobileFinancialService':
            case 'MobilePledgeFinancing':
            case 'MobileIPInsurance':
            case 'MobileMoreBank':
            case 'MobileFinancialServiceArticleMessage':
            case 'MobileFinancialConsultArticleMessage':
            case 'MobileFinancialConsultShow':
              this.activeName = 'main:MobileFinancialService'
              break
            case 'MobileCloudPaper':
            case 'MobileCloud':
            case 'MobileCloudPaperList':
            case 'MobileCloudPaperInfo':
            case 'MobileIPLive':
            case 'MobileIPLiveInfo':
            case 'MobilePortrait':
            case 'MobilePortraitInfo':
              this.activeName = 'main:MobileCloud'
              break
            case 'PatentSearchShiBei':
            case 'SeniorSearchShibei':
            case 'ExpressionSearchShibei':
            case 'PatentSearchList':
            case 'PatentSearchDetail':
            case 'BrandSearchShiBei':
            case 'TrademarkSearchShiBei':
            case 'TrademarkSearchDetail':
            case 'LawSearchShibei':
            case 'LawSearchList':
            case 'LawSearchDetail':
            case 'MobileGeographySign':
              this.activeName = 'main:PatentSearchShiBei'
              break
            case 'IndustryShiBeiPort':
            case 'IndustryInfo':
            case 'PatentShiBeiPort':
            case 'PatentNavDetail':
            case 'PatentNavSys':
            case 'PatentNavSysInfo':
            case 'PatentEvaluation':
            case 'PatentEvaluationInfo':
            case 'PatentAssess':
            case 'PatentAssessInfo':
            case 'MobileProfessorBank':
            case 'MobileTrainMessage':
            case 'MobileTrainArticleMessage':
              this.activeName = 'main:IndustryShiBeiPort'
              break
            case 'MobileNewFastActivist':
            case 'MobileMultDisputeResolution':
            case 'MobileActivistNetwork':
            case 'MobileOverseasRights':
            case 'MobileNewActivistResources':
              this.activeName = 'main:MobileNewFastActivist'
              break
            case 'BigData':
            case 'CompanyEvaluation':
            case 'CompanyEvaluationInfo':
            case 'CompanyPortrait':
            case 'CompanyPortraitList':
            case 'CompanyPortraitInfo':
            case 'CompanyCredit':
            case 'CompanyCreditList':
            case 'CompanyCreditInfo':
            case 'ServiceAgencies':
            case 'AgencyInfo':
              this.activeName = 'main:BigData'
              break
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../index";

  #mobileSearchMenu {
    /deep/ .van-tabs__nav--card {
      .van-tab.van-tab--active {
        background-color: #ffffff;
        color: @main-color;
        border-bottom: 2px solid @main-color;
      }
    }
    /deep/ .van-tabs__line {
      background-color: @main-color;
    }
    /deep/ .van-tab__text {
      font-size: 24/2px;
    }
    /deep/ .van-tabs__nav--card {
      .van-tab {
        border-right: none;
        color: #666666;
      }
    }
    /deep/ .van-tab {
      margin-right: 40/2px;
    }
    /deep/ .van-tabs__nav--card {
      border: none;
      border-radius: 0;
      .van-tab {
        border-right: none;
        border-left: none;
      }
    }

    /deep/ .van-tabs__nav--card {
      margin: 0;
    }
    .my-tabs {
      width: 613/2px;
    }
    .my-btn {
      width: 77/2px;
      height: 100%;
      text-align: end;

      img {
        border-left: 2px solid #E6E6E6;
        padding-left: 16/2px;
        width: 30/2px;
        height: 21/2px;
        vertical-align: middle;
        margin-bottom: 4px;
        cursor: pointer;
      }
    }

    .van-cell:not(:last-child)::after {
      border-bottom: 2px solid #ebedf0;
    }
    ul {
      padding-top: 5px;
      padding-left: 5px;
    }
    ul > li {
      padding-bottom: 5px;
      &:hover {
        color: @main-color;
      }
    }
    .my-popup-title {
      &:hover {
        color: @main-color;
      }
    }
  }

</style>