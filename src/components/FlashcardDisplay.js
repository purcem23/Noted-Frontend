import React from "react";
import { withRouter } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import TextareaAutosize from "react-textarea-autosize";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";

class FlashcardDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: "",
      back: "",
      loading: false,
    };
    if (props.isEdit) {
      this.state.front = props.front;
      this.state.back = props.back;
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.flashcardTags = this.flashcardTags.bind(this);
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
        process.env.REACT_APP_API_URL + "/flashcards/" + this.props.id,
        {
          method: "PATCH",
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({
            front: this.state.front,
            back: this.state.back,
          }),
        }
      )
        .then((response) => {
          if (response.status === 200) {
            this.setState({ loading: false });
            alertService.success("Flashcard successfully updated!", {
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
          alertService.error("Error updating flashcard. Please try again.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    } else {
      await authFetch(process.env.REACT_APP_API_URL + "/flashcards", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          front: this.state.front,
          back: this.state.back,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            this.setState({ loading: false });
            alertService.success("Flashcard successfully created!", {
              autoClose: true,
              keepAfterRouteChange: true,
            });
            this.props.history.push("/flashcards");
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
          alertService.error("Error creating flashcard. Please try again.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    }
  }

  flashcardTags() {
    const frontTags = this.state.front.match(/\B(#[a-zA-Z]+\b)(?!;)/g) || [];
    const backTags = this.state.back.match(/\B(#[a-zA-Z]+\b)(?!;)/g) || [];
    return [...new Set(frontTags.concat(backTags))];
  }

  render() {
    return (
      <ListGroup>
        <Card>
          <Card.Header>Flashcard</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <TextareaAutosize
                  className="form-control w-100"
                  minRows={3}
                  placeholder="Question e.g. The volume of blood pumped out by a ventricle with each heartbeat."
                  name="front"
                  value={this.state.front}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <TextareaAutosize
                  className="form-control w-100"
                  minRows={3}
                  placeholder="Answer e.g. Stroke volume."
                  name="back"
                  value={this.state.back}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                {this.flashcardTags().map((tag, index) => (
                  <Badge key={index} className="mr-1" pill variant="secondary">
                    {tag.toLowerCase().substring(1)}
                  </Badge>
                ))}
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
    );
  }
}

export default withRouter(FlashcardDisplay);
