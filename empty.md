<template>
  <div class="video">
    <!-- <el-carousel class="swiper" height="600px" :autoplay="false">
      <el-carousel-item class="swiper_item" v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl"></h3>
      </el-carousel-item>
    </el-carousel> -->
    <video
      ref="video"
      class="video-js vjs-default-skin"
      width="600px"
      height="600px"
      controls
    >
      <source
        src="http://videofiles.dahebao.cn/5b199581vodcq1306441264/9d1509fb387702305295457667/playlist.m3u8"
      />
    </video>
  </div>
</template>
<script lang="ts" setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { ref, reactive, onMounted, onUpdated, watch } from "vue";
// export interface Props {
//   liveProps?: {
//     src: string;
//     width: string;
//     height: string;
//   };
// }
// const live = reactive([1, 2, 3, 4]);
// const props = withDefaults(defineProps<Props>(), {
//   liveProps: () => {
//     return {
//       width: "600",
//       height: "300",
//       src: "http://videofiles.dahebao.cn/5b199581vodcq1306441264/fde566ad387702304900652277/playlist.m3u8",
//     };
//   },
// });

const player = ref();
const video = ref();
function playValue() {
  player.value = videojs(video.value, {
    preload: "auto",
    autoplay: true,
    language: "zh-CN",
    muted: true,
  });
}
// watch(
//   sum,
//   (newValue, oldValue) => {
//     console.log("sum变了", newValue, oldValue);
//   },
//   { immediate: true }
// );
onMounted(() => {
  console.log(playValue());
  playValue();
});
onUpdated(() => {});
</script>

<style lang="less" scoped>
.video {
  font-size: 60px;
  width: 100%;
  height: 100%;
  .swiper {
    .swiper_item {
      height: 600px;
      width: 94%;
      background: #aaa;
    }
  }
}
</style>
