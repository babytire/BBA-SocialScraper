import React, { Component } from 'react'
import './css/ContactUsPage.css'

export default class ContactUsPage extends Component {
	constructor(props){
        super(props);
        this.state = {
            email: '',
            message: '',
            submitted: false,
            title: 'Contact Us'
        };

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$$/;

		this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

	handleSubmit(event){
		console.log(this.state.email);
		event.preventDefault();
	}

    handleEmailChange(event){
        this.setState({email: event.target.value});
    }

    handleCreate(event){

    }

	handleGoBack(event){

	}

	
	render() {
		return (
			<div className="contactUsPageContent">
				<div className="contactUsPageTitleContainer">
					<text classname="contactUsPageTitle">
						{this.props.title}
					</text>
				</div>

				<div className="contactUsPageContainer">
					<div className="emailContainer">
						<div className="emailLabelContainer">
							<text className="emailText">
								Your Email:
							</text>
						</div>
						<div className="emailInputContainer">
							<input type="email" placeholder="Email" value={this.state.email} required requirederror="Email Address required." validate={this.emailRegex} validateerror="Please provide a valid email address." placeholder="Email" onChange={this.handleEmailChange} className="emailInputBox"></input>
						</div>
					</div>
					<div className="messageContainer">
						<div className="messageLabelContainer">
							<text className="messageText">
								Message:
							</text>
							</div>
						<div className="messageInputContainer">
							<textarea placeholder="Message" className = "messageInputBox" name="text" rows="1" cols="1" wrap="soft"></textarea>
						</div>
					</div>
					<div className="buttonContainer">
							<button onClick={this.handleGoBack} className="goBackButton">Go Back</button>
							<button onClick={this.handleSubmit} className="submitButton">Submit</button>
					</div>
				</div>
			</div>
        )
	}
}
