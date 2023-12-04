/* eslint-disable no-debugger */
import { UserOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Space,
  Typography,
  Table,
  Button,
  DatePicker,
  Form,
  TimePicker,
  Modal,
  Drawer,
} from 'antd';
import styles from './appointment.module.css';
import { useParams } from 'react-router-dom';
import { getPatientByID } from '../../../core/api/query';
const Appointment = () => {
  const { Text, Title } = Typography;
  const { id } = useParams();
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [patientsData, setPatientDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      date: '15-01-2021',
      time: '13:00',
    },
    {
      key: 2,
      date: '12-03-2022',
      time: '15:20',
    },
  ]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button danger onClick={() => handleDelete(record.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (key) => {
    confirm({
      title: 'Are you sure delete this appointment?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const [state, setState] = useState(true);
  useEffect(() => {
    getPatientByID(id).then((res) => {
      if (res.data.success === true) {
        setPatientDetails(res.data.data);
      } else {
        openNotification('Error', 'Could not find patient.');
      }
    });
  }, [id]);
  const [appId, setAppId] = useState(3); // get the biggest AppointmentID +1

  const onFinish = async (values) => {
    console.log(JSON.stringify(values));

    values['date'] = values.date.format('DD-MM-YYYY');
    values['time'] = values.time.format('HH:mm');

    const newData = {
      key: appId,
      date: `${values.date}`,
      time: `${values.time}`,
    };
    setDataSource([...dataSource, newData]);
    setAppId(appId + 1);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <DashboardLayout showSider={true} patientId={id} menu={'appointment'}>
      <div className="App">
        <Title className={styles.title}>Appointment</Title>
        <div className={styles.patientInfo}>
          <div className={styles.patientAva}>
            <Space align="center" direction="vertical" wrap size={16}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </Space>
          </div>
          <div className={styles.patientDetail}>
            <Title level={3}>
              {patientsData.firstName} {patientsData.lastName}
            </Title>
            <Text>DOB: {patientsData.DOB}</Text> <br></br>
            <Text>Gender: {patientsData.gender}</Text> <br></br>
            <Text>Phone: {patientsData.phone}</Text>
          </div>
          <Button type="primary" className={styles.addBtn} primary onClick={showDrawer}>
            <PlusOutlined /> Add Appointment
          </Button>
        </div>
      </div>

      {/* Appointment detail */}
      <div className="appDetail">
        <Table columns={columns} dataSource={dataSource} />
      </div>

      {/* Add Appointment */}
      <Drawer
        title="Add new test results"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button htmlType="submit" onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Date is required' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: 'Time is required' }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Drawer>
    </DashboardLayout>
  );
};
export default Appointment;
