import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import * as userService from '../Services/userService';
import {AppDispatch} from '../store';
import {notify} from '../reducers/notificationReducer';

import {Form, Button} from 'react-bootstrap';

const CreateAccount: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const create = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tmp_username = username;
    const tmp_password = password;
    setUsername('');
    setPassword('');
    if (tmp_password.length === 0 || tmp_username.length === 0) {
      dispatch(
        notify({msg: 'Username or password cannot be empty', status: 'danger'})
      );
      return;
    }
    if (tmp_username.length < 3) {
      dispatch(
        notify({
          msg: 'Username must be at least 3 characters long',
          status: 'danger',
        })
      );
      return;
    }
    if (tmp_password.length < 5) {
      dispatch(
        notify({
          msg: 'Password must be at least 5 characters long',
          status: 'danger',
        })
      );
      return;
    }
    dispatch(notify({msg: 'Account made successfully!', status: 'success'}));
    navigate('/login');
    await userService.userCreate(tmp_username, tmp_password);
  };

  return (
    <>
      <h2>Create Account</h2>
      <Form onSubmit={create}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mb-2"
          />

          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mb-2"
          />

          <Button variant="outline-dark" type="submit">
            Create Account
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default CreateAccount;
