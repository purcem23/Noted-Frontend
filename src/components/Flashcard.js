import React from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleDeleteClick(event) {
    event.stopPropagation();
    this.props.deleteFlashcard(this.props.flashcard);
  }

  handleViewClick() {
    this.props.history.push("/flashcards/" + this.props.flashcard.id);
  }

  render() {
    return (
      <Card style={{ cursor: "pointer" }} onClick={this.handleViewClick}>
        <Card.Header>{this.props.flashcard.front}</Card.Header>
        <Card.Body>
          <Card.Text>{this.props.flashcard.back}</Card.Text>
          <Card.Text>
            {this.props.flashcard.tags.map((tag, index) => (
              <Badge key={index} className="mr-1" pill variant="secondary">
                {tag}
              </Badge>
            ))}
          </Card.Text>
          <Button variant="outline-danger" onClick={this.handleDeleteClick}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(Flashcard);
