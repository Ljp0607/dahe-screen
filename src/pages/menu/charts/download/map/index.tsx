import React, { useEffect, useRef } from 'react';
import './index.less';
// import * as echarts from 'echarts';
import { getDownload } from '@/api/modules';
import axios from 'axios';
import * as echarts from 'echarts/core';

import { BarChart, MapChart, MapSeriesOption } from 'echarts/charts';
import {
  GeoComponent,
  GeoComponentOption,
  VisualMapComponent,
  VisualMapComponentOption,
} from 'echarts/components';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  BarChart,
  VisualMapComponent,
  GeoComponent,
  MapChart,
  CanvasRenderer,
  UniversalTransition,
]);
type EChartsOption = echarts.ComposeOption<
  VisualMapComponentOption | GeoComponentOption | MapSeriesOption
>;
let data = [
  { name: '郑州市', value: 0 },
  { name: '开封市', value: 0 },
  { name: '洛阳市', value: 0 },
  { name: '平顶山市', value: 0 },
  { name: '安阳市', value: 0 },
  { name: '鹤壁市', value: 0 },
  { name: '新乡市', value: 0 },
  { name: '焦作市', value: 0 },
  { name: '濮阳市', value: 0 },
  { name: '许昌市', value: 0 },
  { name: '漯河市', value: 0 },
  { name: '三门峡市', value: 0 },
  { name: '南阳市', value: 0 },
  { name: '商丘市', value: 0 },
  { name: '信阳市', value: 0 },
  { name: '周口市', value: 0 },
  { name: '驻马店市', value: 0 },
  { name: '济源市', value: 0 },
];
let barOption: echarts.EChartsCoreOption;
let mapOption: EChartsOption;
//获取下载量信息
const getDown = async () => {
  await getDownload().then((res) => {
    const num = res.data.filter((item) => item.type_name.indexOf('城市') !== -1);
    num.forEach((item, index) => {
      data[index].value = item.clickTotal;
    });
    data.sort(function (a, b) {
      return a.value - b.value;
    });
    console.log('data,data', data);

    barOption = {
      backgroundColor: 'none',
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: data.map(function (item) {
          return item.name;
        }),
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      animationDurationUpdate: 1000,
      series: {
        type: 'bar',
        id: 'population',
        data: data.map(function (item) {
          return item.value;
        }),
        universalTransition: true,
      },
    };
    mapOption = {
      backgroundColor: 'none',
      visualMap: {
        left: 'right',
        min: data[0].value,
        max: data[17].value,
        inRange: {
          // prettier-ignore
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
        },
        text: ['High', 'Low'],
        calculable: true,
      },
      tooltip: {
        // trigger: 'axis',
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
      },
      series: [
        {
          name: '下载量',
          id: 'population',
          type: 'map',
          roam: true,
          map: 'MapChart',
          animationDurationUpdate: 1000,
          universalTransition: true,
          data: data,
        },
      ],
    };
  });
};
//获取城市信息
const getUsaJson = async () => {
  await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/410000_full.json').then((res) => {
    echarts.registerMap('MapChart', res.data, {});
  });
};
const Map: React.FC = () => {
  const MapRef = useRef<HTMLDivElement | null>(null);
  // const [currentMap, setCurrentMap] = useState<echarts.EChartsCoreOption | null>(null)
  let myChart: any;
  let currentOption = mapOption;
  useEffect(() => {
    getDown().then(() => {
      getUsaJson().then(() => {
        if (MapRef.current) {
          myChart = echarts.init(MapRef.current, 'dark', {
            renderer: 'svg',
          });
          myChart.setOption(mapOption);
        }
      });
    });
    let timer = setInterval(() => {
      currentOption = currentOption === mapOption ? barOption : mapOption;
      myChart.setOption(currentOption, true);
    }, 20000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="mapValue" ref={MapRef}>
      123
    </div>
  );
};
export default Map;
