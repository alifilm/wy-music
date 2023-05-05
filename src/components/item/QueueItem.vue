<template>
  <div class="queue-list flex">
    <div>
      <div>{{ data.name }}</div>
      <div v-for="(it, idx) in data.tracks" :key="idx" class="flex">
        <div><img src="" alt=""></div>
        <div>{{ idx }}</div>
        <div>
          <div>{{ it.first }}</div>
          <div>{{ it.second }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  data: {
    type: Object,
    default: {}
  }
})
</script>
<style>
</style>

<!-- <template>
  <template v-if="data.coverImgUrl">
    <RouterLink :class="['queue-list flex', randomColor]" :to="`/list/${data.id}`">
      <div class="queue-list-left flex flex1">
        <div class="line2">{{ data.description }}</div>
        <div>{{ changeTimer(data.updateTime) }} <span style="float: right;">{{ data.updateFrequency }}</span></div>
      </div>
      <div class="queue-list-right">
        <img :src="data.coverImgUrl" alt="" />
      </div>
    </RouterLink>
  </template>
  <template v-else>
    <div :class="['queue-list flex', randomColor]">
      <div class="queue-list-left flex flex1">
        <div class="line2">{{ data.description }}</div>
        <div>{{ changeTimer(data.updateTime) }} <span style="float: right;">{{ data.updateFrequency }}</span></div>
      </div>
      <div class="queue-list-right">
        <svg-icon name="nopic" width="20px" height="20px" color="#aaa"/>
      </div>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { changeTimer } from '@/utils/util'
defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const randomColor = computed(() => {
  let randomNum = Math.floor(Math.random() * 60);
  return 'linear' + [[0,20,0], [21,40,1], [41,60,2]].filter((item: number[]) => {
    return randomNum >= item[0] && randomNum <= item[1];
  })[0][2];
})
</script>
<style lang="less" scoped>
.queue-list {
  margin: 0 10px 18px 0;
  color: #666;
  border-radius: 10px;
  font-size: 13px;
  position: relative;

  &-left {
    padding: 8px 8px 2px;
    line-height: 1.2;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }

  &-right {
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;

    img {
      width: 100%;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
}
.linear0 {
  background-color: #FFDEE9;
  background-image: linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
}
.linear1 {
  background-color: #D9AFD9;
  background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
}
.linear2 {
  background-color: #8BC6EC;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
}
</style> -->