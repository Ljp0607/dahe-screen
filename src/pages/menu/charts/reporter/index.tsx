import { getNews } from '@/api/modules';
import { useRequest } from '@umijs/max';
import React, { useEffect, useRef, useState } from 'react';
import List from '../components/list';
import Title from '../components/title';
import './index.css';
type dataProps = {
  changeShow: (e: boolean) => void;
};
//获取数据组件
const VideoData: React.FC<dataProps> = (props) => {
  const videoDom = useRef<HTMLVideoElement | null>(null);
  const pauseFun = () => {
    props.changeShow(true);
    console.log(props);
  };
  useEffect(() => {
    //开始监听
    videoDom.current?.addEventListener('ended', pauseFun);
    // 取消监听
    return () => {
      videoDom.current?.removeEventListener('ended', pauseFun);
    };
  });
  const { data, error, loading } = useRequest(() => {
    return getNews();
  });
  if (loading) {
    return <div> loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <video ref={videoDom} autoPlay muted src={data?.[0].linkUrl}>
        {/* <source type='video/mp4'  /> */}
      </video>
    </>
  );
};

const Reporter: React.FC = () => {
  const [show, setShow] = useState(true);
  const changeShow = (e: boolean) => {
    setShow(e);
  };
  //三个数字传播力
  const list = [
    {
      type: 1,
      title: '传播力日榜',
    },
    {
      type: 2,
      title: '传播力周榜',
    },
    {
      type: 3,
      title: '传播力月榜',
    },
  ];
  return (
    <>
      {show ? (
        <div className="contanier">
          <header>
            <Title
              title={'大河报·豫视频记者传播力'}
              Img={'https://imgcdn.dahebao.cn/20230213/20230213151851379041.png'}
            />
          </header>
          <main>
            {list.map((item) => (
              <List
                changeShow={(e: boolean) => changeShow(e)}
                key={item.type}
                drawRule={item.type}
                title={item.title}
                show={show}
              />
            ))}
          </main>
        </div>
      ) : (
        <VideoData changeShow={(e: boolean) => changeShow(e)} />
      )}
    </>
  );
};
export default Reporter;

//
