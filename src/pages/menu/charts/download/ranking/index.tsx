import React, { useEffect, useRef } from 'react';
import { history } from 'umi';
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
  //点击跳转部门详情页
  const clickItem = (e: API.Download[0]) => {
    console.log(e);
    console.log(history);
    console.log();
    console.log(window.location);
    window.open(
      window.location.origin +
        window.location.pathname +
        '#/screen/charts/Department' +
        `?type_name=${e.type_name}`,
    );
    // history.push({
    //   pathname: '/charts/Department',
    // });
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
            <div onClick={() => clickItem(item)} key={item.type_no} className="ranking">
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
