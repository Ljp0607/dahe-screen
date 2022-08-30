<template>
  <div class="container">
    <div class="List" ref="dataScreenRef">
      <header>
        <div class="title">大河报豫视频24小时指挥中心</div>
        <!-- <useDark /> -->
      </header>
      <main>
        <aside>
          <div class="top"></div>
          <div class="center"></div>
          <div class="bottom"></div>
        </aside>
        <div class="middle">
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
        <article>
          <div class="top"></div>
          <div class="bottom"></div>
        </article>
      </main>
      <footer>脚部</footer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import useDark from "@/components/useDark.vue";
components: {
  useDark;
}
const dataScreenRef = ref<HTMLElement | null>(null);

/* 根据浏览器大小推断缩放比例 */
const getScale = (width = 1920, height = 1080) => {
  let ww = window.innerWidth / width;
  let wh = window.innerHeight / height;
  return ww < wh ? ww : wh;
};

/* 浏览器监听 resize 事件 */
const resize = () => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
  }
};
onMounted(() => {
  //初始化调整页面大小
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    dataScreenRef.value.style.width = `1920px`;
    dataScreenRef.value.style.height = `1080px`;
  }
  window.addEventListener("resize", resize);
});
</script>
<style lang="less" scosped>
.container {
  background-image: url("@/assets/1-bg/5.png");
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  color: white;
  background-attachment: fixed;
  background-position: center;
  background-size: 100% 100%;
  background-size: cover;
  .List {
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    transform-origin: left top;
    header {
      background-image: url("@/assets/2-bg/6.png");
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      flex: 0.6;
      text-align: center;
      .title {
        font-size: 32px;
        background-image: -webkit-linear-gradient(bottom, #6495ed, #4682b4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    main {
      flex: 10;
      display: flex;
      aside {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .top {
          flex: 1;
          background-image: url("@/assets/3-bg/1-left.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .center {
          flex: 1;
          background-image: url("@/assets/3-bg/1-left.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .bottom {
          flex: 1;
          background-image: url("@/assets/3-bg/1-left.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
      .middle {
        flex: 2.6;
        display: flex;
        flex-direction: column;
        .top {
          background-image: url("@/assets/3-bg/1-center.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          flex: 3;
        }
        .bottom {
          background-image: url("@/assets/3-bg/1-center2.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          flex: 1;
        }
      }
      article {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .top {
          flex: 1;
          background-image: url("@/assets/3-bg/1-right.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .bottom {
          flex: 1;
          background-image: url("@/assets/3-bg/1-right.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }

    footer {
      flex: 0.2;
    }
  }
}
</style>
