import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth, logout } from "../auth";

function Menubar({ history }) {
  const [logged] = useAuth();

  return logged ? (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/notes">
        <img
          src="/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top mr-1"
          alt="Noted logo"
        />
        Noted
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/notes">
          Notes
        </Nav.Link>
        <Nav.Link as={NavLink} to="/flashcards">
          Flashcards
        </Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link
          onClick={() => {
            logout();
            history.push("/");
          }}
        >
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  ) : (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        <img
          src="/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top mr-1"
          alt="Noted logo"
        />
        Noted
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={NavLink} to="/login">
          Login
        </Nav.Link>
        <Nav.Link as={NavLink} to="/register">
          Register
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default withRouter(Menubar);
