import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { getLocalStorage, isAuth } from '../../../helpers/auth';
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
        <Card
          style={{ margin: '2rem 0' }}
          type='inner'
          title={<div style={{ fontSize: '1.5rem' }}>Saad Asif</div>}
          extra={
            <div>
              <b>Posted By : </b> Saad Asif
            </div>
          }
        >
          <Paragraph ellipsis={{ rows: 4, expandable: true }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto totam
            dignissimos porro repellendus quis esse reprehenderit veritatis minus labore
            libero debitis, tempore facilis saepe, minima enim fuga quo. Consequuntur vero
            sed molestiae suscipit, ut saepe corporis libero aliquam nostrum cumque
            corrupti, minus qui beatae eius repellat eaque inventore consequatur itaque
            laborum pariatur! Dolore voluptatem hic accusamus doloremque quos consequuntur
            magni, veniam fugiat! Praesentium ea repellat explicabo aliquid consequuntur,
            saepe reiciendis error debitis obcaecati nulla veniam, voluptatem magnam
            laborum delectus at possimus assumenda dolor corporis minima mollitia aperiam.
            Earum consequatur quisquam exercitationem veritatis ea numquam porro aut
            accusamus? Minima, sapiente atque! In labore eligendi laboriosam magni
            facilis, placeat molestias nobis ad nesciunt voluptate voluptates commodi
            distinctio illum neque cupiditate omnis veritatis totam ipsum unde ducimus
            eveniet. Quia quam dignissimos consequuntur facilis, commodi distinctio,
            reprehenderit repellat nisi itaque nulla saepe quo nemo eveniet, tempora ipsum
            veritatis porro blanditiis ut explicabo eum hic quos! Dolorum eaque, fuga,
            laborum quo aspernatur voluptate consequuntur saepe eum voluptas molestiae
            numquam maxime distinctio. Exercitationem nesciunt, repudiandae aspernatur,
            fugit repellendus vel suscipit ullam aperiam alias voluptate sapiente vitae
            harum quisquam. Nam, explicabo dicta eum, dignissimos, recusandae facilis rem
            iusto minima ipsam nulla fugit obcaecati repellat unde quisquam quidem?
          </Paragraph>
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <b>Posted At:</b>12-12-29
            </div>
            <div>
              <Button
                icon={<HeartFilled />}
                onClick={() => {
                  isAuth() ? alert('Liked') : alert('Please Sign In!');
                }}
                type='primary'
                size='small'
                danger
              >
                Like: 13
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Explore;
