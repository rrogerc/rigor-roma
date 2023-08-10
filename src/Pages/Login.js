import { useState } from "react";

import { useDispatch } from "react-redux";
import { attemptLogin } from "../reducers/userReducer";

import { Form, Button } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();

    dispatch(attemptLogin(username, password));

    setUsername("");
    setPassword("");
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
          />

          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
