import React from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-bootstrap';

import {RootState} from '../store';
import {NotificationState} from '../types';

const Notification: React.FC = () => {
  const {message, status} = useSelector<RootState, NotificationState>(
    state => state.notification
  );

  if (message === null) return <></>;

  return <Alert variant={status}>{message}</Alert>;
};

export default Notification;
