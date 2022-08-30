<template>
  <div class="mainTop">
    <div class="header">
      <div @click="lll">我是一个标题</div>
      <el-cascader
        :options="options"
        :show-all-levels="false"
        @change="changeVideo"
      />
    </div>
    <main>
      <videojs :liveProps="liveStreaming" />
    </main>
    <footer></footer>
  </div>
</template>
<script lang="ts" setup>
import videojs from "@com/video.vue";
import axios from "axios";
import { reactive, onMounted, onUpdated } from "vue";
import request from "@/api/modules/list";
const options = reactive([
  {
    value: "live",
    label: "直播",
    children: [
      {
        value: "",
        label: "",
      },
    ],
  },
  {
    value: "recorded",
    label: "录播",
    children: [],
  },
  {
    value: "video",
    label: "热点视频",
    children: [],
  },
]);
const liveStreaming = reactive({
  src: "https://videofiles.dahebao.cn/5b873101vodtransbj1306441264/fa3a0a9c387702304999384902/v.f1137851.mp4",
  width: "935",
  height: "530",
});
components: {
  videojs;
}
function lll(e: any) {
  console.log(e.target);
  e.target.style.color = "red";
  console.log(e.type);
  e.type = "div";
}

function changeVideo(e: any) {
  liveStreaming.width = liveStreaming.width + "222";
  console.log(e[1]);
  liveStreaming.src = "";

  console.log(liveStreaming);
}
//获取直播或者录播
function getLiveStreaming() {
  axios
    .get(
      "http://api.daheapp.com/dahe/appyzb/liveroomhomedata?sign=637586292ebf2c5fabab863734fc6a12&data=%7B%22client_type%22%3A200%2C%22page_index%22%3A0%7D"
    )
    .then((res: any) => {
      console.log("res", res.data.liveList);
      for (let i in res.data.liveList) {
        if (res.data.liveList[i].live_state == 1) {
          options[0].children.push({
            value: res.data.liveList[i].studio_broadcast_address,
            label: res.data.liveList[i].video_title,
          });
        } else {
          options[1].children.push({
            value: res.data.liveList[i].pushed_back_flow_end,
            label: res.data.liveList[i].video_title,
          });
        }
      }
    })
    .catch((err: any) => {
      console.log("err", err);
    });
}
//获取热点视频
function getVideo() {
  request
    .fanwenapi()
    .then((res: any) => {
      console.log(res);
      console.log(res.data);
      for (let i in res.data) {
        options[2].children.push({
          value: res.data[i].short_video_url,
          label: res.data[i].short_video_title,
        });
      }
      console.log("options", options);
    })
    .catch(() => {});
}

onMounted(() => {
  getLiveStreaming();
  getVideo();
});

onUpdated(() => {
  console.log(222);
});
</script>

<style lang="less" scoped>
.mainTop {
  // padding: 90px 60px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  main {
    margin-left: 60px;
  }
}
</style>
