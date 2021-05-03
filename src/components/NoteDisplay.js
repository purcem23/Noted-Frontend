import React from "react";
import { withRouter, Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import TextareaAutosize from "react-textarea-autosize";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";

class NoteDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contents: "",
      finished: false,
      summary: "",
      loading: false,
    };
    if (props.isEdit) {
      this.state.name = props.name;
      this.state.contents = props.contents;
      this.state.finished = props.finished;
      this.state.summary = props.summary;
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.noteTags = this.noteTags.bind(this);
  }

  handleInputChange(event) {
    const data = {};
    data[event.target.name] = event.target.value;
    this.setState(data);
  }

  handleCheckboxChange(event) {
    const data = {};
    data[event.target.name] = event.target.checked;
    this.setState(data);
  }

  async handleSubmit(event) {
    this.setState({ loading: true });
    event.preventDefault();
    if (this.props.isEdit) {
      await authFetch(
        process.env.REACT_APP_API_URL + "/notes/" + this.props.id,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + this.props.token,
          },
          body: JSON.stringify({
            name: this.state.name,
            contents: this.state.contents,
            finished: this.state.finished,
          }),
        }
      )
        .then((response) => {
          if (response.status === 200) {
            this.setState({ loading: false });
            alertService.success("Note successfully updated!", {
              autoClose: true,
              keepAfterRouteChange: false,
            });
          }
          if (response.status === 401) {
            logout();
            alertService.success("Session expired! Please log in again.", {
              autoClose: true,
              keepAfterRouteChange: true,
            });
            history.push("/login");
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          alertService.error("Error updating note. Please try again.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    } else {
      await authFetch(process.env.REACT_APP_API_URL + "/notes", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + this.props.token,
        },
        body: JSON.stringify({
          name: this.state.name,
          contents: this.state.contents,
          finished: this.state.finished,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            alertService.success("Note successfully created!", {
              autoClose: true,
              keepAfterRouteChange: true,
            });
            this.setState({ loading: false });
            this.props.history.push("/notes");
          }
          if (response.status === 401) {
            logout();
            alertService.success("Session expired! Please log in again.", {
              autoClose: true,
              keepAfterRouteChange: true,
            });
            history.push("/login");
          }
        })
        .catch(() => {
          this.setState({ loading: false });
          alertService.error("Error creating note. Please try again.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    }
  }

  noteTags() {
    const tags = this.state.contents.match(/\B(#[a-zA-Z]+\b)(?!;)/g) || [];
    return [...new Set(tags)];
  }

  render() {
    return (
      <>
        {this.state.summary && (
          <Row className="pb-3">
            <Col className="text-right">
              <Button
                variant="primary"
                as={Link}
                to={"/notes/" + this.props.id + "/test"}
              >
                Mock Test
              </Button>
            </Col>
          </Row>
        )}
        <ListGroup>
          {this.state.summary && (
            <Card>
              <Card.Header>
                <Row>
                  <Col>Summary</Col>
                  <Col md="auto">
                    <small>
                      Content reduced by{" "}
                      {Number(
                        (1 -
                          this.state.summary.length /
                            this.state.contents.length) *
                          100
                      ).toFixed(2)}
                      %
                    </small>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Card.Text>{this.state.summary}</Card.Text>
              </Card.Body>
            </Card>
          )}
          <Card>
            <Card.Header>Note</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Name of note e.g. Biology Exam"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <TextareaAutosize
                    className="form-control w-100"
                    style={{ resize: "none", overflow: "visible" }}
                    minRows={10}
                    placeholder="Content of note e.g. An electrical system controls the rhythm of your heart. It’s called the cardiac conduction system."
                    name="contents"
                    value={this.state.contents}
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <div>
                    {this.noteTags().map((tag, index) => (
                      <Badge
                        key={index}
                        className="mr-1"
                        pill
                        variant="secondary"
                      >
                        {tag.toLowerCase().substring(1)}
                      </Badge>
                    ))}
                  </div>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    name="finished"
                    checked={this.state.finished}
                    onChange={this.handleCheckboxChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
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
                  {this.props.isEdit ? "Update" : "Save"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </ListGroup>
      </>
    );
  }
}

export default withRouter(NoteDisplay);
