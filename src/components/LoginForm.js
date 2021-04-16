import React from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { login, setUser } from "../auth";
import { alertService } from "../services";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      history: props.history,
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
    if (this.state.username && this.state.password) {
      event.preventDefault();
      this.setState({ loading: true });
      await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.access_token) {
                setUser(data.username);
                login(data);
              }
            });
            this.setState({ loading: false });
            alertService.success("Successfully logged in!", {
              autoClose: true,
              keepAfterRouteChange: false,
            });
            this.state.history.push("/notes");
          } else if (response.status === 401) {
            this.setState({ loading: false });
            alertService.error(
              "Error logging in. Please check your credentials.",
              {
                autoClose: true,
                keepAfterRouteChange: false,
              }
            );
          }
        })
        .catch((e) => {
          console.error(e);
          this.setState({ loading: false });
          alertService.error("Error logging in. Please try again.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    }
  }

  render() {
    return (
      <Card className="mx-auto" style={{ maxWidth: "500px" }}>
        <Card.Header>Please login</Card.Header>
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
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Login);
