import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { notification } from 'antd';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Navbar from '../layouts/Navbar/Navbar';

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    invalidToken: false,
    activation: {
      success: false,
      message: '',
    },
  });

  const { name, token, invalidToken, activation } = values;

  // Handle Account Activation
  const handleActivation = (event) => {
    event.preventDefault();

    axios
      .post(`/api/activate-account`, {
        token,
      })
      .then((response) => {
        setValues({
          ...values,
          activation: { success: true, message: response.data.message },
        });
      })
      .catch((error) => {
        setValues({ ...values, activation: { success: false, message: '' } });
        notification.error({ message: error.response.data.error });
      });
  };

  // When component Mount
  useEffect(() => {
    // Get Token From Url
    const token = match.params.token;

    // Checking if invalid token
    if (!jwt.decode(token)) return setValues({ ...values, invalidToken: true });

    // Decode Token (Pulling name out)
    const { name } = jwt.decode(token);

    // Setting State Values
    if (token) setValues({ ...values, name, token });
  }, []);

  // Activation Styling
  const activationStyles = {
    width: '50%',
    margin: '10rem auto',
    background: '#ffff',
    borderRadius: '1rem',
  };

  const accountActivation = () => (
    <div style={activationStyles} className='align-center'>
      <h1>Account Activation: </h1>
      <hr />
      <div>
        <h3>Hello {name} Please Click the Button Below to Activate your Account</h3>

        <button
          className='main-btn'
          onClick={handleActivation}
          disabled={name.length > 2 ? false : true}
          style={{ padding: '0.8rem 2rem', fontSize: '1rem', marginTop: '1rem' }}
        >
          Account Activation
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {invalidToken ? <Redirect to='/' /> : null}
      {activation.success ? (
        <Redirect
          to={{
            pathname: '/sign-in',
            state: { activation },
          }}
        />
      ) : null}
      <Navbar showArrow={true} arrowLink='/sign-up' />
      {accountActivation()}
    </div>
  );
};

export default Activate;
