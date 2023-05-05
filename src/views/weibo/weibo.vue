<template>
  <div class="wb">
    <div>
      <Tabs v-model:active="active" @change="tabChange" sticky>
        <Tab :title="item.title" v-for="(item, index) in groups" :key="index">
          <GroupDetail
            v-if="active === index"
            :groupsDetail="groupsDetail"
          />
        </Tab>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tab, Tabs } from 'vant';
import { ref, reactive, computed, onMounted, nextTick } from 'vue';
import GroupDetail from '../../components/GroupDetail.vue'
import { getWeiboTit, getWeiboDetail } from '../../api/servers/weibo.js'
interface Group {
  group_type: number
}
type Groups = {
  title: string
  gid: string
  containerid: string
  uid: number
}
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
  pic_infos: any
  }[]
} 


let active = ref(0);
let groups = reactive<Groups[]>([]);
let groupsDetail = reactive<GroupsDetail>({ da: [] });

function tabChange(e: number) {
  active.value = e;
  groupsDetail.da = [];
  getWbdetail(groups[e].gid, groups[e].containerid, 1)
}

function getWbdetail(gid: string, containerid: string, pageNum: number) {
  getWeiboDetail(gid, containerid, pageNum).then(res => {
    nextTick(() => {
      groupsDetail.da = res.data.statuses;
    })
  })
}

onMounted(() => {
  getWeiboTit().then(res => {
    let group = res.data.groups.filter((item: Group)  => item.group_type === 1);
    let gp  =  group.reduce((prev: [], cur: { group: string }) => {
      return [...prev, ...cur.group]
    }, [])
    getWbdetail(gp[0].gid, gp[0].containerid, 1)
    nextTick(() => {
      groups.push(...gp);
    })
  })
})
</script>
