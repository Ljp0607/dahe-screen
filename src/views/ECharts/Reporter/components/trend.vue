<!-- 树状图 -->
<template>
  <div
    ref="chartRef"
    :style="{ width: width ? width : '', height: height ? height : '' }"
  ></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";
export interface Props {
  width?: string;
  height?: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: "500px",
  height: "400px",
});
const chartRef = ref();
function initChart() {
  let chartDom = chartRef.value;
  var myChart = echarts.init(chartDom, "dark");
  const option = reactive({
    backgroundColor: "rgba(128,128,128,0.1)",
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  });
  myChart.setOption(option);
}
onMounted(() => {
  initChart();
});
</script>
