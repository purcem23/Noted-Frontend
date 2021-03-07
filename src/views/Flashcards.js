import React, { useEffect, useState } from "react";
import FlashcardList from "../components/FlashcardList";

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/flashcards").then((response) =>
      response.json().then((data) => {
        setFlashcards(data);
      })
    );
  }, []);

  return <FlashcardList flashcards={flashcards}></FlashcardList>;
}

export default Flashcards;
