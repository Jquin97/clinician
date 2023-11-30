import { notification } from 'antd';

const openNotification = (message, description) => {
  if (message === 'Error') {
    notification.error({
      message,
      description,
      placement: 'bottomRight',
    });
    return;
  }
  if (message === 'Success') {
    notification.success({
      message,
      description,
      placement: 'bottomRight',
    });
    return;
  }
  notification.info({
    message,
    description,
    placement: 'bottomRight',
  });
};

export default openNotification;
