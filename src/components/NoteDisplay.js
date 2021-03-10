import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class NoteDisplay extends React.Component {
  constructor(props) {
    super(props);
    if (props.isEdit) {
      this.state = {
        name: props.name,
        contents: props.contents,
        finished: props.finished,
        summary: props.summary,
      };
    } else {
      this.state = {
        name: "",
        contents: "",
        finished: false,
        summary: "",
      };
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
    event.preventDefault();
    if (this.props.isEdit) {
      await fetch(process.env.REACT_APP_API_URL + "/notes/" + this.props.id, {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          name: this.state.name,
          contents: this.state.contents,
          finished: this.state.finished,
        }),
      });
    } else {
      await fetch(process.env.REACT_APP_API_URL + "/notes", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          name: this.state.name,
          contents: this.state.contents,
          finished: this.state.finished,
        }),
      });
    }
    this.props.history.push("/notes");
  }

  render() {
    return (
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
                <Form.Control
                  as="textarea"
                  rows={10}
                  placeholder="Content of note e.g. An electrical system controls the rhythm of your heart. It’s called the cardiac conduction system."
                  name="contents"
                  value={this.state.contents}
                  onChange={this.handleInputChange}
                />
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
                {this.state.isEdit ? "Update" : "Save"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </ListGroup>
    );
  }
}

export default NoteDisplay;
