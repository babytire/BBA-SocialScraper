import React, { Component } from 'react'
import { Link } from 'reacter-router-dom'
import './css/ContactUsConfirmationPage.css'

export default class ContactUsConfirmationPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: 'Contact Us Confirmation'
		};


	}

	handleReturnToLogin(event){
		
	}



	render() {
		return (
			<div className="contactUsConfirmPageContent">
				<div className="conUsConPageTitleContainer">
					<label className="conUsConPageTitle">{this.props.title}</label>
				</div>
			</div>
		)
	}
}
