import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientByID } from '../../../core/api/query';
import openNotification from '../../components/notifications';
import DashboardLayout from '../../layouts/DashboardLayout';
import styles from './patientDetails.module.css';
import { Button, Col, Divider, Row } from 'antd';

//TODO: Follow protocol and Fix ES6
const moment = require('moment');

function formatDate(date) {
  return moment(date).format('DD-MM-YYYY');
}

const PatientLists = () => {
  const [patientDetails, setPatientDetails] = useState({});
  const navigate = useNavigate();

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
    //TODO: Follow protocol use react fragment
    <div>
      <DashboardLayout showSider={true} patientId={id} menu={"detail"}>
        <Divider orientation="center">Patient Details</Divider>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>
            <Row className={styles.rowMargins}>
              <Col flex="auto">{patientDetails.firstName}</Col>
            </Row>

            <Row className={styles.rowMargins}>
              <Col flex={1}>DOB:</Col>
              <Col flex="auto">{formatDate(patientDetails.dob)}</Col>
            </Row>

            <Row className={styles.rowMargins}>
              <Col flex={1}>Gender:</Col>
              <Col flex="auto">{patientDetails.gender}</Col>
            </Row>

            <Row className={styles.rowMargins}>
              <Col>Phone: </Col>
              <Col flex="auto">{patientDetails.phone}</Col>
            </Row>
          </div>
          <Button
            className={styles.editBtn}
            onClick={() => navigate(`/dashboard/patients/${patientDetails.id}/edit`)}>
            Edit
          </Button>
        </div>

        <Divider orientation="left">Patient Details</Divider>
        <Row className={styles.rowMargins} gutter={[48, 48]}>
          <Col flex="200px">First Name:</Col>
          <Col flex="auto">{patientDetails.firstName}</Col>
        </Row>
        <Row className={styles.rowMargins} gutter={[48, 48]}>
          <Col flex="200px">Last Name:</Col>
          <Col flex="auto">{patientDetails.lastName}</Col>
        </Row>

        <Row className={styles.rowMargins} gutter={[48, 48]}>
          <Col flex="200px">Email:</Col>
          <Col flex="auto">{patientDetails.email}</Col>
        </Row>
        <Row className={styles.rowMargins} gutter={[48, 48]}>
          <Col flex="200px">DOB:</Col>
          <Col flex="auto">{formatDate(patientDetails.dob)}</Col>
        </Row>

        <Row className={styles.rowMargins} gutter={[48, 48]}>
          <Col flex="200px">Gender:</Col>
          <Col flex="auto">{patientDetails.gender}</Col>
        </Row>
        <Row className={styles.rowMargins} gutter={[48, 48]}>
          <Col flex="200px">Phone:</Col>
          <Col flex="auto">{patientDetails.phone}</Col>
        </Row>

        <Row className={styles.rowMargins} gutter={[48, 48]}>
          <Col flex="200px">Blood Group:</Col>
          <Col flex="auto">{patientDetails.bloodGroup}</Col>
        </Row>

        <Divider orientation="left">Emergency Contact</Divider>

        {patientDetails.EmergencyContact ? (
          <div>
            <Row className={styles.rowMargins} gutter={[48, 48]}>
              <Col flex="200px">Full Name:</Col>
              <Col flex="auto">{patientDetails.EmergencyContact.name}</Col>
            </Row>
            <Row className={styles.rowMargins} gutter={[48, 48]}>
              <Col flex="200px">Phone:</Col>
              <Col flex="auto">{patientDetails.EmergencyContact.phone}</Col>
            </Row>
            <Row className={styles.rowMargins} gutter={[48, 48]}>
              <Col flex="200px">Relationship:</Col>
              <Col flex="auto">{patientDetails.EmergencyContact.relationship}</Col>
            </Row>
          </div>
        ) : (
          <div>No Emergency Contact Available</div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default PatientLists;
