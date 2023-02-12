import React from 'react';
import List from '../components/list';
import './index.css';
// import { useRequest } from 'umi'
// import { getNews } from '@/api/modules'
const Reporter: React.FC = () => {
  // const { data, error, loading } = useRequest(() => {
  //   return getNews();
  // })
  // if (loading) {
  //   return <div > loading...</div >;
  // }
  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  // console.log(data);
  return (
    <div>
      1233
      <List drawRule={'data'} />
    </div>
  );
};
export default Reporter;
