import React, { Component } from 'react'
import { Redirect } from 'react-router'

export default class LoginAuthenticate extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenitcated: ''
        };

    }
    
    render() {
        if (this.props.logged) {
            return (
                <div>
                    <Redirect to='/HomePage'></Redirect>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Redirect to='/LoginPage'></Redirect>
                </div>
            )
        }
    }
}
