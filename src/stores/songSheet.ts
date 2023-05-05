import { defineStore } from 'pinia'
import { playlistdetail, songDetail } from '@/api/servers/api'
import { ref } from 'vue'

type SongSheetTs = {
  name?: string
  id: number
  description?: string
  coverImgUrl?: string
  songs: Array<songTypes>
  tracks?: Array<{
    name: string
  }>
}

export const useSongSheetStore = defineStore('songSheet', {
  state: () =>{
    return {
      // 记录歌单
      songSheetInfo: <playListTypes>{},
      // playList: <songTypes[]>[]
    }
  },
  actions: {
    // 设置播放列表
    // async setPlayList(ids: number[]) {
    //   const songsDetail: songTypes[] = await songDetail(ids.join(','));
    //   console.log('songsDetail', songsDetail)
    //   this.playList = songsDetail;
    // },
    // 获取歌单信息
    async getSongSheetInfo(songSheetId: number) {
      const result = await playlistdetail(songSheetId);
      console.log(result.playlist)
      this.songSheetInfo = result.playlist;
      // const result = await playlistdetail(songSheetId);
      // const ids = result.playlist.trackIds.map((a: any) => a.id);
      // this.setPlayList(ids)
    }
  }
  
})