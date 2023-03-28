// import { PageContainer } from '@ant-design/pro-components';
// import { Card } from 'antd';
import React, { useRef } from 'react';
import './test.css';
const Test: React.FC = () => {
  const conRef = useRef<HTMLDivElement | null>(null);
  const arr = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 22, 33, 44, 55];
  const clickItem = () => {
    console.log(123);
    console.log(conRef);
    if (conRef.current) conRef.current.scrollLeft += 100;
  };
  return (
    <div className="content" onClick={clickItem} ref={conRef}>
      {arr.map((item) => (
        <div key={item}>
          <img
            className="con-img"
            src="https://imgcdn.dahebao.cn/20230314/20230314100358525585.png"
            alt="图片"
          />
        </div>
      ))}
    </div>
  );
};

export default Test;
