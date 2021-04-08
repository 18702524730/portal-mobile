import { axios } from '@/utils/request'

const api = {
  user: '/api/user',
  role: '/api/role',
  service: '/api/service',
  permission: '/api/permission',
  permissionNoPager: '/api/permission/no-pager'
}

export default api

// post
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}

// post method= {post | put}
export function httpAction(url, parameter, method) {
  return axios({
    url: url,
    method: method,
    data: parameter
  })
}

// put
export function putAction(url, parameter) {
  return axios({
    url: url,
    method: 'put',
    data: parameter
  })
}

// get
export function getAction(url, parameter) {
  if (parameter) {
    parameter['t'] = new Date().getTime()
  }

  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

// 这里偷懒 把keyword关键字 转换为kwText 为软件测试高风险修复
export function getActionUpdateKeyword(url, parameter) {
  if (parameter) {
    parameter['t'] = new Date().getTime()
    if (parameter['keyword']) {
      parameter['kwText'] = parameter['keyword']
    }
    delete parameter['keyword']
  }
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}


// deleteAction
export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url, parameter) {
  return axios({
    url: url,
    params: parameter,
    method: 'get',
    responseType: 'blob'
  })
}

