import { UserOutlined } from '@ant-design/icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import React, { useEffect, useState } from 'react';
import { Avatar, Space, Typography, Button, Form, Input } from 'antd';
import styles from '../testResult/testResult.module.css';
import { useParams } from 'react-router-dom';
import {
  getPatientByID,
  getSingleMedication,
  updateSingleMedication,
} from '../../../core/api/query';
import openNotification from '../../components/notifications';

const PatientMedicationEdit = () => {
  const { patientId: id, entryId } = useParams();
  const { Text, Title } = Typography;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [patientsData, setPatientDetails] = useState({});
  const [patienttestData, setPatientTestData] = useState({});
  const [patienttestDataloading, setPatientTestDataloading] = useState(true);

  // Update result
  const onFinish = async (values) => {
    const newData = {
      treatment: `${values.treatment}`,
      prescription: `${values.prescription}`,
    };
    updateSingleMedication(entryId, newData).then((res) => {
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
        getSingleMedication(entryId).then((res) => {
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
        <Title className={styles.title}>Patient Medication Edit</Title>
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
            label="Treatment"
            name="treatment"
            initialValue={patienttestData.treatment}
            rules={[{ required: true, message: 'Treatment is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Prescription"
            name="prescription"
            initialValue={patienttestData.prescription}>
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
export default PatientMedicationEdit;
