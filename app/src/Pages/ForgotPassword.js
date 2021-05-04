import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import UserToken from "../Components/UserToken"

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            a1: "",
            a2: "",
            a3: "",
            q1: "",
            q2: "",
            q3: "",
            emailentered: false,
            feedback: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.filterPassword = this.filterPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let value = target.value
        let name = target.name;
        this.setState({
          [name]: value });
    }

    checkEmail(event){
        event.preventDefault();
        //fetch security questions for email
        //if security questions are found:
        this.setState({
            emailentered: true
        });
    }

    filterPassword(password) {
        if (password != this.state.password2) {
            this.setState({
                feedback: "Password and confirm password do not match"
            })
            return false
        }
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (!re.test(password)) {
            this.setState({
                feedback: "Password should contain at least eight characters, and it should have at least one uppercase character, one lowercase character, and one digit."
            })
            return false
        }
        return true
    }

    resetPassword(){
        if(this.filterPassword(this.state.password)){

        }
        console.log("password rest")
    }

    render(){
        let securityQs;
        if(this.state.emailentered){
            securityQs = 
            <form onSubmit={this.resetPassword}>
                <p>Security questions:</p>
                <div className="input-row center-row">
                    <input className="input" type='password' value={this.state.password} onChange={this.handleInputChange} name='password' placeholder="New Password"/>
                </div>
                <div className="input-row center-row">
                    <input className="input" type='password' value={this.state.password2} onChange={this.handleInputChange} name='password2' placeholder="Comfirm New Password"/>
                </div>
                <div className="input-row center-row">
                    <button className="full-width-button red" type="submit">Reset Password</button>
                </div>
                
            </form>
        }
        else{
            securityQs = 
            <form onSubmit={this.checkEmail}>
                <p>Enter your email:</p>
                <div className="input-row center-row">
                    <input className="input" type='text' name='email' value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/>
                </div>
                <div className="input-row center-row">
                    <button className="full-width-button red" type="submit">Go</button>
                </div>
            </form>
        }
    
        return (
            <div className="page">
                <div className="row center-row">
                    <div className="col center-col padding-5rem">
                        <div className="box margin-5rem">

                            {securityQs}

                            <div className="center">
                                <p><Link to="/" className="route-link center">Back ⬅️</Link></p>
                            </div>
                            <div className="feedback-wrapper">
                                {this.state.feedback}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;
