import React from 'react';
import AdminNavbar from '../../../layouts/AdminNavbar/AdminNavbar';
import PostTable from './PostTable';
import '../Admin.css';

const Home = () => {
  return (
    <AdminNavbar>
      <div className='dashboard-tilte-container'>
        <h1 className='dashboard-title'>Your Posts</h1>
      </div>
      <PostTable />
    </AdminNavbar>
  );
};

export default Home;
