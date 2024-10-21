import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button, DatePicker, Form, Input, Select, Flex, Col, Row, Card } from 'antd';
import { createPatient } from '../../../core/api/query';
import openNotification from '../../components/notifications';

const AddPatient = () => {
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    console.log(value);
  };
  const onFinish = async (values) => {
    // TODO: Add Validation
    const res = await createPatient({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      dob: values.dob,
      phone: values.phone,
      gender: values.gender,
    });
    if (res.data.success) {
      openNotification('Success', 'Patient Created');
      form.resetFields();
    } else {
      openNotification('Error', res.data.message);
    }
    console.log('Received values of form: ', values);
  };
  return (
    <DashboardLayout>
      <Card>
        <Form layout="vertical" size="large" form={form} onFinish={onFinish}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'First Name is required' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Last Name is required' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Date of birth"
                name="dob"
                htmlType="date"
                rules={[{ required: true, message: 'Date of birth is required' }]}>
                <DatePicker
                  disabledDate={(current) => current && current.valueOf() >= Date.now()}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Gender is required' }]}>
                <Select
                  onChange={onGenderChange}
                  options={[
                    {
                      value: 'male',
                      label: 'Male',
                    },
                    {
                      value: 'female',
                      label: 'Female',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { type: 'email', message: 'Email Address is invalid' },
                  { required: true, message: 'Email Address is required' },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: 'Phone number is required' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Notes" name="note">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </DashboardLayout>
  );
};

export default AddPatient;
