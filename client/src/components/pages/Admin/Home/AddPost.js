import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { notification, Form, Input, Button } from 'antd';
import AdminNavbar from '../../../layouts/AdminNavbar/AdminNavbar';
import { getCookie } from '../../../../helpers/auth';

const AddPost = () => {
  const [buttonText, setButtonText] = useState('Submit');
  const [redirect, setRedirect] = useState({
    redirect: false,
    message: '',
  });

  // form
  const [form] = Form.useForm();

  // Submit Form
  const onFinish = (values) => {
    const token = getCookie('token');

    const { postText, title } = values;

    setButtonText('Submitting . . .');

    axios
      .post(
        '/api/post',
        { postText, title },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
      .then((response) => {
        setButtonText('Submit');

        form.resetFields();

        // Redirect
        setRedirect({ redirect: true, message: response.data.message });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.error,
        });
        setButtonText('Submit');

        setRedirect({ redirect: false, message: '' });
      });
  };

  return (
    <AdminNavbar>
      {redirect.redirect && (
        <Redirect
          to={{
            pathname: '/admin/home',
            state: { addPost: redirect.message },
          }}
        />
      )}
      <div className='admin-edit-navbar'>
        <div className='admin-navbar-arrow'>
          <Link to='/admin/home'>
            <ArrowLeftOutlined />
          </Link>
        </div>
        <div style={{ marginRight: 0 }} className='admin-navbar-edit-title'>
          Add New Posts
        </div>
        <div></div>
      </div>

      <div className='admin-edit-body-container'>
        <Form onFinish={onFinish} name='basic' layout='vertical' form={form}>
          {/* Post Tilte */}
          <Form.Item
            name='title'
            label={<div className='admin-about-form-title'>Title</div>}
            rules={[
              {
                required: true,
                message: 'Title is required!',
              },
            ]}
          >
            <Input size='large' className='admin-edit-input' />
          </Form.Item>

          {/* Post Body */}
          <Form.Item
            name='postText'
            label={<div className='admin-about-form-title'>Post Body</div>}
            rules={[
              {
                required: true,
                message: 'Post Text is required!',
              },
            ]}
          >
            <Input.TextArea className='admin-edit-textarea' rows='15' />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={'Submitting . . .' === buttonText ? true : false}
              type='primary'
              htmlType='submit'
            >
              {buttonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AdminNavbar>
  );
};

export default AddPost;
