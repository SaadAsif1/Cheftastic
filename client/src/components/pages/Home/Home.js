import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import { setLocalStorage, isAuth } from '../../../helpers/auth';
import Navbar from '../../layouts/Navbar/Navbar';
import Research from '../../../assets/view.png';
import Book from '../../../assets/book.png';
import Bulb from '../../../assets/bulb.png';
import './Home.css';

const Home = ({ history }) => {
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
    <div style={{ marginTop: '9rem' }}>
      {isAuth() && <Redirect to='/explore' />}

      <Navbar showArrow={false} arrowLink='/' />
      <div className='container'>
        <Bounce top>
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
                  onKeyPress={(event) => {
                    if (event.key === 'Enter' && name.length > 2) {
                      history.push('/explore');
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Bounce>

        <div className='home-img-container'>
          <Bounce left>
            <div className='home-img-paragraph'>
              <img className='home-img' src={Research} alt='img1' />
              <h2>Your Research</h2>
              <p>
                You words can have a big effect others. Make sure to you are aware of what
                youre whriteing. DO YOUR RESEARCH!
              </p>
            </div>
          </Bounce>

          <Bounce clear>
            <div className='home-img-paragraph'>
              <img className='home-img' src={Book} alt='img2' />
              <h2>Factual Writing</h2>
              <p>
                Your writing should be concerned with actual details or information rather
                than ideas or feelings about it.
              </p>
            </div>
          </Bounce>

          <Bounce right>
            <div className='home-img-paragraph'>
              <img className='home-img' src={Bulb} alt='img2' />
              <h2>World Impact</h2>
              <p>
                Your writing will be impacting many in the world make sure your
                considerate and done your research.
              </p>
            </div>
          </Bounce>
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
    </div>
  );
};

export default withRouter(Home);
