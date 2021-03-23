import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import UserToken from '../Components/UserToken'
import BearHugsNavbar from '../Components/BearHugsNavbar'

let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000"

class EditSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            firstName: "",
            lastName: "",
            feedback:""

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit =this.handleSubmit.bind(this)

    }

    handleSubmit(event){
         event.preventDefault();
    //     let uid = UserToken.getUserId();
    //     let url = baseDomain + 'endpoint'
    //     let newRequest = {
    //         "uid": uid,
    //         "firstName": this.state.firstName,
    //         "lastName": this.state.lastName,
    //         "description": this.state.description
    //     }

    //     fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(newRequest)

    // })
    // .then(response => {
    //     let responseText = response.json()
    //     if (responseText.error==null) {
    //         this.setState({feedback:"Changes successfully saved!"})
    //     }
    //     else {
    //         this.setState({feedback:"Changes could not be saved, please try again :("})
    //     }
  
    //  })

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
            <BearHugsNavbar></BearHugsNavbar>
            <div className="col">

                <form onSubmit={this.handleSubmit}>
		<div className="row">
		<h3>{this.state.feedback}</h3>
		</div>
               <div className="row">
                   <div className="col">
                       <input type="text" placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}></input>
                   </div>
                   <div className="col">
                       <input type="text" placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}></input>
                   </div>
               </div>
               <div className="row">
                    <textarea rows="4" cols="50" placeholder="Write what you want people to see when they check your profile"  name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
               </div>
               <button type="submit" className="full-width-button red" name="submit-button">Submit Changes</button>
               </form>
           </div>
        </div>

        );
    }
}

export default EditSettingsPage;

