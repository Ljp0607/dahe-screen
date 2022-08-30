<template>
  <div class="video">
    {{ liveProps.width }}
    <video
      ref="video"
      class="video-js vjs-default-skin"
      :width="liveProps.width"
      :height="liveProps.height"
      controls
    >
      <source :src="liveProps.src" />
    </video>
  </div>
</template>

<script lang="ts" setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { ref, reactive, onMounted, onUpdated } from "vue";
export interface Props {
  // liveProps?: Object;
  liveProps?: {
    src: string;
    width: string;
    height: string;
  };
}
const props = withDefaults(defineProps<Props>(), {
  liveProps: () => {
    return {
      width: "600",
      height: "300",
      src: "http://videofiles.dahebao.cn/5b199581vodcq1306441264/fde566ad387702304900652277/playlist.m3u8",
    };
  },
});

const player = ref();
const video = ref();
onMounted(() => {
  player.value = videojs(video.value, {
    preload: "auto",
    autoplay: true,
    language: "zh-CN",
    muted: true,
  });
});
onUpdated(() => {
  console.log(123);
  // player.value = videojs(video.value, {
  //   preload: "auto",
  //   autoplay: true,
  //   language: "zh-CN",
  //   muted: true,
  // });
});
</script>

<style lang="less" scoped>
.video {
  width: 100%;
  height: 100%;
}
</style>
