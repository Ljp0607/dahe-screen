import { getDownload } from '@/api/modules';
import { BarChart, BarSeriesOption, LineChart } from 'echarts/charts';
import {
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  MarkLineComponent,
  MarkLineComponentOption,
  MarkPointComponent,
  MarkPointComponentOption,
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core'; //引入echarts
import { SVGRenderer } from 'echarts/renderers';
import React, { useEffect, useRef } from 'react';
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  BarChart,
  SVGRenderer,
  LineChart,
]);
type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | MarkLineComponentOption
  | MarkPointComponentOption
  | BarSeriesOption
>;
//接收当前名字
type Props = {
  type_name: string;
};
//定义x轴时间
let dateEnd: Array<string> = [];
//定义x轴具体数据
let data: API.Download = [];
//每个月的时间格式并赋值dateend
const getEveryDate = (num: number) => {
  const date = new Date();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
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
//获取最近n月的数据并赋值data
const getDown = async (type: string) => {
  for (let i = 1; i <= 8; i++) {
    await getDownload(getEveryDate(i)).then((res) => {
      data.unshift(res.data.filter((item) => item.type_name === type)[0]);
    });
  }
};

let option: EChartsOption;
const Column: React.FC<Props> = (props) => {
  const columnRef = useRef<HTMLDivElement | null>(null); //获取dom
  useEffect(() => {
    //初始化调取数据
    getDown(props.type_name).then(() => {
      //赋值表格
      option = {
        label: { color: '#fff' },
        backgroundColor: 'none',
        title: {
          // text: '下载点击量分析',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['点击量', '下载量'],
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: dateEnd,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '点击量',
            type: 'bar',
            data: [
              ...data.map(function (item) {
                return item.clickTotal;
              }),
            ],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
            },
          },
          {
            name: '下载量',
            type: 'bar',
            data: [
              ...data.map(function (item) {
                return item.downloadTotal;
              }),
            ],
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' },
              ],
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }],
            },
          },
        ],
      };
      if (columnRef.current) {
        echarts
          .init(columnRef.current, 'dark', {
            renderer: 'svg',
          })
          .setOption(option);
      }
    });
  }, []);
  return <div className="column" ref={columnRef}></div>;
};
export default Column;
