import React from 'react';
import styles from './list.less';
type Props = {
  // title: string;
  drawRule: string;
  // findCount: Function
};

const List: React.FC<Props> = (props) => {
  return <div className={styles.list}>{props.drawRule}</div>;
};
export default List;
