import { getDownload } from '@/api/modules';
import { RadarChart, RadarSeriesOption } from 'echarts/charts';
import {
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import React, { useEffect, useRef, useState } from 'react';
echarts.use([TitleComponent, LegendComponent, RadarChart, SVGRenderer]);
type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>;
let option: EChartsOption;
type Props = {
  type_name: string;
};
type dataType = {
  total?: number; //下载量
  totalMax?: number; //前100部门平均下载量
  ranking?: number; //排名
  ratio?: number; //下载与点击比例
  trend?: string; //下载趋势
};
const Radar: React.FC<Props> = (props) => {
  const radarRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<dataType | null>(null);
  //获取总量排行
  const getDown = () => {
    getDownload().then((res) => {
      res.data.sort((x, y) => y.downloadTotal - x.downloadTotal);
      console.log(res.data);
      //计算该部门下载量
      let totals = res.data.filter((item) => item.type_name === props.type_name)[0];
      //计算前100部门总量和排行
      let totalMaxs: number = 0;
      let rankings: number = 10;
      res.data.forEach((item, index) => {
        if (item.type_name === props.type_name) rankings = 100 - index;
        if (index < 100) {
          totalMaxs += item.downloadTotal;
        } else {
          return;
        }
      });
      //计算排名
      setData((prev) => ({
        ...prev,
        total: totals.downloadTotal > totalMaxs / 100 ? totalMaxs / 100 : totals.downloadTotal, //下载量
        totalMax: totalMaxs / 100,
        ranking: rankings,
        ratio: totals.downloadTotal / totals.clickTotal,
      }));
    });
  };
  //获取进一个月下载趋势

  useEffect(() => {
    if (!data) {
      getDown();
    } else {
      console.log(data);
      option = {
        backgroundColor: 'none',
        label: { color: '#fff' },
        title: {
          text: props.type_name + '指标分析',
        },
        legend: {
          data: ['Actual Spending'],
        },
        radar: {
          indicator: [
            { name: '全年下载量', max: data?.totalMax },
            { name: '部门排行', max: 100 },
            { name: '点击下载比', max: 1 },
            { name: '近期下载趋势', max: 1 },
            { name: '本月下载达成', max: 1000 },
            { name: '目标达成', max: 1000 },
          ],
        },
        series: [
          {
            name: props.type_name,
            type: 'radar',
            data: [
              {
                value: [
                  data?.total ? data.total : 100,
                  data?.ranking ? data.ranking : 12,
                  data?.ratio ? data.ratio : 0.8,
                  0.6,
                  800,
                  800,
                ],
                name: props.type_name,
              },
            ],
          },
        ],
      };
      if (radarRef.current)
        echarts.init(radarRef.current, 'dark', { renderer: 'svg' }).setOption(option);
    }
  }, [data?.total]);
  return <div ref={radarRef} className="radar"></div>;
};
export default Radar;
