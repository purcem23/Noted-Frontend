import React, { useEffect, useState } from "react";
import { authFetch } from "../auth";
import { alertService } from "../services";
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
