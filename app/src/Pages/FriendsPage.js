import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import BearHugsNavbar from "../Components/BearHugsNavbar";
import ListedUser from "../Components/ListedUser";
import { Redirect } from 'react-router-dom';
import UserToken from  "../Components/UserToken.js"

let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000"

class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendUser: "",
            friendInfo:[],
            redirect:false

        }
        this.handleInputChange = this.handleInputChange.bind(this)

    }

    componentDidMount() {
        this.checkUserLogIn();
        this.getProfiles();
    }

    checkUserLogIn() {
        let token =  UserToken.getUserId()
        if(token==null || token==undefined || token=="") {
            this.setState({
                redirect:true
            })
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getProfiles() {
        let url = baseDomain + '/friend/friends'
        let newRequest = {
            userId: UserToken.getUserId()
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
            if (JSON.stringify(responseData.error) === '{}') {
                //console.log("first friend: "+ responseData.results[0].firstName);
                //friendInfo = responseData.results;
            }
       })

    }

    handleSubmit(event){
        event.preventDefault();
        console.log("A name was submitted: " + this.state.addFriendUser);
        //search for a friend
    }


    handleInputChange(event){
        this.setState({
            addFriendUser: event.target.value
        });
    }

    /*
    Some users in table:
    43 - mandy opposum - test3@wustl.edu
    47 - charles berghausen - caberghausen@wustl.edu
    52 - isaih ware - isaiah@wustl.edu
    59 - julia smith - julia@wustl.edu
    61 - dorian stubblefield - dorian@wustl.edu
    */
    render() {
        const redirect = this.state.redirect
	    if (redirect) {
            return <Redirect
            to= "/"
            />
        }

        return (
            <div className="page">
            <BearHugsNavbar></BearHugsNavbar>
                <div className="friendsContainer">
                <h1 className="pageTitle">Friends</h1>
                    <div className="input-row center-row">
                    <form onSubmit ={this.handleSubmit} className="input">
                        <input type='text' value={this.state.addFriendUser} onChange = {this.handleInputChange} placeholder="Search by wustl email"/>
                        <input type="submit" value="Search"></input>
                    </form>
                    </div>
                    <div>
                        <p className="center">Your Friends:</p>

                        {
                            this.state.friendInfo.map((friend) =>
                                <ListedUser key={friend.userId} firstName={friend.firstName} lastName={friend.lastName} profPicSrc="possum-on-horse.png" age={friend.age}></ListedUser>
                            )
                        }
                        
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="18"></ListedUser>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="19"></ListedUser>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="20"></ListedUser>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="21"></ListedUser>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="18"></ListedUser>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="18"></ListedUser>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="18"></ListedUser>
                        <ListedUser key="do this w map" firstName="Jessica" lastName="Schmidt" profPicSrc="possum-on-horse.png" age="18"></ListedUser>
                        
                    </div>
                </div>
            </div>

        );
    }
}

export default FriendsPage;