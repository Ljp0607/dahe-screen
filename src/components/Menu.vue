<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    text-color="#ffffff"
    background-color="#191A22"
  >
    <div class="title">
      <img src="../assets/home/icon.png" alt="" />
      <span :style="{ display: isCollapse ? 'none' : '' }">豫视频</span>
    </div>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>指挥中心</span>
      </template>
      <el-menu-item index="1-1-1"> 豫视频直播 </el-menu-item>
      <el-menu-item index="1-2-1"> 数据中心 </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Document /></el-icon>
        <span>下载量计算</span>
      </template>
      <el-menu-item index="2-1-1"> 豫视频下载量 </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>热榜</span>
      </template>
      <el-menu-item index="3-1-1"> 微博热榜 </el-menu-item>
      <el-menu-item index="3-2-1"> 抖音热榜 </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><location /></el-icon>
        <span>记者榜</span>
      </template>
      <el-menu-item index="4-1-1"> 记者传播力指数 </el-menu-item>
      <el-menu-item index="4-2-1"> 记者传播力排行 </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useCounterStore } from "../stores/counter";
const store = useCounterStore();
const isCollapse = ref(true);

watch(store, (newValue, oldValue) => {
  isCollapse.value = !isCollapse.value;
});
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
