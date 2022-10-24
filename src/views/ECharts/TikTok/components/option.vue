<template>
  <div class="select">
    <el-select @change="changeOption" v-model="data.value" placeholder="部门">
      <el-option
        v-for="item in data.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import request from "@/api/modules/list";
import { onMounted, ref, reactive } from "vue";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();

const data: any = reactive({
  //item遍历部门
  options: [
    {
      label: "大河好彩",
      value: "252881",
    },
    {
      label: "大河报开封新闻",
      value: "252882",
    },
    {
      label: "大河报新乡新闻",
      value: "252883",
    },
    {
      label: "鹤濮新闻",
      value: "252884",
    },
    {
      label: "大河报洛阳新闻",
      value: "252885",
    },
    {
      label: "乡村能人记",
      value: "252886",
    },
    {
      label: "嘿哥看洛阳",
      value: "252887",
    },
    {
      label: "大河报商丘新闻",
      value: "252888",
    },
    {
      label: "大河报周口新闻",
      value: "252889",
    },
    {
      label: "大河报焦作新闻",
      value: "252890",
    },
    {
      label: "大河报济源新闻",
      value: "252891",
    },
    {
      label: "大河报三门峡新闻",
      value: "252892",
    },
    {
      label: "大河报信阳新闻",
      value: "252893",
    },
    {
      label: "大河报安阳新闻",
      value: "252894",
    },
    {
      label: "大河报平顶山新闻",
      value: "252895",
    },
    {
      label: "律媒团",
      value: "252896",
    },
  ],
  value: "",
});
function changeOption(e: any) {
  console.log(e);
}
//获取新闻
function getApiData2() {
  request
    .getApiData2({
      urlName: "Client831/DouYinArticleList",
      columnIdStr: "252881",
      startDateStr: "2022-8-17",
      endDateStr: "2022-10-17",
    })
    .then((res) => {
      console.log(res);

      // data.options = res.data;
      // console.log(res);
    });
}
onMounted(() => {
  getApiData2();
  const start = new Date();
  console.log(start.getDate() - 20);

  // vedioCount();
});
</script>

<style scoped lang="less">


</style>
