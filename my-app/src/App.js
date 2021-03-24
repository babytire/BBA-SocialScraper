import React, { Component } from 'react';
import './App.css'
import LoginPage from './components/LoginPage'
import SearchCriteriaPage from './components/SearchCriteriaPage'
import SearchingPage from './components/SearchingPage';
import HomePage from './components/HomePage'
import SettingsPage from './components/SettingsPage'
import ContactUsPage from './components/ContactUsPage'
import LoginAuthenticate from './components/LoginAuthenticate'
//Test

// Imports from react-router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
// import NavButtons from './components/NavButtons';

export default class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          email: '',
          password: '',
          isAuthenticated: false
      };

      this.handleLogin = this.handleLogin.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
  handleLogin(event){
    const fetchUrl = '/api/loginUser/';
    console.log("Attempting POST");
    console.log(this.state.email);
    console.log(this.state.password);
    fetch(fetchUrl, {
        method: 'POST',
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
    })
    .then((response) => response.json())
    .then(function(data) {
        if(data.result == 'OK')
            {
            // Redirect them to the Homepage
            console.log("Redirecting to HomePage");
            this.setState({isAuthenticated: true});
            return(
              <Link to='/LoginAuthenticated'></Link>
            )
            }
        else
            {
            // Redirect them to the LoginPage
            console.log("Redirecting to LoginPage");
            this.setState({isAuthenticated: true});
            <Redirect to='/LoginAuthenticated'></Redirect>
            return(
              <LoginAuthenticate logged={this.state.isAuthenticated}></LoginAuthenticate>
            )
            }
        })
        .catch(function(error) {
            console.log(error);
        })
        event.preventDefault();
  }
  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  render(){
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path = '/LoginPage'>
            <LoginPage title = 'Log In' email = {this.state.email} password = {this.state.password} handleEmailChange = {this.handleEmailChange} handlePasswordChange = {this.handlePasswordChange} handleLogin = {this.handleLogin} />
          </Route>
          <Route exact path = '/HomePage'>
            <HomePage title = 'HomePage' />
          </Route>
          <Route exact path = '/SearchCriteriaPage'>
            <SearchCriteriaPage title = 'Search Criteria' />
          </Route>
          <Route exact path = '/SearchingPage'>
            <SearchingPage title = 'Searching' />
          </Route>
          <Route exact path = '/SettingsPage'>
            <SettingsPage title = 'Settings' />
          </Route>
          <Route exact path = '/ContactUsPage'>
            <ContactUsPage title='Contact Us'></ContactUsPage>
          </Route>
          <Route exact path = '/LoginAuthenticate'>
            <LoginAuthenticate logged={this.state.isAuthenticated}></LoginAuthenticate>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
}
