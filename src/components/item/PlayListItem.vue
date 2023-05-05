<template>
  <template v-if="data.picUrl">
    <RouterLink class="playItem" :to="`/songSheet/${data.id}`">
      <div class="playItem-imgWrap">
        <img :src="data.picUrl" :alt="data.name">
        <div class="item-count">{{ changeNumber(data.playCount) }}</div>
        <div class="item-icon" @click.prevent="querySongList(data.id)"><van-icon name="play" size="20px" color="#fff" /></div>
      </div>
      <div class="playItem-name line2">{{ data.name }}</div>
    </RouterLink>
  </template>
  <template v-else>
    <div class="playItem">
      <div class="playItem-imgWrap bg">
        <svg-icon name="nopic" width="40px" height="40px"/>
      </div>
      <div class="playItem-name">
        <van-skeleton-paragraph round />
      </div>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { changeNumber } from '@/utils/util'
// store
import { useMusicPlayerStore } from '@/stores/musicPlayer';
const musicStore = useMusicPlayerStore();
defineProps({
  data: {
    type: Object,
    default: {}
  }
})

function querySongList(param: number) {
  musicStore.setplayListSong(param);
}
</script>
<style lang="less" scoped>
.playItem {
  margin: 0 22px 0 0;
  border-radius: 10px;
  width: 120px;
  box-sizing: border-box;
  flex-shrink: 0;

  &-imgWrap {
    position: relative;
    box-shadow: 0 0 3px 0 #eee;

    >img {
      width: 120px;
      border-radius: 10px;
    }
    .item-count {
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      padding: 6px 6px 0 0;
    }
    .item-icon {
      position: absolute;
      right: 10%; 
      bottom: 10%;
    }
    &.bg {
      line-height: 1;
      height: 120px;
      display: grid;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 3px #efefef;

      &::after {
        content: "";
        position: absolute;
        left: 5%;
        top: -5px;
        width: 90%;
        height: 20px;
        background-color: #eee;
        z-index: -1;
        border-radius: 10px;
      }
    }
  }

  &-name {
    line-height: 1.1;
    color: #333;
    font-size: 12px;
    margin: 4px 0;
    height: 26px;
  }
}
</style>