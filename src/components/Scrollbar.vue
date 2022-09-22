<template>
  <div class="title header">
    <div class="item" v-for="(item, index) in line">{{ item }}</div>
  </div>
  <el-scrollbar
    @mouseenter="enterInto"
    @mouseleave="outInfo"
    @scroll="changeScroll"
    ref="scrollRef"
    :height="maxHeight ? `${maxHeight}px` : ''"
    ><div
      :style="{
        height: height ? `${height}px` : '',
        lineHeight: height ? `${height}px` : '',
      }"
      v-for="(item, index) in list"
      :key="index"
      class="title"
    >
      <p>{{ item.place }}</p>
      <p>{{ item.reportName }}</p>
      <p>{{ item.transmissionIndex }}</p>
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
//接受参数
export interface Props {
  list?: {
    place: number;
    reportName: string;
    transmissionIndex: number;
  }[]; //数据数组
  line?: string[]; //标题
  height?: number; //表格高度
  maxHeight?: number;
  change?: Function;
}
//参数赋初始值
const props = withDefaults(defineProps<Props>(), {
  list: () => [
    { place: 1, transmissionIndex: 12, reportName: "测试" },
    { place: 2, transmissionIndex: 10, reportName: "测试数据" },
  ],
  line: () => ["名次", "姓名", "积分"],
  height: 50,
  maxHeight: 800,
  change: () => {
    console.log("没有方法");
  },
});
const scrollRef = ref();
let i = 1;
//创建定时器方法
const fun = () => {
  let proHeight: number = (props.height + 10) * props.list.length;
  if (i < proHeight) {
    i++;
  } else {
    if (props.change) props.change();
    i = 1;
  }
  scrollRef.value.setScrollTop(i);
};
let start = setInterval(fun, 50);

//清除定时器
function enterInto() {
  clearInterval(start);
}
//创建定时器
function outInfo() {
  start = setInterval(fun, 50);
}
//滑动锁定高度
function changeScroll(e: any) {
  i = e.scrollTop;
}

onMounted(() => {});
onBeforeUnmount(() => {
  clearInterval(start);
});
</script>
<style scoped lang="less">
.header {
  height: 50px;
  background: #14377d;
  font-weight: 500;
  font-size: 22px;
}
.title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  box-sizing: border-box;
  border-bottom: #215fcb solid 1px;

  p {
    display: inline-block;
    width: 80px;
    text-align: center;
    line-height: 100%;
    box-sizing: border-box;
  }
}
</style>
