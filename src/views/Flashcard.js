import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import FlashcardDisplay from "../components/FlashcardDisplay";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";

function Flashcard() {
  const { flashcardId } = useParams();
  const isEdit = flashcardId !== "new";
  const [loading, setLoading] = useState(true);
  const [flashcard, setFlashcard] = useState({});

  useEffect(() => {
    if (isEdit) {
      function fetchData() {
        authFetch(process.env.REACT_APP_API_URL + "/flashcards/" + flashcardId)
          .then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setFlashcard(data);
                setLoading(false);
              });
            }
            if (response.status === 401) {
              logout();
              alertService.success("Session expired! Please log in again.", {
                autoClose: true,
                keepAfterRouteChange: true,
              });
              history.push("/login");
            }
          })
          .catch(() => {
            setLoading(false);
            alertService.error("Error retrieving flashcard.", {
              autoClose: true,
              keepAfterRouteChange: false,
            });
          });
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
      isEdit={isEdit}
      id={flashcard.id}
      back={flashcard.back}
      front={flashcard.front}
    ></FlashcardDisplay>
  );
}

export { Flashcard };
