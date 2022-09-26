<template>
  <div class="layout">
    <el-container>
      <el-aside>
        <Menu />
      </el-aside>
      <el-container>
        <el-header
          ><Header />
          <Tabs />
        </el-header>
        <el-main>
          <div class="main" ref="mainRef">
            <el-button class="Full" type="primary" @click="clcikFull"
              >全屏</el-button
            >
            <div class="ScreenRef" ref="ScreenRef">
              <router-view> </router-view>
            </div>
          </div>
        </el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Tabs from "../../components/Tabs.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// import Scrollbar from "../../../components/Scrollbar.vue";
components: {
  Menu;
  Header;
  Footer;
  // Scrollbar;
  Tabs;
}
//解构赋值为router
const router = useRouter();
const ScreenRef = ref<HTMLElement | null>(null);
const mainRef = ref<HTMLElement | null>(null);

const clcikFull = () => {
  let url = "";
  if (router.options.history.location.indexOf("?") == -1) {
    url = router.options.history.location.split("home/")[1];
  } else {
    url = router.options.history.location.split("home/")[1].split("?")[0];
  }
  router.push({ name: url + "View" });
  console.log(url);
};
/* 根据浏览器大小推断缩放比例 */
function getScale() {
  if (mainRef.value) {
    let ww = mainRef.value.offsetWidth / 1920;
    let wh = mainRef.value.offsetHeight / 1080;
    return ww < wh ? ww : wh;
  }
}
/* 浏览器监听 resize 事件 */
function resize() {
  if (ScreenRef.value) {
    ScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%) `;
  }
}

onMounted(() => {
  if (ScreenRef.value) {
    ScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    ScreenRef.value.style.width = `1920px`;
    ScreenRef.value.style.height = `1080px`;
  }
});
window.addEventListener("resize", resize);
</script>

<style lang="less" scoped>
.layout {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  .el-aside {
    background-color: "#191A22";
    width: auto;
  }
  .el-header {
    height: 8vh;
  }

  .el-main {
    height: 80vh;
    box-sizing: border-box;
    padding: 10px 13px;
    overflow-x: hidden;
    background: #f0f2f5;
    .main {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow: auto;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      // text-align: center;
      background-image: url("../../assets/1-bg/1.png");
      background-size: 100% 100%;
      position: relative;
      .Full {
        position: absolute;
        left: 30px;
        top: 30px;
      }

      .ScreenRef {
        position: absolute;
        top: 50%;
        left: 50%;
        transition: all 0.3s;
        transform-origin: left top;
      }
    }
  }
}
</style>
