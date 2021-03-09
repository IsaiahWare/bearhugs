import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"

let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000"
let corsHelper = "https://cors-anywhere.herokuapp.com/";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""

        }
        this.logIn= this.logIn.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    logIn(event) {
        event.preventDefault();
        let url = corsHelper + baseDomain + '/user/register'
        let newRequest = {
            "email": this.state.email,
            "password": this.state.password
        }
        console.log(newRequest)

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
                            <form onSubmit={this.logIn}>
                            <div className="input-row center-row">
                            <h2 className="font-red">Log In To Bear Hugs</h2>
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" type='text' name='email' value={this.state.email} onChange={this.handleInputChange} placeholder="Email"/>
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" type='password' value={this.state.password} onChange={this.handleInputChange} name='Password' placeholder="Password"/>
                                </div>
                                <div className="center-row padding-top-1rem">
                                    <div className="divider ">
                                    </div>
                                </div>
                                <div className="input-row center-row">
                                    <button className="full-width-button red" type="submit">Log In</button>
                                </div>
                                <div className="row center-row">
                                <p>Don't have an account?  <Link to="/register" className="route-link">Register here! </Link></p>
                                <Link to="/viewmatches" className="route-link">View matches prototype</Link>
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

export default LoginPage;

