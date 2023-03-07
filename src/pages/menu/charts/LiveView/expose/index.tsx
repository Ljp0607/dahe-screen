import { getExpose } from '@/api/modules';
import { useRequest } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import Rim from '../../components/Rim';
import './index.css';
type cardProps = {
  time?: string;
  content?: string;
};
//封装card组件
const Card: React.FC<cardProps> = (props) => {
  return (
    <div className="card">
      <div className="card_introduce">{props.content}</div>
      <div className="card_time">{props.time}</div>
    </div>
  );
};
const Expose: React.FC = () => {
  const [current, setCurrent] = useState<number>(1); //
  const arr = [1, 2, 3];
  //更改current切换目录
  const onChange = (e: number) => {
    setCurrent(e);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (current >= 4) {
        setCurrent(1);
      } else {
        setCurrent((pre) => pre + 1);
      }
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [current]);
  const { data, loading, error } = useRequest(() => {
    return getExpose();
  });
  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Rim>
      <div className="expose">
        <div className="latter_title">有事儿就找邻妹妹</div>
        <div className="ex_card">
          {arr.map((item) => (
            <Card
              key={item}
              time={data?.announceList[current * item - 1].createTime}
              content={data?.announceList[current * item - 1].announceDesc}
            />
          ))}
        </div>
        <Pagination onChange={(e) => onChange(e)} current={current} count={4} />
        {/* <Pagination className='Pagination' current={current} onChange={onChange} total={50} /> */}
      </div>
    </Rim>
  );
};
export default Expose;
