import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import styles from './resetPassword.module.css';
import * as authApi from '../../../../core/api/authApi';
import openNotification from '../../../components/notifications';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [userToken, setToken] = useState(null);
  const navigate = useNavigate();
  let { token } = useParams();

  useEffect(() => {
    setToken(token);

    authApi
      .verifyToken( token )
      .then((res) => {
        if (res.data.success === true) {
          openNotification('Success', res.data.message);
        } else {
          //display error message
          openNotification('Errors', res.data.message);
          navigate('/login');
        }
      })
      .catch((error) => {
        openNotification('Invalid User', error.message);
      });
  }, [userToken, navigate]); // Empty dependency array means this effect runs once, like componentDidMount

  const onFinish = (values) => {
    const password = values.newPassword;
    authApi
      .resetPassword({password}, userToken)
      .then((res) => {
        if (res.data.success === true) {
          openNotification('Success', res.data.message);
          navigate('/login');
        } else {
          //display error message
          openNotification('Error', res.data.message);
        }
      })
      .catch((error) => {
        openNotification('Error', error.message);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>My Health Record</h1>
        <h3>Reset Password</h3>
        <Form
          {...formItemLayout}
          name="resetPassword"
          className={styles.formItems}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="New Password"
            name="newPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your new Password!',
              },
              {
                min: 8,
                message: 'Too short! Minimum 8 charchters required.',
              },
              {
                max: 20,
                message: 'Too long! Password length cannot exceed 20 charachters.',
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your new Password!',
              },
              {
                min: 8,
                message: 'Too short! Minimum 8 charchters required.',
              },
              {
                max: 20,
                message: 'Too long! Password length cannot exceed 20 charachters.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  );
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
