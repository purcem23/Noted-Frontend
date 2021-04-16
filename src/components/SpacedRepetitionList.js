import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import SpacedRepetition from "./SpacedRepetition";

function SpacedRepetitionList({ flashcards, answerFlashcard }) {
  return (
    <ListGroup>
      {flashcards.length === 0 ? (
        <p>No spaced repetition due...</p>
      ) : (
        flashcards.map((flashcard) => (
          <SpacedRepetition
            key={flashcard.id}
            flashcard={flashcard}
            answerFlashcard={answerFlashcard}
          />
        ))
      )}
    </ListGroup>
  );
}

export default SpacedRepetitionList;
