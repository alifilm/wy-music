<script lang="ts">
import WelcomeItem from "../components/WelcomeItem.vue";
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      msg: 'hello',
      autt: {
        id: 'hw',
        class: 'mm',
        da: false
      },
      attributeName: 'txt',
      url: {
        name: '1',
        age: 19,
        sex: {
          ha: 's',
          t: 'pp',
          q: [3,4,5]
        }
      },
      items: [3,4,5,6]
    }
  },
  components: {
    WelcomeItem
  },
  mounted: function() {
    console.log(this.$refs.arr)
  },
  methods: {
    toTitleDate(res: string) {
      return 'myq'
    }
  }
})
</script>

<template>
  <main>
    <WelcomeItem v-model:modelMsg="msg" ></WelcomeItem>
    <div v-bind="autt" class="home" :title="toTitleDate('string')" v-bind:[attributeName]="url">{{ msg }}</div>
    {{ url.sex.ha }}
    <input type="text" :value="url.sex.ha">
    <ul>
      <li v-for="item in items" ref="arr">
        {{ item }}
      </li>
    </ul>
  </main>
</template>
