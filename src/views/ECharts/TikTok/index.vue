<template>
  <div class="content">
    <header>
      <div class="header_title" >
        大河报豫视频抖音矩阵内容监控
      </div>
    </header>
    <main>
      <aside><List /></aside>
      <article>
        <!-- <div class="article_top">
          <div class="options">
            <Options />
          </div>
          <div class="hotPlate">
            <HotPlate />
          </div>
        </div> -->
        <div class="video"><Videos /></div>
      </article>
      <div class="text"><Text /></div>
    </main>
  </div>
</template>
<script setup lang="ts">
import List from "./components/list.vue";
import Videos from "./components/video.vue";
import Text from "./components/text.vue";

components: {
  List;
  Videos;
  Text;
}
</script>
<style scoped lang="less">
.content {
  color: #fff;

  width: 100%;
  height: 100%;
  background-image: url("@/assets/1-bg/19.png");
  header {
    height: 8%;
    width: 100%;
    background-image: url("@/assets/2-bg/1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .header_title {
      text-align: center;
      box-sizing: border-box;
      padding-top: 10px;
      font-size: 40px;
      background-image: -webkit-linear-gradient(bottom, #fff, #006eff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  main {
    width: 100%;
    height: 92%;
    display: flex;
    align-items: center;
    padding: 0 1%;
    // box-sizing: border-box;
    aside {
      width: 24%;
      height: 93%;
      margin-right: 1%;
    }
    article {
      width: 50%;
      height: 92%;
      margin-right: 1%;
      .video {
        width: 100%;
        height: 92%;
      }
    }
    .text {
      width: 21%;
      height: 92%;
    }
  }
}
</style>
