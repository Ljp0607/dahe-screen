import { getHot, getHotData, getNewsReport } from '@/api/modules';
import { useRequest } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import List from '../../components/list';
import Rim from '../../components/Rim';
//豫视频48小时热门
const Real: React.FC = () => {
  const [show, setShow] = useState(true);
  const [hotSrc, setHotSrc] = useState<API.hotList>();
  const [last, setLast] = useState(0);
  const [news, setNews] = useState<API.newsReport>([]);
  useEffect(() => {
    //获取热门图文
    getNewsReport().then((res) => {
      setNews(res);
    });
    //获取热门视频
    getHot().then((res) => setHotSrc(res));
  }, []);

  return (
    <Rim>
      <div className="real">
        <div className="latter_title">豫视频48小时热门</div>
        <div className="fa-title">
          <div
            onClick={() => {
              setShow(true);
            }}
            className={show ? 'btn_title btn' : 'btn_title'}
          >
            图文
          </div>
          <div onClick={() => setShow(false)} className={show ? 'btn_title ' : 'btn btn_title'}>
            视频
          </div>
        </div>
        {show && (
          <div className="fa_real_content">
            <div className="real_content">
              {news.map((item, index) => (
                <div className="newsReport" key={item.news_id}>
                  <div className="real_ranking"> {index + 1}</div>{' '}
                  <div className="real_introduce">{item.news_title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!show && hotSrc && (
          <div>
            <video muted autoPlay src={hotSrc[last].short_video_url}></video>
            <div className="carousel">
              {hotSrc.map((item, index) => (
                <div
                  className={last === index ? 'dat btn' : 'dat'}
                  onClick={() => {
                    setLast(index);
                  }}
                  key={item.short_video_id}
                >
                  <div className="car_dat"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Rim>
  );
};

//实时上升榜
const HotRise: React.FC = () => {
  const { data, loading, error } = useRequest(() => getHotData());
  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  let arr = data?.filter((item) => item.wordSourceName === '微博热搜')[0].dateList;
  return (
    <Rim>
      <div className="hotrise">
        <div className="latter_title">实时上升热榜</div>
        <div className="hot_content">
          {arr?.map((item) => (
            <div className="hot_list" key={item.word}>
              {item.word}
            </div>
          ))}
        </div>
      </div>
    </Rim>
  );
};

//记者传播力组件
const Reporter: React.FC = () => {
  const [num, setNum] = useState<number>(1);
  const list = [
    {
      type: 1,
      title: '日榜',
    },
    {
      type: 2,
      title: '周榜',
    },
    {
      type: 3,
      title: '月榜',
    },
  ]; //记者榜单
  const clickItem = (e: number) => {
    setNum(e);
  };
  useEffect(() => {
    let timer = setInterval(() => {
      if (num > 2) {
        setNum(1);
      } else {
        setNum((pre) => pre + 1);
      }
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [num]);
  return (
    <Rim>
      <div className="reporter">
        <div className="latter_title">记者传播力排行</div>
        <div className="fa-title">
          {' '}
          {list.map((item) => (
            <div
              onClick={() => clickItem(item.type)}
              className={num === item.type ? 'btn_title btn' : 'btn_title'}
              key={item.type}
            >
              {item.title}
            </div>
          ))}
        </div>
        <List key={list[num - 1].type} drawRule={list[num - 1].type} />
      </div>
    </Rim>
  );
};
const Aside: React.FC = () => {
  return (
    <>
      <Real />
      <HotRise />
      <Reporter />
    </>
  );
};
export default Aside;
