<template>
  <div class="mainTop">
    <div class="header">
      <el-cascader
        type="primary"
        class="cascader"
        :options="options"
        :show-all-levels="false"
        @change="changeVideo"
        placeholder="选择视频"
      />
    </div>
    <main>
      <videojs :liveProps="liveStreaming" :liveNow="liveNow" />
    </main>
    <footer></footer>
  </div>
</template>
<script lang="ts" setup>
import videojs from "@com/video.vue";
import axios from "axios";
import { reactive, onMounted, onUpdated, onBeforeMount } from "vue";
import request from "@/api/modules/list";
const options: any[] = reactive([
  {
    value: "0",
    label: "直播",
    children: [],
  },
  {
    value: "1",
    label: "录播",
    children: [],
  },
  {
    value: "2",
    label: "热点视频",
    children: [],
  },
]);
const liveStreaming = reactive({
  src: [
    "http://videofiles.dahebao.cn/5b199581vodcq1306441264/fde566ad387702304900652277/playlist.m3u8",
  ],
  width: "935",
  height: "530",
});
components: {
  videojs;
}
const liveNow = reactive({
  src: "",
  sum: 0,
  width: "960",
  height: "600",
});
//选择某一条数据发送给组件
function changeVideo(e: any) {
  liveNow.sum = liveStreaming.src.indexOf(e[1]);
  liveNow.src = e[1];
  //发送一串数组，使其可以轮播
}
//获取直播或者录播
function getLiveStreaming() {
  axios
    .get(
      "http://api.daheapp.com/dahe/appyzb/liveroomhomedata?sign=637586292ebf2c5fabab863734fc6a12&data=%7B%22client_type%22%3A200%2C%22page_index%22%3A0%7D"
    )
    .then((res: any) => {
      for (let i in res.data.liveList) {
        if (res.data.liveList[i].live_state == 1) {
          // options[0].children.length = 0;
          options[0].children.push({
            value: res.data.liveList[i].studio_broadcast_address,
            label: res.data.liveList[i].video_title,
            disabled: false,
          });
        } else {
          const disvalue = res.data.liveList[i].pushed_back_flow_end
            .split(",")[1]
            .split(",")[0];
          options[1].children.push({
            value: disvalue,
            label: res.data.liveList[i].video_title,
            disabled: false,
          });
        }
      }
    })
    .then(() => {
      if (options[0].children.length == 0) {
        options[0].children.push({
          value: "false",
          label: "暂无直播",
          disabled: true,
        });
      }
    })
    .then(() => {
      getVideo();
    })
    .catch((err: any) => {});
}
//获取热点视频
function getVideo() {
  request
    .fanwenapi()
    .then((res: any) => {
      for (let i in res.data) {
        options[2].children.push({
          value: res.data[i].short_video_url,
          label: res.data[i].short_video_title,
          disabled: false,
        });
      }
    })
    .then(() => {
      eachVideo();
    })
    .catch(() => {});
}
//遍历所有视频
function eachVideo() {
  for (let i of options) {
    for (let j of i.children) {
      if (j.value) {
        liveStreaming.src.push(j.value);
      }
    }
  }
}
//初始化
onBeforeMount(() => {}),
  onMounted(() => {
    getLiveStreaming();
  });
onUpdated(() => {});
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
    .cascader {
      color: #fab !important;
      background: #fab !important;
      // color: blue;
    }
  }
  main {
    margin-left: 60px;
    // margin: 0 auto;
    height: 600px;
  }
}
</style>
