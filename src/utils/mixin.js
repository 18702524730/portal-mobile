import { mapState } from 'vuex'

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.user.device
    })
  },
  methods: {
    isMobile() {
      return this.device === 'mobile'
    },
    isDesktop() {
      return this.device === 'desktop'
    }
  }
}

export { mixinDevice }