import React from 'react';
import ReactDOM from 'react-dom/client';
import Icon from '@ant-design/icons';
import title from './Icons/favicon.svg'; // 你的 '*.svg' 文件路径
// in create-react-app:
// import { ReactComponent as MessageSvg } from 'path/to/message.svg';

let favicon = document.querySelector('#favicon')
if (!favicon) {
  favicon = document.createElement('div')
  favicon.className = 'favicon'
  favicon.id = 'favicon'
  document.body.append(favicon)
}
ReactDOM.createRoot(favicon).render(<Icon component={title} />);

const Favicon: React.FC = () => {
  return (
    <div>
    </div>
  )
}
export default Favicon

