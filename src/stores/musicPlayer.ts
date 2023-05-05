import { defineStore } from "pinia";
import { songDetail, playlistdetail, songUrl } from "@/api/servers/api";

export const useMusicPlayerStore = defineStore('musicPlayer', {
  state: () => {
    return {
      isShow: false, // 播放器是否显示
      playing: false,
      playSongId: <number | string>0, // 当前播放的id
      playList: <songTypes[]>[], //播放列表
      playListIds: <any[]>[]
    }
  },
  getters: {
    curSong:(state) => {
      return state.playList.find((song: songTypes) => song.id == state.playSongId) ||
      state.playList[0] || {}
    }
  },
  actions: {
    // 设置播放状态
    setPlaying(val: boolean) {
      this.playing = val;
    },
    // 歌单列表下点击单个歌曲
    async setPlayListOne(data: songTypes, id: number) {
      if (this.playSongId === id) {
        console.log('当前正在播放')
        return;
      }
      let idx = this.playList.findIndex(item => item.id === id);
      if (idx === -1) {
        // 点击了列表歌曲
        this.playList.unshift(data);
        this.playListIds.push(id);
      }
      this.playSongId = id;

      // songUrl(id).then(res => {
      //   console.log(res)
      // })
    },
    // 设置播放列表
    async setPlayList(ids: number[], id: number) {
      if(id === this.playSongId) {
        console.log('setPlayList当前正在播放')
        return;
      }
      const result = await songDetail(ids.join(','));
      console.log(result);
      this.playList = result;
      this.playSongId = id;
    },

    // 歌单
    async setplayListSong(playListId: number, id?: number) {
      const playListRes: any = await playlistdetail(playListId);
      const ids = playListRes.playlist.trackIds.map((a: any) => a.id).slice(0, 30);
      this.setPlayList(ids, id || ids[0]);
    },
  }
})