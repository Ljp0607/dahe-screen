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
          <div class="main">
            <!-- <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
              <keep-alive :include="cacheRouter">
                <component :is="Component" :key="route.path"></component>
              </keep-alive>
            </transition>
          </router-view> -->
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
components: {
  Menu;
  Header;
  Footer;
  Tabs;
}
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
    }
  }
}
</style>
