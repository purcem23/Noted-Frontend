import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { history } from "./helpers";
import { Notification } from "./components";
import { Note, Notes, Flashcards } from "./views";
import "./App.css";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={NavLink} to="/notes">
            Noted
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/notes">
              Notes
            </Nav.Link>
            <Nav.Link as={NavLink} to="/flashcards">
              Flashcards
            </Nav.Link>
          </Nav>
        </Navbar>
        <Notification />
        <Container className="py-4">
          <Switch>
            <Redirect from="/" to="/notes" exact />
            <Route path="/notes" exact>
              <Notes />
            </Route>
            <Route path="/notes/:noteId">
              <Note />
            </Route>
            <Route path="/flashcards">
              <Flashcards />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
