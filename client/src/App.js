import React, { useState } from 'react';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Navbar from './components/layouts/Navbar/Navbar';

const App = () => {
  const [name, setName] = useState('');

  return (
    <div>
      <Navbar />
      <div className='container align-center'>
        <div className='home-container'>
          <h2 className='home-main-text'>Share Beneficial Reminders</h2>
          <p className='home-sub-text'>
            There is no wealth like knowledge, and no poverty like ignorance.
          </p>
          <div className='home-input-container'>
            <input type='text' className='home-input' placeholder='Full Name' />
          </div>
        </div>
      </div>
      <div className='home-footer'>
        <button
          type='primary'
          size='large'
          className='main-btn'
          disabled
          style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default App;
