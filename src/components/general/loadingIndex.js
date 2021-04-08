import Vue from 'vue'
import LoadingComponent from './Loading'

const LoadingConstructor = Vue.extend(LoadingComponent)

let toastDom, el

function showLoading({ title, type, duration = 2000 }) {
  if (!el && !toastDom) {
    el = document.createElement('div')
    toastDom = new LoadingConstructor({
      el,
      data() {
        return {
          isShow: true,
          title
        }
      }
    })

    document.body.appendChild(toastDom.$el)
  } else {
    toastDom.isShow = true
  }
}

function cancelLoading() {
  if (toastDom) {
    toastDom.isShow = false
  }
}

function registryToast() {
  Vue.prototype.$showLoading = showLoading
  Vue.prototype.$cancelLoading = cancelLoading
}

export default registryToast