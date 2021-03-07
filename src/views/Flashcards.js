import React, { useEffect, useState } from "react";
import FlashcardList from "../components/FlashcardList";

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch("/flashcards").then((response) =>
      response.json().then((data) => {
        console.log(data);
        setFlashcards(data);
      })
    );
  }, []);

  return <FlashcardList flashcards={flashcards}></FlashcardList>;
}

export default Flashcards;
