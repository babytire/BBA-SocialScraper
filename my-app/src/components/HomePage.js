import React, { Component } from 'react'
import SettingsButton from './SettingsButton'
import './css/HomePage.css'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {

    render() {
        return (
            <div className="homePageContent">
                <div className="homePageTitleContainer">
                    <text className="homePageTitle">
                        {this.props.title}
                    </text>
                </div>
                <div className="homeSettingsContainer">
                    <SettingsButton className="homeSettingsButton"></SettingsButton>
                </div>
                <div className="homePageContainer">
                    
                    
                    <div className="homePageContentContainer">
                        <div className="previousSearchContainer">
                            Test
                        </div>
                        <div className="buttonContainer">
                            <Link to='/SearchCriteriaPage' className="newSearchContainer">
                                <button className="newSearchButton">
                                    New Search
                                </button>
                            </Link>
                            <div className="currentSearchesContainer">
                                <button className="currentSearchesButton">
                                    Current Searches
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
