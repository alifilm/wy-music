<template>
  <div class="input">
    <input type="text" :placeholder="placeholder" v-model="inputVal" @change="handleInputChange" />
    <div :class="check_tip"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
const props = defineProps({
  placeholder: String,
  modelValue: String
})
const isRight = ref(false)

const check_tip = reactive({
  'check_tip': true,
  'check_right': isRight
})
const emit = defineEmits(['update: modelValue']);
const inputVal = computed({
  get() {
    return props.modelValue
  },
  set(val){
    emit('update: modelValue', val)
  }
})

// 方法
function handleInputChange() {
  isRight.value = true;
}
</script>
<style lang="less">
  .input {
    border-radius: 3px;
    box-sizing: border-box;
    position: relative;

    input {
      border-radius: 3PX;
      padding: 0 30px 0 8px;
      font-size: 14px;
      width: 100%;
      height: 40px;
      border: 1px solid #d1d1d1;
      box-sizing: border-box;

      &:focus {
        border: 1px solid orange;
      }

    }
    .check_tip {
      position: absolute;
      right: 0;
      top: 50%;
      padding: 8px;
      margin: -8px 8px 0 0;
    }
    .check_right {
      background: url('../assets/img/right.png') no-repeat center/16px auto;
    }
  }
</style>
