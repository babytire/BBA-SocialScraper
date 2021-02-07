import React, { Component } from 'react'
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
            <div className="homePageContainer">
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
            </div>
        )
    }
}
