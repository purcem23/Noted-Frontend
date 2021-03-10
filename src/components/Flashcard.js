import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Flashcard({ flashcard }) {
  const [front, setFront] = useState([]);

  function toggleFlashcard() {
    setFront(!front);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Text>{front ? flashcard.front : flashcard.back}</Card.Text>
        <Button variant="primary" onClick={toggleFlashcard}>
          {front ? "Show Answer" : "Show Question"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Flashcard;
