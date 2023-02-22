import React, { useEffect, useRef } from 'react';
// import './index.less'
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { GridComponent, GridComponentOption } from 'echarts/components';
import * as echarts from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([GridComponent, BarChart, SVGRenderer]);
type EChartsOption = echarts.ComposeOption<GridComponentOption | BarSeriesOption>;
let option: EChartsOption = {
  backgroundColor: 'none',
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    },
  ],
};
const Column: React.FC = () => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (columnRef.current) {
      echarts
        .init(columnRef.current, 'dark', {
          renderer: 'svg',
        })
        .setOption(option);
    }
  }, []);
  return <div className="column" ref={columnRef}></div>;
};
export default Column;
