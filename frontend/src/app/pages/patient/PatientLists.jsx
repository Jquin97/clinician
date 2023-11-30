import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { deletePatient, getPatients } from '../../../core/api/query';
import { useQuery } from 'react-query';
import { Button, Popconfirm, Space, Table } from 'antd';
import openNotification from '../../components/notifications';
import { Link } from 'react-router-dom';

const PatientLists = () => {
  const [mapData, setMappedData] = useState([]);
  const { data, isLoading, refetch } = useQuery('patients', getPatients, {
    enabled: false,
  });
  const [, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleClearFilters = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const handleDelete = async (id) => {
    const res = await deletePatient(id);
    if (res.data.success) {
      openNotification('Success', 'Patient deleted');
      refetch();
      return;
    } else {
      openNotification('Success', 'Unable to delete patient');
    }
  };

  const columns = [
    {
      title: 'Patient name',
      dataIndex: 'name',
      key: 'name',
      render: (item) => <Link to={`/dashboard/patients/${item.key}`}>{item.text}</Link>,
      sorter: (a, b) => a.name.text.localeCompare(b.name.text),
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => <span>{text}</span>,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      onFilter: (value, record) => record.gender.indexOf(value) === 0,
      ellipsis: true,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a href={`mailto:${text.toLowerCase()}`}>{text.toLowerCase()}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => (
        <Space size="middle">
          <Link to={`/dashboard/patients/${item.key}`}>
            <Button primary>Edit</Button>
          </Link>
          <Popconfirm
            title="Are you sure ?"
            onConfirm={() => handleDelete(item.key)}
            onOpenChange={() => console.log('open change')}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const mappedData =
      data &&
      data?.data?.data?.map((item) => {
        return {
          key: item.id,
          name: {
            key: item.id,
            text: `${item.firstName} ${item.lastName}`,
          },
          gender: `${item.gender}`,
          email: `${item.email}`,
        };
      });
    setMappedData(mappedData);
  }, [data]);

  return (
    <DashboardLayout>
      <section className="patient__listings">
        <div className="container">
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={handleClearFilters}>Clear filters and sorters</Button>
          </Space>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={mapData}
            onChange={handleChange}
          />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default PatientLists;
