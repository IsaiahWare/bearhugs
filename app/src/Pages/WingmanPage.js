import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import UserToken from "../Components/UserToken"
import { Redirect } from 'react-router-dom';
import BearHugsNavbar from "../Components/BearHugsNavbar";
import ListedUser from "../Components/ListedUser";


let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"
class WingmanPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentFriends: []
        }
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
            })
    }

    render(){
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect
                to="/"
            />
        }
        return(
            <div className = "page">
            <BearHugsNavbar></BearHugsNavbar>
            <h1 className="pageTitle row center-row">Wingman</h1>
            <div className="text-container">
                <p>Select a friend from below who you think needs a match.
                From there, you can select another one of your friends to ship them with 😏 </p>
             </div>
                <div className="friendsContainer">
                    {
                        this.state.currentFriends.map((friend) =>
                            <ListedUser id={friend.userId} key={friend.userId} firstName={friend.firstName}
                            lastName={friend.lastName} removeFriend={() => this.removeFriend(friend.userId)}
                            profPicSrc="possum-on-horse.png" age={friend.age}></ListedUser>
                        )
                    }
                </div>
            </div>
        );
    }


}

export default WingmanPage;