import { UserOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons';
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
  Drawer,
} from 'antd';
import styles from './testResult.module.css';
import { useParams } from 'react-router-dom';
import {
  addTestResults,
  deleteTestResults,
  getPatientByID,
  getSingleTestResult,
  getTestResults,
  updateSingleTestResult,
} from '../../../core/api/query';
import openNotification from '../../components/notifications';

const TestResultEdit = () => {
  const { patientId: id, entryId } = useParams();
  const { Text, Title } = Typography;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [patientsData, setPatientDetails] = useState({});
  const [patienttestData, setPatientTestData] = useState({});
  const [patienttestDataloading, setPatientTestDataloading] = useState(true);

  // Update result
  const onFinish = async (values) => {
    values['date'] = values.date.format('DD-MM-YYYY');
    const newData = {
      type: `${values.date}`,
      resultFile: `${values.result}`,
      note: `${values.note}`,
    };
    updateSingleTestResult(entryId, newData).then((res) => {
      if (res.data.success == true) {
        openNotification('Details Updated', 'Patient Details updated successfully.');
      } else {
        openNotification('Error', 'Could not update the details.');
      }
    });
  };
  // Get Patient And Test Results
  useEffect(() => {
    getPatientByID(id).then((res) => {
      if (res.data.success === true) {
        setPatientDetails(res.data.data);
        setPatientTestDataloading(true);
        getSingleTestResult(entryId).then((res) => {
          setPatientTestData(res.data.data);
          setPatientTestDataloading(false);
        });
      } else {
        openNotification('Error', 'Could not find patient.');
      }
    });
  }, [id]);

  return (
    <DashboardLayout showSider={true}>
      <main className="App">
        <Title className={styles.title}>Test Results</Title>
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
        </div>
      </main>
      {patienttestDataloading ? (
        'Loaing...'
      ) : (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Result"
            name="result"
            initialValue={patienttestData.resultFile}
            rules={[{ required: true, message: 'Result is required' }]}>
            <Input placeholder="Basic usage" />
          </Form.Item>
          <Form.Item label="Note" name="note" initialValue={patienttestData.note}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 7 }}>
            <Button style={{ float: 'center' }} type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </DashboardLayout>
  );
};
export default TestResultEdit;
