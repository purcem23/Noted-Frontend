import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import {v4 as uuid} from "uuid";

function NoteForm({ addNote }) {
    const [note, setNote] = useState({
        id:"",
        task:"",
        completed: false
    });

    function handleTaskInputChange(e) {
        setNote({...note, task: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (note.task.trim()) {
            addNote({...note, id: uuid() });
            // reset task input
            setNote({...note, task: ""});
        }
    }
    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <TextField
                label="text"
                name="task"
                type="text"
                value={note.task}
                onChange={handleTaskInputChange}
            />
            <Button type="submit">submit</Button>
        </form>
    );
}

export default NoteForm;