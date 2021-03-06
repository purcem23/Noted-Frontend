import React, { useEffect, useState } from "react";
import { authFetch, logout } from "../auth";
import { alertService } from "../services";
import { history } from "../helpers";
import Loading from "../components/Loading";
import Stats from "../components/Stats";

function Insights() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    function fetchData() {
      authFetch(process.env.REACT_APP_API_URL + "/stats")
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setStats(data);
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
          alertService.error("Error retrieving stats.", {
            autoClose: true,
            keepAfterRouteChange: false,
          });
        });
    }

    fetchData();
  }, []);

  return <div>{loading ? <Loading /> : <Stats stats={stats} />}</div>;
}

export { Insights };
