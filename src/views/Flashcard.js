import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import FlashcardDisplay from "../components/FlashcardDisplay";

function Flashcard() {
  const history = useHistory();
  const { flashcardId } = useParams();
  const isEdit = flashcardId !== "new";
  const [loading, setLoading] = useState(true);
  const [flashcard, setFlashcard] = useState({});

  useEffect(() => {
    if (isEdit) {
      async function fetchData() {
        await fetch(
          process.env.REACT_APP_API_URL + "/flashcards/" + flashcardId
        ).then((response) =>
          response.json().then((data) => {
            setFlashcard(data);
          })
        );

        setLoading(false);
      }

      fetchData();
    } else {
      setLoading(false);
    }
  }, [flashcardId, isEdit]);

  return loading ? (
    <Loading />
  ) : (
    <FlashcardDisplay
      history={history}
      isEdit={isEdit}
      id={flashcard.id}
      back={flashcard.back}
      front={flashcard.front}
    ></FlashcardDisplay>
  );
}

export { Flashcard };
