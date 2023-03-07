import { LeftSquareTwoTone, RightSquareTwoTone } from '@ant-design/icons';
import React from 'react';
import './index.css';
type Props = {
  count: number;
  current: number;
  onChange: (e: number) => void;
};
const Pagination: React.FC<Props> = (props) => {
  let arr: Array<number> = [];
  for (let i = 1; i <= props.count; i++) {
    arr.push(i);
  }
  //上一页
  const lastChange = () => {
    if (props.current !== 1) {
      props.onChange(props.current - 1);
    }
  };
  //下一页
  const nextChange = () => {
    if (props.current !== props.count) {
      props.onChange(props.current + 1);
    }
  };

  return (
    <div className="pagination">
      <LeftSquareTwoTone
        className="LeftSquare"
        onClick={props.current === 1 ? undefined : lastChange}
        twoToneColor={props.current === 1 ? '#aaa' : ''}
        style={{ fontSize: '34px' }}
      />
      {arr.map((item) => (
        <div
          key={item}
          onClick={() => {
            props.onChange(item);
          }}
          className={props.current === item ? 'btn chuck' : 'chuck'}
        >
          {item}
        </div>
      ))}
      <RightSquareTwoTone
        onClick={props.current === props.count ? undefined : nextChange}
        twoToneColor={props.current === props.count ? '#aaa' : ''}
        style={{ fontSize: '34px' }}
      />
    </div>
  );
};
export default Pagination;
