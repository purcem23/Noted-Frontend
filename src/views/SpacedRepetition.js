import React, { useEffect, useState } from "react";
import { authFetch } from "../auth";
import { alertService } from "../services";
import Loading from "../components/Loading";
import SpacedRepetitionList from "../components/SpacedRepetitionList";

function SpacedRepetition() {
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    function fetchData() {
      getFlashcards();
    }

    fetchData();
  }, []);

  function getFlashcards() {
    authFetch(process.env.REACT_APP_API_URL + "/flashcards/due")
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setFlashcards(data);
            setLoading(false);
          });
        }
      })
      .catch(() => {
        setLoading(false);
        alertService.error("Error retrieving flashcards.", {
          autoClose: true,
          keepAfterRouteChange: false,
        });
      });
  }

  function answerFlashcard(answeredFlashcard, score) {
    authFetch(
      process.env.REACT_APP_API_URL +
        "/flashcards/" +
        answeredFlashcard.id +
        "/answer",
      {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          score,
        }),
      }
    )
      .then((response) =>
        response.json().then(() => {
          getFlashcards();
          alertService.success(
            score > 3
              ? "Keep up the great work!"
              : "I know you will do better next time.",
            {
              autoClose: true,
              keepAfterRouteChange: false,
            }
          );
        })
      )
      .catch(() => {
        alertService.error("Error answering flashcard. Please try again.", {
          autoClose: true,
          keepAfterRouteChange: false,
        });
      });
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h4>Due</h4>
          <SpacedRepetitionList
            notFoundMessage="No flashcards due..."
            flashcards={flashcards.filter(
              (f) => new Date(f.date_due).getTime() <= new Date().getTime()
            )}
            answerFlashcard={answerFlashcard}
          ></SpacedRepetitionList>
          <h4 className="mt-4">Upcoming</h4>
          <SpacedRepetitionList
            notFoundMessage="No upcoming flashcards..."
            flashcards={flashcards.filter(
              (f) => new Date(f.date_due).getTime() > new Date().getTime()
            )}
            answerFlashcard={answerFlashcard}
          ></SpacedRepetitionList>
        </>
      )}
    </div>
  );
}

export { SpacedRepetition };
