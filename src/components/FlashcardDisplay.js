import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { alertService } from "../services";

class FlashcardDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: "",
      back: "",
      loading: false,
      history: props.history,
      isEdit: props.isEdit,
    };
    if (props.isEdit) {
      this.state.front = props.front;
      this.state.back = props.back;
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      await fetch(
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
        .then(() => {
          alertService.success("Flashcard successfully updated!", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        })
        .catch(() => {
          alertService.error(`Error updating flashcard. Please try again.`, {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      await fetch(process.env.REACT_APP_API_URL + "/flashcards", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          front: this.state.front,
          back: this.state.back,
        }),
      })
        .then(() => {
          alertService.success("Flashcard successfully created!", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
          this.setState({ loading: false });
          this.state.history.push("/flashcards");
        })
        .catch(() => {
          this.setState({ loading: false });
          alertService.error(`Error creating flashcard. Please try again.`, {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    }
  }

  render() {
    return (
      <ListGroup>
        <Card>
          <Card.Header>Flashcard</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Question e.g. The volume of blood pumped out by a ventricle with each heartbeat."
                  name="front"
                  value={this.state.front}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Answer e.g. Stroke volume."
                  name="back"
                  value={this.state.back}
                  onChange={this.handleInputChange}
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
                  />
                )}
                {this.state.isEdit ? "Update" : "Save"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </ListGroup>
    );
  }
}

export default FlashcardDisplay;
