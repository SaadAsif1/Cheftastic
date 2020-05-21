import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { notification, Form, Input, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import AdminNavbar from '../../../layouts/AdminNavbar/AdminNavbar';

const EditPost = ({ history }) => {
  const [postData, setPostData] = useState('');

  // reset form
  const [form] = Form.useForm();

  useEffect(() => {
    // gets the id from url
    const documentID = queryString.parse(history.location.search);

    // Get Post Data
    axios
      .get(`/api/post/${documentID.id}`)
      .then((response) => {
        setPostData(response.data.post);

        // Set form values
        form.setFieldsValue({
          title: response.data.post.title,
          postText: response.data.post.postText,
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.error,
        });
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

  // Handle Form
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <AdminNavbar>
      {postData ? (
        <div>
          <div className='admin-edit-navbar'>
            <div className='admin-navbar-arrow'>
              <Link to='/admin/home'>
                <ArrowLeftOutlined />
              </Link>
            </div>
            <div className='admin-navbar-edit-title'>Edit Posts</div>
            <div className='admin-navbar-edit-postedAt'>
              <b>Post At: </b> {formatDate(postData.createdAt)}
              <br />
              <b>Last Updated: </b> {formatDate(postData.updatedAt)}
            </div>
          </div>
          <div className='admin-edit-body-container'>
            <Form onFinish={onFinish} name='basic' layout='vertical' form={form}>
              {/* Post Tilte */}
              <Form.Item
                name='title'
                label={<div className='admin-about-form-title'>Title</div>}
              >
                <Input size='large' className='admin-edit-title' />
              </Form.Item>

              {/* Post Body */}
              <Form.Item
                name='postText'
                label={<div className='admin-about-form-title'>Post Body</div>}
              >
                <Input.TextArea style={{ resize: ' none' }} rows='15' />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  style={{ background: 'rgb(83, 64, 255)', border: 'none' }}
                  danger
                >
                  Update
                </Button>
              </Form.Item>
            </Form>

            {postData.comments.length === 0 ? (
              <div className='edit-comments-btn-container'>
                <button>No Comments</button>
              </div>
            ) : (
              <div className='comments-container-edit'>
                <div className='edit-comments-btn-container'>
                  <button>Edit Comments ({postData.comments.length})</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </AdminNavbar>
  );
};

export default withRouter(EditPost);
