import React, { useState, useEffect } from 'react';
import { Input, Button, Form, notification } from 'antd';
import axios from 'axios';
import { isAuth, getCookie, updateUser } from '../../../../helpers/auth';

const PersonalInfo = () => {
  const [buttonText, setButtonText] = useState('Update');

  //  form ref
  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Set form values
    form.setFieldsValue({
      name: isAuth().name,
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);

    const token = getCookie('token');

    setButtonText('Updating . . .');

    axios
      .put(
        '/api/account/update',
        { name: values.name, password: values.confirm },
        {
          headers: {
            'auth-token': token,
          },
        }
      )
      .then((response) => {
        updateUser(response, () => {
          // Set form values
          form.setFieldsValue({
            name: response.data.name,
            password: '',
            confirm: '',
          });

          notification.success({ message: 'Personal info sucfully updated!' });

          setButtonText('Update');
        });
      })
      .catch((error) => {
        notification.error({ message: error.response.data.error });
        setButtonText('Update');
      });
  };

  return (
    <Form onFinish={onFinish} name='basic' layout='vertical' form={form}>
      {/* Name */}
      <Form.Item
        name='name'
        label={<div className='setting-form-title'>Name</div>}
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input style={{ textTransform: 'capitalize' }} />
      </Form.Item>

      {/* Email */}
      <Form.Item label={<div className='setting-form-title'>Email</div>}>
        <Input disabled className='setting-email-input' value={isAuth().email} />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name='password'
        label={<div className='setting-form-title'>New Password</div>}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder='Password' />
      </Form.Item>

      <Form.Item
        name='confirm'
        label={<div className='setting-form-title'>Confirm Password</div>}
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
        <Input.Password placeholder='Confirm Password' />
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

export default PersonalInfo;
