<template>
  <div class="scrollbar">
    <div class="header">
      <el-select
        @change="changeOption"
        v-model="data.value"
        placeholder="律媒团"
      >
        <el-option
          v-for="item in data.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-scrollbar v-if="data.list.length != 0">
      <div
        v-for="(item, index) in data.list"
        @click="clickVideo(index)"
        :key="index"
        :class="[index == data.active ? 'active title' : 'title']"
      >
        <div class="old">{{ index + 1 }}</div>
        <div class="titl">
          <div class="video_title">
            {{ item.title ? item.title : "此视频暂无标题" }}
          </div>
          <div class="video_time">{{ item.createTime }}</div>
        </div>
      </div>
    </el-scrollbar>
    <div v-else class="empty">
      <img src="@/assets/5-bg/101.png" alt="" />
      <div>暂无数据</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useCounterStore } from "@/stores/counter";
import request from "@/api/modules/list";
const store = useCounterStore();
const data: any = reactive({
  columnIdStr: "252896",
  list: [],
  newTime: "",
  oliTime: "",
  active: 0,
  options: [
    {
      label: "大河好彩",
      value: "252881",
    },
    {
      label: "大河报开封新闻",
      value: "252882",
    },
    {
      label: "大河报新乡新闻",
      value: "252883",
    },
    {
      label: "鹤濮新闻",
      value: "252884",
    },
    {
      label: "大河报洛阳新闻",
      value: "252885",
    },
    {
      label: "乡村能人记",
      value: "252886",
    },
    {
      label: "嘿哥看洛阳",
      value: "252887",
    },
    {
      label: "大河报商丘新闻",
      value: "252888",
    },
    {
      label: "大河报周口新闻",
      value: "252889",
    },
    {
      label: "大河报焦作新闻",
      value: "252890",
    },
    {
      label: "大河报济源新闻",
      value: "252891",
    },
    {
      label: "大河报三门峡新闻",
      value: "252892",
    },
    {
      label: "大河报信阳新闻",
      value: "252893",
    },
    {
      label: "大河报安阳新闻",
      value: "252894",
    },
    {
      label: "大河报平顶山新闻",
      value: "252895",
    },
    {
      label: "律媒团",
      value: "252896",
    },
  ],
});
//修改播放的第几个视频
function clickVideo(e: number) {
  store.$state.active = e;
}
//修改部门并刷新
function changeOption(e: any) {
  data.columnIdStr = e;
  getApiData3();
}
//获取新闻
function getApiData3() {
  request
    .getApiData3({
      urlName: "Client831/DouYinArticleList",
      columnIdStr: data.columnIdStr,
      days: "10",
      // startDateStr: data.oldTime,
      // endDateStr: data.newTime,
    })
    .then((res: any) => {
      if (res.data.data.data[0].list.length > 20) {
        data.list = res.data.data.data[0].list.splice(0, 20);
      } else {
        data.list = res.data.data.data[0].list;
      }
      store.$state.video = data.list;
      store.$state.active = 0;
    });
}
watch(
  () => store.$state.active,
  () => {
    data.active = store.$state.active;
    /* ... */
  }
);
//获取当前时间和七天前的时间
// function confirmTime() {
//   let nowTime = new Date();
//   let passTime = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
//   data.newTime =
//     nowTime.getFullYear() +
//     "-" +
//     (Number(nowTime.getMonth()) + 1) +
//     "-" +
//     nowTime.getDate();
//   data.oldTime =
//     passTime.getFullYear() +
//     "-" +
//     (Number(passTime.getMonth()) + 1) +
//     "-" +
//     passTime.getDate();
// }
//定时器，每五分钟刷新一次
setInterval(() => {
  getApiData3();
}, 300000);
onMounted(() => {
  // confirmTime();
  getApiData3();
});
</script>
<style scoped lang="less">
.scrollbar {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/3-bg/10.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 30px;
  box-sizing: border-box;
  .el-scrollbar {
    height: 90%;
  }
  .header {
    width: 70%;
    height: 100px;
    text-align: center;
    line-height: 50px;
    .el-select {
      margin-top: 18px;
      margin-left: 62px;
      width: 300px;
    }
  }
  .title {
    font-size: 20px;
    display: flex;
    justify-content: space-around;
    // align-items: center;
    box-sizing: border-box;
    border-bottom: #215fcb solid 1px;
    padding: 10px 0;
    color: #82aefb;
    .old {
      margin-top: 5px;
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #215fcb;
    }
    .titl {
      width: 80%;
      display: inline-block;
      .video_title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
      }
      .video_time {
        margin-left: 110px;

        // color: red;
      }
    }
  }
  .active {
    z-index: 20;
    color: #fff;
    background: #006eff;
  }

  .empty {
    padding-top: 40px;
    box-sizing: border-box;
    text-align: center;
    color: #82aefb;
    font-size: 30px;
  }
}
::v-deep .el-input__wrapper {
  background: #164478;
}
::v-deep .el-input__inner {
  color: #82aefb;
  font-size: 35px;
  height: 60px;
}
</style>
