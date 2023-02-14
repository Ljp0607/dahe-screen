import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'umi';
import styles from './_layout.less';
const Charts: React.FC = () => {
  const [scale, setScale] = useState<number>(1);
  const Screen = useRef<any>();
  //根据视口大小,调整缩放比例
  const changeScreen = () => {
    let ww = window.innerWidth / 1920;
    let wh = window.innerHeight / 1080;
    setScale(ww < wh ? ww : wh);
    Screen.current.style.transform = `scale(${scale}) translate(-50%, -50%) `;
  };
  //监听缩放比例,缩放结束后销毁
  useEffect(() => {
    changeScreen();
    // 监听窗口改变，执行handleFooterHeight
    window.addEventListener('resize', changeScreen);
    // 销毁监听
    return () => window.removeEventListener('resize', changeScreen);
  }, [scale]);
  return (
    <div ref={Screen} className={styles.layout}>
      <Outlet />
    </div>
  );
};
export default Charts;
