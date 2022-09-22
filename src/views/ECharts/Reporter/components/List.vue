<!-- 树状图 -->
<template>
  <div ref="chartRef" style="width: 600px; height: 400px"></div>
  <!--     :style="{ width: width ? width : '', height: height ? height : '' }"
 -->
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
  //   let chartDom = document.getElementById("mainChart")!;
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
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  });
  myChart.setOption(option);
}
onMounted(() => {
  initChart();
});
</script>
