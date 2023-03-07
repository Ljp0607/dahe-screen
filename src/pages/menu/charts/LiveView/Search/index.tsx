import React, { useState } from 'react';
// import './index.css'
import { getHotData } from '@/api/modules';
import { useRequest } from '@umijs/max';
import Rim from '../../components/Rim';
type Props = {
  content?: API.HotDataList;
};

const Card: React.FC<Props> = (props) => {
  console.log(props.content);
  const [show, setShow] = useState(false);
  const [last, setLast] = useState(0);
  // const [exhibi, setExhibi] = useState(false)
  //鼠标移入
  const onMove = () => {
    if (show) return;
    setShow(true);
    setLast(0);
  };
  //鼠标移出
  // const onOut = () => {
  //   if (!show) return
  //   setShow(false)
  // }
  return (
    <div className="card">
      <div onMouseMove={onMove} className="latter_title card_title">
        {props.content ? props.content[0].wordSourceName : ''}
      </div>
      <div></div>
      {show && (
        <div className="card_list">
          {props.content?.map((item, index) => (
            <div
              key={item.wordSourceName}
              className={index === last ? 'btn card_item' : 'card_item'}
            >
              {item.wordSourceName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const Search: React.FC = () => {
  const { data, loading, error } = useRequest(() => getHotData());
  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Rim>
      <div className="search">
        <div className="latter_title">互联网热搜</div>
        <div className="ser_card">
          <Card content={data?.slice(0, 6)} />
          <Card content={data?.slice(6, 12)} />
          <Card content={data?.slice(12, 18)} />
        </div>
      </div>
    </Rim>
  );
};
export default Search;
