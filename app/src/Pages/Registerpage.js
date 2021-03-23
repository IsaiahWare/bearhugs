import { faPooStorm } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"


let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000"
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            errors:"",
            age:18

        }
        this.registerAccount = this.registerAccount.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    registerAccount(event) {
        event.preventDefault();
        let url =  baseDomain + '/user/register'
        let newRequest = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password,
            "age": this.state.age
        }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)

    })
    .then(response => console.log(response.json()))
}

handleInputChange(event) {
    let target = event.target;
    let value = target.value
    let name = target.name;
    this.setState({
      [name]: value });
}


    render() {
        return (
            <div className="page">
                   
                <div className="row center-row">
                    <div className="col center-col">
                        <div className="box margin-5rem ">
                            <form onSubmit={this.registerAccount}>
                            <div className="input-row center-row">
                            <h2 className="font-red">Register for Bear Hugs</h2>
                                </div>
                            
                                <div className="input-row center-row">
                                    <input className="input" type='text' value={this.state.email} onChange = {this.handleInputChange} name='email' placeholder="yourwustlemail@wustl.edu"/>
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" value={this.state.password} onChange={this.handleInputChange} type='password' name='password' placeholder="Password"/>
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" type='password' name='confirm_Password' placeholder="Confirm Password"/>
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" type='text' value={this.state.firstName} onChange={this.handleInputChange} name='firstName' placeholder="First Name"/>
                                    <input className="input" type='text' value={this.state.lastName} onChange={this.handleInputChange} name='lastName' placeholder="Last Name"/>
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" type='number' name='age' onChange={this.handleInputChange} value={this.state.age} placeholder="Type age here"/>
                                </div>
                                <div className="center-row padding-top-1rem">
                                    <div className="divider ">
                                    </div>
                                </div>
                                <span>{this.state.errors}</span>
                                <div className="input-row center-row">
                                    <button className="full-width-button red" type="submit">Register!</button>
                                </div>
                                <span className="error-span">{this.state.errors}</span>
                                <div className="row center-row">
                                <Link to="/" className="route-link">Back to Login </Link>
                            </div>
                            </form>

                   
                        </div>
                    </div>
                </div>
                <div className="page-gradient">
                        
                        </div>
            </div>
        );
    }
}

export default RegisterPage;

