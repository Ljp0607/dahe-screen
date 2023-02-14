import React from 'react';

type Props = {
  title: string;
  Img: string;
};
const Title: React.FC<Props> = (props) => {
  return (
    <div
      className="title"
      style={{
        backgroundImage: `url(${props.Img})`,
      }}
    >
      {props.title}
    </div>
  );
};
export default Title;
