<template>
  <div id="generalLayout">
    <mobile-portal-header ref="header"></mobile-portal-header>
    <mobile-search-menu :change-login="isRouterAlive"></mobile-search-menu>
    <router-view v-if="isRouterAlive"></router-view>
    <mobile-friend-link></mobile-friend-link>
    <mobile-portal-footer></mobile-portal-footer>
    <mobile-footer-link></mobile-footer-link>
  </div>
</template>

<script>
  import MobilePortalHeader from '../general/MobilePortalHeader'
  import MobilePortalFooter from '../general/MobilePortalFooter'
  import MobileFooterLink from '../general/MobileFooterLink'
  import MobileFriendLink from '../general/MobileFriendLink'
  import MobileSearchMenu from '../navigation/MobileSearchMenu'

  export default {
    name: 'GeneralLayout',
    components: { MobileSearchMenu, MobileFriendLink, MobileFooterLink, MobilePortalFooter, MobilePortalHeader },
    provide() {
      return {
        reload: this.reload,
        headLogin: this.headLogin
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      },
      headLogin() {
        this.$refs.header.showPopup()
      }
    }
  }
</script>

<style scoped lang="less">
  #generalLayout {

  }
</style>