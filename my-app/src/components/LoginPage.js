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
            title: 'Scraper Log In',
            redirect: false
        };

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$$/;

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    append(parent, el) {
        return parent.appendChild(el);
    }

    createNode(element) {
        return document.createElement(element);
    }

    handleLogin(event){
        const fetchUrl = `/api/loginUser/`
        const that = this
        // const history = useHistory();
        fetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then(function(data) {
            console.log(data);
            if(data.result == 'OK')
                {
                // Redirect them to the Homepage
                that.setState({ redirect: true});
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
            // history.push("/HomePage")
        // event.preventDefault();
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
        const { redirect } = this.state.redirect;
        if (redirect) {
            return (<Redirect to="/HomePage"/>);
        }
        return (
                <div className="loginPageContent">
                <div className="loginPageTitleContainer">
                    {/* <text className="loginPageTitle">
                        {this.props.title}
                    </text> */}
            </div>
                <div className="loginPageContainer">
                    <div className="contactUsContainer">
                        <button onClick={this.handleContactUs} className="contactUsButton">Contact Us</button>
                    </div>
                    <div className="loginFormContainer">
                        <form className="loginForm">
                            <input type="email" value={this.state.email} required requirederror="Email Address required." validate={this.emailRegex} validateerror="Please provide a valid email address." placeholder="Email" onChange={this.handleEmailChange} className="emailInputBox" />
                            <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} className="passwordInputBox" />
                            <input type="button" value="Forgot Password" className="forgotPasswordButton" />
                            <input type="submit" value="Login" className="loginButton" onClick={() => {this.handleLogin();}}/>
                        </form>
                    </div>
                    <div className="createContainer">
                        <button onClick={this.handleCreate} className="createButton">Create</button>
                    </div>
                </div>
                </div>
            )
        }
    }