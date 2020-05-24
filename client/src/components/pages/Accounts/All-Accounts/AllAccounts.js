import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import Navbar from '../../../layouts/Navbar/Navbar';
import '../Account.css';

const AllAccounts = () => {
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    axios
      .get('/api/accounts')
      .then((response) => {
        setUserProfile(response.data.userProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Format Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className='container'>
      <Navbar showArrow={true} arrowLink='/explore' />

      <div className='all-accounts-container'>
        <div className='accounts-title-container'>
          <h2 className='accounts-title'>All Accounts</h2>
        </div>

        <div className='accounts-flex-container'>
          {userProfile
            ? userProfile.map((profile) => (
                <div className='accounts-container' key={profile._id}>
                  <div className='accounts-avatar-container'>
                    <Avatar
                      style={{
                        backgroundColor: profile.thumbnail,
                        fontSize: '1.2rem',
                      }}
                      className='navbar-avatar'
                      size='large'
                    >
                      {profile.name[0]}
                    </Avatar>
                    <div className='accounts-avatar-name'>{profile.name}</div>
                  </div>

                  <div className='accounts-btn-container'>
                    <Link to={`/account?id=${profile.user}`}>
                      <Button size='small' type='primary'>
                        View Profile
                      </Button>
                    </Link>
                  </div>

                  <div className='accounts-joined-at'>
                    <b>Joined At:</b> <span>{formatDate(profile.createdAt)}</span>
                  </div>
                </div>
              ))
            : [1, 2, 3, 4].map((num) => (
                <div className='account-container-skeleton' key={num}>
                  <Skeleton />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AllAccounts;
