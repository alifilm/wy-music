<template>
  <div class="search">
    <TheHead bgColor="#fafafa" v-model="keyWords"></TheHead>
    <div class="search-context" v-show="ctxShow">
      <div class="flex" v-for="item in searchContext.val">
        <div><VanIcon name="search" size="18px" color="#888" /></div>
        <div class="name">{{ item.name }} {{ item.artists[0].name}}</div>
      </div>
    </div>
    <div class="search-hot">
      <span v-for="item in hotSongs">{{ item.first }}</span>
    </div>
    <div class="flex">
      <div class="hotlist">
        <div class="hotlist-tit flex">
          <div>热搜榜</div>
          <div class="play">>播放</div>
        </div>
        <div class="hotlist-ctx">
          <div v-for="(item, index) in hotSongsList" class="hotlist-ctx-item">
            <span>{{ index+1 }}</span>
              {{ item.searchWord }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, reactive, watch } from 'vue';
import { search, serachHot, serachHotDetail, cloudsearch } from '../../api/servers/api'
import TheHead from '../../components/TheHead.vue'

let keyWords = ref('');
let ctxShow = ref(false);
const searchContext = reactive<{
  val: {
    name: string;
    artists: {name: string}[]
  }[]
}>({ val: [] });
const hotSongs = reactive<{
  first: string
}[]>([]);
const hotSongsList = reactive<{
  searchWord: string
}[]>([]);
const hotTalk = reactive<{
  searchWord: string
}[]>([]);

// 每日推荐歌曲
onBeforeMount(() => {
  serachHot().then(res => {
    hotSongs.push(...res.result.hots)
  })
  serachHotDetail().then(res => {
    hotSongsList.push(...res.data)
  })
})

watch(keyWords, (val, oldVal) => {
  console.log(val, oldVal)
  if (val) {
    ctxShow.value = true;
    search(val).then(res => {
      searchContext.val = res.result.songs.slice(0,6);
    })
  } else {
    ctxShow.value = false;
  }
})


</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.search {
  .wh(100vw, 100vh);
  padding: 46px 0 50px;
  box-sizing: border-box;
  background-color: #fafafa;

  &-context {
    position: fixed;
    left: 0;
    top: 46px;
    width: 100vw;
    height: calc(100vh - 46px);
    background-color: #fff;
    z-index: 500;

    .flex {
      height: 40px;
      padding: 0 10px;
      align-items: center;

      .name {
        padding: 0 0 0 10px;
      }
    }
  }

  &-hot {
    padding: 20px 10px;
    span {
      display: inline-block;
      padding: 6px 8px;
      font-size: 14px;
      border-radius: 15px;
      margin: 0 15px 5px 0;
      background-color: #efefef;
    }
  }
}
.hotlist {
  background-color: #fff;
  border-radius: 10px;
  padding: 0 10px;
  width: 100%;
  &-tit {
    font-weight: bolder;
    font-size: 15px;
    padding: 14px 0 14px;
    align-items: center;
    .onePx('bottom');

    .play {
      font-size: 12px;
      font-weight: normal;
      background-color: #efefef;
      padding: 4px 8px;
      border-radius: 20px;
      margin-left: 20px
    }
  }
  &-ctx {
    &-item {
      font-size: 15px;
      padding: 8px 0;
      &:nth-of-type(-n+3) {
        font-weight: bold;
        span {
          color: rgba(255, 0, 0, 0.88);
        }
      }
      span {
        width: 20px;
        display: inline-block;
        text-align: left;
      }
    }
  }
}
</style>