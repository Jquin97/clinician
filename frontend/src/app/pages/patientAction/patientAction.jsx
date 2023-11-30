import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { DatePicker, Select, Button, Form, Input, Divider } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientByID } from '../../../core/api/query';
import openNotification from '../../components/notifications';
import styles from './patientAction.module.css';
import { editPatientByID } from '../../../core/api/query';
const moment = require('moment');

const patientAction = () => {
  const [patientDetails, setPatientDetails] = useState({});
  const navigate = useNavigate();

  const onFinish = (values) => {
    let data = {
      id: patientDetails.id,
      firstName: values.fName,
      lastName: values.lName,
      bloodGroup: values.bloodGroup,
      gender: values.gender,
      phone: values.phone,
      dob: new Date(values.dob),
    };
    if (patientDetails.EmergencyContact?.id) {
      data.emergencyContact = {
        PatientId: patientDetails.id,
        id: patientDetails.EmergencyContact.id,
        name: values.name,
        phone: values.emergency_phone,
        relationship: values.relationship,
      };
    }
    editPatientByID(data).then((res) => {
      if (res.data.success === true) {
        openNotification('Details Updated', 'Patient Details updated successfully.');
      } else {
        openNotification('Error', 'Could not update the details.');
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { id } = useParams();
  useEffect(() => {
    getPatientByID(id).then((res) => {
      if (res.data.success === true) {
        setPatientDetails(res.data.data);
      } else {
        openNotification('Error', 'Could not find patient.');
        navigate('/dashboard/patients');
      }
    });
  }, [id]);

  return (
    patientDetails?.id && (
      <DashboardLayout>
        <Form
          name="editPatient"
          className={styles.formItems}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Divider orientation="left">Patient Details</Divider>

          <Form.Item
            name="fName"
            label="First Name"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 5 }}
            required={true}
            initialValue={patientDetails?.firstName}
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}>
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lName"
            label="Last Name"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 5 }}
            required={true}
            initialValue={patientDetails.lastName}
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}>
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="dob"
            label="DOB"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            required={true}
            initialValue={moment(patientDetails.dob)}
            rules={[
              {
                required: true,
                message: 'Please input your Date of Birth!',
              },
            ]}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 5 }}
            required={true}
            initialValue={patientDetails?.gender}
            rules={[
              {
                required: true,
                message: 'Please input your Gender!',
              },
            ]}>
            <Select
              options={[
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Female',
                  value: 'female',
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 5 }}
            required={true}
            initialValue={patientDetails?.phone}
            rules={[
              {
                required: true,
                message: 'Please input your Phone!',
              },
            ]}>
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item
            name="bloodGroup"
            label="Blood Group"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 5 }}
            required={true}
            initialValue={patientDetails?.bloodGroup}
            rules={[
              {
                required: true,
                message: 'Please input your Blood Group!',
              },
            ]}>
            <Input placeholder="Blood Group" />
          </Form.Item>

          {patientDetails.EmergencyContact && (
            <div>
              <Divider orientation="left">Emergency Contact</Divider>

              <Form.Item
                name="name"
                label="Full Name"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 5 }}
                required={true}
                initialValue={patientDetails.EmergencyContact.name}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Full Name!',
                  },
                ]}>
                <Input placeholder="Full Name" />
              </Form.Item>

              <Form.Item
                name="emergency_phone"
                label="Phone"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 5 }}
                required={true}
                initialValue={patientDetails.EmergencyContact.phone}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Phone!',
                  },
                ]}>
                <Input placeholder="Phone" />
              </Form.Item>

              <Form.Item
                name="relationship"
                label="Relationship"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 5 }}
                required={true}
                initialValue={patientDetails.EmergencyContact.relationship}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Relationship!',
                  },
                ]}>
                <Input placeholder="Relationship" />
              </Form.Item>
            </div>
          )}

          <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
            <Button style={{ float: 'center' }} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </DashboardLayout>
    )
  );
};

export default patientAction;
