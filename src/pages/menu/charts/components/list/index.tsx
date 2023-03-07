import { getReporter } from '@/api/modules';
import React, { useEffect, useRef } from 'react';
import { useRequest } from 'umi';
import './index.less';
type dataProps = {
  type?: number;
};
//获取数据组件
const ListData: React.FC<dataProps> = (props) => {
  const { data, error, loading } = useRequest(() => {
    return getReporter({
      type: props.type ? props.type : 1,
    });
  });
  if (loading) {
    return <div> loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  //遍历记者加入排名
  //过滤传播力为0的记者
  if (data)
    data.accountAuthRecordList = data?.accountAuthRecordList?.filter(
      (item) => item.transmissionIndex && item.transmissionIndex > 0,
    );
  return (
    <>
      {data?.accountAuthRecordList?.map((item, index) => (
        <div key={item.reportId + index.toString()} className="ranking">
          <span>{index + 1}</span>
          <span>{item.reportName}</span>
          <span>{item.transmissionIndex}</span>
        </div>
      ))}
    </>
  );
};
type Props = {
  data?: Array<any>;
  title?: string;
  drawRule?: number;
  show?: boolean;
  changeShow?: (e: boolean) => void;
};
const List: React.FC<Props> = (props) => {
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
      if (props.changeShow) props.changeShow(false);
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
        if (props.changeShow) props.changeShow(false);
      }
    }, 50);
  };
  //结束时卸载组件
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [props.show]);
  return (
    <div className="list">
      <div className="list_title">
        <span>{props.title}</span>
      </div>
      <div className="content">
        <div className="headline">
          <span>排名</span>
          <span>姓名</span>
          <span>传播力</span>
        </div>
        <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="con-list" ref={scrollRef}>
          <ListData type={props.drawRule} />
        </div>
      </div>
    </div>
  );
};
export default List;
