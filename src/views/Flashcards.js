import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { alertService } from "../services";
import Loading from "../components/Loading";
import FlashcardList from "../components/FlashcardList";

function Flashcards() {
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      fetch(process.env.REACT_APP_API_URL + "/flashcards")
        .then((response) =>
          response.json().then((data) => {
            setFlashcards(data);
          })
        )
        .catch(() => {
          alertService.error("Error retrieving flashcards.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchData();
  }, []);

  function deleteFlashcard(deletedFlashcard) {
    fetch(
      process.env.REACT_APP_API_URL + "/flashcards/" + deletedFlashcard.id,
      {
        method: "DELETE",
      }
    )
      .then((response) =>
        response.json().then(() => {
          setFlashcards(
            flashcards.filter(
              (flashcard) => flashcard.id !== deletedFlashcard.id
            )
          );
          alertService.success(`Successfully deleted flashcard.`, {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        })
      )
      .catch(() => {
        alertService.error(`Error deleting flashcard. Please try again.`, {
          autoClose: true,
          keepAfterRouteChange: false,
        });
      });
  }

  return (
    <div>
      <Nav className="justify-content-end pb-3">
        <Nav.Item>
          <Button variant="primary" as={Link} to="/flashcards/new">
            New Flashcard
          </Button>
        </Nav.Item>
      </Nav>
      {loading ? (
        <Loading />
      ) : (
        <FlashcardList
          flashcards={flashcards}
          deleteFlashcard={deleteFlashcard}
        ></FlashcardList>
      )}
    </div>
  );
}

export { Flashcards };
