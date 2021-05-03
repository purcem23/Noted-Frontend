import React from "react";
import { withRouter, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

class MockTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: null,
      currentQuestionNumber: 0,
      currentQuestionIndex: -1,
      answers: [],
      begin: true,
      finished: false,
      totalQuestions: this.props.test.length,
    };
    this.beginTest = this.beginTest.bind(this);
    this.finishTest = this.finishTest.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.decrementQuestionNumber = this.decrementQuestionNumber.bind(this);
    this.incrementQuestionNumber = this.incrementQuestionNumber.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  beginTest() {
    this.setState({
      begin: false,
      currentQuestion: this.props.test[0],
      currentQuestionNumber: 1,
      currentQuestionIndex: 0,
    });
  }

  finishTest() {
    this.setState({
      finished: true,
    });
  }

  handleAnswer(event) {
    const { currentQuestion, currentQuestionIndex, answers } = this.state;
    const userAnswer = event.target.value;
    answers[currentQuestionIndex] = {
      userAnswer: userAnswer,
      correctAnswer: currentQuestion.answer,
      correct: currentQuestion.answer === userAnswer,
    };
    this.setState({
      answers,
    });
  }

  decrementQuestionNumber() {
    const { currentQuestionNumber, currentQuestionIndex } = this.state;
    const newQuestionNumber = currentQuestionNumber - 1;
    const newQuestionIndex = currentQuestionIndex - 1;
    this.setState({
      currentQuestionNumber: newQuestionNumber,
      currentQuestionIndex: newQuestionIndex,
      currentQuestion: this.props.test[newQuestionIndex],
    });
  }

  incrementQuestionNumber() {
    const { currentQuestionNumber, currentQuestionIndex } = this.state;
    const newQuestionNumber = currentQuestionNumber + 1;
    const newQuestionIndex = currentQuestionIndex + 1;
    this.setState({
      currentQuestionNumber: newQuestionNumber,
      currentQuestionIndex: newQuestionIndex,
      currentQuestion: this.props.test[newQuestionIndex],
    });
  }

  getScore() {
    const { answers } = this.state;
    return answers.reduce((score, answer) => {
      if (answer.correct) {
        score++;
      }
      return score;
    }, 0);
  }

  render() {
    return (
      <Card>
        <Card.Header className="px-0 py-0" style={{ border: "none" }}>
          <ProgressBar
            variant="primary"
            now={
              (this.state.currentQuestionNumber / this.state.totalQuestions) *
              100
            }
            style={{
              borderTopLeftRadius: "0.2rem",
              borderTopRightRadius: "0.2rem",
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
            }}
          />
        </Card.Header>
        {this.state.begin && (
          <Card.Body>
            <h4>Your mock test is ready!</h4>
            <h6 className="my-4">
              Using your notes we generated a test containing{" "}
              {this.state.totalQuestions} multiple-choice questions.
            </h6>
            <Button onClick={this.beginTest}>Let's begin!</Button>
          </Card.Body>
        )}
        {!this.state.begin &&
          !this.state.finished &&
          this.state.currentQuestionNumber >= 1 && (
            <Card.Body>
              <h6>
                Question {this.state.currentQuestionNumber} of{" "}
                {this.state.totalQuestions}
              </h6>
              <h5 className="mb-3">
                <strong>{this.state.currentQuestion.question}</strong>
              </h5>
              <Form>
                <Form.Group>
                  {this.state.currentQuestion.fake_answers.map(
                    (answer, index) => {
                      return (
                        <Form.Check
                          key={index}
                          label={answer}
                          value={answer}
                          type="radio"
                          checked={
                            this.state.answers[
                              this.state.currentQuestionIndex
                            ] &&
                            this.state.answers[this.state.currentQuestionIndex]
                              .userAnswer === answer
                          }
                          onChange={this.handleAnswer}
                        />
                      );
                    }
                  )}
                </Form.Group>
              </Form>
              <Button
                className="mr-3"
                variant="secondary"
                onClick={this.decrementQuestionNumber}
              >
                Back
              </Button>
              {this.state.currentQuestionNumber ===
              this.state.totalQuestions ? (
                <Button onClick={this.finishTest}>Finish</Button>
              ) : (
                <Button
                  disabled={
                    !this.state.answers[this.state.currentQuestionIndex]
                  }
                  onClick={this.incrementQuestionNumber}
                >
                  Next
                </Button>
              )}
            </Card.Body>
          )}
        {this.state.finished && (
          <Card.Body>
            <h4>The results are in!</h4>
            <h5>
              Your score was{" "}
              {Number(
                (this.getScore() / this.state.totalQuestions) * 100
              ).toFixed(2)}
              % ({this.getScore()} of out {this.state.totalQuestions})
            </h5>
            <ListGroup className="my-4">
              {this.state.answers.map((answer, index) => {
                return (
                  <ListGroup.Item key={index}>
                    {answer.correct ? (
                      <h5 className="text-success">
                        <CheckCircleFill className="mr-2" /> Question{" "}
                        {index + 1}
                      </h5>
                    ) : (
                      <h5 className="text-danger">
                        <XCircleFill className="mr-2" /> Question {index + 1}
                      </h5>
                    )}
                    <div>Your answer: {answer.userAnswer}</div>
                    <div>
                      <strong>Correct answer: {answer.correctAnswer}</strong>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <Button as={Link} to={"/notes/" + this.props.noteId}>
              Done
            </Button>
          </Card.Body>
        )}
      </Card>
    );
  }
}

export default withRouter(MockTest);
