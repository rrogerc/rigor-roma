import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { attemptLogin } from '../reducers/userReducer';
import { AppDispatch } from '../store';

import { Form, Button } from 'react-bootstrap';

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

	const navigateCreateAccount = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		navigate('/create-account');
	};

	return (
		<>
			<h2>Login</h2>
			<Form onSubmit={login}>
				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="mb-2"
					/>

					<Form.Label>Password: </Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="mb-2"
					/>

					<Button variant="primary" type="submit" className="me-2">
						Login
					</Button>
				</Form.Group>
			</Form>

			<p className="mb-1 mt-4">Don't have an account?</p>
			<Button variant="outline-secondary" onClick={navigateCreateAccount}>
				Create Account
			</Button>
		</>
	);
};

export default Login;
