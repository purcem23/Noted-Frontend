import React, { useEffect, useState } from "react";
import NoteList from "../components/NoteList";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("/notes").then((response) =>
      response.json().then((data) => {
        setNotes(data);
      })
    );
  }, []);

  function toggleComplete(id) {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            completed: !note.completed,
          };
        }
        return note;
      })
    );
  }

  function removeNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <NoteList
      notes={notes}
      toggleComplete={toggleComplete}
      removeNote={removeNote}
    ></NoteList>
  );
}

export default Notes;
