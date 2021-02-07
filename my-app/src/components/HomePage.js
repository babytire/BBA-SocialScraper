import React, { Component } from 'react'
import SettingsButton from './SettingsButton'
import './css/HomePage.css'

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
        };

        this.handleNewSearch = this.handleNewSearch.bind(this);
        this.handleCurrentSearches = this.handleCurrentSearches.bind(this);
    }

    handleNewSearch(){
        console.log("newSearch");
        return;
    }

    handleCurrentSearches(){
        return;
    }
    
    render() {
        return (
            <div className="homePageContent">
                <div className="homePageTitleContainer">
                    <text className="homePageTitle">
                        {this.props.title}
                    </text>
                </div>
            <div className="homePageContainer">
                
                <SettingsButton></SettingsButton>
                <div className="previousSearchContainer">
                    Test
                </div>
                <diiv className="buttonContainer">
                <div className="newSearchContainer">
                    <button className="newSearchButton" onClick={this.handleNewSearch}>
                        New Search
                    </button>
                </div>
                <div className="currentSearchesContainer" onClick={this.handleCurrentSearches}>
                    <button className="currentSearchesButton">
                        Current Searches
                    </button>
                </div>
                </diiv>
            </div>
            </div>
        )
    }
}
