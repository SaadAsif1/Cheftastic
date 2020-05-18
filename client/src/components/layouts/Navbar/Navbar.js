import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { YuqueFilled, MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { isAuth } from '../../../helpers/auth';
import './Navbar.css';

const Navbar = ({ showArrow, arrowLink }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // Shows arrow
  const arrow = () => {
    if (showArrow) {
      return { display: 'block' };
    } else {
      return { display: 'none' };
    }
  };

  return (
    <div className='navbar-main-container'>
      <div className='navbar-container'>
        <div>
          <Link to={arrowLink} style={arrow()} className='nav-arrow'>
            <ArrowLeftOutlined />
          </Link>
        </div>
        <div className='align-center title-font navbar-title'>
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
          width={200}
        >
          <div className='align-center'>
            {isAuth() ? (
              <p>Hi</p>
            ) : (
              <div>
                <p>Sign Up</p>
                <p>Sign In</p>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
