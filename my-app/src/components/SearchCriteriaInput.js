import React, { Component } from 'react'
import './css/SearchCriteriaInput.css'

export default class SearchCriteriaInput extends Component {
    constructor(props){
        super(props);
        this.state={
            searchCriteria: ''
        }

        this.handleSearchCriteriaInput = this.handleSearchCriteriaInput.bind(this);
    }

    handleSearchCriteriaInput(event){
        this.setState({searchCriteria: event.target.value})
    }
    render() {
        return (
            <div className="searchCriteriaInputContainer">
                <div className="searchCriteriaLabelContainer">
                    <text className="searchCriteriaLabel">
                        {this.props.searchCriteriaLabel}
                    </text>
                </div>
                <div className="searchCriteriaExampleContainer">
                    <text className="searchCriteriaExample">
                        {this.props.searchCriteriaExample}
                        {/* Example: #dog#cat#blackbear */}
                    </text>
                </div>
                <input type="search" className="searchCriteria" value={this.state.searchCriteria} onChange={this.handleSearchCriteriaInput} placeholder={this.props.searchCriteriaPlaceHolder}>
                </input>
            </div>
        )
    }
}
