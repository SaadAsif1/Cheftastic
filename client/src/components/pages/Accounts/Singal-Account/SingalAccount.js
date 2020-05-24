import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { isAuth } from '../../../../helpers/auth';
import Navbar from '../../../layouts/Navbar/Navbar';

const SingalAccount = ({ history }) => {
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
  }, []);

  return (
    <div>
      <Navbar showArrow={true} arrowLink='/accounts' />
    </div>
  );
};

export default withRouter(SingalAccount);
