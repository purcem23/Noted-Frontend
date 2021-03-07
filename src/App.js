import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Notes from "./views/Notes";
import Flashcards from "./views/Flashcards";
import "./App.css";

function App() {
  return (
    <Router>
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
        <Container className="py-5">
          <Switch>
            <Route path="/notes">
              <Notes />
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
