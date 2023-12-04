import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Link } from 'react-router-dom';
import { AutoComplete } from 'antd';
import styles from '../home/home.module.css';
import { getPatientsByName } from '../../../core/api/query';

const Home = () => {
  const [options, setOptions] = useState([]);

  const handleSearch = async (value) => {
    let res = [];

    if (!value) {
      res = [];
    } else {
      await getPatientsByName(value).then((response) => {
        if (response.success == false) {
          return;
        }
        response.data?.patients.map((el, key) => {
          el.value = (
            <Link to={`/dashboard/patients/${el.id}`}>
              <div>
                {el.firstName + ' ' + el.lastName}
              </div>
            </Link>
          );
          el.key = key;
        });
        setOptions(response.data.patients);
      });
    }
  };

  return (
    <DashboardLayout showBreadcrumbs={false}>
      <div className="dahboard_home">
        <div className={styles.search_container}>
          <AutoComplete
            style={{
              width: '100%',
            }}
            onSearch={handleSearch}
            placeholder="Search Patient Name"
            options={options}
          />
        </div>
        <div className="dashboard_home__action">
          <div className="dashboard_home__item">
            <Link to="/dashboard/patients">View All Patients</Link>
          </div>
          <div className="dashboard_home__item">
            <Link to="/dashboard/add-patient">Add Patient</Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
