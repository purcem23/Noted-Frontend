import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NoteDisplay from "../components/NoteDisplay";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";

function Note({ token }) {
  const { noteId } = useParams();
  const isEdit = noteId !== "new";
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({});

  useEffect(() => {
    if (isEdit) {
      function fetchData() {
        authFetch(process.env.REACT_APP_API_URL + "/notes/" + noteId)
          .then((response) => {
            if (response.status === 200) {
              response.json().then((data) => {
                setNote(data);
                setLoading(false);
              });
            }
            if (response.status === 401) {
              logout();
              alertService.success("Session expired! Please log in again.", {
                autoClose: true,
                keepAfterRouteChange: true,
              });
              history.push("/login");
            }
          })
          .catch(() => {
            alertService.error("Error retrieving note.", {
              autoClose: true,
              keepAfterRouteChange: false,
            });
          });
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
      isEdit={isEdit}
      id={note.id}
      name={note.name}
      contents={note.contents}
      finished={note.finished}
      summary={note.summary}
      tags={note.tags}
      token={token}
    ></NoteDisplay>
  );
}

export { Note };
