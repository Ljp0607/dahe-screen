<template>
  <!-- 热门板块 -->
  <div class="echarts-header">
    <span>排名</span>
    <span>部门</span>
    <span>总传播力</span>
  </div>
  <div
    class="echarts"
    ref="PlateChart"
    id="HotPlateChart"
    style="width: 600px; height: 300px"
  ></div>
</template>

<script setup lang="ts">
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import { ref, reactive, onMounted } from "vue";
import { init } from "echarts";
import { ranking1, ranking2, ranking3, ranking4 } from "./ranking-icon";
interface ChartProp {
  name: string;
  value: number;
  percentage: string;
  maxValue: number;
}
const props = withDefaults(defineProps<ChartProp>(), {
  name: "string",
  value: 12,
  percentage: "string",
  maxValue: 22,
});
const data = reactive([
  {
    value: 7999,
    name: "汽车IT运营中心",
    percentage: "80%",
    maxValue: 10000,
  },
  {
    value: 5999,
    name: "热点深度部",
    percentage: "60%",
    maxValue: 10000,
  },
  {
    value: 4999,
    name: "城市运营管理中心",
    percentage: "50%",
    maxValue: 10000,
  },
  {
    value: 3999,
    name: "育文创运营中心",
    percentage: "40%",
    maxValue: 10000,
  },
  {
    value: 2999,
    name: "时政新闻中心",
    percentage: "30%",
    maxValue: 10000,
  },
]);
const PlateChart = ref();
function initChart(data: any) {
  const charEle = PlateChart.value;
  const charEch = init(charEle);
  const option = {
    grid: {
      top: "5%",
      left: "7%",
      right: "4%",
      bottom: "1%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLine: {
        show: false,
        lineStyle: {
          color: "white",
        },
      },
      nameGap: 1,
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        fontSize: 16,
      },
      // boundaryGap: ["3%", "2%"],
      // splitNumber: 4,
      triggerEvent: false,
    },
    yAxis: [
      {
        show: true,
        data: data.data.map((val: ChartProp) => val.name),
        // data: data[0].name,
        inverse: true,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fff",
          formatter: function (value: any) {
            let str = value.length > 6 ? value.slice(0, 6) + "..." : value;
            let index =
              data.data.map((item: ChartProp) => item.name).indexOf(value) + 1;
            return [
              "{" + (index > 3 ? "lg" : "lg" + index) + "|NO." + index + "}",
              "{title|" + str + "}",
            ].join(" ");
          },
          rich: {
            lg1: {
              width: 60,
              backgroundColor: {
                image: ranking1,
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13,
            },
            lg2: {
              width: 60,
              backgroundColor: {
                image: ranking2,
              },
              color: "#fff",
              align: "center",

              height: 20,
              fontSize: 13,
            },
            lg3: {
              width: 60,
              backgroundColor: {
                image: ranking3,
              },
              color: "#fff",
              align: "center",
              height: 20,
              fontSize: 13,
            },
            lg: {
              width: 60,
              backgroundColor: {
                image: ranking4,
              },
              color: "#fff",
              align: "center",

              height: 20,
              fontSize: 13,
            },
            title: {
              width: 60,
              fontSize: 13,
              align: "center",
              padding: [0, 10, 0, 15],
            },
          },
        },
        triggerEvent: false,
      },
      {
        show: true,
        inverse: true,
        data: data.data,
        axisLabel: {
          fontSize: 14,
          color: "#fff",
          // align: "right",
          margin: 20,
          formatter: (value: any) => {
            return value >= 10000 ? (value / 10000).toFixed(2) + "w" : value;
          },
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        triggerEvent: false,
      },
    ],
    series: [
      {
        name: "条",
        type: "bar",
        yAxisIndex: 0,
        data: data.data,
        barWidth: 12,
        itemStyle: {
          borderRadius: 30,
          color: function (params: any) {
            let num = data.colors.length;
            return data.colors[params.dataIndex % num];
          },
        },
        label: {
          show: true,
          position: [12, 0],
          lineHeight: 14,
          color: "#fff",
          formatter: (params: any) => {
            return params.data.percentage;
          },
        },
      },
      {
        name: "框",
        type: "bar",
        yAxisIndex: 1,
        data: data.data.map((val: ChartProp) => {
          if (!val.maxValue) {
            return 5;
          }
          return val.maxValue;
        }),
        barWidth: 18,
        itemStyle: {
          color: "none",
          borderColor: "#00c1de",
          borderWidth: 1,
          borderRadius: 15,
        },
        silent: true,
      },
    ],
  };
  charEch.setOption(option);
}

onMounted(() => {
  initChart({
    data: data,
    colors: ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"],
  });
});
</script>
<style lang="less" scoped>
.echarts {
  width: 100%;
  height: calc(100% - 56px);
}
.echarts-header {
  box-sizing: border-box;
  display: flex;
  height: 36px;
  margin: 10px 10px 0;
  line-height: 36px;
  //   background: url("../images/rankingChart-bg.png") no-repeat;
  background-size: 100% 100%;
  span {
    width: 18%;
    margin-left: 4px;
    font-size: 14px;
    font-weight: bold;
    color: #fdbc52;
    text-align: center;
    &:nth-child(2) {
      margin-left: 4px;
    }
    &:last-child {
      width: 20%;
      margin-left: 60px;
    }
  }
}
</style>
