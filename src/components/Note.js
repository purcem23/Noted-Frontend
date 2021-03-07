import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Note({ note, toggleComplete, removeNote }) {
  function handleCheckboxClick() {
    toggleComplete(note.id);
  }

  function handleRemoveClick() {
    removeNote(note.id);
  }

  return (
    <Card>
      <Card.Header>{note.name}</Card.Header>
      <Card.Body>
        <Card.Text>{note.contents}</Card.Text>
        <Button
          variant="primary"
          onClick={handleCheckboxClick}
          disabled={note.completed}
        >
          Complete
        </Button>
        <Button variant="link" onClick={handleRemoveClick}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Note;
