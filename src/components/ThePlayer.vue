<template>
  <div class="player">
    <Overlay v-model:show="isShow"></Overlay>
    <Popup v-model:show="isShow" position="bottom" round style="height: 70%">
      <div class="player-title flex">
        <svg-icon name="xunhuan" color="#111" size="18px"></svg-icon>
        <div class="tit">顺序播放{{ totalSongLen }}</div>
      </div>
      <Bscroll class="player-list" :bs-config="bsConfig" :isExit="isShow">
        <div class="player-list-wrap">
          <div :class="['flex', { 'active': playSongId === it.id }]" v-for="it in playList" :key="it.id">
            <div class="oneLine">{{ it.name }} - {{ it.artist?.name }}</div>
            <div></div>
            <div :class="['musicPlayAnimation', { 'active': playSongId === it.id }]">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="flex1"></div>
            <div>x</div>
          </div>
        </div>
      </Bscroll>
    </Popup>
    <div :class="['player-panel flex', { 'slideTop': curSong.name }]">
      <div class="songPic"><img :src="curSong.album?.picUrl" alt=""></div>
      <div class="oneLine">{{ curSong?.name }} / {{ curSong.artist?.name }}</div>
      <div class="flex1"></div>
      <div class="player-panel-btn" @click="playMusic">
        <van-icon color="#888" :name="playing ? 'pause' : 'play'" size="20px"></van-icon>
      </div>
      <div @click="isShow = !isShow">
        <van-icon name="bars" size="25px" color="#888" />
      </div>
    </div>
    <audio 
      ref="audioRef" 
      preload="auto" 
      :src="audioAttrs.mp3Url" 
      @play="audioPlay"
      @pause="audioPause"
      @loadeddata="audioLoaded"
    ></audio>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, nextTick, watchEffect } from 'vue'
import Bscroll from './common/Bscroll.vue'
import Popup from './popup/index.vue'
import Overlay from './overlay/Overlay.vue'
import { storeToRefs } from 'pinia'
import { useMusicPlayerStore } from '../stores/musicPlayer'
let musicStore = useMusicPlayerStore();
let { 
  isShow,
  playing,
  playSongId, 
  curSong, 
  playList 
} = storeToRefs(musicStore);
const bsConfig = reactive<BSConfig>({
  probeType: 3,
  scrollY: true,
  observeDOM: true,
  click: true
})

const totalSongLen = computed(() => playList.value.length ? `(${playList.value.length}首)` : '');

let audioRef = ref<HTMLAudioElement>()
const audioAttrs = reactive({
  mp3Url: '',
  duration: 0
})
let src = ref()

const {
  audioPlay,
  audioPause,
  audioLoaded
} = useAudioEvent();

function playMusic() {
  playing.value = !playing.value;
}

function useAudioEvent() {
  // 监听播放和暂停
  watchEffect(()=> {
    if (curSong.value.id) {
      audioAttrs.mp3Url = `https://music.163.com/song/media/outer/url?id=${musicStore.curSong.id}.mp3`;
      if (playing.value) {
        nextTick(() => {
          audioRef.value?.play();
        })
      } else {
        nextTick(() => {
          audioRef.value?.pause();
        })
      }
    }
  })
  return {
    audioPlay() {
      musicStore.setPlaying(true);
    },
    audioPause() {
      musicStore.setPlaying(false);
    },
    audioLoaded() {
      nextTick(() => {
        audioRef.value?.play();
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '@/assets/css/mixin.less';
.player {
  position: fixed;
  z-index: 1000;
  left: 0;
  bottom: -50px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  &-title {
    align-items: center;
    font-size: 16px;
    padding: 20px 15px;
    .onePx('bottom');

    svg {
      margin-right: 20px;
    }

    .tit {
      font-size: 16px;
      font-weight: bold;
    }
  }

  &-list {
    background-color: #fff;
    padding: 8px 15px;
    height: 70%;

    &-wrap {
      
    }

    .flex {
      .onePx('bottom');
      height: 38px;
      align-items: center;
      font-size: 14px;
      justify-content: space-between;

      &.active {
        color: #c48ced;

        .musicPlayAnimation {
        }
      }

      .oneLine {
        width: 220px;
      }
    }
  }
  &-panel {
    align-items: center;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .5);
    padding: 0 20px;
    box-sizing: border-box;
    transition: all 1s linear;
    transform: translateY(50px);
    background-color: #fff;

    &.slideTop {
      transform: translateY(-50px);
    }

    .songPic {
      padding: 0 10px 0 0;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }

    .flex1 {
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-btn {
      border-radius: 50%;
      padding: 3px;
      border: 1px solid #ddd;
      margin: 0 14px 0 0;
    }
  }
}
</style>
