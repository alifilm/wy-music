import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSongsStore = defineStore("counter", () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  // return { count, doubleCount, increment };

  const currentSongInfo = ref<{
    id: number
    al: { picUrl: string }
    ar: { name: string }[]
    name: string
  }>();

  return { currentSongInfo }
});