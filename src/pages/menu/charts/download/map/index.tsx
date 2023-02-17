import React, { useRef } from 'react';
import './index.less';
// import * as echarts from 'echarts/core';
// import {
//   VisualMapComponent,
//   VisualMapComponentOption,
//   GeoComponent,
//   GeoComponentOption
// } from 'echarts/components';
// import { MapChart, MapSeriesOption } from 'echarts/charts';
// import { UniversalTransition } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';

// echarts.use([
//   VisualMapComponent,
//   GeoComponent,
//   MapChart,
//   CanvasRenderer,
//   UniversalTransition
// ]);
// type EChartsOption = echarts.ComposeOption<
//   VisualMapComponentOption | GeoComponentOption | MapSeriesOption
// >;

const Map: React.FC = () => {
  const MapRef = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   if (MapRef.current)
  //     echarts
  //       .init(MapRef.current, 'dark', {
  //         renderer: 'svg',
  //       })
  //       .setOption(MapRef);
  //   // })
  // }, [])
  return <div ref={MapRef}>123</div>;
};
export default Map;
