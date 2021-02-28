import React, { useEffect, useState } from "react";
import './App.css';
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Typography from "@material-ui/core/Typography";
import { NoteDisplay } from "./components/NoteDisplay";
const LOCAL_STORAGE_KEY = "react-note-list-notes";

function App() {
  const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   const storageNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storageNotes) {
  //     setNotes(storageNotes);
  //   }
  // }, []);

  useEffect(() => {
    fetch("/notes").then(response =>
      response.json().then(data => {
        setNotes(data);
      })
    );
  }, []);

  console.log(notes);

  return (
    <div className="App">
    <NoteDisplay notes={notes}/>
  </div>
  );


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote(note) {
    setNotes([note, ...notes]);
  }

  function toggleComplete(id) {
    setNotes(
      notes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            completed: !note.completed
          };
        }
        return note;
      })
    );
  }

  function removeNote(id) {
    setNotes(notes.filter(note => note.id !== id));
  }
  return (
    <div className="App">
        <Typography style={{ padding: 16}} variant="h1">
          React Note
        </Typography>
        <NoteForm addNote={addNote} />
        <NoteList
         notes={notes} 
         toggleComplete={toggleComplete}
         removeNote={removeNote}
         />
    </div>
  );
}

export default App;
