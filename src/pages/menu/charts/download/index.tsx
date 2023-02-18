import { getDownload } from '@/api/modules';
import { useRequest } from '@umijs/max';
import React from 'react';
import Title from '../components/title';
import './index.less';
import Line from './line/index';
import Map from './map/index';
import Ranking from './ranking/index';
import Year from './year/index';
const Download: React.FC = () => {
  //初始化获取数据
  const { data, error, loading } = useRequest(() => {
    return getDownload({
      // timeType: 'day'
    });
  });
  if (loading) {
    return <div> loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  //数据中过滤为0的部门,排序
  let downSult = data
    ?.filter((item) => item.downloadTotal !== 0 && item.clickTotal !== 0)
    .sort((x, y) => y.downloadTotal - x.downloadTotal);
  //向数组中添加唯一的key
  downSult?.forEach((item, index) => {
    item.type_no = index + 1;
  });
  return (
    <div className="content">
      <header>
        <Title
          title="大河报·豫视频下载数据分析"
          Img={'https://imgcdn.dahebao.cn/20230213/20230213151851379041.png'}
        />
      </header>
      <main>
        <Ranking data={downSult} title="部门" content="下载量" />
        <div>
          <Year />
          <Line />
        </div>
        <div className="map">
          <Map />
        </div>
      </main>
    </div>
  );
};
export default Download;
