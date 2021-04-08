import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.path === '/') {
    next({ path: '/portal-mobile' })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
