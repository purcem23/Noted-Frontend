import React from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CheckCircleFill, Circle } from "react-bootstrap-icons";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.handleCompleteClick = this.handleCompleteClick.bind(this);
    this.handleIncompleteClick = this.handleIncompleteClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleCompleteClick(event) {
    event.stopPropagation();
    this.props.toggleComplete(this.props.note);
  }

  handleIncompleteClick(event) {
    event.stopPropagation();
    this.props.toggleIncomplete(this.props.note);
  }

  handleDeleteClick(event) {
    event.stopPropagation();
    this.props.deleteNote(this.props.note);
  }

  handleViewClick() {
    this.props.history.push("/notes/" + this.props.note.id);
  }

  render() {
    return (
      <Card
        border={this.props.note.finished ? "success" : ""}
        style={{ cursor: "pointer" }}
        onClick={this.handleViewClick}
      >
        <Card.Header>
          <Row>
            <Col>{this.props.note.name}</Col>
            {this.props.note.finished ? (
              <Col md="auto" className="text-success">
                <small className="align-middle">Completed</small>{" "}
                <span className="align-top">
                  <CheckCircleFill size={14} />
                </span>
              </Col>
            ) : (
              <Col md="auto" className="text-secondary">
                <small className="align-middle">Incomplete</small>{" "}
                <span className="align-top">
                  <Circle size={14} />
                </span>
              </Col>
            )}
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {this.props.note.contents.length > 200
              ? this.props.note.contents.substring(0, 200) + "..."
              : this.props.note.contents}
          </Card.Text>
          {this.props.note.finished ? (
            <Button variant="primary" onClick={this.handleIncompleteClick}>
              Mark Incomplete
            </Button>
          ) : (
            <Button variant="primary" onClick={this.handleCompleteClick}>
              Mark Completed
            </Button>
          )}
          <Button
            className="ml-2"
            variant="outline-danger"
            onClick={this.handleDeleteClick}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Note);
