import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <Container className="py-4">
      <Jumbotron>
        <h1>Welcome to Noted</h1>
        <p>The world's best note taking app!</p>
        <p>
          <Button variant="dark" className="mr-2" as={NavLink} to="/login">
            Login
          </Button>
          <Button variant="primary" as={NavLink} to="/register">
            Register
          </Button>
        </p>
      </Jumbotron>
    </Container>
  );
}

export { Home };
