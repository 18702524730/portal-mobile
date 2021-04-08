<template>
  <div id="contactPopup">
    <van-popup v-model="show" get-container="#app" style="width: 70%" class="my-popup" closeable>
      <div class="my-content">
        <h1>{{org.name}}</h1>
        <table>
          <tr>
            <td>联系人:</td>
            <td><span>{{org.contacts}}</span></td>
          </tr>
          <tr>
            <td>联系电话:</td>
            <td>{{org.phone}}</td>
          </tr>
          <tr>
            <td>联系地址:</td>
            <td>{{org.address}}</td>
          </tr>
          <tr v-if="isPostCode && org.postcode">
            <td>邮编:</td>
            <td>{{org.postcode}}</td>
          </tr>
        </table>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { getAction } from '@/api/manage'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ContactPopup',
    data() {
      return {
        show: false,
        orgType: '',
        org: {},
        url: {
          orgAgencyUrl: '/org/orgAgency/getOrgAgencyById',
          orgFinanceUrl: '/org/orgFinance/getOrgFinanceById',
          orgEnterprise: '/org/orgEnterprise/queryById',
          orgSelectType: '/org/orgView/getDataByOrgId',
          orgPerson: '/sys/user/queryById',
          orgGarden: '/org/orgGarden/queryById',
          university: '/org/orgUniversity/queryById',
          getOrgId: '/sys/user/getUserIdByOrgId'
        },
        isPostCode: true
      }
    },
    methods: {
      ...mapGetters(['userInfo']),
      showPopup(orgId, userId) {
        // this.show = true
        this.loadData(orgId, userId)
      },
      async loadData(orgId, userId) {
        this.$showLoading({
          title: '加载中。。'
        })
        const res = await getAction(this.url.orgSelectType, { orgId: orgId })
        let orgType = ''
        if (res.success) {
          if (res.result && res.result.auditStatus === '3') {
            orgType = res.result.orgType
          } else {
            orgType = 'person'
            orgId = userId
          }
        }

        let url = ''
        switch (orgType) {
          case 'finance':
            url = this.url.orgFinanceUrl
            this.isPostCode = false
            break
          case 'agency':
            url = this.url.orgAgencyUrl
            this.isPostCode = false
            break
          case 'enterprise':
            url = this.url.orgEnterprise
            break
          case 'garden':
            url = this.url.orgGarden
            break
          case 'university':
            url = this.url.university
            break
          default:
            url = this.url.orgPerson
            break
        }
        getAction(url, { id: orgId }).then((res) => {
          this.org = res.result
          this.show = true
          if (orgType === 'person') {
            this.org.contacts = this.org.realname
            this.org.address = this.org.addr
          }
          this.$cancelLoading()
        })
        // const res = await getAction(this.url.orgSelectType, { orgId: orgId })
        // let orgType = ''
        // if (res.success) {
        //   if (res.result && res.result.auditStatus === '3') {
        //     orgType = res.result.orgType
        //     const tRes = await getAction(this.url.getOrgId, { orgId: orgId })
        //     if (tRes.success) {
        //       orgId = tRes.message
        //     } else {
        //       this.$notify({ type: 'danger', message: tRes.message })
        //       return false
        //     }
        //   } else {
        //     orgType = 'person'
        //     orgId = userId
        //   }
        // }
        //
        // const user = this.userInfo()
        // let avatar = '/static/common/images/kefu/2.png'
        // if (user.avatar) {
        //   avatar = window._CONFIG['imgDomainURL'] + '/' + user.avatar
        // }
        // console.info(orgType)
        // // const date = new Date().getTime()
        // const path = window._CONFIG['serviceUrl'] + orgId + '/' + orgId + '?id=' + user.id + '&name=' + user.realname + '&avatar=' + avatar
        // window.open(path)
      }
    }
  }
</script>

<style scoped lang="less">
  #contactPopup {

  }

  .my-popup {
    .my-content {
      padding: 10px;
    }
    h1 {
      font-size: 16px;
      padding-top: 16px;
    }
    font-size: 12px;
    tr {
      td:nth-child(1) {
        width: 30%;
      }
    }
  }
</style>