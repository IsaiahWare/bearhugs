import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import UserToken from  "../Components/UserToken.js"

const axios = require('axios');

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
	        redirect: false,
            photos: [],
            feedback:"",
            userId: 0,
            file: null
        }
        this.logIn= this.logIn.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.uploadPhotosTest = this.uploadPhotosTest.bind(this)
        this.getPhotosTest = this.getPhotosTest.bind(this)
        this.onPhotosChange = this.onPhotosChange.bind(this)
    }

    logIn(event) {
    event.preventDefault();
    this.setState({
        feedback: "Logging in..."
    })
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
        //  console.log("login return")
        // console.log(responseData)
        // TODO: handle case where login is invalid
	    if (JSON.stringify(responseData.error) === '{}') {
            // console.log("login")
            UserToken.setUserId(responseData.results[0].userId)
            UserToken.setUserName(responseData.results[0].firstName + " " +responseData.results[0].lastName )
            UserToken.setUserEmail(responseData.results[0].email)
            UserToken.setUserPhoneNumber(responseData.results[0].phoneNumber)
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
        fetch('http://ec2-34-207-209-250.compute-1.amazonaws.com/photoGetter.php', {
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

    uploadPhotosTest(event) {
        event.preventDefault();
        let formData = new FormData();

        formData.append('userId', this.state.userId);
        formData.append('filename', this.state.file);

        // console.log(this.state);

        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' }
        // }

        const url = 'http://ec2-34-207-209-250.compute-1.amazonaws.com/photoUploader.php';

        axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    onPhotosChange(e) {
        this.setState({
            "file":e.target.files[0]
        })
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
                    <div className="col center-col padding-5rem">
                        <div className="box margin-5rem">
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
                            <div className="center">
                                <p><Link to="/forgotpassword" className="route-link center">Forgot password </Link></p>
                            </div>



                            <div className="feedback-wrapper">
                                {this.state.feedback}
                            </div>
                            </form>


                        </div>
                    </div>
                </div>

		{/*<h1>1. Upload photo for current user</h1>
                <form onSubmit={this.uploadPhotosTest}>
                    <input type="hidden" name="MAX_FILE_SIZE" value="50000000000000" />
                    <input type="file" name="filename" id = "uploadfile_input" onChange={this.onPhotosChange}/>
                    <input type="number" name="userId" placeholder="userId" onChange={this.handleInputChange}/>
                    <button type="submit" name="submit"> UPLOAD </button>
                </form>

                <h1>2. Get all photos for current user in state</h1>
                <button onClick={this.getPhotosTest}> GET ALL PHOTOS </button>

                <h1>3. Display photos for current user</h1>
                {
                    this.state.photos.map((photoLink, idx) =>  (
                        <img src={photoLink} key={idx} />
                    ))
                }*/}
                <div className="page-gradient">
                </div>
            </div>
        )
    }
}

export default LoginPage;

