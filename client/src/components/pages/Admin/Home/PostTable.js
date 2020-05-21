import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, Button, notification } from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { isAuth } from '../../../../helpers/auth';

const PostTable = () => {
  const [posts, setPosts] = useState('');
  const [search, setSearch] = useState('');

  // Call Api to get user posts
  useEffect(() => {
    axios
      .get(`/api/account/posts/${isAuth()._id}`)
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        notification.error({ message: error.response.data.error });
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

  // Filter Posts
  let filteredPosts = posts
    ? posts.filter((post) => {
        return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })
    : '';

  return (
    <div>
      <div className='post-table-top'>
        <div>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            style={{ background: '#03a87c', border: 'none' }}
            danger
          >
            Add New Posts
          </Button>
        </div>
        <Input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='Search Posts Tilte'
          prefix={<SearchOutlined />}
          style={{ width: '20rem' }}
        />
      </div>
      <table>
        <thead style={{ background: '#4E5964', color: '#f4f4f4' }}>
          <tr>
            <th className='align-center'>Post Title</th>
            <th className='align-center'>Comments</th>
            <th className='align-center'>Date Posted</th>
            <th className='align-center'>Edit</th>
            <th className='align-center'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length === 0 ? (
            <h2 className='align-center'> No posts</h2>
          ) : (
            filteredPosts &&
            filteredPosts.map((post) => (
              <tr key={post._id}>
                <td className='align-center'>{post.title}</td>
                <td className='align-center'>{post.comments.length}</td>
                <td className='align-center'>{formatDate(post.createdAt)}</td>
                <td className='align-center'>
                  <Link to={`/admin/home/edit?id=${post._id}`}>
                    <Button
                      onClick={() => console.log(post._id)}
                      type='primary'
                      icon={<EditOutlined />}
                    >
                      Edit
                    </Button>
                  </Link>
                </td>
                <td className='align-center'>
                  <Button type='primary' icon={<DeleteOutlined />} danger>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
