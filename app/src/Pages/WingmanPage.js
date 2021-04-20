import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import UserToken from "../Components/UserToken"
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import BearHugsNavbar from "../Components/BearHugsNavbar";
import ListedUser from "../Components/ListedUser";


let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"
class WingmanPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentFriends: [],
            wingmanee: { userId: -1 },
            wingmanning: false
        }
        this.wingMan = this.wingMan.bind(this);
        this.sendWingMan = this.sendWingMan.bind(this);
    }

    componentDidMount() {
        this.checkUserLogIn();
        this.getCurrentFriends();
    }

    checkUserLogIn() {
        let token = UserToken.getUserId()
        if (token == null || token == undefined || token == "") {
            this.setState({
                redirect: true
            })
        }
    }

    getCurrentFriends() {
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
		    console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                       currentFriends: responseData.results
                    })
                }
                //TODO: add message for if no friends yet
                if(this.state.currentFriends.length == 0){

                }
            })
    }



    sendWingMan(friend){
        alert("Wingman match suggestion sent to "+ this.state.wingmanee.firstName + " and "+ friend.firstName );
        let url = baseDomain + '/wingman/send'
        let newRequest = {
            wingmanId: UserToken.getUserId(),
            requesterId: this.state.wingmanee.userId,
            requesteeId: friend.userId
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
                
            })
    }

    wingMan(friend) {
        if(!this.state.wingmanning){
            this.setState({wingmanning: true, wingmanee: friend});
        }
        else{
            this.sendWingMan(friend);
        }
    }

    goBack(){
        this.setState({wingmanning: false, wingmanee: { userId: -1 }});
    }

    render(){
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect
                to="/"
            />
        }

        let wingmanPanel;
        let backbutton;
        let wingmanee = this.state.wingmanee;
        if(this.state.wingmanning){
            wingmanPanel =
            <div className="friendsContainer">
                <h1 className="pageTitle row center-row">Wingman:</h1>
                <div>
                    <button key={wingmanee.userId} onClick={() => this.sendWingMan(wingmanee)} className="nostyle buttonwrapper">
                    <ListedUser id={wingmanee.userId} key={wingmanee.userId} firstName={wingmanee.firstName}
                        lastName={wingmanee.lastName} 
                        removeTrue = {false} profPicSrc="possum-on-horse.png" age={wingmanee.age}></ListedUser>
                    </button>  
                </div>
                
                <div className="text-container">
                    <p className="wingmanSub">Choose a friend from below to send them a notification that you think they
                        and {wingmanee.firstName} would like each other 😉 ⬇️</p>
                </div>
                
            </div>;

            backbutton = 
                <button className="backButton" onClick={() => this.goBack()}>
                    <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Back 
                </button>;
            
        }
        else{
            wingmanPanel = 
            <div>
                <h1 className="pageTitle row center-row">Wingman</h1>
                <div className="text-container">
                    <p className="center">Select a friend from below who you think needs a match.
                    From there, you can select another one of your friends to ship them with 😏 </p>
                </div>
            </div>;

            backbutton = null;
        }

        return(
            <div className = "page">
                <BearHugsNavbar></BearHugsNavbar>

                {wingmanPanel}

                <div className="friendsContainer">
                    {
                        this.state.currentFriends.filter(friend => friend.userId != this.state.wingmanee.userId).map((friend) =>
                            <button key={friend.userId} onClick={() => this.wingMan(friend)} className="nostyle buttonwrapper">
                                <ListedUser id={friend.userId} key={friend.userId} firstName={friend.firstName}
                                lastName={friend.lastName}
                                removeTrue = {false} profPicSrc="possum-on-horse.png" age={friend.age}></ListedUser>
                            </button>
                        )
                    }

                </div>
                
                {backbutton}
            </div>
        );
    }


}

export default WingmanPage;