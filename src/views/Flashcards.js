import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";
import Loading from "../components/Loading";
import FlashcardList from "../components/FlashcardList";

function Flashcards() {
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    function fetchData() {
      authFetch(process.env.REACT_APP_API_URL + "/flashcards")
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setFlashcards(data);
              setTags([
                ...new Set(
                  data.reduce((ts, t) => {
                    return ts.concat(t.tags);
                  }, [])
                ),
              ]);
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

    fetchData();
  }, []);

  function getFlashcards(search = null) {
    authFetch(
      process.env.REACT_APP_API_URL +
        "/flashcards" +
        (search ? "?tag=" + search : "")
    )
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

  function searchFlashcards(tag) {
    if (tag) {
      getFlashcards(tag.value);
    } else {
      getFlashcards();
    }
  }

  function deleteFlashcard(deletedFlashcard) {
    authFetch(
      process.env.REACT_APP_API_URL + "/flashcards/" + deletedFlashcard.id,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setFlashcards(
            flashcards.filter(
              (flashcard) => flashcard.id !== deletedFlashcard.id
            )
          );
          alertService.success("Successfully deleted flashcard.", {
            autoClose: true,
            keepAfterRouteChange: false,
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
        alertService.error("Error deleting flashcard. Please try again.", {
          autoClose: true,
          keepAfterRouteChange: false,
        });
      });
  }

  return (
    <div>
      <Row className="pb-3">
        <Col className="text-left">
          <Select
            type="text"
            placeholder="Search by tag"
            options={tags.map((t) => {
              return { label: t.toLowerCase(), value: t.toLowerCase() };
            })}
            onChange={searchFlashcards}
            isClearable={true}
          />
        </Col>
        <Col className="text-right">
          <Button variant="primary" as={Link} to="/flashcards/new">
            New Flashcard
          </Button>
        </Col>
      </Row>
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
