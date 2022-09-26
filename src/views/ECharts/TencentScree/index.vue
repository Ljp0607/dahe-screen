<template>
  <div class="content">
    <iframe class="iframe" :src="useStore.src" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useCounterStore } from "../../../stores/counter";
const route = useRoute();
const useStore = useCounterStore();
watch(
  () => route.query.src,
  () => {
    if (route.query.src) {
      useStore.changeSrc(
        typeof route.query.src == "string" ? route.query.src : ""
      );
    }
  }
);
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  .iframe {
    width: 100%;
    height: 100%;
  }
  .img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
