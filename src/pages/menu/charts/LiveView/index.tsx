import React from 'react';
import Title from '../components/title';
import Aside from './aside';
import Expose from './expose';
import './index.css';
import Search from './Search';
import Videos from './Video';
const LiveView: React.FC = () => {
  return (
    <div className="contanier">
      <header>
        <Title
          title="大河报豫视频24小时指挥中心"
          Img="https://imgcdn.dahebao.cn/20230220/20230220101457533769.png"
        />
      </header>
      <main>
        <div className="aside">
          <Aside />
          {/* <Reporter /> */}
        </div>
        <div className="con_main">
          <Videos />
          <Search />
        </div>
        <Expose />
      </main>
    </div>
  );
};
export default LiveView;
