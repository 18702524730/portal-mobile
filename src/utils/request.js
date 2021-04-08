import axios from 'axios'
import { VueAxios } from './axios'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { Notify } from "vant"

// 创建 axios 实例
const service = axios.create({
  baseURL: '/jeecg-boot', // api base_url
  timeout: 45000 // 请求超时时间
})


const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    console.log('------异常响应------', token)
    console.log('------异常响应------', error.response.status)
    switch (error.response.status) {
      case 403:
        Notify({
          type: 'danger',
          message: '系统提示：拒绝访问',
          duration: 4
        })
        break
      case 500:
        if (token && data.message === 'Token失效，请重新登录') {
          store.dispatch('Logout').then(() => {
            window.location.reload()
          })
        }
        break
      case 404:
        Notify({
          type: 'danger',
          message: '系统提示：很抱歉，资源未找到!',
          duration: 4000
        })
        break
      case 504:
        Notify({
          type: 'danger',
          message: '系统提示：网络超时',
          duration: 4000
        })
        break
      case 401:
        Notify({
          type: 'danger',
          message: '系统提示：未授权，请重新登录',
          duration: 4000
        })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
        break
      default:
        Notify({
          type: 'danger',
          message: '系统提示：' + data.message,
          duration: 4000
        })
        break
    }
  }
  return Promise.reject(error)
}
// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}