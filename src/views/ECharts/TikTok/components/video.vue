<template>
  <div class="title">
    <div class="span">{{ data.video[data.active].title }}</div>
  </div>
  <video
    :src="data.video[data.active].videoUrl"
    autoplay
    controls
    muted
    @ended="playEnded"
    ref="videoRef"
  >
    <!-- <source  type="video/mp4" /> -->
  </video>
</template>
<script lang="ts" setup>
import { watch, ref, reactive } from "vue";
import { useCounterStore } from "@/stores/counter";
const videoRef = ref(null);
const store = useCounterStore();
const data: any = reactive({
  //item遍历部门
  active: 0,
  video: [
    {
      title: "大河报豫视频",
      videoUrl: "",
    },
  ],
});
watch(
  () => store.$state.video,
  () => {
    if (store.$state.video.length != 0) {
      data.video = store.$state.video;
    }
  }
);
watch(
  () => store.$state.active,
  () => {
    data.active = store.$state.active;
  }
);
//视频播放结束跳下一个
function playEnded() {
  if (store.$state.active + 1 < store.$state.video.length) {
    store.$state.active++;
  } else {
    store.$state.active = 0;
  }
}
//改变左侧list
function clickVideo() {
  // store.changeResult(4);
}
</script>
<style scoped lang="less">
.title {
  width: 100%;
  height: 60px;
  line-height: 62px;
  font-size: 22px;
  text-align: center;
  background-image: url("@/assets/4-bg/14-title.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 0 80px;
  overflow: hidden;
  .span {
    background-image: -webkit-linear-gradient(bottom, #fff, #006eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

video {
  height: 100%;
  width: 100%;
}
</style>
