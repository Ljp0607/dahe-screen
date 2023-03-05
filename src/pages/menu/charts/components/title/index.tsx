import React from 'react';
import './index.less';
type Props = {
  title?: string;
  Img?: string;
};
const Title: React.FC<Props> = (props) => {
  return (
    <div
      className="title"
      style={{
        backgroundImage: `url(${props.Img})`,
      }}
    >
      <span>{props.title}</span>
    </div>
  );
};
export default Title;
