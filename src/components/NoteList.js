import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Note from "./Note";

function NoteList({ notes, toggleComplete, toggleIncomplete, deleteNote }) {
  return (
    <ListGroup>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleComplete={toggleComplete}
          toggleIncomplete={toggleIncomplete}
          deleteNote={deleteNote}
        />
      ))}
    </ListGroup>
  );
}

export default NoteList;
