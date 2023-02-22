import React from 'react';
import Title from '../components/title';
import Column from './column/index';
import './index.less';
const Department: React.FC = () => {
  return (
    <div className="contanier">
      <header>
        <Title
          title="部门下载分析"
          Img="https://imgcdn.dahebao.cn/20230220/20230220101457533769.png"
        />
      </header>
      <main>
        <Column />
      </main>
    </div>
  );
};
export default Department;
