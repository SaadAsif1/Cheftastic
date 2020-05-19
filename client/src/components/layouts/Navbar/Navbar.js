import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import {
  YuqueFilled,
  MenuOutlined,
  ArrowLeftOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { isAuth, signout, getLocalStorage } from '../../../helpers/auth';
import './Navbar.css';

const Navbar = ({ showArrow, arrowLink, history }) => {
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
        <Link to='/' className='align-center title-font navbar-title'>
          <YuqueFilled /> Reminders
        </Link>
        <button className='navbar-menu' onClick={showDrawer}>
          <MenuOutlined />
        </button>
        <Drawer
          title={
            <div className='align-center  letter-spacing-1 drawer-title'>
              <b>
                <UserOutlined /> {isAuth() ? isAuth().name : getLocalStorage('name')}
              </b>
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
              <p>
                <Button
                  type='primary'
                  danger
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    signout(() => {
                      history.push('/');
                    });
                  }}
                >
                  Sign Out
                </Button>
              </p>
            ) : (
              <div>
                <p>
                  <Link className='nav-links' to='/sign-up'>
                    Sign Up
                  </Link>
                </p>
                <p>
                  <Link className='nav-links' to='/sign-in'>
                    Sign In
                  </Link>
                </p>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
