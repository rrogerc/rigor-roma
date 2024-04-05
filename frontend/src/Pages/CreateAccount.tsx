import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';

import * as userService from '../Services/userService';
import { AppDispatch } from '../store';
import { notify } from '../reducers/notificationReducer';

const CreateAccount: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const create = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const tmp_username = username.trim();
		const tmp_password = password;
		setUsername('');
		setPassword('');

		// Validation checks
		if (tmp_username.length < 3) {
			dispatch(
				notify({
					msg: 'Username must be at least 3 characters long',
					status: 'error',
				})
			);
			return;
		}
		if (tmp_password.length < 5) {
			dispatch(
				notify({
					msg: 'Password must be at least 5 characters long',
					status: 'error',
				})
			);
			return;
		}

		// Simulating account creation and notification
		dispatch(notify({ msg: 'Account made successfully!', status: 'success' }));
		navigate('/login');

		await userService.userCreate(tmp_username, tmp_password);
	};

	return (
		<>
			<h2 className="text-2xl font-bold mb-4">Create Account</h2>
			<form onSubmit={create} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Username:
					</label>
					<Input
						fullWidth
						color="primary"
						size="lg"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Password:
					</label>
					<Input
						type="password"
						fullWidth
						color="primary"
						size="lg"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<Button type="submit" color="primary">
					Create Account
				</Button>
			</form>
		</>
	);
};

export default CreateAccount;
