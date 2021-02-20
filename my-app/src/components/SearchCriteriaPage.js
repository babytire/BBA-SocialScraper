import React, { Component } from 'react'
import SettingsButton from './SettingsButton';

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

    handleHashTagsInput(event){
        this.setState({hashTags: event.target.value})
    }
    handleLocationsInput(event){
        this.setState({locations: event.target.value})
    }
    handlePhrasesInput(event){
        this.setState({phrases: event.target.value})
    }
    render() {
        return (
            <div className="searchCriteriaPageContainer">
                <div className="searchPlatformSelectionLabelContainer">
                    <text className="searchPlatformSelectionLabel">
                        Search Platform Selection
                    </text>
                </div>
                <SettingsButton className="settingsButton"></SettingsButton>
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
                <div className="searchCriteriaFormContainer">
                    <div className="searchCriteriaFormLabelContainer">
                        <text className="searchCriteriaFormLabel">
                            Search Criteria
                        </text>
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
                                <div className="hashTagExampleContainer">
                                    <text className="hashTagExample">
                                        Example: #dog#cat#blackbear
                                    </text>
                                </div>
                                <input type="search" className="hashTagCriteria" value={this.state.hashTags} onChange={this.handleHashTagsInput} placeholder="#Research">
                                </input>
                            </div>
                            <div className="locationCriteriaContainer">
                                <div className="locationLabelContainer">
                                    <text className="locationLabel">
                                        Location(s):
                                    </text>
                                </div>
                                <div className="locationExampleContainer">
                                    <text className="locationExample">
                                        Example: #newyork#UnitedStates#bangor,ME
                                    </text>
                                </div>
                                <input type="search" className="locationCriteria" value={this.state.locations} onChange={this.handleLocationsInput} placeholder="#Location">
                                </input>
                            </div>
                            <div className="phraseCriteriaContainer">
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
                            </div>
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
        )
    }
}
