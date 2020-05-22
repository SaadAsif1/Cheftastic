import React, { useState } from 'react';
import { Tabs } from 'antd';
import AdminNavbar from '../../../layouts/AdminNavbar/AdminNavbar';
import PersonalInfo from './PersonalInfo';
import ProfileInfo from './ProfileInfo';
const { TabPane } = Tabs;

const Settings = () => {
  return (
    <AdminNavbar>
      <div className='settings-container'>
        <div className='card-container'>
          <div className='settings-main-title'>Account Settings</div>
          <div className='settings-sub-title'>Edit your name, password etc.</div>
          <Tabs type='card'>
            <TabPane tab='Personal Info' key='1'>
              <PersonalInfo />
            </TabPane>
            <TabPane tab='Profile Info' key='2'>
              <ProfileInfo />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </AdminNavbar>
  );
};

export default Settings;
