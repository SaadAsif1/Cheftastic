import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Skeleton } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import Navbar from '../../layouts/Navbar/Navbar';
import './Post.css';

const Post = ({ history }) => {
  const [post, setPost] = useState('');
  const [commentVisable, setCommentVisable] = useState(false);

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
        console.log(response.data);
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
                {post.comments.length === 0
                  ? 'Be The To First Comment'
                  : `View Comments (${post.comments.length})`}
              </button>
            </div>

            <div
              className='post-comments'
              style={commentVisable ? { display: 'block' } : { display: 'none' }}
            >
              {/* Write a comment button */}
              <div className='write-comment-btn'>
                <div>
                  <span className='write-commnet-icon'>
                    <CommentOutlined />
                  </span>
                  Write a response...
                </div>
              </div>

              {post.comments.map((comment, index) => (
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
