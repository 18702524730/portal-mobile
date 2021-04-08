import Vue from 'vue'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

var __Role = {
  admin: 'admin',
  xmzscq: 'xmzscq',

  finance: 'finance',
  agency: 'agency',
  enterprise: 'enterprise',
  personal: 'personal',
  system: 'system',
  gov: 'gov',
  garden: 'garden',
  university: 'university',
  shitest: 'shitest'
}

const publicList = [
  '/patent/portalRequirementPatent/list', '/trademark/portalRequirementTrademark/list', '/project/portalRequirement/list', '/patent/portalSupplyPatent/list', '/trademark/requirementPatent/list', '/project/portalProject/list',
  '/trusteeship/portalPatentTrusteeship/list', '/trusteeship/portalPatentTrusteeship/patentPayList', '/info/manager/specialList', '/info/manager/trainList',
  '/trade/serviceProcureOrder', '/trade/serviceEval', '/trade/serviceVoucher', '/trusteeship/portalPatentTrusteeship/trusteeshipCenter'
] // no redirect whitelist

export function isAdmin() {
  // return window.__getCookie(window._CONFIG['roleCookieName'])  ==__Role.admin ;
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.admin || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.xmzscq || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.shitest
}

export function isLoginAndAdmin() {
  return Vue.ls.get(ACCESS_TOKEN) && isAdmin()
}

export function isFinance() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.finance
}

export function isAgency() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.agency
}

export function isEnterprise() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.enterprise
}

export function isPersonal() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.personal
}

export function isGarden() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.garden
}


export function isInstitution() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.finance
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.agency
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.enterprise
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.system
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.gov
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.garden
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.university
}

export function isInstitution2() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.university
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.agency
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.enterprise
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.personal
}

export function getRole() {
  return Vue.ls.get(window._CONFIG['roleCookieName'])
}

export function isRoleOne() {
  return Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.personal
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.enterprise
    || Vue.ls.get(window._CONFIG['roleCookieName']) === __Role.university
}

export function isPermissionOneNeedApprove() {
  const privateList = [
    ...publicList]
  return privateList
}

export function isPermissionTwoNeedApprove() {
  const privateList = [
    '/person/partShowInfo',
    '/service/portalServiceAgencyProduct/list', '/service/portalServiceType/list',
    '/trade/serviceSaleOrder', '/trade/receiveServiceVoucher',
    ...publicList
  ]
  return privateList
}

export function isPermissionThreeNeedApprove() {
  const privateList = [
    '/person/partShowInfo',
    '/service/portalServiceFinanceProduct/list',
    ...publicList
  ]
  return privateList
}

export function isPermissionFourNeedApprove() {
  const privateList = [
    '/org/orgGarden/selectEnterproseByGardenId', '/park/enterpriseDirectory',
    ...publicList
  ]
  return privateList
}

export function isPermissionApprove(role, param) {
  let list = []
  switch (role) {
    case __Role.personal:
    case __Role.enterprise:
    case __Role.university:
      list = isPermissionOneNeedApprove()
      break
    case __Role.agency:
      list = isPermissionTwoNeedApprove()
      break
    case __Role.finance:
      list = isPermissionThreeNeedApprove()
      break
    case __Role.garden:
      list = isPermissionFourNeedApprove()
      break
  }
  if (list.indexOf(param) !== -1) {
    return true
  } else {
    return false
  }
}

export function judgeExplorer() {
  const ua = navigator.userAgent
  const isFireFox = /(?:Firefox)/.test(ua)
  const isChrome = /(?:Chrome|CriOS)/.test(ua)

  return isFireFox || isChrome
}

export function judgmentBrowser() {
  const ua = navigator.userAgent
  if (/firefox/i.test(ua)) {
    return true
  } else if (/chrome/i.test(ua)) {
    return true
  } else if (/msie/i.test(ua)) {
    return false
  } else if ('ActiveXObject' in window) {
    return false
  }
  return false
}

export function getImgNewView(text) {
  if (text && text.indexOf(',') > 0) {
    text = text.substring(0, text.indexOf(','))
  }
  if (judgeExplorer()) {
    return window._CONFIG['imgDomainURL'] + '/' + text + '.webp'
  } else {
    return window._CONFIG['imgDomainURL'] + '/' + text
  }
}