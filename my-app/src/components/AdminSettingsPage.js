import React, { Component } from 'react'
import './css/SettingsPage.css'

export default class AdminSettingsPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			downloadLocation: '',
			approved: false,
			deleted: false,
			saved: false,
			scrapeHistoryToggle: false,
			advancedSearchToggle: false,
			emailNotifToggle: false,
			title: 'Settings'
		};

		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$$/;

		this.handleApproved = this.handleApproved.bind(this);
		this.handleDeleted = this.handleDeleted.bind(this);
		this.handleSaved = this.handleSaved.bind(this);
		this.handleScrapeTog = this.handleScrapeTog.bind(this);
		this.handleSearchTog = this.handleSearchTog.bind(this);
		this.handleNotifTog = this.handleNotifTog.bind(this);
	}

	handleApproved(event){

	}
	handleDeleted(event){

	}
	handleNotifTog(event){

	}
	handleSaved(event){

	}
	handleScrapeTog(event){

	}
	handleSearchTog(event){

	}

	render(){
		return(
			<div className="adminSettingsPageContent">
				<div className="settingsPageTitleContainer">
					<text className="contactUsPageTitle">
						{this.props.title}
					</text>
				</div>

				<div className="settingsPageContainer">
					<div className="homeButtonContainer">
						<button className="homeButton">Home</button>
					</div>
					<div className="topButtonsContainer">
						<button className="contactRequestButton">View Contact Requests</button>
						<button className="editUsersButton">Edit Users</button>
						<button className="deactivateAccountButton">Deactivate Account</button>
					</div>
					<div className="emailDownloadContainer">
						<form className="emailDownloadForm">
							<div className="formContainer">
								<div className="emailContainer">
									<text className="emailText">Email: </text>
									<input type="email" className="emailInputBox" placeholder="first.last@email.com"></input>
								</div>
								<div className="downloadContainer">
									<text className="downloadText">Download Location: </text>
									<input type="text" className="downloadLocationBox" placeholder="C:/Downloads"></input>
								</div>
							</div>
						</form>
					</div>
					<div className="toggleButtonsContainer">
						<div className="scrapeHistoryToggleContainer">
							<button className="scrapeHistoryToggle">See Scrape History</button>
						</div>
						<div className="advancedSearchToggleContainer">
							<button className="advancedSearchToggle">Always Advanced Search</button>
						</div>
						<div className="emailNotifToggleContainer">
							<button className="emailNotifToggle">Email Notifications</button>
						</div>
					</div>
					<div className="approveAccountsContainer">
						<div className="approveAccountsTitleContainer">
							<text className="approveAccountTitle">Approve Accounts</text>
						</div>
						<div className="approveScrollingContainer">
							<div className="approveScrollBox">
								As you can see, once there's enough text in this box, the box will grow scroll bars... that's why we call it a scroll box! 
								You could also place an image into the scroll box.
								{/*needs to hook up to DB to show accounts to approve.*/}
							</div>
						</div>
						<div className="delAppButtonsContainer">
							<div className="deleteButtonContainer">
								<button className="deleteButton">Delete</button>
							</div>
							<div className="approveButtonContainer">
								<button className="approveButton">Approve</button>
							</div>
						</div>
					</div>
					<div className="bottomButtonsContainer">
						<div className="logoutButtonContainer">
							<button className="logoutButton">Logout</button>
						</div>
						<div className="saveChangesButtonContainer">
							<button className="saveChangesButton">Save Changes</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}