import React from 'react';
import Title from '../components/title';
import Column from './column/index';
import './index.less';
import Radar from './radar';
import Target from './target/index';
const type_name: string = decodeURI(location.href.slice(location.href.indexOf('type_name') + 10));
const Department: React.FC = () => {
  return (
    <div className="contanier">
      <header>
        <Title
          title={type_name + '下载分析'}
          Img="https://imgcdn.dahebao.cn/20230220/20230220101457533769.png"
        />
      </header>
      <main>
        <Column type_name={type_name} />
        <div>
          <Target type_name={type_name} />
          <Radar type_name={type_name} />
        </div>
      </main>
    </div>
  );
};
export default Department;
