import {
  UserOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
  UploadOutlined,
} from '@ant-design/icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Space,
  Typography,
  Table,
  Button,
  DatePicker,
  Form,
  Modal,
  Input,
  Upload,
  Drawer,
} from 'antd';
import styles from './scanResult.module.css';
import { useParams } from 'react-router-dom';
import {
  addScanResults,
  deleteScanResults,
  getPatientByID,
  getScanResults,
} from '../../../core/api/query';
import openNotification from '../../components/notifications';
import { API_BASE_URL } from '../../../core/config/apiConfig';

const TestResult = () => {
  const { id } = useParams();
  const { Text, Title } = Typography;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const [patientDetails, setPatientDetails] = useState({});
  const [appId, setAppId] = useState(3);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Attachments',
      dataIndex: 'attachments',
      key: 'attachments',
      render: (text) => (
        <a
          href={`${API_BASE_URL}/uploads/${
            text.toString().split('/')[text.toString().split('/').length - 1]
          }`}
          aria-label="Go to image">
          <img
            width={40}
            height={40}
            src={`${API_BASE_URL}/uploads/${
              text.toString().split('/')[text.toString().split('/').length - 1]
            }`}
            alt={text.toString().split('/')[text.toString().split('/').length - 1]}
          />
        </a>
      ),
    },
    // {
    //   title: 'Note',
    //   dataIndex: 'note',
    //   key: 'note',
    //   //   editable: true,
    // },
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

  //Delete result
  const handleDelete = (key) => {
    confirm({
      title: 'Are you sure delete this test result?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        const der = await deleteScanResults(key);
        if (der) {
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
    const payloadData = new FormData();
    payloadData.append('files', values.attachments);
    addScanResults(id, payloadData)
      .then((res) => res.json())
      .then((resadd) => {
        if (resadd.success === true) {
          setData([
            ...data,
            {
              id: resadd.data.id,
              note: resadd.data.note,
              date: resadd.data.createdAt,
              attachments: resadd.data.attachments,
            },
          ]);
          setAppId(appId + 1);
          form.resetFields();
          openNotification('Details Added', 'successfully.');
        } else {
          openNotification('Error', 'Something went wrong try again later');
        }
      });

    // Close Model
    setOpen(false);
  };

  // Get Patient And Scan Results
  useEffect(() => {
    getScanResults(id).then((res) => {
      if (res?.data) {
        if (res.data.results && res.data.results.length > 0) {
          setData(
            res.data.results.map((item) => {
              return {
                id: item.id,
                patiendId: item.PatientId,
                date: item.createdAt,
                attachments: item.attachments,
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
    <DashboardLayout showSider={true} patientId={id} menu={"scan"}>
      <div className="App">
        <Title className={styles.title}>Scan Results </Title>
        <div className={styles.patientInfo}>
          <div className={styles.patientAva}>
            <Space align="center" direction="vertical" wrap size={16}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
            </Space>
          </div>
          <div className={styles.patientDetail}>
            <Title level={3}>
              {patientDetails.firstName} {patientDetails.lastName}
            </Title>
            <Text>DOB: {patientDetails.DOB}</Text> <br></br>
            <Text>Gender: {patientDetails.gender}</Text> <br></br>
            <Text>Phone: {patientDetails.phone}</Text>
          </div>
          <Button type="primary" className={styles.addBtn} primary onClick={showDrawer}>
            <PlusOutlined /> Add Scan Result
          </Button>
        </div>
      </div>
      {/* Result detail */}
      <div className="appDetail">
        <Table columns={columns} dataSource={data} />
      </div>
      {/* Add result */}
      <Drawer
        title="Add new scan results"
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
            label="Upload scan"
            name="attachments"
            valuePropName="file"
            getValueFromEvent={(event) => {
              return event?.file;
            }}
            rules={[{ required: true, message: 'Result is required' }]}>
            <Upload
              listType="picture"
              beforeUpload={(file) => {
                if (!['image/jpeg', 'image/png'].includes(file.type)) {
                  message.error(`${file.name} is not a valid image type`, 2);
                  return null;
                }
                return false;
              }}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Note"
            name="note"
            rules={[{ required: true, message: 'Note is required' }]}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
    </DashboardLayout>
  );
};
export default TestResult;
