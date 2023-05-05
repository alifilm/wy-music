<template>
  <div class="iconMenu">
    <Bscroll :bs-config="bsConfig" class="iconMenu-scroll" @scroll="handleScroll">
      <div class="iconMenu-wrap">
        <div class="iconMenu-item" v-for="item in data" @click="jumpModule(item.name)">
          <div class="imgWrap">
            <img :src="item.iconUrl" />
          </div>
          <div>{{ item.name }}</div>
        </div>
      </div>
    </Bscroll>
    <div class="iconMenu-nav"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import Bscroll from './Bscroll.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const bsConfig = reactive<BSConfig>({
  probeType: 3,
  scrollX: true,
  observeDOM: true,
  listenScroll: true,
  click: true
})
const scrollTranslate = ref('0px');
const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const handleScroll = (posi: { x: number, y: number }) => {
  if (posi.x > 0) {
    scrollTranslate.value =  -posi.x/50 + 'px';
  } else {
    scrollTranslate.value = Math.abs(posi.x/25) + 'px';
  }
}
function jumpModule(name: string) {
  let stu: { [key: string]: string } = {
    '每日推荐': '/dayRecommend'
  }
  if (stu[name]) {
    router.push(stu[name])
  }
}
</script>
<style lang="less" scoped>
.iconMenu {
  padding: 12px 0;

  &-wrap {
    display: inline-block;
  }

  &-item {
    min-width: 20vw;
    display: inline-block;
    text-align: center;

    .imgWrap {
      width: 60px;
      height: 60px;
      overflow: hidden;
      margin: auto;

      img {
        width: 100%;
        height: 100%;
        filter: drop-shadow(60px 0 0 #f00);
        transform: translateX(-60px);
      }
    }
  }

  &-nav {
    width: 30PX;
    height: 3px;
    background-color: #d3d6f5;
    margin: 10px auto 0;
    border-radius: 20px;
    position: relative;
    overflow: hidden;

    &::after{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 3px;
      width: 15PX;
      background-color: #f00;
      border-radius: 20px;
      transform: translateX(v-bind(scrollTranslate));
      transform-origin: 0 0;
    }
  }
}
</style>