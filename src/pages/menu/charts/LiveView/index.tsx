import React from 'react';
import Title from '../components/title';
import './index.css';
// import Videos from './Video'
import Expose from './expose';
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
        <div></div>
        <div className="con_main">{/* <Videos /> */}</div>
        <Expose />
      </main>
    </div>
  );
};
export default LiveView;
