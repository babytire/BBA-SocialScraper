import React, { Component } from 'react'
import './css/SettingsButton.css'
import settingsIcon from './settingsIcon.svg'

export default class SettingsButton extends Component {
    constructor(props){
        super(props);

        this.handleSettings = this.handleSettings.bind(this);
    }

    handleSettings(){
        // set page to settings page
        return;
    }
    render() {
        return (
            <div className="settingsButtonContainer" onClick={this.handleSettings}>
                <button className="settingsButton">
                    <text className="settingsButtonText">Settings</text>
                    <img src={settingsIcon} className="settingsIcon" />
                </button>
            </div>
        )
    }
}
