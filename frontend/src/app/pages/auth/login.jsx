import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import * as authApi from '../../../core/api/authApi';
import openNotification from '../../components/notifications';
import { useAuth } from '../../../core/contextApi/authContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const onFinish = (values) => {
    const data = values;
    authApi
      .login(data)
      .then((res) => {
        if (res.data.success === true) {
          openNotification('Success', res.data.message);
          loginUser(res.data.data);
          navigate('/dashboard');
          //redirect to homepage
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
        <h2>Admin Login</h2>
        <Form
          name="login"
          className={styles.formItems}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            required={true}
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

          <Form.Item
            name="password"
            label="Password"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            required={true}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="login-form-forgot mb-10">
            <span className={styles.navigate} onClick={() => navigate('/forgotPassword')}>
              Forgot password
            </span>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
