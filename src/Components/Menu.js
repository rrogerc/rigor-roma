import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          RigorRoma
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
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
      </Container>
    </Navbar>
  );
};

export default Menu;
