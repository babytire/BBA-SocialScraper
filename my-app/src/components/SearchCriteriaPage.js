import React, { Component } from 'react'

export default class SearchCriteriaPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            platformSelector: '',
            searchType: ''
        };

        // this.handleLogin = this.handleLogin.bind(this);
    }
    render() {
        return (
            <div>
                <div className="platformSelectionContainer">
                    <text className="platformLabel">
                        Platform:
                    </text>
                    <select className="platformSelector">
                        <option value={this.state.platformSelector}>Select</option>
                        <option value={this.state.platformSelector}>Twitter</option>
                        <option value={this.state.platformSelector}>Instagram</option>
                    </select>
                </div>
                <div className="searchTypeSelectionContainer">
                    <text className="searchTypeLabel">
                        Search Type:
                    </text>
                    <select className="searchTypeSelector">
                        <option value={this.state.searchType}>Basic</option>
                        <option value={this.state.searchType}>Advanced</option>
                    </select>
                </div>
                <div className="searchCriteraForm">
                    <div className="searchByContainer">
                        <text className="searchByLabel">
                            Search By:
                        </text>
                        <button className="hashTagsButton">
                            HashTags
                        </button>
                        <button className="locationButton">
                            Location
                        </button>
                        <button className="phraseButton">
                            Phrase
                        </button>
                    </div>
                    <div className="searchCriteriaContainer">
                        <div className="hashTagCriteriaContainer">
                            <div className="hashTagLabelContainer">
                                <text className="hashTagLabel">
                                    HashTag(s):
                                </text>
                            </div>
                            <input type="search" className="hashTagCriteria"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
