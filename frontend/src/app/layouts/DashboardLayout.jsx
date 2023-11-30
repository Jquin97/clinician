import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import HeaderComponent from '../components/header/header';
import FooterComponent from '../components/footer/footer';
import { Link, useLocation, useParams } from 'react-router-dom';

const DashboardLayout = ({ children, showBreadcrumbs = true, showSider = false }) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const params = useParams();

  const breadcrumbNameMap = {
    '/dashboard': 'Dashboard',
    '/dashboard/add-patient': 'Add Patient',
    '/dashboard/patients': 'Patients',
    '/dashboard/appointment': 'Appointment',
    '/dashboard/patients/:id/details': 'Patients Detail',
    '/dashboard/test-result': 'Test Result',
    '/dashboard/scan-result': 'Scan Result',
  };

  if (Object.entries(params).length >= 0) {
    breadcrumbNameMap[`/dashboard/patients/${params.id}`] = `${params.id} Patient Detail`;
    breadcrumbNameMap[`/dashboard/patients/${params.id}/edit`] = `Edit`;
  }

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url] ?? 'Default'}</Link>,
    };
  });

  const breadcrumbItems = [
    // INFO: Add default Here
  ].concat(extraBreadcrumbItems);

  return (
    <main className="app_dashboard">
      <HeaderComponent />
      <Layout>
        {showSider && (
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            />
          </Sider>
        )}
        <Layout className="dashboard_layout__inner">
          {showBreadcrumbs && (
            <>
              <Breadcrumb
                className="dashboard_layout__breadcrumbs"
                items={breadcrumbItems}></Breadcrumb>
            </>
          )}
          <Content className="dashboard_layout__content">{children}</Content>
        </Layout>
      </Layout>
      <FooterComponent />
    </main>
  );
};

export default DashboardLayout;
