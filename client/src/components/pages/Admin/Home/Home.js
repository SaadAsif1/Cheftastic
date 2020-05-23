import React, { useEffect } from 'react';
import { notification } from 'antd';
import AdminNavbar from '../../../layouts/AdminNavbar/AdminNavbar';
import PostTable from './PostTable';
import '../Admin.css';

const Home = ({ location }) => {
  useEffect(() => {
    // Check if the redirect  use state
    if (!location.state) return;

    // If so we check if succful and if true toaster pops up
    if (location.state.addPost) {
      notification.success({ message: location.state.addPost });
    }
  }, []);

  return (
    <AdminNavbar>
      <div className='dashboard-tilte-container'>
        <h1 className='dashboard-title'>Your Reminders</h1>
      </div>
      <PostTable />
    </AdminNavbar>
  );
};

export default Home;
