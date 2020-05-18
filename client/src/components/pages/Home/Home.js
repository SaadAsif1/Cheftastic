import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setLocalStorage } from '../../../helpers/auth';
import Navbar from '../../layouts/Navbar/Navbar';
import './Home.css';

const Home = () => {
  const [name, setName] = useState('');

  // Handling input changes
  const handleChange = (event) => {
    setName(event.target.value);
  };

  // Handle Click
  const handleClick = () => {
    setLocalStorage('name', name);
  };

  return (
    <div>
      <Navbar showArrow={false} arrowLink='/' />
      <div className='container align-center'>
        <div className='home-container'>
          <h2 className='home-main-text'>Share Beneficial Reminders</h2>
          <p className='home-sub-text'>
            There is no wealth like knowledge, and no poverty like ignorance.
          </p>
          <div className='home-input-container'>
            <input
              type='text'
              className='home-input'
              onChange={handleChange}
              value={name}
              placeholder='Full Name'
            />
          </div>
        </div>
      </div>
      <div className='home-footer'>
        <Link disabled={name ? false : true} to='/explore'>
          <button
            className='main-btn'
            onClick={handleClick}
            disabled={name.length > 2 ? false : true}
            style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
