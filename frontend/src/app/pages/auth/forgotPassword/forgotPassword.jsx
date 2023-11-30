import React from 'react';
import { Button, Form, Input } from 'antd';
import styles from './forgotPassword.module.css';
import * as authApi from '../../../../core/api/authApi';
import openNotification from '../../../components/notifications';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
  const onFinish = (values) => {
    const data = values;
    authApi
      .forgotPassword(data)
      .then((res) => {
        if (res.data.success === true) {
          openNotification('Success', res.data.message);
          //   navigate("/home");
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

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>My Health Record</h1>
        <h2>Forgot Password</h2>
        <Form
          size="large"
          layout="vertical"
          name="forgotPassword"
          className={styles.formItems}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter valid email!',
              },
            ]}>
            <Input placeholder="Email address" />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button type="primary" htmlType="submit">
              Send password reset email
            </Button>
            <Link to="/login">Go Back</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
