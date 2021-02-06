import React, { Component } from 'react'
import './css/LoginPage.css'

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false,
            title: 'Scraper Log In'
        };

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$$/;


        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleLogin(event){
        // 
        console.log(this.state.email);
        event.preventDefault();
    }

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handleCreate(event){

    }

    render() {
        return (
            <div className="contentContainer">
                <div className="contactUsContainer">
                    <button onClick={this.handleContactUs} className="contactUsButton">Contact Us</button>
                </div>
                <div className="loginFormContainer">
                    <form onSubmit={this.handleLogin} className="loginForm">
                        <input type="email" value={this.state.email} required requirederror="Email Address required." validate={this.emailRegex} validateerror="Please provide a valid email address." placeholder="Email" onChange={this.handleEmailChange} className="emailInputBox" />
                        <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} className="passwordInputBox" />
                        <input type="button" value="Forgot Password" className="forgotPasswordButton" />
                        <input type="submit" value="Login" className="loginButton" />
                    </form>
                </div>
                <div className="createContainer">
                    <button onClick={this.handleCreate} className="createButton">Create</button>
                </div>
            </div>
        )
    }
}
