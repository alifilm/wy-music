<template>
  <div class="recommend" ref="rec">
    <div style="">
      <div v-for="item in dayRecommendSongs" class="recommend-item flex">
        <div>{{ item }}</div>
        <!-- <div class="picWrap"><img :src="item.al.picUrl" alt=""></div>
        <div class="cen">
          <div>{{ item.name }} {{ item.tns ? `(${item.tns[0]})` : ""}}</div>
          <div class="oneLine">{{ item.reason }} {{ item.artists }}- {{ item.al.name }}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { getRecommendSongs } from '@/api/servers/api';
import { nextTick } from 'vue';

const rec = ref<HTMLDivElement>()
let dayRecommendSongs = reactive<{
  name: string;
  al: {
    picUrl: string;
    name: string;
  }
  ar: string[];
  artists: string;
  tns: string[];
  reason: string;
}[]>([])
let res = Array(20).fill(10);
dayRecommendSongs.push(...res)
// getRecommendSongs().then(res => {
//   let result = res.data.dailySongs.map(it => {
//     return {
//       ...it,
//       artists: it.ar.reduce((pre: string, ll: {name: string}) => {
//         return pre + '/' + ll.name;
//       }, "").substr(1)
//     }
//   })
//   dayRecommendSongs.push(...result);
// })

nextTick(() => {
  // console.log(rec.value?.scrollTop)
  rec.value?.addEventListener('scroll', scrollHandle)
})

function scrollHandle(e: Event) {
  console.log(rec.value?.scrollTop)
  // console.log(rec.value?.scrollHeight)
  // console.log(rec.value?.offsetTop)
}
</script>
<style scoped lang="less">
.recommend {
  height: 100vh;
  overflow: auto;

  &-item {
    height: 50px;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
    
    .picWrap {
      padding: 0 10px 0 0;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .cen {
      width: 280px;
    }
  }
}
</style>