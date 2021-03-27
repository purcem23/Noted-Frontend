import React from "react";
import Container from "react-bootstrap/Container";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <Container className="py-4">
      <LoginForm />
    </Container>
  );
}

export { Login };
