<template>
  <div 
    class="yq-overlay" 
    :style="{ 'zIndex': Zindex }"
    v-show="show"
    @click="triggerShow"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useGlobalZIndex } from '../popup/util/global-index'

type Props = {
  show: boolean
}
withDefaults(defineProps<Props>(), {
  show: false
})
let Zindex =  computed(() => useGlobalZIndex())
const emit = defineEmits(['update:show'])

function triggerShow() {
  console.log('triggerShow')
  emit('update:show', false)
}
</script>
<style lang="less">
.yq-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background-color: rgba(#000, .6);
}
</style>
