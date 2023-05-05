<template>
  <div class="gp">
    <div class="gpDetail" v-for="(it, dex) in groupsDetail.da" :key="it.id">
      <div class="head flex">
        <div class="iconWrap"><img :src="`https://hiwebsit.com/api/v1/url?url=${it.user.avatar_hd}`" /></div>
        <div class="user">
          <div class="tit">{{ it.user.screen_name }}</div>
          <div class="short">{{ dealSource(it.source) }}</div>
        </div>
      </div>
      <div class="txt">
        {{it.text_raw}}
      </div>
      <ul v-if="it.pic_ids && it.pic_ids.length > 0" class="flex imgWrap">
        <li v-for="(ll, idx) in it.pic_ids" :key="idx" @click="previewImg(dex, idx)">
          <img :src="`https://hiwebsit.com/api/v1/url?url=${it.pic_infos[ll].bmiddle.url}`" />
        </li>
      </ul>
      <div v-if="it.page_info?.object_type === 'video'" class="vd">
        <video controls :src="`https://hiwebsit.com/api/v1/url?url=${it.page_info.media_info.stream_url}`"></video>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { showImagePreview } from 'vant';

type GroupsDetail = {
  da: {
    id: number
    user: {
      screen_name: string
      avatar_hd: string
    }
    text_raw: string
    source: string
    pic_ids: Array<string>
    page_info?: { 
      object_type: string
      media_info: {
        stream_url: string
      }
    }
    pic_infos: any
  }[]
}

const props = defineProps<{
  groupsDetail: GroupsDetail
}>()

let dealSource =  computed(() =>{
  return function(str: string) {
    return str.substring(0, 10);
  }
})

function previewImg(index: number, idx: number) {
  // console.log(this.groupsDetail)
  let data = props.groupsDetail.da[index].pic_ids.reduce((prev: Array<string>, cur: string) => {
    return [...prev, `https://hiwebsit.com/api/v1/url?url=${props.groupsDetail.da[index].pic_infos[cur].large.url}`]
  }, [])
  let obj = {
    startPosition: idx,
    images: data
  }
  showImagePreview(obj)
}

</script>
<!-- <script lang="ts">
import { defineComponent } from 'vue';
import { showImagePreview } from 'vant';

export default defineComponent({
  props: {
    groupsDetail: {
      type: Object
    }
  },
  computed: {
    dealSource() {
      return function(str: string) {
        return str.substring(0, 10);
      }
    }
  },
  methods: {
    previewImg(index: number, idx: number) {
      // console.log(this.groupsDetail)
      let data = this.groupsDetail!.da[index].pic_ids.reduce((prev: Array<string>, cur: string) => {
        return [...prev, this.groupsDetail!.da[index].pic_infos[cur].large.url]
      }, [])
      let obj = {
        startPosition: idx,
        images: data
      }
      showImagePreview(obj)
    }
  }
})
</script> -->
<style lang="less">
  .gp {
    background-color: #f0f0f0;
    .gpDetail {
      margin: 0 0 20px;
      padding: 15px;
      background-color: #fff;
      .head {
        margin: 0 0 10px;
        align-items: center;
        .iconWrap {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 15px 0 0;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .user {
          div {
            &:nth-of-type(1) {
              font-weight: bold;
              color: #000;
            }
            &:nth-of-type(2) {
              padding-top: 6px;
            font-size: 12px;
            }
          } 
        }
      }
      .txt {
        line-height: 1.2;
      }
      .imgWrap {
        flex-wrap: wrap;
        padding: 6px 0 0;
        justify-content: space-between;
        &::after {
          content: '';
          width: 32%;
          flex-basis:auto
        }

        li {
          width: 32%;
          height: 110px;
          position: relative;
          margin: 0 0 10px;

          img {
          // margin: 0 10px 14px 0;
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .vd {
        video {
          width: 100%;
        }
      }
    }
  }
</style>
