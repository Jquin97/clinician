import styles from './header.module.css';
import React from 'react';
import { Layout, Space, Button } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../../utils/constants';
const { Title } = Typography;
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/contextApi/authContext';

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const user = JSON.parse(localStorage.getItem('userData'));

  const handleLogout = ()=>{
    loginUser(null);
    localStorage.setItem('userData',null);
    navigate('/login');
  }
  return (
    <header className="app_header">
      <Space className={styles.background} direction="vertical" size={[0, 48]}>
        <Layout>
          <Header className={styles.header}>
            <div className={styles.left}>
              <div className="app_header__left">
                <Link to="/dashboard" className="logo">
                  <img className="logo-img" src="/assets/icons/logo.svg" alt="logo" />
                  <span className="logo-title">{APP_NAME}</span>
                </Link>
              </div>
            </div>
            <div className={styles.right}>
              <Title className={styles.name} level={5}>
                {user.firstName + ' '+ user.lastName}
              </Title>
              <Space>
                <Button className={styles.button} type="text" ghost onClick={handleLogout}>
                  Log Out
                </Button>
              </Space>
            </div>
          </Header>
        </Layout>
      </Space>
    </header>
  );
};
export default HeaderComponent;
