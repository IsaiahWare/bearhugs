import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import UserToken from "../Components/UserToken"

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"

class ForgotPassword extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            a1: "",
            a2: "",
            answer1: "",
            answer2: "",
            q1: "beep boop?",
            q2: "sceet scoot?",
            emailentered: false,
            feedback: "",
            userId: -1,
            email: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: "",
            description: "",
            genderIdentity: "",
            genderPreferences: "",
            phoneNumber: ""
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
        let url = baseDomain + '/user/findbyemail'
            let newRequest = {
                email: this.state.email
            }
            // console.log(newRequest)
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRequest)
            })
                .then(res => res.json())
                .then(responseData => {
                    if (JSON.stringify(responseData.error) === '{}') {

                            this.setState({
                                //if security questions are found, progress to security questions
                                emailentered: true,

                            })
                        this.getQuestions();
                        //this.addFriendByEmail(responseData.results[0].userId, responseData.results[0])
                    }
                    else {
                        this.setState({
                            feedback: "No user found with that email 🧐"
                        })
                    }
                })
        
    }

    filterPassword(password) {
        if (password != this.state.password2) {
            this.setState({
                feedback: "Password and confirm password do not match."
            })
            window.scrollTo({
                top: 200,
                behavior: "smooth"
            })
            return false
        }
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (!re.test(password)) {
            this.setState({
                feedback: "Password should contain at least eight characters, and it should have at least one uppercase character, one lowercase character, and one digit."
            })
            window.scrollTo({
                top: 200,
                behavior: "smooth"
            })
            return false
        }
        return true
    }

    getQuestions(){
        let url = baseDomain + '/securityQuestions/get'
        let newRequest = {
            "email": this.state.email
        }
        console.log(newRequest)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)
        })
            .then(res => res.json())
            .then(responseData => {
                // console.log("security questions query: " + responseData)
                if (JSON.stringify(responseData.error) !== '{}') {
                    this.setState({
                        feedback: "Error getting security questions"
                    })
                } else {
                    let res = responseData.results[0];
                    // console.log("sec que response data: "+ res);
                    this.setState({
                        feedback: "Security questions obtained successfully",
                        answer1: res.a1,
                        answer2: res.a2,
                        q1: res.q1,
                        q2: res.q2
                    })
                    // console.log("security q 1: " + this.state.q1 + " answer: "+ this.state.a1
                    // +"security q 2: " + this.state.q2 + " answer: " + this.state.a2);
                }
            })
        }
    

    resetPassword(event){
        event.preventDefault();


        if(this.filterPassword(this.state.password) &&
         this.state.a1.toLowerCase() === this.state.answer1.toLowerCase() &&
         this.state.a2.toLowerCase() === this.state.answer2.toLowerCase()){
            // console.log("questions match!");
            //check to see if security question answers match
            this.updatePassword();
        }
    }

    updatePassword() {
        // console.log("trying to update...");
        let url = baseDomain + '/user/updatePassword'
        let newRequest = {
            "email": this.state.email,
            "password": this.state.password
        }
        // console.log(newRequest)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)

        })
            .then(res => res.json())
            .then(responseData => {
                // console.log(responseData)
                // TODO: handle case where login is invalid
                if (JSON.stringify(responseData.error) !== '{}') {
                    this.setState({
                        feedback: "Password change failed 🤨"
                    })
                } else {
                    this.setState({
                        feedback: "Password updated successfully :)"
                    })
                    this.logIn();
                }
            })
    }

    logIn(){
        // console.log("login event with");
    }

    render(){
        let securityQs;
        if(this.state.emailentered){
            securityQs = 
            <form onSubmit={this.resetPassword}>
                <h2 className="center">Security questions:</h2>
                <p>{this.state.q1}:</p>
                <div className="input-row center-row">
                    <input className="input" type='text' value={this.state.a1} onChange={this.handleInputChange} name='a1' placeholder="Answer"/>
                </div>
                <p>{this.state.q2}:</p>
                <div className="input-row center-row">
                    <input className="input" type='text' value={this.state.a2} onChange={this.handleInputChange} name='a2' placeholder="Answer"/>
                </div>
                <div className="input-row center-row">
                    <input className="input" type='password' value={this.state.password} onChange={this.handleInputChange} name='password' placeholder="New Password"/>
                </div>
                <div className="input-row center-row">
                    <input className="input" type='password' value={this.state.password2} onChange={this.handleInputChange} name='password2' placeholder="Confirm New Password"/>
                </div>
                <div className="input-row center-row">
                    <button className="full-width-button red" type="submit">Reset Password</button>
                </div>
                
            </form>
        }
        else{
            securityQs = 
            <form onSubmit={this.checkEmail}>
                <p>Enter your WUSTL email:</p>
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
                                <p><Link to="/" className="route-link center">Back to Login</Link></p>
                            </div>
                            <div className="feedback-wrapper">
                                <p>{this.state.feedback}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;
