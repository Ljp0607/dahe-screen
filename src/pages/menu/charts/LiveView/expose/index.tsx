import React from 'react';
// import './index.css'
// import Pagination from '../../components/Pagination'

// type cardProps = {
//   time?: string
//   content?: string
// }
//封装card组件
// const card: React.FC<cardProps> = (props) => {
//   return (
//     <div className='card'>
//       <div className='card_introduce'>{props.content}</div>
//       <div className='card_time'>{props.time}</div>
//     </div>
//   )
// }
const Expose: React.FC = () => {
  // const [current, setCurrent] = useState(3);
  // const onChange: PaginationProps['onChange'] = (page) => {
  //   console.log(page);
  //   setCurrent(page);
  // };
  return (
    <div className="expose">
      <div className="ex_title">有事儿就找邻妹妹</div>
      {/* <Pagination /> */}
      {/* <Pagination className='Pagination' current={current} onChange={onChange} total={50} /> */}
    </div>
  );
};
export default Expose;
