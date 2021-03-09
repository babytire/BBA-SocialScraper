import React, { Component } from 'react'
import SearchingDataContent from './SearchingDataContent';
import SettingsButton from './SettingsButton';
import './css/SearchingPage.css'

export default class SearchingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            scraped: '3200 Tweets Found'
        }
        
        // this.handleHashTagsInput = this.handleHashTagsInput.bind(this);
    };


    render() {
        return (
            <div className="searchingContentContainer">
                <div className="searchingTitleContainer">
                    <label className="searchingTitle">
                        Searching
                    </label>
                </div>
                <div className="searchingContent">
                    <SettingsButton className="settingsButton"></SettingsButton>
                    <div className="searchingDataContent">
                        <SearchingDataContent title="User:" data="Adbul Karim"></SearchingDataContent>
                        <SearchingDataContent title="HashTag(s):" data="#Dog#Cat"></SearchingDataContent>
                        <SearchingDataContent title="Location(s):" data="#Arizona"></SearchingDataContent>
                        <SearchingDataContent title="Phrase(s):" data="N/A"></SearchingDataContent>
                    </div>
                    <div className="searchingScrapeDataContent">
                        <text>{this.state.scraped}</text>
                    </div>
                </div>
                <div className="searchingButtonsContainer">
                    <button className="searchingEndButton" onClick={this.handleEndSearch}>
                        End Search
                    </button>
                    <button className="searchingNewButton" onClick={this.handleNewSearch}>
                        New Search
                    </button>
                </div>
            </div>
        )
    }
}
