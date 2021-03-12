// import logo from './logo.svg';
// import './App.css';
// import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage'

import React from 'react';
import logo from './logo.svg';
import './App.css'
import LoginPage from './components/LoginPage'
import SearchCriteriaPage from './components/SearchCriteriaPage.js'
import SearchingPage from './components/SearchingPage';
import HomePage from './components/HomePage'
// Imports from react-router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/LoginPage'>
            <LoginPage title = 'Log In' />
          </Route>
          <Route exact path = '/HomePage'>
            <HomePage title = 'HomePage' />
          </Route>
          <Route exact path = '/SearchCriteriaPage'>
            <SearchCriteriaPage title = 'Search Criteria' />
          </Route>
          <Route exact path = '/SettingsPage'>
            <SettingsPage title = 'Settings' />
          </Route>
        </Switch>
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
