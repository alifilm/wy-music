<template>
  <div class="list">
    <div class="list-coverImg">
      <img :src="data.val.coverImgUrl" alt="">
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { topRankList } from '@/api/servers/api';
// route
import { useRoute } from 'vue-router';
const route = useRoute();

type Data = {
  val: {
    coverImgUrl?: string
  }
}
let data = reactive<Data>({ val: {} })

topRankList(Number(route.params.id)).then(res => {
  console.log(res);
  data.val = res.playlist;
})
</script>
<style lang="less" scoped>
.list {
  &-coverImg {
    img {
      width: 100vw;
    }
  }
}
</style>