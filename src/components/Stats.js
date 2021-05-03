import React from "react";
import { withRouter } from "react-router-dom";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 chart-tooltip">
        <div>
          <strong>{label}</strong>
        </div>
        <hr className="my-2"></hr>
        <div>Repetitions: {payload[0].payload.repetitions}</div>
        <div>Score: {payload[0].payload.score}</div>
        <hr className="my-2"></hr>
        <div>
          <strong>{getStatMessage(payload[0].payload.score)}</strong>
        </div>
      </div>
    );
  }

  return null;
};

const getStatMessage = (score) => {
  if (score < 1) {
    return "This needs serious work!";
  } else if (score >= 1 && score < 2) {
    return "You need to study more!";
  } else if (score >= 2 && score < 3) {
    return "You can do better.";
  } else if (score >= 3 && score < 4) {
    return "Keep up the great work.";
  } else if (score >= 4) {
    return "Perfect, don't change a thing.";
  }
};

const scores = [
  { label: "Poor", colour: "#ea868f" },
  { label: "Fair", colour: "#feb272" },
  { label: "Good", colour: "#ffda6a" },
  { label: "Very Good", colour: "#79dfc1" },
  { label: "Excellent", colour: "#75b798" },
];

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.getStatColour = this.getStatColour.bind(this);
  }

  getStatColour(score) {
    if (score < 1) {
      return "#ea868f";
    } else if (score >= 1 && score < 2) {
      return "#feb272";
    } else if (score >= 2 && score < 3) {
      return "#ffda6a";
    } else if (score >= 3 && score < 4) {
      return "#79dfc1";
    } else if (score >= 4) {
      return "#75b798";
    }
  }

  render() {
    return (
      <>
        <h4>Spaced Repetition</h4>
        {this.props.stats.length > 0 ? (
          <div className="mt-4 text-center w-100">
            <ResponsiveContainer height={250}>
              <BarChart
                data={this.props.stats.map(({ tag, score, repetitions }) => {
                  return {
                    name: "#" + tag,
                    score: Number(score.toFixed(1)),
                    repetitions,
                  };
                })}
                maxBarSize={100}
              >
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="repetitions">
                  {this.props.stats.map(({ tag, score }, index) => (
                    <Cell key={tag} fill={this.getStatColour(score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div>
              {scores.map(({ label, colour }) => (
                <span key={label} className="mr-3">
                  <span
                    className="mr-1 legend-dot"
                    style={{
                      backgroundColor: colour,
                    }}
                  ></span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="d-flex align-content-center justify-content-center flex-wrap no-data">
            <h3 style={{ color: "#bebebe" }}>No data</h3>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Stats);
