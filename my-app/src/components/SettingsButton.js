import React, { Component } from 'react'
import './css/SettingsButton.css'
import settingsIcon from './settingsIcon.svg'
import { Link } from 'react-router-dom'

export default class SettingsButton extends Component {
    
    render() {
        return (
            <Link to='/SettingsPage' className="settingsButtonContainer">
                <button className="settingsButton">
                    <text className="settingsButtonText">Settings</text>
                    <img src={settingsIcon} className="settingsIcon" />
                </button>
            </Link>
        )
    }
}
