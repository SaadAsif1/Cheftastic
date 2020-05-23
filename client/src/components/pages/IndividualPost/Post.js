import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Skeleton, Form, Input, Button, notification } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import Navbar from '../../layouts/Navbar/Navbar';
import './Post.css';
import { isAuth, getCookie } from '../../../helpers/auth';

const Post = ({ history }) => {
  const [post, setPost] = useState('');
  const [buttonText, setButtonText] = useState('Comment');
  const [comments, setComments] = useState('');
  const [commentVisable, setCommentVisable] = useState(false);
  const [commentFormVisable, setCommentFormVisable] = useState(false);

  //  form ref
  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // gets the id from url
    const documentID = queryString.parse(history.location.search);

    // Get Post
    axios
      .get(`/api/post/${documentID.id}`)
      .then((response) => {
        // Set Comments
        setComments(
          response.data.post.comments.sort((a, b) => {
            return b.date - a.date;
          })
        );
        // console.log(response.data);
        setPost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
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

  // Comment Visablity
  const commentVisablity = () => {
    if (commentVisable === true) {
      setCommentVisable(false);
    } else {
      setCommentVisable(true);
    }
  };

  // Comment form Visablity
  const commentForm = () => {
    if (isAuth()) {
      if (commentFormVisable === true) {
        setCommentFormVisable(false);
      } else {
        setCommentFormVisable(true);
      }
    } else {
      history.push('/sign-in');
    }
  };

  // Commment Form Submit
  const onFinish = (values) => {
    const token = getCookie('token');

    // gets the id from url
    const documentID = queryString.parse(history.location.search);

    setButtonText('Commenting . . .');

    axios
      .post(
        `/api/post/comment/${documentID.id}`,
        { commentText: values.comment },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        // notification.success({ message: 'Succfully Commented on post!' });
        setComments(
          response.data.comments.sort((a, b) => {
            return b.date - a.date;
          })
        );

        setButtonText('Comment');
        setCommentFormVisable(false);
        form.resetFields();
      })
      .catch((error) => {
        notification.error({ message: error.response.data.message });

        setButtonText('Comment');
      });
  };

  return (
    <div className='post-individual-wrapper'>
      <Navbar showArrow={true} arrowLink='/explore' />
      <div className='container'>
        {post ? (
          <div className='post-individual-container'>
            <div className='post-head'>
              <div className='post-postedBy'>
                <Avatar
                  style={{
                    backgroundColor: post.postedBy.thumbnail,
                    fontSize: '1.1rem',
                  }}
                  size='large'
                  className='post-avatar'
                >
                  {post.postedBy.name[0]}
                </Avatar>{' '}
                {post.postedBy.name}
              </div>
              <div className='post-postedAt letter-spacing-1'>
                {formatDate(post.createdAt)}
              </div>
            </div>

            <h1 className='post-individual-title'>{post.title}</h1>
            <div className='post-body'>{post.postText}</div>

            {/* Comment Buttons */}
            <div className='comment-individual-btn-container'>
              <button className='comment-individual-btn' onClick={commentVisablity}>
                {comments.length === 0
                  ? 'Be The To First Comment'
                  : `View Comments (${comments.length})`}
              </button>
            </div>

            <div
              className='post-comments'
              style={commentVisable ? { display: 'block' } : { display: 'none' }}
            >
              {/* Write a comment button */}
              <div className='write-comment-btn'>
                <div onClick={commentForm}>
                  <span className='write-commnet-icon'>
                    <CommentOutlined />
                  </span>
                  Write a comment...
                </div>
              </div>

              {/* Comment Form */}
              <div
                style={commentFormVisable ? { display: 'block' } : { display: 'none' }}
                className='comment-form-container'
              >
                <Form onFinish={onFinish} name='basic' form={form}>
                  {/* Post Body */}
                  <Form.Item
                    name='comment'
                    rules={[
                      {
                        required: true,
                        message: 'Comment is required!',
                      },
                    ]}
                  >
                    <Input.TextArea
                      style={{ resize: 'none' }}
                      rows='5'
                      placeholder='Write your comment here . . . '
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      disabled={'Commenting . . .' === buttonText ? true : false}
                      htmlType='submit'
                    >
                      {buttonText}
                    </Button>
                  </Form.Item>
                </Form>
              </div>

              {comments.map((comment, index) => (
                <div className='comment-individual-container' key={index}>
                  <div className='comment-head'>
                    <div className='comment-avatar-container'>
                      <Avatar
                        style={{
                          backgroundColor: comment.postedBy.thumbnail,
                          fontSize: '1.1rem',
                        }}
                        className='post-avatar'
                      >
                        {comment.postedBy.name[0]}
                      </Avatar>
                      <div className='comment-head-postedBy'>{comment.postedBy.name}</div>
                    </div>
                    <div className='comment-head-postedAt'>
                      {formatDate(Number(comment.date))}
                    </div>
                  </div>
                  <div className='comment-body'>{comment.commentText}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='post-individual-container'>
            <Skeleton avatar paragraph={{ rows: 6 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Post);
