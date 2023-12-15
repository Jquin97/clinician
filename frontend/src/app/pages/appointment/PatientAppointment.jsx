import { UserOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Space,
  Typography,
  Table,
  Button,
  Form,
  Modal,
  Input,
  Drawer,
  DatePicker,
  TimePicker,
} from 'antd';
import styles from '../testResult/testResult.module.css';
import { Link, useParams } from 'react-router-dom';
import {
  addAppointments,
  addMedications,
  deleteAppointments,
  deleteMedications,
  getAppointments,
  getMedications,
  getPatientByID,
} from '../../../core/api/query';
const moment = require('moment');

function formatDate(date) {
  return moment(date).format('DD-MM-YYYY');
}
const PatientAppointment = () => {
  const { id } = useParams();
  const { Text, Title } = Typography;
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [data, setData] = useState([]);
  const [patientsData, setPatientDetails] = useState({});
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
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
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  //Delete result
  const handleDelete = (key) => {
    confirm({
      title: 'Are you sure delete this test result?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        const deletres = await deleteAppointments(key);
        if (deletres.data.success === true) {
          const newData = data.filter((item) => item.id !== key);
          setData(newData);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onFinish = async (values) => {
    const newData = {
      date: `${values.date}`,
      time: `${values.time}`,
    };
    addAppointments(id, newData).then((res) => {
      if (res.data.success === true) {
        setOpen(false);
        form.resetFields();
        setData([
          ...data,
          {
            id: `${res.data.data.id}`,
            data: `${res.data.data.createdAt}`,
            date: `${res.data.data.date}`,
            time: `${res.data.data.time}`,
          },
        ]);
      }
    });
  };
  // Get Patient
  useEffect(() => {
    getAppointments(id).then((res) => {
      if (res?.data) {
        if (res.data.data && res.data.data.length > 0) {
          setData(
            res.data.data.map((item) => {
              return {
                id: item.id,
                patiendId: item.PatientId,
                date: item.date,
                time: item.time,
              };
            })
          );
        }
      } else {
        setData([]);
      }
    });
    getPatientByID(id).then((res) => {
      if (res.data.success === true) {
        setPatientDetails(res.data.data);
      } else {
        openNotification('Error', 'Could not find patient.');
      }
    });
  }, [id]);
  return (
    <DashboardLayout showSider={true} patientId={id}>
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
            <Text>DOB: {formatDate(patientsData.dob)}</Text> <br></br>
            <Text>Gender: {patientsData.gender}</Text> <br></br>
            <Text>Phone: {patientsData.phone}</Text>
          </div>
          <Button type="primary" className={styles.addBtn} primary onClick={() => showDrawer()}>
            <PlusOutlined /> Add Appointment
          </Button>
        </div>
      </div>

      {/* Result detail */}
      <div className="appDetail">
        <Table columns={columns} dataSource={data} />
      </div>

      {/* Add result */}
      <div className={styles.addApp}></div>

      {/* Add result */}
      <Drawer
        title="Add medication"
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
        <Form form={form} onFinish={onFinish} layout="vertical">
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
export default PatientAppointment;
