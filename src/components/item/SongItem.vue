<template>
  <div class="song-item flex">
    <div class="song-item-idx">{{ idx + 1 }}</div>
    <div class="song-item-ctx">
      <div class="oneLine">{{ data.name }}</div>
      <div class="oneLine">{{ data.isVip ? 'vip' : ''  }}  {{ data.artist.name }} - {{ data.album.name }}</div>
    </div>
    <div class="flex1"></div>
    <div class="song-item-icon">
      <van-icon name="play" size="18px" @click="playSongs(data.id)" v-show="!data.isVip"></van-icon>
      <van-icon name="more-o" size="18px"></van-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { songDetail } from '@/api/servers/api'
// store
import { useMusicPlayerStore } from '@/stores/musicPlayer'
const musicStore = useMusicPlayerStore();
const { setPlayList } = musicStore;

const props = defineProps<{
  data: songTypes,
  idx: number
}>()

// function
function playSongs(songId: number) {
  const resourceType = props.data.resourceType;
  switch(resourceType) {
    case 'SONG':
      musicStore.setPlayListOne(props.data, props.data.id);
  }
  // setPlayList([songId])
}
</script>
<style lang="less" scoped>
.song-item {
  padding: 10px 15px;
  font-size: 13px;
  justify-content: space-between;
  align-items: center;
  color: #666;

  &-idx {
    width: 20px;
    text-align: left;
  }

  &-ctx {
    >div {
      width: 260px;

      &:nth-child(1) {
        color: #333;
        font-size: 15px;
        padding: 0 0 4px;
        font-weight: bold;
      }

      &:nth-child(2) {
      }
    }
  }

  &-icon {
    i {
      margin-left: 8px;  
    }
  }
}
</style>