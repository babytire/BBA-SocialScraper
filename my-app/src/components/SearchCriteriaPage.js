import React, { Component } from 'react'
import SettingsButton from './SettingsButton';
import SearchCriteriaInput from './SearchCriteriaInput';
import './css/SearchCriteriaPage.css'

export default class SearchCriteriaPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            platformSelector: '',
            searchType: '',
            hashTags: '',
            locations: '',
            phrases: ''
        };

        this.handleHashTagsInput = this.handleHashTagsInput.bind(this);
        this.handleLocationsInput = this.handleLocationsInput.bind(this);
        this.handlePhrasesInput = this.handlePhrasesInput.bind(this);
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
                                {/* <div className="phraseCriteriaContainer">
                                    <div className="phraseLabelContainer">
                                        <text className="phraseLabel">
                                            Phrase(s):
                                        </text>
                                    </div>
                                    <div className="phraseExampleContainer">
                                        <text className="phraseExample">
                                            Example: #working late#I love blackbears
                                        </text>
                                    </div>
                                    <input type="search" className="phraseCriteria" value={this.state.phrases} onChange={this.handlePhrasesInput} placeholder="#Phrase">
                                    </input>
                                </div> */}
                            </div>
                            <div className="dateSelectionContainer">
                                <div className="startDateContainer">
                                    <div className="startDateLabelContainer">
                                        <text className="startDateLabel">
                                            Start Date:
                                        </text>
                                    </div>
                                    <div className="startDateExampleContainer">
                                        <text className="startDateExample">
                                            Example: 01/01/2020
                                        </text>
                                    </div>
                                    <input type="date" className="startDateInput" value={this.state.startDate} onChange={this.handleStartDateInput}>
                                    </input>
                                </div>
                                <div className="endDateContainer">
                                    <div className="endDateLabelContainer">
                                        <text className="endDateLabel">
                                            End Date:
                                        </text>
                                    </div>
                                    <div className="endDateExampleContainer">
                                        <text className="endDateExample">
                                            Example: 01/01/2020
                                        </text>
                                    </div>
                                    <input type="date" className="endDateInput" value={this.state.endDate} onChange={this.handleEndDateInput}>
                                    </input>
                                </div>
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
