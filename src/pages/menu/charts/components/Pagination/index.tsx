import { LeftSquareTwoTone, RightSquareTwoTone } from '@ant-design/icons';
import React from 'react';
import './index.css';
type Props = {
  current: number;
};
const Pagination: React.FC<Props> = (props) => {
  let arr = [0, 1, 2, 3];
  // let list = 3
  // const listItems = list.map((item, index) => { item }
  // );
  return (
    <div className="pagination">
      <LeftSquareTwoTone style={{ fontSize: '34px' }} />{' '}
      {arr.map((item) => (
        <div key={item} className={props.current === item ? 'btn chuck' : 'chuck'}>
          {item}
        </div>
      ))}
      <RightSquareTwoTone style={{ fontSize: '34px' }} />{' '}
    </div>
  );
};
Pagination.defaultProps = {
  current: 2,
};

export default Pagination;
