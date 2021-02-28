import { Checkbox, IconButton, ListItem, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";


function Note({ note, toggleComplete, removeNote }) {
    function handleCheckboxClick() {
        toggleComplete(note.id);
    }

    function handleRemoveClick() {
        removeNote(note.id);
    }
    return (
        <ListItem style={{ display: "flex" }}>
            <Checkbox
                checked={note.completed}
                onClick={handleCheckboxClick} 
            />
            <Typography
                variant="body1"
                style={{
                    textDecoration: note.completed ? "line_through": null
                }}
            >
                {note.task}
            </Typography>
            <IconButton onClick={handleRemoveClick}>
                <CloseIcon />
            </IconButton>
        </ListItem>
    );
}

export default Note