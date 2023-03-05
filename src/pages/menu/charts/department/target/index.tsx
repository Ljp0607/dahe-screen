import React, { useEffect, useState } from 'react';
// import './index.css'
import { getDownload } from '@/api/modules';
import Water from '../../components/water/index';
type Props = {
  type_name: string;
};
const Target: React.FC<Props> = (props) => {
  const [clickTotal, setClickTotal] = useState<number | null>(null);
  const getDown = () => {
    getDownload({ timeType: 'day' }).then((res) => {
      setClickTotal(res.data.filter((item) => item.type_name === props.type_name)[0].clickTotal);
    });
  };
  useEffect(() => {
    getDown();
    const timer = setInterval(() => {
      getDown();
    }, 180000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="target">
      <Water title="实时下载量" content={clickTotal} />
      <Water title="全年目标完成" content="20%" />
    </div>
  );
};
export default Target;
