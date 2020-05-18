import React, { useState } from 'react';
import { Drawer } from 'antd';
import { YuqueFilled, MenuOutlined } from '@ant-design/icons';
import './Navbar.css';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className='navbar-container'>
      <div></div>
      <div className='align-center title-font navbar-title '>
        <YuqueFilled /> Reminders
      </div>
      <button className='navbar-menu' onClick={showDrawer}>
        <MenuOutlined />
      </button>
      <Drawer
        title={
          <div className='align-center title-font letter-spacing-1 drawer-title'>
            <YuqueFilled /> Reminders
          </div>
        }
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default Navbar;
