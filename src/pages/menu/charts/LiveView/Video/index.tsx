import { getHot, getLive } from '@/api/modules';
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Rim from '../../components/Rim';
import './index.css';

const Videos: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [last, setLast] = useState<number>(0);
  const [start, setStart] = useState<boolean>(true);
  const [live, setLive] = useState<boolean>(true);
  const [liveSrc, setLiveSrc] = useState<string[]>([]);
  const [hotSrc, setHotSrc] = useState<string[]>([]);
  //获取直播或者热门视频
  const getData = async (live: boolean) => {
    let arr: string[] = [];
    if (live) {
      await getLive().then((res) => {
        res.data.liveList?.forEach((item) => {
          if (item.live_state === 1) {
            arr.push(item.studio_broadcast_address);
          } else {
            arr.push(item.pushed_back_flow_end?.split(',')[1].split(',')[0]);
          }
        });
        setLiveSrc(arr);
      });
    } else {
      await getHot().then((res) => {
        res.forEach((item) => {
          arr.push(item.short_video_url);
        });
        setHotSrc(arr);
      });
    }
  };
  //改变当前播放器的视频,传入视频连接
  const changeVideo = (e: string | undefined) => {
    if (videoRef.current && e)
      videojs(videoRef.current).src([
        {
          src: e,
        },
      ]);
  };
  //改变当前直播或视频
  const changeType = (e: boolean) => {
    if (live === e) return;
    if (liveSrc.length !== 0 && hotSrc.length !== 0) {
      setLive(!live);
      setLast(0);
      return;
    }
    getData(e).then(() => {
      setLive(!live);
      setLast(0);
    });
  };
  useEffect(() => {
    //首次渲染获取直播数据
    if (liveSrc.length === 0) {
      getData(live);
    }
    //首次挂载直播数据
    else if (videoRef.current && liveSrc.length !== 0 && start) {
      setStart(false);
      videojs(
        videoRef.current,
        {
          preload: 'auto',
          autoplay: true,
          language: 'zh-CN',
          muted: true,
          bigPlayButton: true, //是否显示播放按钮
          controls: true, //播放控件
        },
        function () {
          videojs.on(videoRef.current, 'ended', function () {
            //如果播放结束,播放下一个
            setLast((last) => (last >= 9 ? 0 : last + 1));
          });
        },
      );
    } else {
      changeVideo(live ? liveSrc[last] : hotSrc[last]);
    }
  }, [live, liveSrc, last]);
  return (
    <Rim>
      <div className="videoLive">
        <div className="cut">
          <div className={live ? 'btn' : ''} onClick={() => changeType(true)}>
            直播
          </div>
          <div className={live ? '' : 'btn'} onClick={() => changeType(false)}>
            视频
          </div>
        </div>
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          width={1000}
          height={560}
          controls
        >
          {' '}
          <source src={live ? liveSrc[last] : hotSrc[last]} />
        </video>
        <div className="carousel">
          {liveSrc.map((item, index) => (
            <div
              className={last === index ? 'dat btn' : 'dat'}
              onClick={() => {
                setLast(index);
              }}
              key={item}
            >
              <div className="car_dat"></div>
            </div>
          ))}
        </div>
      </div>
    </Rim>
  );
};
export default Videos;
