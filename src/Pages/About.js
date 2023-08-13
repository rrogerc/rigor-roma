import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>An Opinionated Pomodoro Timer!</h2>
          <p>
            I've introduced a few thoughtful modifications to help you stay
            committed to your tasks:
          </p>
          <ul>
            <li>
              <strong>No Pauses Allowed</strong>: Once you start a session, see
              it through to the end. I believe in the power of undivided
              attention.
            </li>
            <li>
              <strong>Minute-Only Tracking</strong>: I've simplified time
              tracking to count only in minutes, helping you concentrate on the
              task at hand without sweating the seconds.
            </li>
            <li>
              <strong>Freestyle Focus with Stopwatch</strong>: Not sure how long
              a task will take? That's okay! Use our stopwatch feature, designed
              for those times when you simply want to focus until your natural
              break point.
            </li>
          </ul>
          <p>
            Dive in and make the most of your focused sessions. Happy
            concentrating!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
