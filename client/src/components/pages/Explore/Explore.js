import React, { useEffect, useState } from 'react';
import { Typography, Avatar, Button, Skeleton, BackTop } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isAuth } from '../../../helpers/auth';
import Navbar from '../../layouts/Navbar/Navbar';
import './Explore.css';
const { Paragraph } = Typography;

const Explore = () => {
  const [posts, setPosts] = useState('');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    axios
      .get(`/api/posts`)
      .then((response) => {
        setPosts(response.data.posts);
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

  return (
    <div className='explore-container'>
      <Navbar showArrow={isAuth() ? false : true} arrowLink='/' />

      <BackTop />

      <div className='container'>
        <div className='explore-title-container'>
          <h2 className='explore-title'>Explore Reminders</h2>
        </div>

        {posts ? (
          posts.map((post) => (
            <div className='post-container' key={post._id}>
              <div className='post-title'>{post.title}</div>
              <div className='post-passage'>
                <Paragraph ellipsis={{ rows: 2 }}>{post.postText}</Paragraph>
              </div>
              <div className='post-info-bottom'>
                <div className='post-thumbnail'>
                  <Avatar
                    style={{
                      backgroundColor: post.postedBy.thumbnail,
                      fontSize: '1.1rem',
                    }}
                    size='medium'
                    className='navbar-avatar'
                  >
                    {post.postedBy.name[0]}
                  </Avatar>
                  <div className='post-thumbnail-container'>
                    <div className='post-name'>{post.postedBy.name}</div>
                    <div>{formatDate(post.createdAt)}</div>
                  </div>
                </div>
                <Link to={`/post?id=${post._id}`}>
                  <Button className='post-read-more'>
                    Read More <ArrowRightOutlined />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className='post-container'>
              <Skeleton />
            </div>
            <div className='post-container'>
              <Skeleton />
            </div>
            <div className='post-container'>
              <Skeleton />
            </div>
            <div className='post-container'>
              <Skeleton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
