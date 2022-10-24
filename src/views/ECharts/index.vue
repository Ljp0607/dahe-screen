<!-- 盒子 -->
<template>
  <div class="bg ">
    <div class="box" ref="ScreenRef">
      <el-button type="primary" class="fullScreen" @click="clickScreen">
        退出全屏
      </el-button>
      <router-view> </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import useDark from "@/components/useDark.vue";
import { useRouter } from "vue-router";
components: {
  useDark;
}
//解构赋值为router
const router = useRouter();
const ScreenRef = ref<HTMLElement | null>(null);
//切换路由，全屏或者管理系统
function clickScreen() {
  let url = "";
  if (router.options.history.location.indexOf("?") == -1) {
    url = router.options.history.location.split("fullScreen/")[1];
  } else {
    url = router.options.history.location.split("fullScreen/")[1].split("?")[0];
  }
  router.push({ name: url });
}
/* 根据浏览器大小推断缩放比例 */
function getScale() {
  let ww = window.innerWidth / 1920;
  let wh = window.innerHeight / 1080;
  return ww < wh ? ww : wh;
}
/* 浏览器监听 resize 事件 */
function resize() {
  if (ScreenRef.value) {
    ScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%) `;
  }
}
// window.addEventListener("resize", resize);
//初始化
onMounted(() => {
  //初始化调整页面大小
  if (ScreenRef.value) {
    ScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    ScreenRef.value.style.width = `1920px`;
    ScreenRef.value.style.height = `1080px`;
  }
});
window.addEventListener("resize", resize);
</script>

<style lang="less" scoped>
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/1-bg/4.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .box {
    position: fixed;
    top: 50%;
    left: 50%;
    transition: all 0.3s;
    transform-origin: left top;
    .fullScreen {
      // width: 40px;
      // height: 40px;
      position: fixed;
      top: 30px;
      left: 40px;
      z-index: 100;
      opacity: 0;
    }
    .fullScreen:hover {
      opacity: 1;
    }
  }
}
</style>
