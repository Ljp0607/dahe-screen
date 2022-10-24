<template>
  <div class="content">
    <div class="middle">
      <Scrollbar :list="list" :line="line" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Scrollbar from "../../../components/Scrollbar.vue";
import newsreporter from "@/api/modules/download";
import { onMounted, reactive } from "vue";
components: {
  Scrollbar;
}
const list: any = reactive([]);
const line = reactive(["姓名", "时间", "标题"]);
function getDownload() {
  newsreporter()
    .then((res: any) => {
      for (let i in res.data) {
        console.log(res.data[i]);
        // list[i].place = res.data[i].news_editor;
        // list[i].transmissionIndex = res.data[i].news_publish_date;
        // list[i].reportName = res.data[i].news_title;
      }
      console.log(list);
    })
    .catch((err) => {
      console.log(err);
    });
}
onMounted(() => {
  getDownload();
});
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/1-bg/14.png");
  color: #fff;
  .middle {
    margin: 0 auto;
    width: 30%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>