import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Input, notification } from 'antd';
import { authenticate, isAuth } from '../../helpers/auth';
import Google from './Google';
import Navbar from '../layouts/Navbar/Navbar';

const Signin = ({ location, history }) => {
  const [buttonText, setButtonText] = useState('Submit');

  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Check if the redirect from /auth/activate/:token sent use state
    if (!location.state) return;

    // If so we check if succful and if true toaster pops up
    if (location.state.activation) {
      notification.success({ message: location.state.activation.message });
    }

    // If so we check if succful and if true toaster pops up
    if (location.state.passwordReset) {
      notification.success({ message: location.state.passwordReset.message });
    }
  }, []);

  const onFinish = (values) => {
    setButtonText('Submitting...');

    axios
      .post('/api/signin', {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        authenticate(response, () => {
          form.resetFields();
          setButtonText('Submit');
          if (isAuth()) {
            history.push('/admin/home');
          }
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.error,
        });
        setButtonText('Submit');
      });
  };

  // Signup Form
  const signInForm = () => (
    <div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input placeholder='Your Email' />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder='Your Password' />
        </Form.Item>

        <Form.Item>
          <button
            disabled={buttonText === 'Submitting...' ? true : false}
            className='main-btn'
            style={{
              borderRadius: '0',
              padding: '0.3rem 2rem',
            }}
          >
            {buttonText}
          </button>
        </Form.Item>
      </Form>
    </div>
  );

  // Google sign in
  const authGoogle = (response) => {
    authenticate(response, () => {
      if (isAuth()) {
        history.push('/admin/home');
      }
    });
  };

  // Form Styles
  const SignInStyles = {
    margin: '5rem auto',
    width: '50%',
    marginTop: '4rem',
    padding: '2rem',
    backgroundColor: '#ffff',
  };

  return (
    <div style={{ marginTop: '9rem' }}>
      <Navbar showArrow={true} arrowLink='/' />
      <div style={SignInStyles}>
        <h1 className='align-center'>Sign In</h1>
        <Google authGoogle={authGoogle} />
        {signInForm()}
        <div>
          Don't have an account? <Link to='/sign-up'>Register</Link> here
        </div>
        <br />
        <div>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
