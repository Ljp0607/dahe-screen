import React from 'react';
import './index.css';
type Props = {
  num: number;
};
const Carousel: React.FC<Props> = (props) => {
  let arr: number[] = [];
  for (let i = 1; i <= props.num; i++) {
    arr.push(i);
  }
  return (
    <div className="carousel">
      {arr.map((item, index) => (
        <div className={item === index ? 'dat btn' : 'dat'} key={item}>
          <div className="car_dat"></div>
        </div>
      ))}
    </div>
  );
};
export default Carousel;
