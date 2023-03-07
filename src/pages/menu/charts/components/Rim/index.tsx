import React from 'react';
import './index.css';
type Props = {
  children?: React.ReactNode;
};
const Rim: React.FC<Props> = (props) => {
  return (
    <div className="rim">
      {props.children}
      <div className="dot top"></div>
      <div className="dot bom"></div>
      <div className="dot left"></div>
      <div className="dot rigth"></div>
    </div>
  );
};
export default Rim;
