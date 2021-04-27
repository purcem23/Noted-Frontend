import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import SpacedRepetition from "./SpacedRepetition";

function SpacedRepetitionList({
  flashcards,
  answerFlashcard,
  notFoundMessage,
}) {
  return (
    <ListGroup style={{ minHeight: "250px" }}>
      {flashcards.length === 0 ? (
        <p>{notFoundMessage}</p>
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
