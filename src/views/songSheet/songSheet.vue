<template>
  <!-- 歌单 -->
  <div class="songSheet">
    <TheHead barType="title" leftIconColor="#fff" :bgColor="bgColor"></TheHead>
    <Bscroll 
      class="wrap" 
      :bsConfig="bsConfig"
      @scroll="handleScroll">
      <div class="wrap-content">
        <div class="imgWrap" :style="bgImg"></div>
        <div class="info">
          <div class="info-name oneLine">{{ songSheetInfo.name }}</div>
          <div class="info-desc oneLine">{{ songSheetInfo.description }}</div>
          <div class="info-operate flex">
            <div><van-icon name="share-o" /><i>{{ songSheetInfo.shareCount }}</i></div>
            <div><van-icon name="chat-o" /><i>{{ songSheetInfo.commentCount }}</i></div>
            <div><van-icon name="chat-o" /><i>{{ songSheetInfo.subscribedCount }}</i></div>
          </div>
        </div>
        <div class="wordBox">
          <div class="wordBox-wrap">
            <div class="songs">
              <SongItem
                v-for="(item, index) in songSheetInfo?.songs"
                :key="item.id"
                :idx="index"
                :data="item"/>
            </div>
          </div>
        </div>  
      </div>
    </Bscroll>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, nextTick, computed, onMounted, watch, watchEffect } from 'vue'
import TheHead from '@/components/TheHead.vue'
import SongItem from '@/components/item/SongItem.vue'
import Bscroll from '@/components/common/Bscroll.vue';
import { useRoute } from 'vue-router';
// store
import { storeToRefs } from 'pinia';
import { useSongSheetStore } from '@/stores/songSheet';

const useSheetStore = useSongSheetStore();
const { getSongSheetInfo } = useSheetStore;
const { songSheetInfo } = storeToRefs(useSheetStore);
const route = useRoute()
const bgColor = ref('transparent')
const bsConfig = reactive<BSConfig>({
  probeType: 3,
  scrollY: true,
  observeDOM: true,
  listenScroll: true,
  click: true
})

let posiY = ref(1)


useSheetStore.$reset()
getSongSheetInfo(Number(route.params.id))

function handleScroll(pos: { x: number, y:number }) {
  if (pos.y > 0) {
    posiY.value = 1 + pos.y / window.innerWidth;
  } 
  if (pos.y >= -50 && pos.y < 0) {
    const cal = Math.abs(pos.y / 50);
    bgColor.value = `rgba(200,200,200,${cal})`
  }
}
const bgImg = computed(() => {
  return { 'transform-origin': '50% 100%' ,'transform': `scale(${posiY.value})`, 'background-image': `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${songSheetInfo.value?.coverImgUrl})` }
})

</script>
<style lang="less">
@import '@/assets/css/mixin.less';
.wrap {
  height: calc(100vh);
  overflow: hidden;
}
.songSheet {
  position: relative;

  .imgWrap {
    .wh(100vw, 100vw);
    background-size: 100% 100%;
    box-sizing: border-box;
    position: relative;
    z-index: -1;

    img {
      .wh(100%, auto);
    }
  }

  .info {
    position: absolute;
    left: 0;
    top: 60vw;
    .wh(100vw, 100vw);

    &-name {
      .fc(18px, #333);
      text-indent: 16px;
    }

    &-desc {
      padding: 8px 0 0 16px;
      line-height: 1.2;
      transform: scale(.9);
      transform-origin: left top;

      &::after {
        content: '|';
        position: absolute;
      }
    }

    &-operate {
      // align-items: center;
      justify-content: space-around;
      padding: 12px 0;

      >div {
        width: 30%;
        height: 30px;
        border-radius: 20px;
        background-color: #bbb;
        display: inline-grid;
        grid-auto-flow: column;
        align-items: center;
        justify-content: center;

        >i {
          font-size: 13px;
        }
      }
    }
  }

  .wordBox {
    background-color: #fff;
    margin-top: -2px;
    position: relative;
    padding: 0 0 50px;

  }
}
</style>