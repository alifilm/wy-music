<template>
  <div class="yq-nav">
    <div class="yq-nav_container">
      <VanIcon name="arrow-left" size="18px" :color="leftIconColor" v-if="isHomePage" @click="back" />
      <div class="yq-nav-cen yq-nav-search" v-if="barType === 'search'">
        <VanIcon name="search" size="18px" color="#888" />
        <input type="text" :value="modelValue" @input="handleInput" />
      </div>
      <div v-if="barType === 'title'" class="yq-nav-cen title">{{ title }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
export interface Props {
  // 导航栏中间类型
  barType?: string
  leftIconColor?: string
  // 背景色
  bgColor?: string
  // search输入值
  modelValue?: string
  // search框的颜色
  searchBgcolor?: string
  // title模式下标题
  title?: string
}

const curRouter = useRouter();
withDefaults(defineProps<Props>(), {
  leftIconColor: '#888',
  barType: 'search',
  bgColor: 'rgba(255, 255, 255, .6)',
  modelValue: '',
  searchBgcolor: '#fff'
})

const emits = defineEmits(['update:modelValue'])

const isHomePage = computed(() => {
  return curRouter.currentRoute.value.path !== '/';
})

// function
function back() {
  console.log(curRouter)
  curRouter.back();
}

const handleInput = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
<style lang="less">
.yq-nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 500;
  background: v-bind(bgColor);

  &_container {
    padding: 10px 14px;
    width: 100%;
    height: 46px;
    box-sizing: border-box;
    display: grid;
    align-items: center;
    grid-template: 
    "leftIcon cen rightIcon" 
    /18px 1fr 18px;

    >i {
      grid-area: leftIcon;
    }

    .yq-nav-cen {
      grid-area: cen;
    }
  }

  &-cen {
    border-radius: 50px;
    height: 100%;

    &.title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      display:grid;
      align-items:center;
    }
  }

  &-search {
    display: flex;
    align-items: center;
    padding: 0 6px;
    background: v-bind(searchBgcolor);

    >i {
      margin-right: 6px;
    }

    >input {
      border: 0;
      width: 100%;
      height: 100%;
    }

  }
}
</style>