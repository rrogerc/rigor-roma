import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { clearUser } from "../reducers/userReducer";

const About = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(clearUser());
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>An Opinionated Pomodoro Timer!</h2>
          <p>
            This web app is a simple pomodoro timer with a basic changes. First
            you cant pause a session, time only counts if you finish what you
            decided to started, also, time only counts in minutes. If you don't
            want to set a specific timer you can use the stopwatch. The
            stopwatch is for when you just wanna focus till you can't anymore.
          </p>
        </Col>
      </Row>

      <Button onClick={logout}>Logout</Button>
    </Container>
  );
};

export default About;
