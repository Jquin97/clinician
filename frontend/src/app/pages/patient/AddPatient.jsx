import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button, DatePicker, Form, Input, Select } from 'antd';
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
      <Form layout="vertical" size="large" form={form} onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'First Name is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Last Name is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dob"
          htmlType="date"
          rules={[{ required: true, message: 'Date of birth is required' }]}>
          <DatePicker disabledDate={(current) => current && current.valueOf() >= Date.now()} />
        </Form.Item>
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
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { type: 'email', message: 'Email Address is invalid' },
            { required: true, message: 'Email Address is required' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Phone number is required' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="doctor" label="Primary Doctor Assigned">
          <Select>
            <Select.Option value="doctor1">Doctor 1</Select.Option>
            <Select.Option value="doctor2">Doctor 2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Notes" name="note">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </DashboardLayout>
  );
};

export default AddPatient;
