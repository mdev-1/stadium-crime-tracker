import React from "react";
import TeamList from "./components/TeamList";
import Team from "./components/Team";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={TeamList} />
          <Route path="/team/:slug" exact component={Team} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
