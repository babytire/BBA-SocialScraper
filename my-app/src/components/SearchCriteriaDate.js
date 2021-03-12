import React, { Component } from 'react'
import './css/SearchCriteriaDate.css'

export default class SearchCriteriaDate extends Component {
    constructor(props){
        super(props);
        this.state={
            searchCriteriaDate: ''
        };

        this.handleSearchCriteriaDateInput = this.handleSearchCriteriaDateInput.bind(this);
    }

    handleSearchCriteriaDateInput(event){
        this.setState({searchCriteriaDate: event.target.value});
        this.props.onSearchCriteriaDateChange(this.state.searchCriteriaDate);
    }
    render() {
        return (
            <div className="searchCriteriaDateContainer">
                <div className="searchCriteriaDateLabelContainer">
                    <text className="searchCriteriaDateLabel">
                        {this.props.searchCriteriaDateLabel}
                    </text>
                </div>
                <div className="searchCriteriaDateExampleContainer">
                    <text className="searchCriteriaDateExample">
                        {this.props.searchCriteriaDateExample}
                    </text>
                </div>
                <input 
                    type="date" 
                    className="searchCriteriaDateInput" 
                    value={this.state.searchCriteriaDate} 
                    onChange={this.handleSearchCriteriaDateInput}>
                </input>
            </div>
        )
    }
}
