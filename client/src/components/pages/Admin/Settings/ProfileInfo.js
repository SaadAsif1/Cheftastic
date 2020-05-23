import React, { useState, useEffect } from 'react';
import { Input, Button, Form, notification, Select } from 'antd';
import axios from 'axios';
import { isAuth, getCookie, updateUser } from '../../../../helpers/auth';
const { Option } = Select;
const { TextArea } = Input;

const ProfileInfo = () => {
  const [buttonText, setButtonText] = useState('Update');

  //  form ref
  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    axios
      .get(`/api/account/${isAuth()._id}`)
      .then((response) => {
        // Set form values
        form.setFieldsValue({
          thumbnail: response.data.userProfile.thumbnail,
          website: response.data.userProfile.website,
          bio: response.data.userProfile.bio,
        });
      })
      .catch((error) => {
        console.log('Error from Profile Info!');
      });
  }, []);

  const onFinish = (values) => {
    const token = getCookie('token');
    setButtonText('Updating . . .');

    const { website, thumbnail, bio } = values;

    axios
      .put(
        '/api/user-profile/update',
        { website, thumbnail, bio },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
      .then((response) => {
        form.setFieldsValue({
          thumbnail: response.data.userProfile.thumbnail,
          website: response.data.userProfile.website,
          bio: response.data.userProfile.bio,
        });

        notification.success({ message: 'Profile info succfully updated!' });
        setButtonText('Update');
      })
      .catch((error) => {
        notification.error({ message: error.response.data.error });
        setButtonText('Update');
      });
  };

  return (
    <Form onFinish={onFinish} name='basic' layout='vertical' form={form}>
      {/*  Thumbnail */}
      <Form.Item
        name='thumbnail'
        label={<div className='setting-form-title'>Icon Background</div>}
      >
        <Select style={{ width: '100%' }}>
          <Option value='#f5222d'>Red</Option>
          <Option value='#ff9c6e'>Light Orange</Option>
          <Option value='#fa541c'>Orange</Option>
          <Option value='#ffe7ba'>Tan</Option>
          <Option value='#871400'>Meganta</Option>
          <Option value='#faad14'>Gold</Option>
          <Option value='#d3f261'>Lime</Option>
          <Option value='#ffec3d'>Yellow</Option>
          <Option value='#2f54eb'>Dark Blue</Option>
          <Option value='#9254de'>Purple</Option>
          <Option value='#c41d7f'>Pink</Option>
          <Option value='#efdbff'>Light Purple</Option>
          <Option value='rgb(75, 91, 121)'>Grey</Option>
          <Option value='#096dd9'>Light Blue</Option>
          <Option value='#061178'>Navy Blue</Option>
        </Select>
      </Form.Item>

      {/* Website */}
      <Form.Item name='website' label={<div className='setting-form-title'>Website</div>}>
        <Input placeholder='Your Website' />
      </Form.Item>

      {/* Bio */}
      <Form.Item name='bio' label={<div className='setting-form-title'>Bio</div>}>
        <TextArea placeholder='About yourself' style={{ resize: 'none' }} rows={5} />
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
  );
};

export default ProfileInfo;
