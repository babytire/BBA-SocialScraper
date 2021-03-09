// import logo from './logo.svg';
// import './App.css';
// import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage'

import React from 'react';
import logo from './logo.svg';
import './App.css'
import { TodoPage } from './Pages/TodoPage'
import { Show } from './Pages/Show'
import LoginPage from './components/LoginPage'
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
      {/* <HomePage title={"Home Page"}></HomePage> */}
      {/* <LoginPage title={"Scraper Log In"}></LoginPage> */}
      <Router>
        <Switch>
          {/* <Route exact path='/'>
            <TodoPage/>
          </Route> */}
          <Route exact path = '/LoginPage'>
            <LoginPage title = {"Scrape Log In"}/>
          </Route>
          <Route exact path = '/HomePage'>
            <HomePage title = {"Scraper Landing Page"}/>
          </Route>
          {/* <Route exact path='/:id'>
            <Show/>
          </Route> */}
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
