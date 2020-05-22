import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Avatar } from 'antd';
import {
  YuqueFilled,
  HomeOutlined,
  SlidersOutlined,
  SettingOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { signout, isAuth } from '../../../helpers/auth';
import './AdminNavbar.css';

const AdminNavbar = ({ history, children }) => {
  // Signout
  const handleSignOut = () => {
    signout(() => {
      history.push('/');
    });
  };

  // hightlight navabr
  const activeLink = (Link) => {
    if (history.location.pathname === Link) {
      return {
        backgroundColor: 'rgb(75, 91, 121)',
      };
    }
  };

  return (
    <div>
      <div className='admin-navbar-container'>
        <div className='admin-navbar-title-container'>
          <div>
            <Avatar
              style={{
                backgroundColor: 'rgb(75, 91, 121)',
                verticalAlign: 'middle',
                fontSize: '1.5rem',
                textTransform: 'capitalize',
              }}
              size='large'
              size={54}
            >
              {isAuth().name[0]}
            </Avatar>
          </div>
          <div className='admin-navbar-personal-container'>
            <h2 className='admin-title-navbar'>{isAuth().name}</h2>
            <div></div>
          </div>
        </div>

        <div className='admin-navbar-links-container'>
          <Link
            style={activeLink('/admin/home')}
            to='/admin/home'
            className='admin-nav-link'
          >
            <span className='admin-nav-icon'>
              <HomeOutlined />
            </span>
            Home
          </Link>
          <Link style={activeLink('/explore')} to='/explore' className='admin-nav-link'>
            <span className='admin-nav-icon'>
              <SlidersOutlined />
            </span>
            Explore
          </Link>
          <Link
            style={activeLink('/admin/settings')}
            to='/admin/settings'
            className='admin-nav-link'
          >
            <span className='admin-nav-icon'>
              <SettingOutlined />
            </span>
            Settings
          </Link>
          <span onClick={handleSignOut} className='admin-nav-link'>
            <span className='admin-nav-icon'>
              <ExportOutlined />
            </span>
            Sign Out
          </span>
        </div>
        <Link
          to='/admin/home'
          style={{ color: 'white' }}
          className='align-center title-font navbar-title admin-navbar-title'
        >
          <YuqueFilled /> Reminders
        </Link>
      </div>
      <div className='admin-container-body'>{children}</div>
    </div>
  );
};

export default withRouter(AdminNavbar);
