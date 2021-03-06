import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Flashcard from "./Flashcard";

function FlashcardList({ flashcards, deleteFlashcard }) {
  return (
    <ListGroup>
      {flashcards.length === 0 ? (
        <p>No flashcards found...</p>
      ) : (
        flashcards.map((flashcard) => (
          <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            deleteFlashcard={deleteFlashcard}
          />
        ))
      )}
    </ListGroup>
  );
}

export default FlashcardList;
