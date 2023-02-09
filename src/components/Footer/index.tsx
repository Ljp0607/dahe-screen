import { PlaySquareFilled } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '大河传媒有限公司出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'dahebao',
          title: '大河报社',
          href: 'https://www.dahebao.cn',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <PlaySquareFilled />,
          href: 'http://cms.daheapp.com/dahe',
          blankTarget: true,
        },
        {
          key: 'dahebaoguanwang',
          title: '大河报官网',
          href: 'http://cms.daheapp.com/dahe',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
