<template>
  <div class="layout">
    <div class="empty"></div>
    <el-container>
      <el-aside>
        <Menu />
      </el-aside>
      <el-container>
        <el-header><Header /></el-header>
        <el-main><Main /></el-main>
        <el-footer><Footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Main from "@/components/Main.vue";

components: {
  Main;
  Menu;
  Header;
  Footer;
}
</script>

<style lang="less" scoped>
.layout {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;

  .empty {
    width: 100vw;
    height: 100px;
  }
}
</style>
