import Vue from 'vue'
import { login, logout, phoneLogin, ixmLogin } from '@/api/login'
import { ACCESS_TOKEN, USER_NAME, USER_INFO } from '@/store/mutation-types'
import { getAction } from '@/api/manage'

const user = {
  state: {
    token: '',
    username: '',
    realname: '',
    avatar: '',
    info: {},
    device: 'desktop'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { username, realname }) => {
      state.username = username
      state.realname = realname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },

  actions: {
    // CAS验证登录
    ValidateLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getAction('/cas/client/validateLogin', userInfo).then(response => {
          console.log('----cas 登录--------', response)
          if (response.success) {
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.code === '200' || response.code === 200) {
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 手机号登录
    PhoneLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        phoneLogin(userInfo).then(response => {
          if (response.code === '200' || response.code === 200) {
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // i厦门登录
    IxmLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        ixmLogin(userInfo).then(response => {
          if (response.code === '200' || response.code === 200) {
            const result = response.result
            const userInfo = result.userInfo
            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
            Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_INFO', userInfo)
            commit('SET_NAME', { username: userInfo.username, realname: userInfo.realname })
            commit('SET_AVATAR', userInfo.avatar)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        const logoutToken = state.token
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONLIST', [])
        Vue.ls.remove(ACCESS_TOKEN)
        logout(logoutToken).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }

  }
}

export default user