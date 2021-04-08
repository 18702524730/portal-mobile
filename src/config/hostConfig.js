let rootConfig = {
  // rootUrl: 'https://testxipop.ipsebe.com/xipop',
  rootUrl: 'http://xm.xmipop.com/xipop',
  indexUrl: 'http://119.3.27.145:3002'
}
if (location.host.indexOf('localhost') === 0) {
  rootConfig = {
    rootUrl: '//' + location.host + '/xipop',
    indexUrl: '//' + location.host
  }
}
// if (location.host.indexOf('112.48.134.160:3002') > -1) {      //改域名？
//   rootConfig = {
//     rootUrl: 'http://112.48.134.160:8092',
//     indexUrl: 'http://112.48.134.160:3000'
//   }
// }
// if (location.host.indexOf('122.112.141.109:3000') > -1) {  //改域名？
//   rootConfig = {
//     rootUrl: 'http://122.112.141.109:8082/xipop',
//     indexUrl: 'http://122.112.141.109:3000'
//   }
// }
if (location.host.indexOf('ipop.scjg.xm.gov.cn') > -1) {
  rootConfig = {
    rootUrl: 'https://ipop.scjg.xm.gov.cn/xmsebeapi',
    indexUrl: 'https://ipop.scjg.xm.gov.cn/mobile'
  }
}
// 政务云测试环境
if (location.host.indexOf('112.48.134.160:4001') > -1) {
  rootConfig = {
    rootUrl: 'http://112.48.134.160:4001/xmsebeapi',
    indexUrl: 'http://112.48.134.160:4001'
  }
}
if (location.host.indexOf('122.112.165.166:3001') > -1) {
  rootConfig = {
    rootUrl: 'http://122.112.165.166:8078',
    indexUrl: 'http://122.112.165.166:3002'
  }
}
export default rootConfig