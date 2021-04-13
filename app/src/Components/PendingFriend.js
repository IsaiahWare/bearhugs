import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import "../App.css"

class PendingFriend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render(){
        return(
            <div className="listedUser">
                <img className="listedUser-pic" src={this.props.profPicSrc}></img>
                <div className="listedUser-text">
                    <p id="listedUser-name">{this.props.firstName} {this.props.lastName}</p>
                    <p id="listedUser-age">{this.props.age}</p>
                </div>
                <div className="remove">
                    <button class="removeFriend nostyle" onClick={this.props.rejectFriend}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button>
                </div>
                <div className="remove">
                    <button class="removeFriend nostyle" onClick={this.props.approveFriend}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>
                </div>


            </div>
        );
    }
}
export default PendingFriend;