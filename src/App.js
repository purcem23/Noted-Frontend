import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useAuth } from "./auth";
import { history } from "./helpers";
import AuthRoute from "./components/AuthRoute";
import Notification from "./components/Notification";
import Menubar from "./components/Menubar";
import {
  Home,
  Login,
  Register,
  Note,
  Notes,
  Flashcard,
  Flashcards,
} from "./views";
import "./App.css";

function App() {
  const [logged] = useAuth();

  return (
    <Router history={history}>
      <div className="App">
        <Menubar />
        <Notification />
        <Container className="py-4">
          <Switch>
            {logged ? (
              <>
                <AuthRoute path="/notes" component={Notes} exact />
                <AuthRoute path="/notes/:noteId" component={Note} />
                <AuthRoute path="/flashcards" component={Flashcards} exact />
                <AuthRoute
                  path="/flashcards/:flashcardId"
                  component={Flashcard}
                />
              </>
            ) : (
              <>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
              </>
            )}
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
