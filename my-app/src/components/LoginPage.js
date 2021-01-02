import React, { Component } from 'react'

export default class LoginPage extends Component {

    submitUserInfo(e){
        
    }

    render() {
        return (
            <div>
                { this.props.title }
                <form action={this.submitUserInfo()}>
                <input type="emaiil" id="emailInputBox" minLength='5' maxLength='50' pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$" >
                    
                </input>
                <input type="submit" id="loginButton"></input>
                </form>
            </div>
        )
    }
}
