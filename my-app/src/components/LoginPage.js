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


        this.submitUserInfo = this.submitUserInfo.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    submitUserInfo(event){
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

    render() {
        return (
            <div className="LoginPage">
                {this.state.title}
                <form onSubmit={this.submitUserInfo} className="loginForm">
                    <input type="email" value={this.state.email} required requiredError="Email Address required." validate={this.emailRegex} validateError="Please provide a valid email address." placeholder="Email" onChange={this.handleEmailChange} className="emailInputBox" />
                    <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} className="passwordInputBox" />
                    <input type="button" value="Forgot Password" className="forgotPasswordButton" />
                    <input type="submit" value="Login" className="loginButton" />
                </form>
            </div>
        )
    }
}
