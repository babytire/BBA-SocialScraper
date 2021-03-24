import React, { Component } from 'react'
import './css/SearchingDataContent.css'

export default class SearchingDataContent extends Component {
    render() {
        return (
            <div className="searchingDataContentContainer">
                <label>{this.props.title}</label>
                <text>{this.props.data}</text>
            </div>
        )
    }
}
