import { useState } from 'react';
// import ReactGridLayout from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css';
import GridLayout from '@/components/GridLayout';
import '@/components/GridLayout/index.less';
import './App.css';

const App = () => {
  const [layout, setLayout] = useState([
    { i: 'a', x: 0, y: 0, w: 6, h: 4 },
    { i: 'b', x: 6, y: 0, w: 6, h: 4 },
    { i: 'c', x: 0, y: 4, w: 6, h: 4 },
    { i: 'd', x: 6, y: 4, w: 6, h: 4 },
  ]);

  const onLayoutChange = (newLayout: any) => {
    console.log('新的布局：', newLayout);

    setLayout(newLayout);
  };

  return (
    <div className="app">
      <h2 className="header">可拖拽伸缩的面板</h2>
      <GridLayout
        className="layout"
        layout={layout}
        onLayoutChange={onLayoutChange}
        cols={24} // 设置为 24 栅格布局
        rowHeight={30} // 每行高度
        width={1200} // 容器总宽度
      >
        <div key="a" className="grid-item">
          <div className="grid-item-content" onClick={() => console.log('点击了内容 1')}>
            内容 1
          </div>
        </div>
        <div key="b" className="grid-item">
          <div className="grid-item-content" onClick={() => console.log('点击了内容 2')}>
            内容 2
          </div>
        </div>
        <div key="c" className="grid-item">
          <div className="grid-item-content" onClick={() => console.log('点击了内容 3')}>
            内容 3
          </div>
        </div>
        <div key="d" className="grid-item" onClick={() => console.log('点击了内容 4')}>
          <div className="grid-item-content">内容 4</div>
        </div>
      </GridLayout>
    </div>
  );
};

export default App;
