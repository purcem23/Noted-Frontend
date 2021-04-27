import React from "react";
import { withRouter } from "react-router-dom";
import ReactFrappeChart from "react-frappe-charts";

class Stats extends React.Component {
  render() {
    return (
      <>
        <h4>Spaced Repetition</h4>
        <h5 className="mt-4">Average score</h5>
        {this.props.stats.length > 0 ? (
          <ReactFrappeChart
            type="bar"
            colors={["#0077ff"]}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            height={250}
            data={{
              labels: this.props.stats.map((stat) => stat.tag),
              datasets: [
                {
                  values: this.props.stats.map((stat) =>
                    Number(stat.score.toFixed(1))
                  ),
                },
              ],
            }}
          />
        ) : (
          <div
            className="d-flex align-content-center justify-content-center flex-wrap"
            style={{ height: "250px", border: "3px dashed #eeeeee" }}
          >
            <h3 style={{ color: "#bebebe" }}>No data</h3>
          </div>
        )}
        <h5 className="mt-4">Repetition count</h5>
        {this.props.stats.length > 0 ? (
          <ReactFrappeChart
            type="bar"
            colors={["#1da83f"]}
            axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
            height={250}
            data={{
              labels: this.props.stats.map((stat) => stat.tag),
              datasets: [
                { values: this.props.stats.map((stat) => stat.repetitions) },
              ],
            }}
          />
        ) : (
          <div
            className="d-flex align-content-center justify-content-center flex-wrap"
            style={{ height: "250px", border: "3px dashed #eeeeee" }}
          >
            <h3 style={{ color: "#bebebe" }}>No data</h3>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Stats);
