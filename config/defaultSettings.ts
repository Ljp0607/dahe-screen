import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  // colorWeak: false,
  title: '大河报社',
  pwa: true,
  logo: 'https://imgcdn.dahebao.cn/20230209/20230209095020723368.png',
  iconfontUrl: '',
  token: {},
};

export default Settings;

//
