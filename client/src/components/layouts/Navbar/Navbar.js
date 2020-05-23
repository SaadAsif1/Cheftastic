import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Menu, Dropdown, Avatar } from 'antd';
import axios from 'axios';
import { YuqueFilled, MenuOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { isAuth, signout } from '../../../helpers/auth';
import './Navbar.css';

const Navbar = ({ showArrow, arrowLink, history }) => {
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    if (isAuth()) {
      axios
        .get(`/api/account/${isAuth()._id}`)
        .then((response) => {
          setUserProfile(response.data.userProfile);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item style={navbarCurrent('/explore')}>
                  <Link to='/explore'>Explore</Link>
                </Menu.Item>
                <Menu.Item style={navbarCurrent('/explore')}>
                  <Link to='/explore'>Users</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                  <Link to='/admin/home'>Manage Posts</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to='/admin/settings'>Account Settings</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item style={navbarCurrent('/contact')}>
                  <Link to='/contact'>Contact</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                  <span
                    onClick={() => {
                      signout(() => {
                        history.push('/');
                      });
                    }}
                  >
                    Sign Out
                  </span>
                </Menu.Item>
              </Menu>
            }
            // trigger={['click']}
          >
            <Avatar
              style={{
                backgroundColor: userProfile.thumbnail,
                verticalAlign: 'middle',
                fontSize: '1rem',
              }}
              className='navbar-avatar'
            >
              {isAuth().name[0]}
            </Avatar>
          </Dropdown>
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
