import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store'

import 'amfe-flexible'
import '@/components'
import '@/components/uiIndex'
import config from '@/defaultSettings'

import '@/utils/filter'
import '@/permission'
import loadingIndex from '@/components/general/loadingIndex'
import './utils/sebeAxios'

import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.config.productionTip = false
Vue.use(Storage, config.storageOptions)
Vue.use(loadingIndex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
