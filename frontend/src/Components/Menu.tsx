import React from 'react';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../reducers/userReducer';
import {notifyLogout} from '../reducers/notificationReducer';

import {AppDispatch, RootState} from '../store';
import {UserState} from '../types';

const Menu: React.FC = () => {
  const user = useSelector<RootState, UserState | null>(state => state.user);
  const isRunning = useSelector<RootState, boolean>(state => state.running);
  const isLoggedIn = user === null ? false : true;

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(notifyLogout());
  };

  if (isRunning) return <></>;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          RigorRoma
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/timer">
              Timer
            </Nav.Link>
            <Nav.Link as={Link} to="/stopwatch">
              Stopwatch
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics">
              Statistics
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {location.pathname === '/login' ? (
            <></>
          ) : isLoggedIn ? (
            <Button variant="outline-primary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login" className="btn btn-outline-success">
              Login
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
