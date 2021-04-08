import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {
    // 登录页面
    isLoginPage: false
  },
  mutations: {
    setIsLoginPage(state) {
      state.isLoginPage = !state.isLoginPage
    }
  },
  actions: {},
  getters
})
