import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";
import Loading from "../components/Loading";
import MockTest from "../components/MockTest";

function Test() {
  const { noteId } = useParams();
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState([]);

  useEffect(() => {
    function fetchData() {
      authFetch(process.env.REACT_APP_API_URL + "/notes/" + noteId + "/mcq")
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setTest(data);
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
          setLoading(false);
          alertService.error("Error retrieving mock test.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    }

    fetchData();
  }, [noteId]);

  return (
    <div>
      {loading ? (
        <Loading
          messages={[
            "Retrieving note...",
            "Processing note content...",
            "Generating questions from content...",
            "Finalizing your test. This can take time...",
          ]}
        />
      ) : (
        <MockTest test={test} noteId={noteId} />
      )}
    </div>
  );
}

export { Test };
