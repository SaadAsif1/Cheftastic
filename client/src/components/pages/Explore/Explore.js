import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Tooltip } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import { getLocalStorage } from '../../../helpers/auth';
import Navbar from '../../layouts/Navbar/Navbar';
import './Explore.css';
const { Text, Title, Paragraph } = Typography;

const Explore = () => {
  const [redirect, setRedirect] = useState(false);

  // redirect if no name found
  useEffect(() => {
    if (!getLocalStorage('name')) {
      setRedirect(true);
    }
  }, []);

  return (
    <div>
      {redirect && <Redirect to='/' />}
      <Navbar showArrow={true} arrowLink='/' />
      <div className='container'>
        <div className='categories-container'>
          <Title level={4}>Categories:</Title>
          <div style={{ lineHeight: '1.5rem' }}>
            <Text code>Islam</Text>
            <Text code>Modivation</Text>
            <Text code>Working Out</Text>
            <Text code>Other</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
