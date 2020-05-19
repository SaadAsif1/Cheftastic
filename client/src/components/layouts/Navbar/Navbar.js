import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Drawer, Button, Menu, Dropdown } from 'antd';
import {
  YuqueFilled,
  MenuOutlined,
  ArrowLeftOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { isAuth, signout, getLocalStorage } from '../../../helpers/auth';
import './Navbar.css';

const Navbar = ({ showArrow, arrowLink, history }) => {
  // const [visible, setVisible] = useState(false);

  // const showDrawer = () => {
  //   setVisible(true);
  // };

  // const onClose = () => {
  //   setVisible(false);
  // };

  const navbarCurrent = (path) => {
    if (history.location.pathname === path) {
      return { background: 'lightgrey' };
    }
  };

  // Shows arrow
  const arrow = () => {
    if (showArrow) {
      return { title: { marginRight: '-1.5rem' }, arrow: { display: 'block' } };
    } else {
      return { title: { marginRight: '-3rem' }, arrow: { display: 'none' } };
    }
  };

  return (
    <div className='navbar-main-container'>
      <div className='navbar-container'>
        <div>
          <Link to={arrowLink} style={arrow().arrow} className='nav-arrow'>
            <ArrowLeftOutlined />
          </Link>
        </div>
        <Link
          to='/'
          style={arrow().title}
          className='align-center title-font navbar-title'
        >
          <YuqueFilled /> Reminders
        </Link>
        {isAuth() ? (
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
        ) : (
          <div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item style={navbarCurrent('/explore')}>
                    <Link to='/explore'>Explore</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item style={navbarCurrent('/contact')}>
                    <Link to='/contact'>Contact</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item style={navbarCurrent('/sign-up')}>
                    <Link to='/sign-up'>Sign Up</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item style={navbarCurrent('/sign-in')}>
                    <Link to='/sign-in'>Sign In</Link>
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Button
                type='primary'
                style={{ background: 'rgb(83, 64, 255)', border: 'none' }}
                danger
                onClick={(e) => e.preventDefault()}
              >
                <MenuOutlined />
              </Button>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);

/* <Link className='nav-links-1' to='/sign-in'>
              Sign In
            </Link>
            <Link className='nav-links-2' to='/sign-up'>
              Sign Up
            </Link> */

/* <Drawer
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
          width={300}
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
        </Drawer> */
