<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    text-color="#ffffff"
    background-color="#191A22"
    router
    @select="clickSelect"
  >
    <div class="title">
      <img src="../assets/home/icon.png" alt="" />
      <span :style="{ display: isCollapse ? 'none' : '' }">豫视频</span>
    </div>
    <el-menu-item index="">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>指挥中心</span>
      </template>
      <el-menu-item index="/home/list"> 豫视频直播 </el-menu-item>
      <el-menu-item index="/home/Download"> 数据中心 </el-menu-item>
      <el-menu-item index="/home/TikTok"> 抖音直播 </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>下载量计算</span>
      </template>
      <!-- <el-menu-item index="/home/Reporter"> 豫视频下载量 </el-menu-item> -->
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>热榜</span>
      </template>
      <el-menu-item index="/home/Information"> 微博热榜 </el-menu-item>
      <el-menu-item index="/home/Picker"> 抖音热榜 </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><location /></el-icon>
        <span>记者</span>
      </template>
      <el-menu-item index="/home/reporter"> 记者传播力指数 </el-menu-item>
      <!-- <el-menu-item index="/home/Download"> 记者新闻稿 </el-menu-item> -->
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><Monitor /></el-icon>
        <span>腾讯云图</span>
      </template>
      <el-menu-item
        v-for="(item, index) in data.item"
        :key="index"
        index="1"
        :route="{ path: item.url, query: { src: item.src } }"
      >
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useCounterStore } from "../stores/counter";
const data: any = reactive({
  item: [
    {
      name: "新闻指挥中心",
      url: "/home/TencentScree",
      src: "http://v.yuntus.com/tcv/23fb54ec3234a9eef0a6b381dedcd0386435259e79e44ebaad01eb201a2dda63",
    },
    {
      name: "记者传播力指数",
      url: "/home/TencentScree",
      src: "https://v.yuntus.com/tcv/aed99b4328a06cef7139122e08ac09695448003688fd423517257ee7118c5eb8",
    },
    {
      name: "榜单",
      url: "/home/TencentScree",
      src: "https://v.yuntus.com/tcv/f57b2c3aa6361fa9926eb125955c0d2de00223ac2a11aaa135a18695ac8a28e4",
    },
    {
      name: "直播数据中心",
      url: "/home/TencentScree",
      src: "http://v.yuntus.com/tcv/3463d5498722c92e83a1f90d0bc356ad2886abbab6d7f5c3a0576086474d9999",
    },
    {
      name: "下载量",
      url: "/home/TencentScree",
      src: "https://v.yuntus.com/tcv/3ac7c40d302dd22464df4fa75280781b4753d7b1aa67b4bc17e196609cc13769",
    },
    {
      name: "数据中心",
      url: "/home/TencentScree",
      src: "http://v.yuntus.com/tcv/56e38b1cf195b8e42fb1035be9ad420367a156307f26d15eff03345f6ba4f4f9",
    },
  ],
});

const store = useCounterStore();
const isCollapse = ref(true);
const clickSelect = new Promise((e: any) => {});
clickSelect.then();

//监控展开item项
watch(
  () => store.$state.expand,
  (newValue, oldValue) => {
    isCollapse.value = !isCollapse.value;
  }
);
</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  min-height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
.title {
  padding-top: 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  height: 30px;
  span {
    display: inline-block;
    height: 30px;
    font-size: 22px;
    font-weight: bold;
    color: #dadada;
    white-space: nowrap;
  }
  img {
    margin: 0 20px;
    vertical-align: bottom;
    width: 30px;
  }
}
</style>
