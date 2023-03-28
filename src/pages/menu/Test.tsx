import React from 'react';
const Test: React.FC = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="content">
      {arr.map((item) => (
        <div key={item}>
          <img src="https://imgcdn.dahebao.cn/20230314/20230314100358525585.png" alt="图片" />
        </div>
      ))}
    </div>
  );
};

export default Test;
