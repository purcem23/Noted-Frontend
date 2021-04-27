import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { login } from "../auth";
import { alertService } from "../services";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirm: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const data = {};
    data[event.target.name] = event.target.value;
    this.setState(data);
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.username &&
      this.state.password &&
      this.state.passwordConfirm
    ) {
      if (this.state.password === this.state.passwordConfirm) {
        this.setState({ loading: true });
        await fetch(process.env.REACT_APP_API_URL + "/register", {
          method: "POST",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          }),
        })
          .then((response) => {
            this.setState({ loading: false });
            if (response.status === 201) {
              response.json().then((data) => {
                if (data.access_token) {
                  login(data);
                }
              });
              alertService.success("Successfully registered!", {
                autoClose: true,
                keepAfterRouteChange: true,
              });
              this.props.history.push("/login");
            } else {
              response.json().then((data) => {
                alertService.warn(data.message, {
                  autoClose: true,
                  keepAfterRouteChange: false,
                });
              });
            }
          })
          .catch((e) => {
            console.error(e);
            this.setState({ loading: false });
            alertService.error("Error registering in. Please try again.", {
              autoClose: true,
              keepAfterRouteChange: false,
            });
          });
      } else {
        alertService.error("Passwords do not match.", {
          autoClose: true,
          keepAfterRouteChange: false,
        });
      }
    }
  }

  render() {
    return (
      <Card className="mx-auto" style={{ maxWidth: "500px" }}>
        <Card.Header>Register an account</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                required={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required={true}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                value={this.state.passwordConfirm}
                onChange={this.handleInputChange}
                required={true}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              {this.state.loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
              )}
              Register
            </Button>
            <Button variant="link" as={NavLink} to="/login">
              Already have an account? Login here!
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Register);
