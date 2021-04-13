import React, { Component } from 'react'
import './css/ContactUsConfirmationPage.css'
import { Link } from 'react-router-dom'

export default class ContactUsConfirmationPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: 'Contact Us Confirmation'
		};

		this.handleReturnToLogin = this.handleReturnToLogin.bind(this);
	}

	handleReturnToLogin(event){
		
	}



	render() {
		return (
			<div className="contactUsConfirmPageContent">
				<div className="conUsConPageTitleContainer">
					<label className="conUsConPageTitle">{this.props.title}</label>
				</div>

				<div className="conUsConContentContainer">
					<div className="conUsConTextContainer">
						<text className="conUsConText">Your message was {/*successfully/unsucessfully sent*/} <strong>**</strong> sent. Not sure what else
						to put here, but maybe if unsuccessfully sent, have a message displaying try again, and if it still doesn't work 
						then email the email address themselves from their own email?</text>
					</div>
					<div className="conUsConReturnButtonContainer">
						<Link to="/LoginPage">
							<button className="btn-returnToLogin">Return to Login</button>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}
