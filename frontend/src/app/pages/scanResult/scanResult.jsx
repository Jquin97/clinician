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
import { addScanResults, getPatientByID, getScanResults } from '../../../core/api/query';
import openNotification from '../../components/notifications';
const props = {
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
};

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

  useEffect(() => {
    getScanResults(id).then((res) => {
      if (res?.data) {
        if (res.data.results && res.data.results.length > 0) {
          setData(
            res.data.results.map((item) => {
              return {
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
      render: (text) => <img width={40} height={40} src={`file:${text}`} alt={text}></img>,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      //   editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button>Edit</Button>
          <Button danger onClick={() => handleDelete(record.key)}>
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
      onOk() {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onFinish = async (values) => {
    const newData = {
      key: appId,
      date: `${values.date}`,
      attachments: `${values.attachments.name}`,
      note: `${values.note}`,
    };

    const payloadData = new FormData();
    payloadData.append('files', values.attachments);
    addScanResults(id, payloadData).then((res) => {
      console.log(res.data);
    });

    setData([...data, newData]);
    setAppId(appId + 1);

    // Close Model
    setOpen(false);
  };

  return (
    <DashboardLayout>
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
        <Form form={form} onFinish={onFinish}>
          <Title level={3}>Add Scan Result</Title> <br></br>
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
              {...props}
              listType="picture"
              beforeUpload={(file) => {
                console.log(file);
                return false;
              }}
              customRequest={(info) => {
                setFileList([info.files]);
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
