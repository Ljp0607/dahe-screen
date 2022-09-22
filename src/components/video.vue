<template>
  <div class="video">
    <div class="icon_left btn" @click="clickLast">
      <el-icon color="#ffffff" :size="40"><ArrowLeft /></el-icon>
    </div>
    <div class="icon_right btn" @click="clickNext">
      <el-icon color="#ffffff" :size="40"><ArrowRight /></el-icon>
    </div>
    <video
      ref="video"
      class="video-js vjs-default-skin"
      :width="liveProps.width"
      :height="liveProps.height"
      controls
    >
      <source ref="source" :src="liveProps.src[0]" />
    </video>
  </div>
</template>
<script lang="ts" setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { ref, reactive, onMounted, onUpdated, watch } from "vue";
//接受参数
export interface Props {
  liveProps?: {
    src: string[];
    width: string;
    height: string;
  };
  liveNow?: {
    src: string;
    width: string;
    height: string;
    sum: number;
  };
}
//接受参数初始化
const props = withDefaults(defineProps<Props>(), {
  liveProps: () => {
    return {
      width: "940",
      height: "600",
      src: [
        "http://videofiles.dahebao.cn/5b199581vodcq1306441264/fde566ad387702304900652277/playlist.m3u8",
        "http://videofiles.dahebao.cn/5b199581vodcq1306441264/35b23e0a387702305310769242/playlist.m3u8",
      ],
    };
  },
  liveNow: () => {
    return {
      width: "940",
      height: "600",
      sum: 0,
      src: "http://videofiles.dahebao.cn/5b199581vodcq1306441264/fde566ad387702304900652277/playlist.m3u8",
    };
  },
});
//数据
const data = reactive({
  sum: 0,
});
const source = ref();
const video = ref();
//跳转上一个视频
function clickLast() {
  if (data.sum == 0) {
    data.sum = props.liveProps.src.length - 1;
    changeVideo(props.liveProps.src[data.sum]);
  } else {
    data.sum--;
    changeVideo(props.liveProps.src[data.sum]);
  }
}
//下一个视频
function clickNext() {
  if (data.sum == props.liveProps.src.length - 1) {
    data.sum = 0;
    changeVideo(props.liveProps.src[data.sum]);
  } else {
    data.sum++;
    changeVideo(props.liveProps.src[data.sum]);
  }
}
//动态更改src
function changeVideo(e: string) {
  const myplayer = videojs(video.value);
  myplayer.src([
    {
      src: e, //CCTV3频道
    },
  ]);
}

watch(props.liveNow, (newValue, oldValue) => {
  changeVideo(props.liveNow.src);
  data.sum = props.liveNow.sum;
});

onMounted(() => {
  //初始化刷新视频
  videojs(
    video.value,
    {
      preload: "auto",
      autoplay: true,
      language: "zh-CN",
      muted: true,
    },
    function onplay() {
      this.on("ended", function () {
      });
    }
  );
});
onUpdated(() => {
});
</script>

<style lang="less" scoped>
.video {
  width: 940px;
  height: 600px;
  position: relative;

  .icon_left {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 10px;
    z-index: 100;
    opacity: 0.2;
  }
  .icon_right {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 100;
    transform: translate(0, -50%);
    opacity: 0.2;
  }
  .btn {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn:hover {
    background: #aaaaaa;
    opacity: 1;
  }
  .btn:hover {
    background: #aaaaaa;
    opacity: 0.8;
  }
}
</style>
