import React, { Component } from 'react'
import SettingsButton from './SettingsButton'
import HomeButton from './HomeButton'
import './css/NavButtons.css'

export default class NavButtons extends Component {
    render() {
        return (
            <div className="navButtonsContainer">
                <SettingsButton></SettingsButton>
                <HomeButton></HomeButton>
            </div>
        )
    }
}
