import React, { Component } from 'react'
import './css/LoginPage.css'
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom'

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false,
            link: '/HomePage'
        };

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$$/;

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    // const LinkToHome = ({ children, to, condition }) => (!!condition && to)
    // ? <Link to={to}>{children}</Link>
    // : <>{children}</>;

    handleLogin(event){
        const fetchUrl = '/api/loginClicked/';

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
                this.setState({link: true});
                }
            else
                {
                // Redirect them to the LoginPage
                console.log("Redirecting to LoginPage");
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

    render() {
        return (
        
        <div className="loginPageContent">
            <div className="loginPageTitleContainer">
                <label className="loginPageTitle">
                    {this.props.title}
                </label>
            </div>
            <div className="loginPageContainer">
                <div className="contactUsContainer">
                    <Link to='/ContactUsPage'>
                        <button className="contactUsButton">Contact Us</button>
                    </Link>
                </div>
                <div className="loginFormContainer">
                    <form className="loginForm">
                        <input type="email" value={this.state.email} required requirederror="Email Address required." validate={this.emailRegex} validateerror="Please provide a valid email address." placeholder="Email" onChange={this.handleEmailChange} className="emailInputBox" />
                        <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} className="passwordInputBox" />
                        <input type="button" value="Forgot Password" className="forgotPasswordButton" />
                        <Link to={this.state.link}>
                            <input type="submit" value="Login" className="loginButton" />
                        </Link>
                    </form>
                </div>
                <Link to='/RegisterAccount' className="createContainer">
                    <button className="createButton">Create</button>
                </Link>
            </div>
        </div>
        )
    }
}
