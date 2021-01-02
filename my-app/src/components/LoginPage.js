import React, { Component } from 'react'

export default class LoginPage extends Component {

    title = this.props.title;

    render() {
        return (
            <div>
                { this.props.title }
                
            </div>
        )
    }
}
