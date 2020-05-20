import React, { useState } from 'react';
import { Form, Input, notification } from 'antd';
import axios from 'axios';
import Navbar from '../../layouts/Navbar/Navbar';
import './Contact.css';

const { TextArea } = Input;

const Contact = () => {
  const [buttonText, setButtonText] = useState('Submit');

  const [form] = Form.useForm();

  const onFinish = (value) => {
    setButtonText('Submitting...');

    const { name, email, message } = value;

    axios
      .post('/api/contact', { name, email, message })
      .then((response) => {
        notification.success({ message: response.data.message });
        form.resetFields();
        setButtonText('Submit');
      })
      .catch((error) => {
        notification.error({ message: error.response.data.error });
        setButtonText('Submit');
      });
  };

  return (
    <div style={{ marginTop: '6rem' }}>
      <Navbar showArrow={true} arrowLink='/explore' />
      <div className='container'>
        <div className='contact-container'>
          <div className='contact-container-title'>
            <h2>Contact Us</h2>
            <p>
              Hey! We are intrested in what you have to say. We will reply within 24 hours
              of your message.
            </p>
          </div>
          <Form layout='vertical' name='basic' onFinish={onFinish} form={form}>
            <Form.Item
              label='Full name'
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder='Name' />
            </Form.Item>

            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Please input your email!', type: 'email' },
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              label='Message'
              name='message'
              rules={[{ required: true, message: 'Please input your message!' }]}
            >
              <TextArea rows={7} placeholder='Message' style={{ resize: 'none' }} />
            </Form.Item>

            <Form.Item>
              <button
                className='main-btn'
                style={{
                  borderRadius: '0',
                  padding: '0.3rem 2rem',
                }}
                disabled={'Submitting...' === buttonText ? true : false}
              >
                {buttonText}
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
