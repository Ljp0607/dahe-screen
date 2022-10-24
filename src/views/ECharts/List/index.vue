<template>
  <div class="container" ref="container">
    <div class="List" ref="dataScreenRef">
      <header>
        <div class="title">大河报豫视频24小时指挥中心</div>
        <!-- <useDark /> -->
      </header>
      <main>
        <aside>
          <div class="top">
            <div class="title">豫视频48小时热门新闻</div>
            <Scrollbar
              maxHeight="180"
              height="30"
              :list="data.report"
              :change="changeRadios"
            />
          </div>
          <div class="center">
            <div class="title">实时上升热播</div>
            <Scrollbar
              maxHeight="180"
              height="30"
              :list="data.report"
              :change="changeRadios"
            />
          </div>
          <div class="bottom">
            <div class="title">记者传播力</div>
            <Scrollbar
              maxHeight="180"
              height="30"
              :list="data.report"
              :change="changeRadios"
            />
          </div>
        </aside>
        <div class="middle">
          <div class="top"><mainTop /></div>
          <div class="bottom"></div>
        </div>
        <article>
          <div class="top">
            <articleTop />
          </div>
          <div class="center">
            <articleCenter />
          </div>
          <div class="bottom"></div>
        </article>
      </main>
      <footer></footer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, reactive } from "vue";
import useDark from "@/components/useDark.vue";
import articleCenter from "../List/component/articleCenter.vue";
import articleTop from "../List/component/articleTop.vue";
import mainTop from "../List/component/mainTop.vue";
import list from "@/api/modules/list";
import Scrollbar from "@/components/Scrollbar.vue";
import reporter from "@/api/modules/scrollbar";
components: {
  articleCenter;
  articleTop;
  useDark;
  mainTop;
  Scrollbar;
}
name: list;
//初始化
//获取记者数据
const data = reactive({
  report: [
    { deptName: String, place: 0, reportName: "1", transmissionIndex: 1 },
  ],
  radio: 1,
});
const report: any[] = reactive([[{ name: "123" }, { age: "333" }], []]);
function getList() {
  reporter({
    dateType: data.radio,
    page_count: 300,
  })
    .then((res: any) => {
      data.report = res.data.accountAuthRecordList;
      for (let i in data.report) {
        if (data.report[i].transmissionIndex != 0) {
          data.report[i].place = Number(i) + 1;
        } else {
          data.report.splice(Number(i), data.report.length - Number(i));
          return;
        }
      }
    })
    .then(() => {
      data.report.map((item) => {
        report.map((items) => {
          if (items[0].deptName == item.deptName) {
            items.push(item);
          } else {
            report.push([item]);
          }
        });
      });
    })

    .catch(() => {});
}

//子组件操作改变日榜周榜月榜
function changeRadios() {
  if (data.radio == 3) {
    data.radio = 1;
  } else {
    data.radio++;
  }
}
// 监听日周月榜参数
watch(
  () => data.radio,
  () => {
    getList();
  }
);
onMounted(() => {
  getList();
});
</script>
<style lang="less" scosped>
.container {
  background-image: url("@/assets/1-bg/5.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  .List {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    header {
      background-image: url("@/assets/2-bg/6.png");
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      flex: 1;
      position: relative;
      .title {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
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
        .title {
          margin-top: 15px;
          text-align: center;
          font-size: 23px;
          background-image: -webkit-linear-gradient(bottom, #fff, #006eff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
          .btn-prev {
            background-color: rgb(25 25 112 0.5);
            border: #6495ed solid 1px;
          }
          button {
            background-color: rgb(25 25 112 0.5);
            border: #6495ed solid 1px;
          }
          li {
            background-color: rgb(25 25 112 0.5);
            border: #6495ed solid 1px;
          }
        }
        .center {
          flex: 0.25;
          transform-style: preserve-3d;
          animation: move 18s linear infinite;
          @keyframes move {
            0% {
              transform: rotateY(0);
            }
            100% {
              transform: rotateY(360deg);
            }
          }
        }
        .bottom {
          flex: 0.16;
          background-image: url("@/assets/3-bg/1-center2.png");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }

    footer {
      flex: 0.6;
    }
  }
}
</style>
