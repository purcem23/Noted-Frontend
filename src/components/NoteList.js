import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Note from "./Note";

function NoteList({ notes, toggleComplete, removeNote }) {
  return (
    <ListGroup>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleComplete={toggleComplete}
          removeNote={removeNote}
        />
      ))}
    </ListGroup>
  );
}

export default NoteList;
