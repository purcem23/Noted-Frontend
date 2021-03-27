import React from "react";
import Container from "react-bootstrap/Container";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <Container className="py-4">
      <RegisterForm />
    </Container>
  );
}

export { Register };
