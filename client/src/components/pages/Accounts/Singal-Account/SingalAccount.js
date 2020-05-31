import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { isAuth } from '../../../../helpers/auth';
import Navbar from '../../../layouts/Navbar/Navbar';

const SingalAccount = ({ history }) => {
  const [userProfile, setUserProfile] = useState('');
  const [userPosts, setUserPosts] = useState('');

  useEffect(() => {
    // gets the id from url
    const documentID = queryString.parse(history.location.search);

    axios
      .get(`/api/account/posts/${documentID.id}`)
      .then((response) => {
        console.log(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/api/account/${documentID.id}`)
      .then((response) => {
        setUserProfile(response.data.userProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='container'>
      <Navbar showArrow={true} arrowLink='/accounts' />

      {/* Account Info */}
      <div style={{ marginTop: '10rem' }} className='account-info-container'>
        {userProfile && userProfile.name}
      </div>
    </div>
  );
};

export default withRouter(SingalAccount);
