import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import UserToken from  "../Components/UserToken.js"
let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
	    redirect: false,
        photos: []
        }
        this.logIn= this.logIn.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    logIn(event) {
        event.preventDefault();
	  console.log("Login event")
        let url =  baseDomain + '/user/login'
        let newRequest = {
            "email": this.state.email,
            "password": this.state.password
        }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRequest)
    })
    .then(res => res.json())
     .then(responseData => {
        // TODO: handle case where login is invalid
	    if (JSON.stringify(responseData.error) === '{}') {
            UserToken.setUserId(responseData.results[0].userId)
            UserToken.setUserName(responseData.results[0].firstName + " " +responseData.results[0].lastName )
            this.setState({redirect:true})
	    }

    })
}

componentDidMount() {
    fetch('../../../server/php/photoUploader.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "userId": 74
        })
      })
      .then(photos => photos.json())
      .then(photos => {
        this.setState({
          "photos": photos
        })
      })
      .catch(console.error);
}

handleInputChange(event) {
    let target = event.target;
    let value = target.value
    let name = target.name;
    this.setState({
      [name]: value });
}

    render() {
	    const redirect = this.state.redirect
	    if (redirect) {
            return <Redirect
            to= "/viewmatches"
            />

	 }
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
                                    <input className="input" type='password' value={this.state.password} onChange={this.handleInputChange} name='password' placeholder="Password"/>
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
                            </div>
                            </form>


                        </div>
                    </div>
                </div>
                <div className="page-gradient">
                {
                    this.state.photos.map((photoLink, idx) => (
                        <img src={photoLink} key={idx} />
                    ))
                }
                </div>
            </div>
        );
    }
}

export default LoginPage;

