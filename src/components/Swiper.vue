<template>
  <Swiper
    :autoplay="{ delay: 1300, disableOnInteraction: false}">
    <SwiperSlide v-for="item in swiperData">
      <div class="sp-wrap">
        <img :src="item.imageUrl" alt="" v-if="item.imageUrl"/>
        <svg-icon name="nopic" width="40px" height="40px" v-else/>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
<script setup lang="ts">
import { Autoplay } from 'Swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css'

type Props = {
  swiperData?: Array<{
    imageUrl: string
  }>
}
const modules = [Autoplay]
const props = withDefaults(defineProps<Props>(), {
  swiperData: () => [
    { imageUrl: '' },
    { imageUrl: '' },
    { imageUrl: '' }
  ]
})

</script>
<style lang="less">
.swiper-slide {
  .sp-wrap {
    width: 100%;
    height: 152px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>