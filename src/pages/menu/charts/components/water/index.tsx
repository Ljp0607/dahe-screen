import React from 'react';
import './index.css';
type Props = {
  title?: string;
  content?: number | string | null;
};
const Water: React.FC<Props> = (props) => {
  return (
    <div className="content">
      <div className="wa_title">{props.title ? props.title : '实时下载量'}</div>
      {/* 水滴组件 */}
      <div className="water">
        <div className="page">
          <svg className="waves" viewBox="0 24 180 24" preserveAspectRatio="none">
            <defs>
              <path
                id="wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <use className="wave1" xlinkHref="#wave" fill="#125A95" x="50" y="0"></use>
            <use className="wave2" xlinkHref="#wave" fill="#006EFF" x="50" y="2"></use>
          </svg>
          <div className="wa_details">{props.content ? props.content : 26}</div>

          <div className="empty"></div>
        </div>
        <div className="frame1"></div>
        <div className="frame2"></div>
        <div className="fa-dot">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};
export default Water;
