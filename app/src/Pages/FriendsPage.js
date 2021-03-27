import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"


class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendUser: "",
            friendInfo:[]

        }

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
                <div className="col ">
                </div>

            </div>

        );
    }
}

export default FriendsPage;