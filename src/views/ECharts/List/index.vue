<template>
  <div class="container">
    <div class="List" ref="dataScreenRef">
      <footer></footer>
      <header>
        <div class="title">大河报豫视频24小时指挥中心</div>
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
          <div class="top">
            <el-pagination
              size-change="changePage"
              class="pagination"
              background
              page-siz="2"
              pager-count="4"
              layout="prev, pager, next"
              :total="100"
            />
          </div>
          <div class="center">
            <img
              class="item img1"
              src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
            />
            <img
              class="item img2"
              src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
            />
            <img
              class="item img3"
              src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
            />
            <img
              class="item img4"
              src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
            />
            <img
              class="item img5"
              src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
            />
            <img
              class="item img6"
              src="https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg"
            />
          </div>
          <div class="bottom"></div>
        </article>
      </main>
      <footer></footer>
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

function changePage() {}
//
// #region

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
//#endregion

//初始化
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
          margin-top: 10px;
          background-image: url("@/assets/3-bg/1-left.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .center {
          flex: 1;
          margin-top: 10px;
          background-image: url("@/assets/3-bg/1-left.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .bottom {
          flex: 1;
          margin-top: 10px;
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
        margin: 0 20px;
        .top {
          background-image: url("@/assets/3-bg/1-center.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          flex: 3;
        }
        .bottom {
          flex: 1;
        }
      }
      article {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding-bottom: 30px;
        position: relative;
        .top {
          flex: 0.5;
          background-image: url("@/assets/3-bg/1-right.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          position: relative;
          .pagination {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            button {
              background-color: rgb(25 25 112 0.5);
              border: #6495ed solid 1px;
            }
            li {
              background-color: rgb(25 25 112 0.5);
              border: #6495ed solid 1px;
            }
          }
        }
        .center {
          transform-style: preserve-3d;
          flex: 0.25;
          animation: move 18s linear infinite;
          @keyframes move {
            0% {
              transform: rotateY(0);
            }
            100% {
              transform: rotateY(360deg);
            }
          }
          .item {
            position: absolute;
            // top: -150px;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 140px;
            height: 200px;
            // background-color: aqua;
            /* //倒影 */
            // -webkit-box-reflect: below 10px linear-gradient(transparent, white);
          }
          .img1 {
            background-size: cover;
            transform: rotateY(60deg) translateZ(180px);
          }
          .img2 {
            background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
            background-size: cover;
            transform: rotateY(120deg) translateZ(180px);
          }
          .img3 {
            background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
            background-size: cover;
            transform: rotateY(180deg) translateZ(180px);
          }
          .img4 {
            background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
            background-size: cover;
            transform: rotateY(240deg) translateZ(180px);
          }
          .img5 {
            background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
            background-size: cover;
            transform: rotateY(300deg) translateZ(180px);
          }
          .img6 {
            background-image: url("https://fwimage.cnfanews.com/jpg/2022/20220811/1579/aⅰ01/0e543e3031fbdd28171846df248e1a16.jpg");
            background-size: cover;
            transform: rotateY(360deg);
            transform: translateZ(180px);
          }
        }
        .bottom {
          flex: 0.25;
          background-image: url("@/assets/3-bg/1-center2.png");
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
