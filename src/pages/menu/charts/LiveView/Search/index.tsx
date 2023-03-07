import React, { useState } from 'react';
// import './index.css'
import { getHotData } from '@/api/modules';
import { useRequest } from '@umijs/max';
import Rim from '../../components/Rim';
type Props = {
  content?: API.HotDataList;
};

const Card: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const [last, setLast] = useState(0);
  let timer: any;
  //鼠标移入
  const onMove = () => {
    if (show) return;
    setShow(true);
  };
  //鼠标移出
  const onOut = () => {
    timer = setTimeout(() => {
      setShow(false);
    }, 200);
  };
  //鼠标移入
  const onMoves = () => {
    clearTimeout(timer);
  };
  //点击更改item
  const selectItem = (index: number) => {
    setLast(index);
  };
  return (
    <div className="card">
      {/* 标题 */}
      <div className="latter_title card_title" onMouseOver={onMove} onMouseOut={onOut}>
        {props.content ? props.content[last].wordSourceName : ''}
      </div>
      <div className="card_from">
        {props.content &&
          props.content[last].dateList.map((item, index) => (
            <div className="newsReport" key={item.word + item.createTime}>
              <div className="real_ranking"> {index + 1}</div>{' '}
              <div className="real_introduce">{item.word}</div>
            </div>
          ))}
      </div>
      {/* 弹出框 */}
      {show && (
        <div className="card_list" onMouseOver={onMoves} onMouseOut={onOut}>
          {props.content?.map((item, index) => (
            <div
              key={item.wordSourceName}
              onClick={() => selectItem(index)}
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
        <div className="latter_title search_title">互联网热搜</div>
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
