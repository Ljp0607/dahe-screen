import { getDownload } from '@/api/modules';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import {
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import React, { useEffect, useRef } from 'react';
import './index.less';
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  SVGRenderer,
  UniversalTransition,
]);
let datas: any = [];
let name: Array<string> = [];
let dateEnd: Array<string> = [];
let option: EChartsOption;
type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;
//获取近n个月的日期
const getDate = (num: number) => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let end = year + '-' + month + '-' + '01';
  let start =
    (month > num ? year : year - 1) +
    '-' +
    (month > num ? month - num : month + 12 - num) +
    '-' +
    '01';
  return {
    startDate: start,
    endDate: end,
  };
};
//获取近n个月每个月的日期
const getEveryDate = (num: number) => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // let dataend =
  dateEnd.unshift(
    (month > num ? year : year - 1) + '-' + (month > num ? month - num : month + 12 - num),
  );
  let end =
    (month > num - 1 ? year : year - 1) +
    '-' +
    (month > num - 1 ? month - num + 1 : month + 13 - num) +
    '-' +
    '01';
  let start =
    (month > num ? year : year - 1) +
    '-' +
    (month > num ? month - num : month + 12 - num) +
    '-' +
    '01';
  return {
    startDate: start,
    endDate: end,
  };
};
//封装调用方法,循环调用十个月内的数据
const getTionData = async (id: number) => {
  await getDownload(getEveryDate(id)).then((res) => {
    res.data.forEach((item) => {
      switch (item.type_name) {
        case datas[0].name:
          datas[0].data.unshift(item.downloadTotal);
          break;
        case datas[1].name:
          datas[1].data.unshift(item.downloadTotal);
          break;
        case datas[2].name:
          datas[2].data.unshift(item.downloadTotal);
          break;
        case datas[3].name:
          datas[3].data.unshift(item.downloadTotal);
          break;
        case datas[4].name:
          datas[4].data.unshift(item.downloadTotal);
          break;
        case datas[5].name:
          datas[5].data.unshift(item.downloadTotal);
          break;
        case datas[6].name:
          datas[6].data.unshift(item.downloadTotal);
          break;
        case datas[7].name:
          datas[7].data.unshift(item.downloadTotal);
          break;
        case datas[8].name:
          datas[8].data.unshift(item.downloadTotal);
          break;
        case datas[9].name:
          datas[9].data.unshift(item.downloadTotal);
          break;
        default:
          break;
      }
    });
  });
};
//获取近n个月,数量前10的部门
const start = async () => {
  await getDownload(getDate(8))
    .then((res) => {
      let result = res.data.sort((x, y) => y.downloadTotal - x.downloadTotal).slice(0, 10);
      result.forEach((item) => {
        name.push(item.type_name);
        datas.push({
          name: item.type_name,
          type: 'line',
          // stack: 'Total',
          data: [],
        });
      });
    })
    .then(async () => {
      for (let i = 1; i < 9; i++) {
        await getTionData(i);
      }
    });
};
option = {
  backgroundColor: 'none',
  title: {
    text: '',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: name,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    name: '日期',
    data: dateEnd,
  },
  yAxis: {
    type: 'value',
    name: '下载量',
  },
  series: datas,
};
const Line: React.FC = () => {
  // console.log(month, year, end, start);
  const lineRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    start().then(() => {
      if (lineRef.current)
        echarts
          .init(lineRef.current, 'dark', {
            renderer: 'svg',
          })
          .setOption(option);
    });
  }, []);
  return <div className="line" ref={lineRef}></div>;
};
export default Line;
