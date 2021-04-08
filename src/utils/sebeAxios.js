import axios from 'axios'
import Vue from 'vue'
import { Notify } from "vant"
import { USER_INFO, ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import rootConfig from '@config/hostConfig.js'
// 创建 axios 实例
const bUrl = rootConfig.rootUrl

const sebeService = axios.create({
  baseURL: bUrl,
  timeout: 50000
})
const err = (error) => {
    if (error.response) {
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
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
          }
        }
    return Promise.reject(error)
}
sebeService.interceptors.request.use(config => {
  const uinfo = Vue.ls.get(USER_INFO)
  const uid = uinfo && uinfo.id
  config.headers['userId'] = uid || '' 
  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
sebeService.interceptors.response.use((response) => {
  return response.data
}, err)
Vue.prototype.$shttp = sebeService

export default sebeService