<template>
  <div id="servicePopup">
    <van-popup
      position="bottom"
      get-container="#app"
      round
      v-model="show"
      closeable
      style="width: 100%;height: 75%"
      @close="closePopup">
      <van-row class="popup-head">
        <p>请选择服务分类</p>
      </van-row>
      <van-row class="my-content">
        <van-row class="select-content">
          <van-row class="first-row">分类：</van-row>
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
    name: 'ServicePopup',
    props: {
      items: {
        type: Array,
        default: () => {
          return []
        }
      },
      alreadyData: {
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
          const selectItems = []
          if (this.alreadyData.length > 0) {
            // 已经有选择的数据
            if (this.alreadyData.length === 1) {
              // 只选择了左边的树，则不需要改变currentItem，只需要找到选择到了哪个位置
              for (const a in this.currentItem) {
                if (this.currentItem[a].id === this.alreadyData[0].id) {
                  this.activeIndex = a
                  selectItems.push(this.currentItem[a])
                  break
                }
              }
            } else {
              // 需要判断当前树是啥样的
              const allNum = this.alreadyData.length
              let currentItem = data
              for (let a = 0; a < allNum; a++) {
                if (currentItem.length > 0) {
                  const newObj = currentItem.filter(item => item.id === this.alreadyData[a].id)[0]
                  selectItems.push(newObj)
                  currentItem = newObj.children
                } else {
                  selectItems.push(this.alreadyData[allNum - 1])
                }
              }
              this.currentItem = [selectItems[selectItems.length - 2]]
              this.activeIds = this.alreadyData[allNum - 1].id
              this.activeIndex = 0
              this.selectValue = true
            }
            this.selectItems = selectItems
            this.selectNav = true
          }
        },
        deep: true,
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  @import "popup";

  #servicePopup {
  }
</style>