<template>
  <div></div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import Vue from 'vue'
  import {
    USER_INFO, USER_NAME, ACCESS_TOKEN
  } from '@/store/mutation-types'

  export default {
    name: 'PortalLogin',
    created() {
      console.info(this.$route.query)
      const keys = Object.keys(this.$route.query)
      const query = {}
      let token = ''
      let redirectName = ''
      let redirectPath = ''
      for (const a of keys) {
        if (a === 'token') {
          token = this.$route.query.token
          continue
        }
        if (a === 'redirectName') {
          redirectName = this.$route.query.redirectName
          continue
        }
        if (a === 'redirectPath') {
          redirectPath = this.$route.query.redirectPath
          continue
        }
        query[`${a}`] = this.$route.query[`${a}`]
      }
      getAction('/zscq/portal/getUserInfoByToken', {
        token: token
      }).then(res => {
        if (res.success) {
          const userInfo = res.result.userInfo
          Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
          const result = res.result
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(USER_NAME, userInfo['username'], 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(window._CONFIG['roleCookieName'], result['roleInfo'], 7 * 24 * 60 * 60 * 1000)
          if (redirectName) {
            this.$router.push({ name: redirectName, query: query })
          } else if (redirectPath) {
            // 这是带路径的方法
            this.$router.push({ path: redirectPath, query: query })
          } else {
            this.$notify({ type: 'danger', message: '请求地址有问题！' })
            this.$router.push({ path: '/portal-mobile' })
          }
        } else {
          this.$notify({ type: 'danger', message: '网络可能出现问题，请重新访问！' })
          this.$router.push({ path: '/portal-mobile' })
        }
      }).finally(() => {
      })
    }
  }
</script>

<style scoped>

</style>