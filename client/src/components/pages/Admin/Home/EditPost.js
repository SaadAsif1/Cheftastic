import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { notification, Form, Input, Button, Avatar, Popconfirm } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import AdminNavbar from '../../../layouts/AdminNavbar/AdminNavbar';
import { getCookie } from '../../../../helpers/auth';

const EditPost = ({ history }) => {
  const [postData, setPostData] = useState('');
  const [commentsData, setCommentsData] = useState('');
  const [commentVisable, setCommentVisable] = useState(false);
  const [buttonText, setButtonText] = useState('Update');

  //  form ref
  const [form] = Form.useForm();

  useEffect(() => {
    // gets the id from url
    const documentID = queryString.parse(history.location.search);

    // Get Post Data
    axios
      .get(`/api/post/${documentID.id}`)
      .then((response) => {
        setPostData(response.data.post);
        setCommentsData(response.data.post.comments);

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

  // Comment Visablity
  const commentVisablity = () => {
    if (commentVisable === true) {
      setCommentVisable(false);
    } else {
      setCommentVisable(true);
    }
  };

  // Format Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Update Handle Form
  const onFinish = (values) => {
    const token = getCookie('token');

    // Post ID
    const documentID = queryString.parse(history.location.search);

    const { postText, title } = values;

    setButtonText('Updating . . .');

    axios
      .put(
        `/api/post/${documentID.id}`,
        { postText, title },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
      .then((response) => {
        // Show message
        notification.success({
          message: response.data.message,
        });

        setButtonText('Update');
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.error,
        });
        setButtonText('Update');
      });
  };

  // Delete Comment
  const deleteComment = (comment) => {
    const token = getCookie('token');

    // gets the id from url
    const documentID = queryString.parse(history.location.search);

    axios
      .delete(`/api/post/comment/${documentID.id}`, {
        data: { commentID: comment },
        headers: {
          'auth-token': token,
        },
      })
      .then((response) => {
        // Set Comments
        setCommentsData(response.data.comments);

        // Show message
        notification.success({
          message: response.data.message,
        });
      })
      .catch((error) => {
        notification.error({
          message: error.response.data.error,
        });
      });
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
                <Input size='large' className='admin-edit-input' />
              </Form.Item>

              {/* Post Body */}
              <Form.Item
                name='postText'
                label={<div className='admin-about-form-title'>Post Body</div>}
              >
                <Input.TextArea className='admin-edit-textarea' rows='15' />
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={'Updating . . .' === buttonText ? true : false}
                  type='primary'
                  htmlType='submit'
                >
                  {buttonText}
                </Button>
              </Form.Item>
            </Form>

            {commentsData.length === 0 ? (
              <div className='edit-comments-btn-container'>
                <button>No Comments</button>
              </div>
            ) : (
              <div className='comments-container-edit'>
                <div className='edit-comments-btn-container'>
                  <button onClick={commentVisablity}>
                    Edit Comments ({commentsData.length})
                  </button>
                </div>

                {/* Comments */}
                <div
                  style={
                    commentVisable
                      ? {
                          display: 'block',
                          background: '#f8f8f8',
                          padding: '0.5rem 1.5rem',
                          marginTop: '2rem',
                          borderRadius: '10px',
                        }
                      : { display: 'none' }
                  }
                >
                  {commentsData.map((comment) => (
                    <div className='comment-container' key={comment._id}>
                      <div className='comment-container-head'>
                        <div className='comment-dec'>
                          <Avatar
                            style={{
                              backgroundColor: comment.thumbnail,
                              verticalAlign: 'middle',
                              fontSize: '1.5rem',
                            }}
                            size='large'
                          >
                            {comment.postedBy.name[0]}
                          </Avatar>{' '}
                          <div className='commment-container'>
                            <div className='commment-name'>{comment.postedBy.name}</div>
                            <div className='commment-date'>
                              {formatDate(Number(comment.date))}
                            </div>
                          </div>
                        </div>

                        {/* Delete Comments */}
                        <div>
                          <Popconfirm
                            title={`Do you want to delete this comment?`}
                            onConfirm={() => deleteComment(comment._id)}
                            okText='Yes'
                            cancelText='No'
                          >
                            <Button icon={<DeleteOutlined />} danger type='primary'>
                              Delete
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                      <div className='comment-text'>{comment.commentText}</div>
                    </div>
                  ))}
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
