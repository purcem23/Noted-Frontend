import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import NoteList from "../components/NoteList";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/notes").then((response) =>
      response.json().then((data) => {
        setNotes(data);
      })
    );
  }, []);

  function toggleComplete(finishedNote) {
    fetch(process.env.REACT_APP_API_URL + "/notes/" + finishedNote.id, {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        name: finishedNote.name,
        contents: finishedNote.contents,
        finished: true,
      }),
    }).then((response) =>
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
      })
    );
  }

  function toggleIncomplete(unfinishedNote) {
    fetch(process.env.REACT_APP_API_URL + "/notes/" + unfinishedNote.id, {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        name: unfinishedNote.name,
        contents: unfinishedNote.contents,
        finished: false,
      }),
    }).then((response) =>
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
      })
    );
  }

  function removeNote(id) {
    fetch(process.env.REACT_APP_API_URL + "/notes/" + id, {
      method: "DELETE",
    }).then((response) =>
      response.json().then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
    );
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
      <NoteList
        notes={notes}
        toggleComplete={toggleComplete}
        toggleIncomplete={toggleIncomplete}
        removeNote={removeNote}
      ></NoteList>
    </div>
  );
}

export default Notes;
