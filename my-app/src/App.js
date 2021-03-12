import React from 'react';
import './App.css'
import LoginPage from './components/LoginPage'
import SearchCriteriaPage from './components/SearchCriteriaPage.js'
import SearchingPage from './components/SearchingPage';
import HomePage from './components/HomePage'
import SettingsPage from './components/SettingsPage'
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
    </div>
  );
}

export default App;
