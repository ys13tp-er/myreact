import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.scss';

import axios from 'axios';

import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import LoginError from './Views/Error/LoginError';

React.$axios = axios;


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/loginError" component={LoginError} />
          <Redirect from="/" to="/login"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
