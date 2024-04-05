import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';

import { attemptLogin } from '../reducers/userReducer';
import { AppDispatch } from '../store';

const Login: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const login = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/');

		dispatch(attemptLogin({ username, password }));

		setUsername('');
		setPassword('');
	};

	const navigateCreateAccount = () => {
		navigate('/create-account');
	};

	return (
		<>
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={login} className="space-y-4">
				<div>
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-700"
					>
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
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
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

				<Button type="submit" color="primary" className="mr-2">
					Login
				</Button>
			</form>

			<p className="mt-4 mb-1">Don't have an account?</p>
			<Button color="secondary" onClick={navigateCreateAccount}>
				Create Account
			</Button>
		</>
	);
};

export default Login;
