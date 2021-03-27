import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { authFetch } from "../auth";
import { alertService } from "../services";
import Loading from "../components/Loading";
import NoteList from "../components/NoteList";

function Notes() {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    function fetchData() {
      authFetch(process.env.REACT_APP_API_URL + "/notes")
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setNotes(data);
              setLoading(false);
            });
          }
        })
        .catch(() => {
          setLoading(false);
          alertService.error("Error retrieving notes.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    }

    fetchData();
  }, []);

  function toggleComplete(finishedNote) {
    authFetch(
      process.env.REACT_APP_API_URL + "/notes/" + finishedNote.id + "/complete",
      {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) =>
        response.json().then(() => {
          setNotes(
            notes.map((note) => {
              if (note.id === finishedNote.id) {
                return {
                  ...note,
                  finished: true,
                };
              }
              return note;
            })
          );
          alertService.success(
            `Woooohooo! You completed <strong>${finishedNote.name}</strong>.`,
            {
              autoClose: true,
              keepAfterRouteChange: false,
            }
          );
        })
      )
      .catch(() => {
        alertService.error(
          `Error marking <strong>${finishedNote.name}</strong> as complete. Please try again.`,
          {
            autoClose: true,
            keepAfterRouteChange: false,
          }
        );
      });
  }

  function toggleIncomplete(unfinishedNote) {
    authFetch(
      process.env.REACT_APP_API_URL +
        "/notes/" +
        unfinishedNote.id +
        "/incomplete",
      {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) =>
        response.json().then(() => {
          setNotes(
            notes.map((note) => {
              if (note.id === unfinishedNote.id) {
                return {
                  ...note,
                  finished: false,
                };
              }
              return note;
            })
          );
          alertService.info(
            `Keep going! You can complete <strong>${unfinishedNote.name}</strong>.`,
            {
              autoClose: true,
              keepAfterRouteChange: false,
            }
          );
        })
      )
      .catch(() => {
        alertService.error(
          `Error marking <strong>${unfinishedNote.name}</strong> as incomplete. Please try again.`,
          {
            autoClose: true,
            keepAfterRouteChange: false,
          }
        );
      });
  }

  function deleteNote(deletedNote) {
    authFetch(process.env.REACT_APP_API_URL + "/notes/" + deletedNote.id, {
      method: "DELETE",
    })
      .then((response) =>
        response.json().then(() => {
          setNotes(notes.filter((note) => note.id !== deletedNote.id));
          alertService.success(
            `Successfully deleted <strong>${deletedNote.name}</strong>.`,
            {
              autoClose: true,
              keepAfterRouteChange: false,
            }
          );
        })
      )
      .catch(() => {
        alertService.error(
          `Error deleting <strong>${deletedNote.name}</strong>. Please try again.`,
          {
            autoClose: true,
            keepAfterRouteChange: false,
          }
        );
      });
  }

  return (
    <div>
      <Nav className="justify-content-end pb-3">
        <Nav.Item>
          <Button variant="primary" as={Link} to="/notes/new">
            New Note
          </Button>
        </Nav.Item>
      </Nav>
      {loading ? (
        <Loading />
      ) : (
        <NoteList
          notes={notes}
          toggleComplete={toggleComplete}
          toggleIncomplete={toggleIncomplete}
          deleteNote={deleteNote}
        ></NoteList>
      )}
    </div>
  );
}

export { Notes };
