import { useState } from "react";

import userService from "../Services/userService";

import { Form, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { notify } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const create = async (e) => {
    e.preventDefault();

    const tmp_username = username;
    const tmp_password = password;
    setUsername("");
    setPassword("");
    if (tmp_password.length === 0 || tmp_username.length === 0) {
      dispatch(notify("Username or password cannot be empty", "danger"));
      return;
    }
    if (tmp_username.length < 3) {
      dispatch(notify("Username must be at least 3 characters long", "danger"));
      return;
    }
    if (tmp_password.length < 5) {
      dispatch(notify("Password must be at least 5 characters long", "danger"));
      return;
    }
    dispatch(notify("Account made successfully!", "success"));
    navigate("/login");
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

          <Button variant="outline-dark" type="submit">
            Create Account
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default CreateAccount;
