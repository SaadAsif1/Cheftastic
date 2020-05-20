import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, notification } from 'antd';
import axios from 'axios';
import Navbar from '../layouts/Navbar/Navbar';

const Signup = () => {
  const [buttonText, setButtonText] = useState('Submit');

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setButtonText('Submitting...');

    axios
      .post('/api/signup', {
        name: values.name,
        email: values.email,
        password: values.confirm,
      })
      .then((response) => {
        notification.success({ message: response.data.message });
        form.resetFields();
        setButtonText('Submit');
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.error,
        });
        setButtonText('Submit');
      });
  };

  // Signup Form
  const signUpForm = () => (
    <div>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder='Your Name' />
        </Form.Item>
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
          hasFeedback
        >
          <Input.Password placeholder='Your Password' />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password placeholder='Confirm Your Password' />
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

  // Form Styles
  const formStyles = {
    width: '50%',
    margin: '0 auto',
    marginTop: '4rem',
    padding: '2rem',
    borderRadius: '20px',
  };

  return (
    <div style={{ marginTop: '9rem' }}>
      <Navbar showArrow={true} arrowLink='/sign-in' />
      <div style={formStyles}>
        <h1 className='align-center'>Sign Up</h1>

        {signUpForm()}
        <div>
          Already have an account? <Link to='/sign-in'>Sign In</Link> here
        </div>
      </div>
    </div>
  );
};

export default Signup;
