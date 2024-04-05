import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { NotificationState } from '../types';

const Notification: React.FC = () => {
	const { message, status } = useSelector<RootState, NotificationState>(
		(state) => state.notification
	);

	if (message === '') return null;

	const statusStyles: { [key in NotificationState['status']]: string } = {
		success: 'bg-green-100 text-green-800',
		danger: 'bg-red-100 text-red-800',
		warning: 'bg-yellow-100 text-yellow-800',
		info: 'bg-blue-100 text-blue-800',
	};

	return (
		<div className={`${statusStyles[status]} p-4 rounded-md shadow`}>
			{message}
		</div>
	);
};

export default Notification;
