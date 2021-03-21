import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Flashcard({ flashcard, deleteFlashcard }) {
  const history = useHistory();
  const [front, setFront] = useState([]);

  function toggleFlashcard(event) {
    event.stopPropagation();
    setFront(!front);
  }

  function handleDeleteClick(event) {
    event.stopPropagation();
    deleteFlashcard(flashcard);
  }

  function handleViewClick() {
    history.push("/flashcards/" + flashcard.id);
  }

  return (
    <Card style={{ cursor: "pointer" }} onClick={handleViewClick}>
      <Card.Body>
        <Card.Text>{front ? flashcard.front : flashcard.back}</Card.Text>
        <Button variant="primary" onClick={toggleFlashcard}>
          {front ? "Show Answer" : "Show Question"}
        </Button>
        <Button variant="link" onClick={handleDeleteClick}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Flashcard;
