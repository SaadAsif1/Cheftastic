import React from 'react';
import GoogleLogin from 'react-google-login';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';

const Google = ({ authGoogle }) => {
  const responseGoogle = (response) => {
    console.log(response.tokenId);
    axios({
      method: 'PUT',
      url: `/api/google-login`,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        authGoogle(response);
      })
      .catch((error) => {
        console.log('GOOGLE SIGN IN ERROR', error.response);
      });
  };

  const errorGoogle = (response) => {
    return;
  };

  return (
    <div>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        render={(renderProps) => (
          <Button
            style={{ width: ' 100%', marginBottom: '1rem' }}
            type='primary'
            danger
            icon={<GoogleOutlined />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Login With Google
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={errorGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Google;
