import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import NoteDisplay from "../components/NoteDisplay";

function Note() {
  const history = useHistory();
  const { noteId } = useParams();
  const isEdit = noteId !== "new";
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({});
  const [summary, setSummary] = useState({});

  useEffect(() => {
    if (isEdit) {
      async function fetchData() {
        await fetch(process.env.REACT_APP_API_URL + "/notes/" + noteId).then(
          (response) =>
            response.json().then((data) => {
              setNote(data);
            })
        );

        await fetch(
          process.env.REACT_APP_API_URL + "/note-summaries/" + noteId
        ).then((response) =>
          response.json().then((data) => {
            setSummary(data);
          })
        );

        setLoading(false);
      }

      fetchData();
    } else {
      setLoading(false);
    }
  }, [noteId, isEdit]);

  return loading ? (
    <Loading />
  ) : (
    <NoteDisplay
      history={history}
      isEdit={isEdit}
      id={note.id}
      name={note.name}
      contents={note.contents}
      finished={note.finished}
      summary={summary.contents}
    ></NoteDisplay>
  );
}

export { Note };
