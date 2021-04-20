import React from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

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
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Text>
            {this.state.front ? (
              this.props.flashcard.front
            ) : (
              <strong>{this.props.flashcard.back}</strong>
            )}
          </Card.Text>
          <Card.Text>
            {this.props.flashcard.tags.map((tag, index) => (
              <Badge key={index} className="mr-1" pill variant="light">
                {tag}
              </Badge>
            ))}
          </Card.Text>
          {this.state.front ? (
            <Button variant="primary" onClick={this.toggleFlashcard}>
              {this.state.front ? "Show Answer" : "Show Question"}
            </Button>
          ) : (
            <Form>
              <Form.Group className="mt-3">
                <Form.Label className="mr-3">
                  How happy were you with your answer?
                </Form.Label>
                <Form.Check
                  label="Very Satisfied"
                  value="5"
                  type="radio"
                  checked={this.state.score === "5"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="Satisfied"
                  value="4"
                  type="radio"
                  checked={this.state.score === "4"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="Neutral"
                  value="3"
                  type="radio"
                  checked={this.state.score === "3"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="Dissatisfied"
                  value="2"
                  type="radio"
                  checked={this.state.score === "2"}
                  onChange={this.handleScore}
                />
                <Form.Check
                  label="Very Dissatisfied"
                  value="1"
                  type="radio"
                  checked={this.state.score === "1"}
                  onChange={this.handleScore}
                />
              </Form.Group>
              <Button
                variant="primary"
                disabled={!this.state.score}
                onClick={this.handleAnswer}
              >
                Submit
              </Button>
              <Button
                className="ml-2"
                variant="outline-secondary"
                onClick={this.toggleFlashcard}
              >
                Show Question
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(SpacedRepetition);
