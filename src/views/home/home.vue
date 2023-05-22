<template>
  <div class="home">
    <TheHead
      searchBgcolor="linear-gradient(to right, #d3d6f5, #e7d3ea)"
      @click="goSearch"/>
    <Swiper :swiperData="swiperData" />
    <IconMenu :data="iconData"/>
    <SectionList title="推荐歌单">
      <div class="section-wrap">
        <PlayListItem 
          v-for="item in recommend"
          :key="item.id"
          :data="item"/>
      </div>
    </SectionList>
    <SectionList title="排行榜">
      <div class="section-list">
        <QueueItem
          v-for="item in topListAll"
          :key="item.id"
          :data="item"/>
      </div>
    </SectionList>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import { getBanner, iconMenu, personalized, toplist, topRankList, topListDetail } from '../../api/servers/api'
import Swiper from '../../components/Swiper.vue'
import TheHead from '@/components/TheHead.vue'
import IconMenu from '@/components/common/IconMenu.vue'
import SectionList from '@/components/common/SectionList.vue'
import PlayListItem from '@/components/item/PlayListItem.vue'
import QueueItem from '@/components/item/QueueItem.vue'

let swiperData = ref<bannerTypes[]>([{ imageUrl: '' }, { imageUrl: '' }])
let iconData = ref([])
let recommend = ref<playListTypes[]>(
  [{ picUrl: '', name: '' }, { picUrl: '', name: '' }, { picUrl: '', name: '' }]
)
let topListAll = ref<QueueListTypes[]>([
  { description: '', coverImgUrl: '' }, { description: '', coverImgUrl: '' }, { description: '', coverImgUrl: '' }
])
const curRouter = useRouter()

getBanner().then(res => {
  swiperData.value = res.banners;
})
// icon入口
iconMenu().then(res => {
  iconData.value = res.data;
})
topListDetail().then(res => {
  const result = res.list.slice(0,3)
  topListAll.value = result;
})
topRankList(3778678).then(res => {
  console.log('res')
})
// 推荐歌单
personalized().then(res => {
  const result = res.result.slice(0,6)
  recommend.value = result;
})
// 榜单
// toplist().then(res => {
//   const result = res.list.slice(0,3)
//   topListAll.value = result;
// })

function goSearch() {
  curRouter.push('/search')
}

</script>
<style lang="less">
.home {
  padding: 46px 0 50px;
  border: 1px solid #fff;
  background: linear-gradient(#fbf1ff, #fff);
}
.section-wrap {
  overflow-x: scroll;
  overflow-y: hidden;
  flex-wrap: nowrap;
  scroll-padding-right: 22px;
  display: flex;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

</style>