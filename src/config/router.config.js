/**
 * 走菜单，走权限控制
 * @type {[null,null]}
 */

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/portal-mobile',
    component: resolve => {
      require(['@/components/layouts/BlankLayout.vue'], resolve)
    },
    redirect: '/portal-mobile/main',
    children: [
      {
        path: 'main',
        name: 'MobileHome',
        component: resolve => require(['@/views/MobileHome'], resolve)
      },
      {
        path: 'help-center',
        name: 'MobileHelpCenter',
        component: resolve => require(['@/views/general/MobileHelpCenter'], resolve)
      }
    ]
  },
  {
    path: '/portal/portal-login',
    component: resolve => {
      require(['@/views/PortalLogin'], resolve)
    }
  },
  {
    path: '/portal-mobile/general',
    component: resolve => {
      require(['@/components/layouts/GeneralLayout.vue'], resolve)
    },
    children: [
      {
        path: '/portal-mobile/search',
        component: resolve => {
          require(['@/components/layouts/SearchLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/search/patent-searching',
        children: [
          {
            path: 'patent-searching',
            name: 'PatentSearchShiBei',
            component: resolve => require(['@/views/search/patentSearch'], resolve)
          },
          {
            path: 'senior-searching',
            name: 'SeniorSearchShibei',
            component: resolve => require(['@/views/search/seniorSearch'], resolve)
          },
          {
            path: 'expression-searching',
            name: 'ExpressionSearchShibei',
            component: resolve => require(['@/views/search/expressionSearch'], resolve)
          },
          {
            path: 'patent-searchlist',
            name: 'PatentSearchList',
            component: resolve => require(['@/views/search/patentSearchList'], resolve)
          },
          {
            path: 'patent-searchdetail/:id/:country/:num/:tp/:istype',
            name: 'PatentSearchDetail',
            component: resolve => require(['@/views/search/patentSearchDetail'], resolve)
          },
          {
            path: 'brand-searching',
            name: 'BrandSearchShiBei',
            component: resolve => require(['@/views/search/trademarkSearch'], resolve)
          },
          {
            path: 'trademark-search',
            name: 'TrademarkSearchShiBei',
            component: resolve => require(['@/views/search/trademarkSearchList'], resolve)
          },
          {
            path: 'trademark-searchdetail/:id',
            name: 'TrademarkSearchDetail',
            component: resolve => require(['@/views/search/trademarkSearchDetail'], resolve)
          },
          {
            path: 'law-searching',
            name: 'LawSearchShibei',
            component: resolve => require(['@/views/search/lawSearch'], resolve)
          },
          {
            path: 'law-searchlist',
            name: 'LawSearchList',
            component: resolve => require(['@/views/search/lawSearchList'], resolve)
          },
          {
            path: 'law-searchdetail/:type/:islocal',
            name: 'LawSearchDetail',
            component: resolve => require(['@/views/search/lawSearchDetail'], resolve)
          },
          {
            path: 'geography-sign',
            name: 'MobileGeographySign',
            component: resolve => require(['@/views/search/MobileGeographySign'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/trading',
        component: resolve => {
          require(['@/components/layouts/TradingLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/trading/trading-center',
        children: [
          {
            path: 'trading-center',
            name: 'MobileTradingCenter',
            component: resolve => require(['@/views/trading/MobileTradingCenter'], resolve)
          },
          {
            path: 'supply-center',
            name: 'MobileSupplyCenter',
            component: resolve => require(['@/views/trading/MobileSupplyCenter'], resolve)
          },
          {
            path: 'supply-patent-center',
            name: 'MobileSupplyPatentCenter',
            component: resolve => require(['@/views/trading/MobileSupplyPatentCenter'], resolve)
          },
          {
            path: 'supply-brand-center',
            name: 'MobileSupplyBrandCenter',
            component: resolve => require(['@/views/trading/MobileSupplyBrandCenter'], resolve)
          },
          {
            path: 'demand-center',
            name: 'MobileDemandCenter',
            component: resolve => require(['@/views/trading/MobileDemandCenter'], resolve)
          },
          {
            path: 'demand-patent-center',
            name: 'MobileDemandPatentCenter',
            component: resolve => require(['@/views/trading/MobileDemandPatentCenter'], resolve)
          },
          {
            path: 'demand-brand-center',
            name: 'MobileDemandBrandCenter',
            component: resolve => require(['@/views/trading/MobileDemandBrandCenter'], resolve)
          },
          {
            path: 'prject-zone',
            name: 'MobileProjectZone',
            component: resolve => require(['@/views/trading/MobileProjectZone'], resolve)
          },
          {
            path: 'case-show',
            name: 'MobileCaseShow',
            component: resolve => require(['@/views/trading/MobileCaseShow'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/service',
        component: resolve => {
          require(['@/components/layouts/ServiceLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/service/service-center',
        children: [
          {
            path: 'service-center',
            name: 'MobileServiceCenter',
            component: resolve => require(['@/views/service/MobileServiceCenter'], resolve)
          },
          {
            path: 'service-org',
            name: 'MobileServiceOrg',
            component: resolve => require(['@/views/service/MobileServiceOrg'], resolve)
          },
          {
            path: 'service-project',
            name: 'MobileServiceProject',
            component: resolve => require(['@/views/service/MobileServiceProject'], resolve)
          },
          {
            path: 'service-article-message',
            name: 'MobileServiceArticleMessage',
            component: resolve => require(['@/components/general/ArticleMessage'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/message',
        component: resolve => {
          require(['@/components/layouts/ConsultLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/message/news-consult',
        children: [
          {
            path: 'news-consult',
            name: 'MobileNewsConsult',
            component: resolve => require(['@/views/consult/MobileNewsConsult'], resolve)
          },
          {
            path: 'news-consult-policy-list',
            name: 'MobilePolicyList',
            component: resolve => require(['@/views/consult/MobilePolicyList'], resolve)
          },
          {
            path: 'special-message',
            name: 'MobileSpecialMessage',
            component: resolve => require(['@/views/consult/MobileSpecialMessage'], resolve)
          },
          {
            path: 'special-list',
            name: 'MobileSpecialList',
            component: resolve => require(['@/views/consult/MobileSpecialList'], resolve)
          },
          {
            path: 'notice-message',
            name: 'MobileNoticeMessage',
            component: resolve => require(['@/views/consult/MobileNoticeMessage'], resolve)
          },
          {
            path: 'article-message',
            name: 'MobileArticleMessage',
            component: resolve => require(['@/components/general/ArticleMessage'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/care',
        component: resolve => {
          require(['@/components/layouts/BlankLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/care/care-center',
        children: [
          {
            path: 'care-center',
            name: 'MobileCareCenter',
            component: resolve => require(['@/views/care/MobileCareCenter'], resolve)
          },
          {
            path: 'care-center-article-message',
            name: 'CareCenterArticleMessage',
            component: resolve => require(['@/components/general/ArticleMessage'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/feature-service',
        component: resolve => {
          require(['@/components/layouts/FeatureLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/feature-service/train-message',
        children: [
          {
            path: 'train-message',
            name: 'MobileTrainMessage',
            component: resolve => require(['@/views/feature/MobileTrainMessage'], resolve)
          },
          {
            path: 'train-article-message',
            name: 'MobileTrainArticleMessage',
            component: resolve => require(['@/components/general/ArticleMessage'], resolve)
          },
          {
            path: 'professor-bank',
            name: 'MobileProfessorBank',
            component: resolve => require(['@/views/feature/MobileProfessorBank'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/ip-financial',
        component: resolve => {
          require(['@/components/layouts/FinancialLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/ip-financial/financial-service',
        children: [
          {
            path: 'financial-service',
            name: 'MobileFinancialService',
            component: resolve => require(['@/views/financial/MobileFinancialService'], resolve)
          },
          {
            path: 'financial-article-message',
            name: 'MobileFinancialServiceArticleMessage',
            component: resolve => require(['@/components/general/ArticleMessage'], resolve)
          },
          {
            path: 'financial-consult-article-message',
            name: 'MobileFinancialConsultArticleMessage',
            component: resolve => require(['@/components/general/ArticleMessage'], resolve)
          },
          {
            path: 'financial-pledge-financing',
            name: 'MobilePledgeFinancing',
            component: resolve => require(['@/views/financial/MobilePledgeFinancing'], resolve)
          },
          {
            path: 'financial-consult-show',
            name: 'MobileFinancialConsultShow',
            component: resolve => require(['@/views/financial/MobileFinancialConsultShow'], resolve)
          },
          {
            path: 'financial-more-bank',
            name: 'MobileMoreBank',
            component: resolve => require(['@/views/financial/MobileMoreBank'], resolve)
          },
          {
            path: 'ip-insurance',
            name: 'MobileIPInsurance',
            component: resolve => require(['@/views/financial/MobileIPInsurance'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/cloud',
        component: resolve => {
          require(['@/components/layouts/CloudLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/cloud/cloud-paper',
        children: [
          {
            path: 'cloud-paper',
            name: 'MobileCloud',
            component: resolve => require(['@/views/cloud/CloudPaper'], resolve)
          },
          {
            path: 'cloud-paperlist/:id/:year',
            name: 'MobileCloudPaperList',
            component: resolve => require(['@/views/cloud/CloudPaperList'], resolve)
          },
          {
            path: 'cloud-paperinfo/:lmid/:from',
            name: 'MobileCloudPaperInfo',
            component: resolve => require(['@/views/cloud/CloudPaperInfo'], resolve)
          },
          {
            path: 'ip-live',
            name: 'MobileIPLive',
            component: resolve => require(['@/views/cloud/IPLive'], resolve)
          },
          {
            path: 'ip-liveinfo/:id',
            name: 'MobileIPLiveInfo',
            component: resolve => require(['@/views/cloud/LiveInfo'], resolve)
          },
          {
            path: 'portrait',
            name: 'MobilePortrait',
            component: resolve => require(['@/views/cloud/Portrait'], resolve)
          },
          {
            path: 'portraitinfo/:id',
            name: 'MobilePortraitInfo',
            component: resolve => require(['@/views/cloud/PortraitInfo'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/feature',
        component: resolve => {
          require(['@/components/layouts/FeatureLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/feature/industrybox-industry',
        children: [
          {
            path: 'industrybox-industry',
            name: 'IndustryShiBeiPort',
            component: resolve => require(['@/views/feature/shibei/Industry'], resolve)
          },
          {
            path: 'industry-info/:id',
            name: 'IndustryInfo',
            component: resolve => require(['@/views/feature/shibei/IndustryInfo'], resolve)
          },
          {
            path: 'patentbox-patent',
            name: 'PatentShiBeiPort',
            component: resolve => require(['@/views/feature/shibei/PatentNav'], resolve)
          },
          {
            path: 'patent-navdetail/:id',
            name: 'PatentNavDetail',
            component: resolve => require(['@/views/feature/shibei/PatentNavInfo'], resolve)
          },
          {
            path: 'patent-evaluation',
            name: 'PatentEvaluation',
            component: resolve => require(['@/views/feature/shibei/PatentEvaluationPortal'], resolve)
          },
          {
            path: 'patent-evaluationinfo/:num',
            name: 'PatentEvaluationInfo',
            component: resolve => require(['@/views/feature/shibei/PatentCompare'], resolve)
          },
          {
            path: 'patent-assess',
            name: 'PatentAssess',
            component: resolve => require(['@/views/feature/shibei/PatentAssess'], resolve)
          },
          {
            path: 'patent-assessinfo/:num/:count',
            name: 'PatentAssessInfo',
            component: resolve => require(['@/views/feature/shibei/PatentAssessInfo'], resolve)
          },
          {
            path: 'patent-nav-sys',
            name: 'PatentNavSys',
            component: resolve => require(['@/views/feature/shibei/PatentNavSys'], resolve)
          },
          {
            path: 'patent-nav-sysinfo/:id',
            name: 'PatentNavSysInfo',
            component: resolve => require(['@/views/feature/shibei/PatentNavSysInfo'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/innovate',
        component: resolve => {
          require(['@/components/layouts/PortalInnovateService.vue'], resolve)
        },
        redirect: '/portal-mobile/innovate/big-data',
        children: [
          {
            path: 'big-data',
            name: 'BigData',
            component: resolve => require(['@/views/feature/shibei/BigData'], resolve)
          },
          {
            path: 'company-evaluation',
            name: 'CompanyEvaluation',
            component: resolve => require(['@/views/feature/shibei/companyEvaluation'], resolve)
          },
          {
            path: 'company-evaluationinfo/:id',
            name: 'CompanyEvaluationInfo',
            component: resolve => require(['@/views/feature/shibei/companyEvaluationInfo'], resolve)
          },
          {
            path: 'company-portrait',
            name: 'CompanyPortrait',
            component: resolve => require(['@/views/feature/shibei/CompanyPortrait'], resolve)
          },
          {
            path: 'company-portraitlist/:cn',
            name: 'CompanyPortraitList',
            component: resolve => require(['@/views/feature/shibei/CompanyList'], resolve)
          },
          {
            path: 'company-portraitinfo/:id',
            name: 'CompanyPortraitInfo',
            component: resolve => require(['@/views/feature/shibei/CompanyInfo'], resolve)
          },
          {
            path: 'company-credit',
            name: 'CompanyCredit',
            component: resolve => require(['@/views/feature/shibei/CompanyCredit'], resolve)
          },
          {
            path: 'company-creditlist/:cn',
            name: 'CompanyCreditList',
            component: resolve => require(['@/views/feature/shibei/CompanyCreditList'], resolve)
          },
          {
            path: 'company-creditinfo/:id',
            name: 'CompanyCreditInfo',
            component: resolve => require(['@/views/feature/shibei/CompanyCreditInfo'], resolve)
          },
          {
            path: 'service-agencies',
            name: 'ServiceAgencies',
            component: resolve => require(['@/views/feature/shibei/ServiceAgencies'], resolve)
          },
          {
            path: 'agency-info/:id',
            name: 'AgencyInfo',
            component: resolve => require(['@/views/feature/shibei/AgencyInfo'], resolve)
          }
        ]
      },
      {
        path: '/portal-mobile/intellectual-property-protect',
        component: resolve => {
          require(['@/components/layouts/IntellectualPropertyProtectLayout.vue'], resolve)
        },
        redirect: '/portal-mobile/intellectual-property-protect/fast-activist',
        children: [
          {
            path: 'fast-activist',
            name: 'MobileNewFastActivist',
            component: resolve => require(['@/views/protect/ProtectView'], resolve)
          },
          {
            path: 'mult-dispute-resolution',
            name: 'MobileMultDisputeResolution',
            component: resolve => require(['@/views/protect/ProtectView'], resolve)
          }, {
            path: 'activist_network',
            name: 'MobileActivistNetwork',
            component: resolve => require(['@/views/protect/ProtectView'], resolve)
          },
          {
            path: 'overseas_rights',
            name: 'MobileOverseasRights',
            component: resolve => require(['@/views/protect/ProtectView'], resolve)
          },
          {
            path: 'activist-resources',
            name: 'MobileNewActivistResources',
            component: resolve => require(['@/views/protect/ProtectView'], resolve)
          },
          {
            path: 'activist-article-message',
            name: 'MobileActivistArticleMessage',
            component: resolve => require(['@/components/general/ArticleMessage'], resolve)
          }
        ]
      }
    ]
  }
]
