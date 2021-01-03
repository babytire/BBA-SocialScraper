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
        this.submitUserInfo = this.submitUserInfo.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    submitUserInfo(event){
        // pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$"
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
            <div>
                {this.state.title}
                <form onSubmit={this.submitUserInfo} className="loginForm">
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="emailInputBox" />
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="passwordInputBox" />
                    <input type="button" value="Forgot Password" className="forgotPasswordButton" />
                    <input type="submit" value="Login" className="loginButton" />
                </form>
            </div>
        )
    }
}
