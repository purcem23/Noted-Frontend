import React from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CheckCircle, Circle } from "react-bootstrap-icons";

function Note({ note, toggleComplete, toggleIncomplete, removeNote }) {
  const history = useHistory();

  function handleCompleteClick(event) {
    event.stopPropagation();
    toggleComplete(note);
  }

  function handleIncompleteClick(event) {
    event.stopPropagation();
    toggleIncomplete(note);
  }

  function handleRemoveClick(event) {
    event.stopPropagation();
    removeNote(note.id);
  }

  function handleViewClick() {
    history.push("/notes/" + note.id);
  }

  return (
    <Card
      border={note.finished ? "success" : ""}
      style={{ cursor: "pointer" }}
      onClick={handleViewClick}
    >
      <Card.Header>
        <Row>
          <Col>{note.name}</Col>
          {note.finished ? (
            <Col md="auto" className="text-success">
              <small className="align-middle">Completed</small>{" "}
              <span className="align-top">
                <CheckCircle size={14} />
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
          {note.contents.length > 50
            ? note.contents.substring(0, 50) + "..."
            : note.contents}
        </Card.Text>
        {note.finished ? (
          <Button variant="primary" onClick={handleIncompleteClick}>
            Mark Incomplete
          </Button>
        ) : (
          <Button variant="primary" onClick={handleCompleteClick}>
            Mark Completed
          </Button>
        )}
        <Button variant="link" onClick={handleRemoveClick}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Note;
