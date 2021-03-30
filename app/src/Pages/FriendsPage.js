import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import BearHugsNavbar from "../Components/BearHugsNavbar";
import ListedUser from "../Components/ListedUser";


class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendUser: "",
            friendInfo:[]

        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event){
        this.setState({
            addFriendUser: event.target.value
        });
    }
  //Form
    //Input for a username--top of page--use example for onchange to change input\
    //Submit button

    //List of friends--copy code to pull from friends backend for certain user
    //Map each friend in friendInfo to a bootstrap row with some information about that friend. You can also
    //add remove icons for a friend. 
    render() {
        return (
            <div className="page">
            <BearHugsNavbar></BearHugsNavbar>
                <div className="friendsContainer">
                <h1 className="pageTitle">Friends</h1>
                    <div className="input-row center-row">
                        <input className="input" type='text' value={this.state.addFriendUser} onChange = {this.handleInputChange} placeholder="Search by wustl email"/>
                    </div>
                    <div>
                        <p className="center">Your Friends:</p>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="18"></ListedUser>
                        
                    </div>
                </div>
            </div>

        );
    }
}

export default FriendsPage;