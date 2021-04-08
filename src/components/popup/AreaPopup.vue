<template>
  <div id="areaPopup">
    <van-popup
      position="bottom"
      get-container="#app"
      round
      v-model="show"
      closeable
      style="width: 100%;height: 75%"
      @close="closePopup">
      <van-row class="popup-head">
        <p>请选择项目地点</p>
      </van-row>
      <van-row class="my-content">
        <van-row class="content-first">
          <van-tree-select
            :items="items"
            :active-id.sync="activeIds"
            :main-active-index.sync="activeIndex"
          />
        </van-row>
        <van-row class="content-second">
          <van-tag
            closeable
            size="medium"
            type="primary"
            @close="close(item)"
            v-for="(item,index) in activeItems"
            :key="item.id"
          >
            {{item.text}}
          </van-tag>
        </van-row>
      </van-row>

    </van-popup>
  </div>
</template>

<script>

  export default {
    name: 'AreaPopup',
    props: {
      items: {
        type: Array,
        default: () => {
          return []
        }
      },
      allItems: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    created() {
    },
    data() {
      return {
        show: false,
        activeIds: [],
        activeItems: [],
        activeIndex: 0
      }
    },
    methods: {
      close(item) {
        this.activeItems = this.activeItems.filter(a => a.id !== item.id)
        const index = this.activeIds.indexOf(item.id)
        if (index > -1) {
          this.activeIds.splice(index, 1)
        }
      },
      showPopup() {
        this.show = true
      },
      closePopup() {
        // 关闭popup，把数据给父组件
        this.$emit('func', this.activeItems)
      }
    },
    watch: {
      items: {
        handler(data) {
        },
        deep: true
      },
      activeIds: {
        handler(newData, oldData) {
          if (newData.length > oldData.length) {
            // 添加 是添加在最后面
            const lastIds = newData[newData.length - 1]
            for (const a of this.allItems) {
              if (a.id === lastIds) {
                this.activeItems.push(a)
                break
              }
            }
          } else if (newData.length < oldData.length) {
            // 删除数据 要删除的数据在oldData里面，不在newData里面
            let lastIds = ''
            for (const a of oldData) {
              if (!newData.includes(a)) {
                lastIds = a
                break
              }
            }
            this.activeItems = this.activeItems.filter(a => a.id !== lastIds)
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "popup";

  #areaPopup {

  }
</style>