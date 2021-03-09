import React, { Component } from 'react'
import './css/LoginPage.css'
import { Link } from 'react-router-dom'

export default class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false,
            title: 'Scraper Log In',
            link: ''
        };

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$$/;
        const homePage = '/HomePage'
        const loginPage = '/LoginPage'

        this.handleLogin = this.handleLogin.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }
    // const [todo, setTodo] = useState([]);
    // const [addTodo, setAddTodo] = useState('');
 
    // useEffect() {
    //    fetch('/api/loginClicked')
    //     .then(response => {
    //       if(response.ok){
    //          return response.json()
    //       }
    //     })
    //     // }).then(data => setTodo(data))// }).then(data=>console.log(data))
    // }

    handleLogin(event){
        const fetchUrl = `/api/loginClicked/`
        
        fetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
          .then(data => {
                if(data == true) 
                    { this.setState({ link : '/HomePage' }); }
                else 
                    { this.setState({ link : '/LoginPage' }); }
                })
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
        // <div className="loginPageContent">
        //     <div className="loginPageTitleContainer">
        //         {/* <text className="loginPageTitle">
        //             {this.props.title}
        //         </text> */}
        //     </div>
            
        // </div>
            <div className="loginPageContainer">
                <div className="contactUsContainer">
                    <button onClick={this.handleContactUs} className="contactUsButton">Contact Us</button>
                </div>
                <div className="loginFormContainer">
                    <form className="loginForm">
                        <input type="email" value={this.state.email} required requirederror="Email Address required." validate={this.emailRegex} validateerror="Please provide a valid email address." placeholder="Email" onChange={this.handleEmailChange} className="emailInputBox" />
                        <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} className="passwordInputBox" />
                        <input type="button" value="Forgot Password" className="forgotPasswordButton" />
                        <Link to={this.state.link}>
                            <input type="submit" value="Login" className="loginButton" onClick={this.handleLogin} />
                        </Link>
                    </form>
                </div>
                <div className="createContainer">
                    <button onClick={this.handleCreate} className="createButton">Create</button>
                </div>
            </div>
        )
    }
}
