import React from 'react';

import './styles.css';

import Border from '../Border';
import Content from '../Content';

const Layout: React.FC = () => {
  return (
    <div className="grid-area">
      <Border />
      <Content />
      {/* <Border /> */}
    </div>
  );
};

export default Layout;