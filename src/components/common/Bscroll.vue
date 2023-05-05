<template>
  <div :class="['wrapper', { 'x': bsConfig.scrollX }]" ref="wrapper">
    <div class="wrapper-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)

const wrapper = ref()
let bs: BScroll;

const emit = defineEmits(['ckick', 'beforeScroll', 'afterScroll', 'scroll'])
const props = defineProps<{ 
  bsConfig: BSConfig;
  isExit?: boolean; 
}>();

onMounted(() => {
  bs = new BScroll(wrapper.value, props.bsConfig);

  /**
   *  滚动(滚动中)事件派发
  */
  if (props.bsConfig.listenScroll) {
    bs.on('scroll', (position: { x: number; y: number }) => {
      emit('scroll', position)
    })
  }
})

watch(() => props.isExit, (val, oldVal) => {
  if (val) {
    nextTick(() => {
      bs.refresh()
    })
  }
})
</script>
<style lang="less">
.wrapper {
  overflow: hidden;
  &-content {
    display: block;
  }

  // 开启横向滚动
  &.x {
    white-space: nowrap;
    .wrapper-content {
      display: inline-block;
    }
  }
}
</style>