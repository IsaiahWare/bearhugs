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
            photos: [],
            feedback:""
        }
        this.logIn= this.logIn.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    logIn(event) {
    event.preventDefault();
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
        console.log(responseData)
        // TODO: handle case where login is invalid
	    if (JSON.stringify(responseData.error) === '{}') {
            UserToken.setUserId(responseData.results[0].userId)
            UserToken.setUserName(responseData.results[0].firstName + " " +responseData.results[0].lastName )
            UserToken.setUserEmail(responseData.results[0].email)
            this.setState({redirect:true})
	    }
        else {
            this.setState({
                feedback: "Incorrect username or password. Try again with a different username or password."
            })
        }

    })
}

handleInputChange(event) {
    let target = event.target;
    let value = target.value
    let name = target.name;
    this.setState({
      [name]: value });
}

    getPhotosTest() {
        fetch('../../../server/php/photoGetter.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "userId": this.state.userId
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
                            <div className="row center-row match-parent">
                                {this.state.feedback}
                            </div>
                            </form>


                        </div>
                    </div>
                </div>
                <h1>1. Upload photo for current user</h1>
                <form enctype="multipart/form-data" action="../../../server/php/photoGetter.php" method="POST">
                    <input type="hidden" name="MAX_FILE_SIZE" value="50000000000000" />
                    <input type="file" name="filename" id = "uploadfile_input"/>
                    <input type="hidden" name="userId" value={30} />
                    <button type="submit" name="submit"> UPLOAD </button>
                </form>

                <h1>2. Get all photos for current user in state</h1>
                <button onClick={this.getPhotosTest}> GET ALL PHOTOS</button>

                <h1>3. Display photos for current user</h1>
                {
                    this.state.photos.map((photoLink, idx) =>  (
                        <img src={photoLink} key={idx} />
                    ))
                }
                <div className="page-gradient">
                </div>
            </div>
        );
    }
}

export default LoginPage;

