import React, { Component } from 'react'
import SearchingDataContent from './SearchingDataContent';
import SettingsButton from './SettingsButton';
import './css/SearchingPage.css'

export default class SearchingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            scraped: '3200'
        }
        
        this.handleScrapeUpdate = this.handleScrapeUpdate.bind(this);
        this.handleEndSearch = this.handleEndSearch.bind(this);
        this.handleNewSearch = this.handleNewSearch.bind(this);
    };

    handleScrapeUpdate(){
        //Ever X seconds update
        // fetch()
        // .then(response => response.json())
        // .then(data => this.setState({ scraped: data.scraped}))
    }

    handleEndSearch(){
        
    }
    handleNewSearch(){

    }

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
                        <SearchingDataContent title="User:" data={this.props.user}></SearchingDataContent>
                        <SearchingDataContent title="HashTag(s):" data={this.props.hashTags}></SearchingDataContent>
                        <SearchingDataContent title="Location(s):" data={this.props.locations}></SearchingDataContent>
                        <SearchingDataContent title="Phrase(s):" data={this.props.phrases}></SearchingDataContent>
                    </div>
                    <div className="searchingScrapeDataContent">
                        <text>{this.state.scraped} {this.props.platform} Found</text>
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
