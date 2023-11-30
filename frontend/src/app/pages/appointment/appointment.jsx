import { UserOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import React, { useState } from 'react';
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
} from 'antd';
import styles from './appointment.module.css';


const Appointment = () => {
  const { Text, Title } = Typography;

  const [form] = Form.useForm();
  const { confirm } = Modal;

  const patientsData = {
    patientID: 1,
    firstName: 'Gojo',
    lastName: 'Satoru',
    DOB: '10-03-2017',
    gender: 'Male',
    phone: ' 0422781719',
  };

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
  const useEffect = () => {
    const addAp = document.querySelector(`.${styles.addApp}`);
    if (state) {
      addAp.style.display = 'block';
      setState(false);
    } else {
      addAp.style.display = 'none';
      setState(true);
    }
  };
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
    useEffect();
  };

  return (
    <DashboardLayout>
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
          <Button type="primary" className={styles.addBtn} primary onClick={() => useEffect()}>
            <PlusOutlined /> Add Appointment
          </Button>
        </div>
      </div>

      {/* Appointment detail */}
      <div className="appDetail">
        <Table columns={columns} dataSource={dataSource} />
      </div>

      {/* Add Appointment */}
      <div className={styles.addApp}>
        <Form form={form} className={styles.appointmentForm} onFinish={onFinish}>
        <Title level={3} >Add Appointment</Title> <br></br>
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

          <Form.Item>
            <Button className= {styles.cancelBtn} onClick={() => useEffect()}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </DashboardLayout>
  );
};
export default Appointment;
