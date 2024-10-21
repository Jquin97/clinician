import { UserOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Avatar, Space, Typography, Table, Button, Form, Modal, Input, Drawer } from 'antd';
import styles from '../testResult/testResult.module.css';
import { Link, useParams } from 'react-router-dom';
import {
  addMedications,
  deleteMedications,
  getMedications,
  getPatientByID,
} from '../../../core/api/query';
const moment = require('moment');

function formatDate(date) {
  return moment(date).format('DD-MM-YYYY');
}
const PatientMedication = () => {
  const { id } = useParams();
  const { Text, Title } = Typography;
  const { TextArea } = Input;
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
      render: (text) => <a>{moment(text).format('DD/MM/YYYY')}</a>,
    },
    {
      title: 'Prescription',
      dataIndex: 'prescription',
      key: 'prescription',
    },
    {
      title: 'Treatment',
      dataIndex: 'treatment',
      key: 'treatment',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/dashboard/medication/${id}/edit/${record.id}`}>Edit</Link>
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
        const deletres = await deleteMedications(key);
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
      treatment: `${values.treatment}`,
      prescription: `${values.prescription}`,
    };
    addMedications(id, newData).then((res) => {
      if (res.data.success === true) {
        setOpen(false);
        form.resetFields();
        setData([
          ...data,
          {
            id: `${res.data.data.id}`,
            data: `${res.data.data.createdAt}`,
            treatment: `${res.data.data.treatment}`,
            prescription: `${res.data.data.prescription}`,
          },
        ]);
      }
    });
  };
  // Get Patient And Test Results
  useEffect(() => {
    getMedications(id).then((res) => {
      if (res?.data) {
        if (res.data.data && res.data.data.length > 0) {
          setData(
            res.data.data.map((item) => {
              return {
                id: item.id,
                patiendId: item.PatientId,
                treatment: item.treatment,
                prescription: item.prescription,
                date: item.createdAt,
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
        <Title className={styles.title}>Medication</Title>
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
            <PlusOutlined /> Add Medication
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
            label="Treatment"
            name="treatment"
            rules={[{ required: true, message: 'Treatment is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Prescription" name="prescription">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
    </DashboardLayout>
  );
};
export default PatientMedication;
