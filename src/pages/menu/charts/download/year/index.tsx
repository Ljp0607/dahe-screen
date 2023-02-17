import { getDownload } from '@/api/modules';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import {
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import React, { useEffect, useRef } from 'react';
import './index.less';
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption
>; //定义数据
let data: Array<{
  value: number;
  name: string;
}> = [];
//定义整体表格
let option: EChartsOption;
//获取数据
const getSule = async () => {
  let sum: number = 0;
  let downSult: API.Download = [];
  await getDownload({
    startDate: '2023-01-01',
    endDate: '2023-12-31',
  })
    .then((res) => {
      downSult = res.data?.sort((x, y) => y.downloadTotal - x.downloadTotal).splice(0, 7);
      res.data?.forEach((item) => (sum += item.downloadTotal));
      downSult?.push({
        clickTotal: sum,
        downloadTotal: sum,
        parent_type_no: '#',
        priority: 0,
        type_name: '其他',
      });
      downSult.forEach((item) => {
        data.push({
          value: item.downloadTotal,
          name: item.type_name,
        });
      });
    })
    .then(() => {
      option = {
        label: { color: '#fff' },
        backgroundColor: 'none',
        textShadowColor: 'false',
        title: {
          text: '2023年豫视频',
          left: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 25,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#fff',
            fontSize: 15,
          },
        },
        series: [
          {
            name: '大河报·豫视频',
            type: 'pie',
            radius: '60%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
    });
};
const Year: React.FC = () => {
  const YearRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    getSule().then(() => {
      if (YearRef.current)
        echarts
          .init(YearRef.current, 'dark', {
            renderer: 'svg',
          })
          .setOption(option);
    });
  }, []);

  return <div className="year" ref={YearRef}></div>;
};
export default Year;
