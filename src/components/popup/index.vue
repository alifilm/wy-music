<template>
<Transition 
  name="yqSlide"
  enter-active-class="animate__animated animate__faster animate__slideInUp"
  leave-active-class="animate__animated animate__faster animate__slideOutDown">
  <div 
    :class="['yq-popup', `yq-popup--${position}` ,{ 'round': round }]" 
    :style="{ 'zIndex': Zindex, 'height': '30%' }" 
    v-show="show"
  >
    <slot></slot>
  </div>
</Transition>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useGlobalZIndex } from './util/global-index'

type Props = {
  show: boolean;
  round?: boolean;
  position?: string;
}
withDefaults(defineProps<Props>(), {
  show: false,
  round: false,
  position: 'bottom'
})
const emit = defineEmits(['update:show'])
let Zindex =  computed(() => useGlobalZIndex() + 10)

function triggerShow() {
  emit('update:show', false)
}
</script>
<style lang="less">
.yq-popup {
  position: fixed;
  width: 100%;
  max-height: 100%;
  background-color: #fff;
  // padding: 20px 15px 0;
  box-sizing: border-box;

  &--top {
    top: 0;
    left: 0;
    width: 100%;
  }

  &--bottom {
    bottom: 0;
    left: 0;
    width: 100%;

    &.round {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
}
</style>
