<template>
  <div id="industryPopup ">
    <van-popup
      position="bottom"
      get-container="#app"
      round
      v-model="show"
      closeable
      style="width: 100%;height: 75%"
      @close="closePopup">
      <van-row class="popup-head">
        <p>请选择所属行业</p>
      </van-row>
      <van-row class="my-content">
        <van-row class="select-content">
          <van-row class="first-row">行业：</van-row>
          <van-row class="second-row">
            <template v-for="(item,index) in selectItems">
              <span v-if="index !== 0" :key="index"> > </span>
              <van-tag
                closeable
                size="mini"
                type="primary"
                @close="close(index)"
                :key="item.id"
              >{{item.text}}
              </van-tag>

            </template>
          </van-row>
        </van-row>
        <van-row class="content-first">
          <van-tree-select
            :items="currentItem"
            :active-id.sync="activeIds"
            :main-active-index.sync="activeIndex"
            @click-nav="clickNav"
            @click-item="clickItem"
          />
        </van-row>
      </van-row>

    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'IndustryPopup',
    props: {
      items: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        show: false,
        activeIds: '',
        activeIndex: -1,

        currentItem: [],
        selectItems: [],

        selectValue: false,
        selectNav: false
      }
    },
    methods: {
      clickItem(data) {
        if (this.selectValue) {
          // 已经选择了数据
          this.selectItems.pop()
        }
        if (data.children.length > 0) {
          // 选择的有子节点
          this.selectItems.push(data)
          this.currentItem = [data]
          // 更换新菜单
          this.activeIds = ''
          this.selectValue = false
          this.activeIndex = 0
        } else {
          // 还没有选择数据
          this.selectItems.push(data)
          this.selectValue = true
        }
      },
      clickNav(index) {
        if (this.selectItems.length > 1) {
          return
        } else if (this.selectItems.length === 1) {
          debugger
          this.selectItems.pop()
        }
        this.selectItems.push(this.items[index])
        this.selectNav = true
        this.selectValue = false
      },
      close(index) {
        if (index === 0) {
          // 删除最后一个
          this.currentItem = this.items
          this.selectItems = []

          this.activeIndex = -1
        } else {
          const allLength = this.selectItems.length - 1
          for (let a = index; a <= allLength; a++) {
            this.selectItems.pop()
          }

          this.currentItem = [this.selectItems[index - 1]]

          this.activeIndex = 0
        }

        this.selectValue = false
        this.activeIds = ''
      },
      showPopup() {
        this.show = true
      },
      closePopup() {
        // 关闭popup，把数据给父组件
        this.$emit('func', this.selectItems)
      }
    },
    watch: {
      items: {
        handler(data) {
          this.currentItem = data
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "popup";

  #industryPopup {

  }
</style>