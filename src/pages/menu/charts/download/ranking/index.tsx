import React, { useEffect, useRef } from 'react';
// import {}
import './index.less';
type dataProps = {
  data?: API.Download;
  title?: string;
  content?: string;
};
const Ranking: React.FC<dataProps> = (props) => {
  //获取滑动组件
  const scrollRef = useRef<HTMLDivElement | null>(null);
  //创建常量定时器
  let timer: any = null;
  //初始化创建定时器开始滑动
  timer = setInterval(() => {
    if (scrollRef.current) scrollRef.current.scrollTop += 1;
    if (
      scrollRef.current?.scrollTop &&
      scrollRef.current?.scrollTop +
        10 +
        (scrollRef.current?.offsetHeight ? scrollRef.current?.offsetHeight : 0) >
        (scrollRef.current?.scrollHeight ? scrollRef.current?.scrollHeight : 0)
    ) {
      scrollRef.current.scrollTop = 0;
    }
  }, 50);
  //鼠标事件进入
  const onEnter = () => {
    clearInterval(timer);
  };
  //鼠标事件离开
  const onLeave = () => {
    timer = setInterval(() => {
      if (scrollRef.current) scrollRef.current.scrollTop += 1;
      if (
        scrollRef.current?.scrollTop &&
        scrollRef.current?.scrollTop +
          10 +
          (scrollRef.current?.offsetHeight ? scrollRef.current?.offsetHeight : 0) >
          (scrollRef.current?.scrollHeight ? scrollRef.current?.scrollHeight : 0)
      ) {
        scrollRef.current.scrollTop = 0;
      }
    }, 50);
  };
  //结束时卸载组件
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div>
      <div className="list-title">
        <span>各部门总下载量</span>
      </div>
      <div className="list">
        <div className="headline">
          <span className="list-div">排名</span>
          <span style={{ flex: 1 }}>部门</span>
          <span className="list-div">下载量</span>
        </div>
        <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="con-list" ref={scrollRef}>
          {props.data?.map((item, index) => (
            <div key={item.type_no} className="ranking">
              <span className="list-div">{index + 1}</span>
              <span style={{ flex: 1 }}>{item.type_name}</span>
              <span className="list-div">{item.downloadTotal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Ranking;
