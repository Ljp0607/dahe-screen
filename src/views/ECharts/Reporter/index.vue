<template>
  <div class="content">
    <header>
      <div class="header_title">大河报豫视频记者传播力指数</div>
    </header>
    <main>
      <aside>
        <div class="top">
          <div class="title">明星部门榜</div>
          <div class="list">
            <!-- <HotPlate /> -->
          </div>
        </div>
        <div class="bottom">
          <div class="title">明星记者榜</div>
          <div class="list">
            <List />
          </div>
        </div>
      </aside>
      <div class="middle">
        <el-radio-group v-model="data.radio" size="large">
          <el-radio-button label="1">日榜</el-radio-button>
          <el-radio-button label="2">周榜</el-radio-button>
          <el-radio-button label="3">月榜</el-radio-button>
        </el-radio-group>
        <Scrollbar :list="data.report" :change="changeRadios" />
      </div>
      <article>
        <Trend />
      </article>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import Scrollbar from "../../../components/Scrollbar.vue";
import reporter from "@/api/modules/scrollbar";
import { onMounted, reactive, watch } from "vue";
import List from "./components/List.vue";
// import HotPlate from "./components/HotPlate.vue";
import Trend from "./components/trend.vue";

components: {
  // HotPlate;
  List;
  // Trend;
  Scrollbar;
}
const data = reactive({
  report: [
    { deptName: String, place: 0, reportName: "1", transmissionIndex: 1 },
  ],
  radio: 1,
});
const report: any[] = reactive([[{ name: "123" }, { age: "333" }], []]);
// [[],[],[]]
//获取记者数据
function getList() {
  reporter({
    dateType: data.radio,
    page_count: 300,
  })
    .then((res: any) => {
      // console.log(res);
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
      console.log(data.report);
      data.report.map((item) => {
        report.map((items) => {
          if (items[0].deptName == item.deptName) {
            items.push(item);
            console.log(item);
          } else {
            report.push([item]);
            console.log([item]);
          }
        });
      });
      console.log(report);
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
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/1-bg/14.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  header {
    background-image: url("@/assets/2-bg/6.png");
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    flex: 0.5;

    .header_title {
      text-align: center;
      // height: 100%;
      box-sizing: border-box;
      padding-top: 15px;
      font-size: 32px;
      background-image: -webkit-linear-gradient(bottom, #6495ed, #4682b4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  main {
    flex: 5;
    display: flex;
    .middle {
      width: 30%;

      // flex: 1.2;
      text-align: center;
      color: #ffffff;
      padding: 0 50px;
      box-sizing: border-box;

      .el-radio-group {
        display: inline-block;
      }
    }
    aside {
      width: 40%;
      // flex: 2;
      text-align: center;
      font-size: 20px;
      background-image: -webkit-linear-gradient(bottom, #6495ed, #4682b4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      .top {
        height: 50%;
      }
      .bottom {
        height: 50%;
      }
      .title {
        margin: 30px auto;
        background-image: url("../../../assets/3-bg/15.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 80%;
        height: 30px;
        text-align: center;
      }
      .list {
        display: inline-block;
        // margin: 0 auto;
      }
    }
    article {
      // flex: 1;
      width: 30%;
    }
  }
  footer {
    flex: 0.5;
  }
}
</style>
