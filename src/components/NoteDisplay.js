import React from "react";
import { List, Header} from "semantic-ui-react";
export  const NoteDisplay = ({ notes }) => {
    return (
        <List> 
            {notes.map(note => {
                return(
                    <List.Item key={note.id}>
                        <Header>{note.name}</Header>
                        <body>{note.contents}</body>
                    </List.Item>
                )
            })}
        </List>
    )
}