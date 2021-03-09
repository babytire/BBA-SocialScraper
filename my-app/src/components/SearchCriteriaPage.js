import React, { Component } from 'react'
import SettingsButton from './SettingsButton';
import SearchCriteriaInput from './SearchCriteriaInput';
import SearchCriteriaDate from './SearchCriteriaDate';
import './css/SearchCriteriaPage.css'

export default class SearchCriteriaPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            platformSelector: '',
            searchType: '',
            hashTags: '',
            locations: '',
            phrases: '',
            startDate: '',
            endDate: ''
        };

        this.handleHashTagsInput = this.handleHashTagsInput.bind(this);
        this.handleLocationsInput = this.handleLocationsInput.bind(this);
        this.handlePhrasesInput = this.handlePhrasesInput.bind(this);
        this.handleStartDateInput = this.handleStartDateInput.bind(this);
        this.handleEndDateInput = this.handleEndDateInput.bind(this);
    }

    handleHashTagsInput(newHashTags){
        this.setState({hashTags: newHashTags});
    }
    handleLocationsInput(newLocations){
        this.setState({locations: newLocations});
    }
    handlePhrasesInput(newPhrases){
        this.setState({phrases: newPhrases});
    }
    handleStartDateInput(newStartDate){
        this.setState({startDate: newStartDate});
    }
    handleEndDateInput(newEndDate){
        this.setState({endDate: newEndDate});
    }
    render() {
        return (
            <div className="searchCriteriaPageContainer">
                <div className="searchPlatformSelectionTitleContainer">
                    <text className="searchPlatformSelectionTitle">
                        Search Platform Selection
                    </text>
                </div>
                <div className="searchCriteriaPlatformSelectionContainer">
                    <div className="platformSearchContentContainer">
                        <div className="platformSelectionContainer">
                        <SettingsButton className="settingsButton"></SettingsButton>
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
                    </div>
                    <div className="searchCriteriaFormContentContainer">
                        <div className="searchCriteriaFormLabelContainer">
                            <text className="searchCriteriaFormLabel">
                                Search Criteria
                            </text>
                        </div>
                        <div className="searchCriteriaFormContainer">
                            <div className="searchByContainer">
                                <label className="searchByLabel">
                                    Search By:
                                </label>
                                <div className="searchByInput">
                                    <div>
                                        <input type="checkbox" id="hashTagCheckBox"></input>
                                        <label for="hashTagCheckBox">HashTags</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="locationCheckBox"></input>
                                        <label for="locationCheckBox">Locations</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="phraseCheckBox"></input>
                                        <label for="phraseCheckBox">Phrases</label>
                                    </div>
                                    {/* <input type="checkbox" className="hashTagsButton" name="HashTags"></input>
                                    <span>
                                        <label for="HashTags" className="hashTagsLabel"></label>
                                    </span> */}
                                    {/* <label className="locationsLabel">Locations
                                        <input type="checkbox" className="locationButton" name="Location" />
                                    </label>
                                    <label className="phrasesLabel">Phrase
                                        <input type="checkbox" className="phraseButton" name="Phrase" />
                                    </label> */}
                                </div>
                            </div>
                            <div className="searchCriteriaContainer">
                                <SearchCriteriaInput 
                                    searchCriteriaLabel="HashTag(s):" 
                                    searchCriteriaExample="Example: #dog#cat#blackbear" 
                                    searchCriteriaPlaceHolder="#HashTag" 
                                    searchCriteriaValue={this.state.hashTags} 
                                    onSearchCriteriaChange={this.handleHashTagsInput}
                                />
                                <SearchCriteriaInput 
                                    searchCriteriaLabel="Location(s):" 
                                    searchCriteriaExample="Example: #newyork#UnitedStates#bangor,ME" 
                                    searchCriteriaPlaceHolder="#Location"
                                    searchCriteriaValue={this.state.locations} 
                                    onSearchCriteriaChange={this.handleLocationsInput}
                                />
                                <SearchCriteriaInput 
                                    searchCriteriaLabel="Phrase(s):" 
                                    searchCriteriaExample="Example: #working late#I love blackbears" 
                                    searchCriteriaPlaceHolder="#Phrase"
                                    searchCriteriaValue={this.state.phrases} 
                                    onSearchCriteriaChange={this.handlePhrasesInput}
                                />
                            </div>
                            <div className="dateSelectionContainer">
                                <SearchCriteriaDate 
                                    searchCriteriaDateLabel="Start Date:" 
                                    searchCriteriaDateExample="Example: 01/01/2020" 
                                    onSearchCriteriaDateChange={this.handleStartDateInput} 
                                />
                                <SearchCriteriaDate
                                    searchCriteriaDateLabel="End Date:"
                                    searchCriteriaDateExample="Example: 01/01/2020"
                                    onSearchCriteriaDateChange={this.handleEndDateInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="searchButtonContainer">
                    <button className="searchButton">
                        Search
                    </button>
                </div>
            </div>
        )
    }
}
