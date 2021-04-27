import React from "react";
import { withRouter } from "react-router-dom";
import {
  isToday,
  isTomorrow,
  isYesterday,
  differenceInDays,
  startOfDay,
} from "date-fns";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SpacedRepetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: true,
      score: "",
    };
    this.toggleFlashcard = this.toggleFlashcard.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.getDueDate = this.getDueDate.bind(this);
    this.getDueDateColour = this.getDueDateColour.bind(this);
  }

  toggleFlashcard(event) {
    event.stopPropagation();
    if (!this.state.front) {
      this.setState({ score: "" });
    }
    this.setState({ front: !this.state.front });
  }

  handleViewClick() {
    this.props.history.push("/flashcards/" + this.props.flashcard.id);
  }

  handleScore(event) {
    this.setState({ score: event.target.value });
  }

  async handleAnswer() {
    this.props.answerFlashcard(this.props.flashcard, this.state.score);
    this.setState({ front: !this.state.front, score: "" });
  }

  getDueDate(dueDate) {
    const due = startOfDay(new Date(dueDate));
    const now = startOfDay(new Date());
    const dayDifference = differenceInDays(now, due);

    if (isToday(due)) {
      return "Today";
    }
    if (isTomorrow(due)) {
      return "Tomorrow";
    }
    if (isYesterday(due)) {
      return "Yesterday";
    }
    if (dayDifference < -1) {
      return `In ${dayDifference * -1} days`;
    }
    if (dayDifference > 1) {
      return `${dayDifference} days late`;
    }
  }

  getDueDateColour(dueDate) {
    const due = startOfDay(new Date(dueDate));
    const now = startOfDay(new Date());
    const dayDifference = differenceInDays(now, due);

    if (isToday(due)) {
      return "primary";
    }
    if (isTomorrow(due)) {
      return "light";
    }
    if (isYesterday(due)) {
      return "warning";
    }
    if (dayDifference < -1) {
      return "light";
    }
    if (dayDifference > 1) {
      return "danger";
    }
  }

  render() {
    return (
      <Card border={this.getDueDateColour(this.props.flashcard.date_due)}>
        <Card.Body>
          <Row className="pb-3">
            <Col>
              {this.state.front ? (
                this.props.flashcard.front
              ) : (
                <strong>{this.props.flashcard.back}</strong>
              )}
            </Col>
            <Col className="text-right">
              <Badge
                pill
                variant={this.getDueDateColour(this.props.flashcard.date_due)}
              >
                {this.getDueDate(this.props.flashcard.date_due)}
              </Badge>
            </Col>
          </Row>
          {this.state.front ? (
            <Button
              variant={this.getDueDateColour(this.props.flashcard.date_due)}
              onClick={this.toggleFlashcard}
            >
              {this.state.front ? "Show Answer" : "Show Question"}
            </Button>
          ) : (
            <Form>
              <Form.Group>
                <Form.Label className="mr-3">
                  How well did you answer the question?
                </Form.Label>
                <Form.Check
                  label="Perfect"
                  value="5"
                  type="radio"
                  checked={this.state.score === "5"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="I was correct but hesitated"
                  value="4"
                  type="radio"
                  checked={this.state.score === "4"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="I was correct but struggled to remember"
                  value="3"
                  type="radio"
                  checked={this.state.score === "3"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="I was incorrect but the correct answer was obvious"
                  value="2"
                  type="radio"
                  checked={this.state.score === "2"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="I was incorrect but sort of recognised the correct answer"
                  value="1"
                  type="radio"
                  checked={this.state.score === "1"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="I did not have a clue"
                  value="0"
                  type="radio"
                  checked={this.state.score === "0"}
                  onChange={this.handleScore}
                />
              </Form.Group>
              <Button
                variant={this.getDueDateColour(this.props.flashcard.date_due)}
                disabled={!this.state.score}
                onClick={this.handleAnswer}
              >
                Submit
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(SpacedRepetition);
