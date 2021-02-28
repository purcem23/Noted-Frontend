import { List } from "@material-ui/core";
import React from "react";
import Note from "./Note";

function NoteList({ notes, toggleComplete, removeNote }) {
    return(
        <List>
            {notes.map(note => (
                <Note
                    key={note.id}
                    note={note}
                    toggleComplete={toggleComplete}
                    removeNote={removeNote}
                    />
            ))}
        </List>
    );
}

export default NoteList;