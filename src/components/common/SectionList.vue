<template>
  <div class="section">
    <div class="section-title">{{ title }}<i class="van-icon van-icon-arrow"></i></div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
<style scoped lang="less">
.section {
  padding: 0 0 0 10px;

  &-title {
    font-weight: bold;
    font-size: 16px;
    padding: 16px 0;
  }
}
</style>