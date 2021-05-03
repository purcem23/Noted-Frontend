import React, { useEffect, useState } from "react";
import { differenceInDays, startOfDay } from "date-fns";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";
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
          if (response.status === 200) {
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
              (f) =>
                differenceInDays(
                  startOfDay(new Date()),
                  startOfDay(new Date(f.date_due))
                ) >= 0
            )}
            answerFlashcard={answerFlashcard}
          ></SpacedRepetitionList>
          <h4 className="mt-4">Upcoming</h4>
          <SpacedRepetitionList
            notFoundMessage="No upcoming flashcards..."
            flashcards={flashcards.filter(
              (f) =>
                differenceInDays(
                  startOfDay(new Date()),
                  startOfDay(new Date(f.date_due))
                ) < 0
            )}
            answerFlashcard={answerFlashcard}
          ></SpacedRepetitionList>
        </>
      )}
    </div>
  );
}

export { SpacedRepetition };
