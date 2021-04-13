import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import BearHugsNavbar from "../Components/BearHugsNavbar";
import ListedUser from "../Components/ListedUser";
import { Redirect } from 'react-router-dom';
import UserToken from "../Components/UserToken.js"
import Button from "react-bootstrap/Button"
import Tab from "react-bootstrap/Tab"
import Tabs from 'react-bootstrap/Tabs'
import pendingFriends from "../Components/PendingFriend"
import PendingFriend from '../Components/PendingFriend';
import TabContent from 'react-bootstrap/TabContent'
import Form from 'react-bootstrap/Form'

let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"

class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendUser: "",
            redirect: false,
            feedback: "",
            pendingFriendsRequest: [],
            pendingFriends:[],
            currentFriends:[],
            key: "currentFriends"

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getCurrentFriends = this.getCurrentFriends.bind(this)
        this.getPendingFriends = this.getPendingFriends.bind(this)
        this.addFriend = this.addFriendByEmail.bind(this)
        // this.rejectFriend = this.rejectFriend.bind(this)
        this.checkUserEmail = this.checkUserEmail.bind(this)


    }

    componentDidMount() {
        this.checkUserLogIn();
        this.getCurrentFriends();
        this.getPendingFriends();
    }

    setKey(k) {
        this.setState({
            key: k
        })
    }
    checkUserLogIn() {
        let token = UserToken.getUserId()
        if (token == null || token == undefined || token == "") {
            this.setState({
                redirect: true
            })
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    removeFriend(id) {
        let url = baseDomain + '/friend/unfriend'
        let newRequest = {
            userId1: UserToken.getUserId(),
            userId2: id
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
                    let temp = this.state.currentFriends
                    let tempResult = temp.filter((obj) => {
                    if (obj.userId === id) {
                        console.log("remove " + JSON.stringify(obj))
                    }
                        return obj.userId !== id
                    })
                    this.setState({
                       currentFriends:tempResult,
                       feedback: "Friend removed!"
                    })
                    
                }
                else {
                    this.setState({
                        feedback: "Friend could not be removed :("
                    })
                }
            })


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
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        friendInfo: responseData.results
                    })
                }
            })

    }

    getPendingFriends() {
        let url = baseDomain + '/friend/requests'
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
                    this.setState({
                        pendingFriendsRequest: responseData.results
                    })
                }
            })

    }


    filterPendingAfterAdd(id) {
        let temp = this.state.pendingFriendsRequest
        let tempResult = temp.filter((obj) => {
        console.log(obj)
        if (obj.userId === id) {
            console.log("remove " + JSON.stringify(obj))
        }
            return obj.userId !== id
        })
        this.setState({
           pendingFriendsRequest:tempResult,
        })
    }

    addFriendByEmail(id, newFriendInfo) {
        console.log("IN add friend by email")
        let url = baseDomain + '/friend/send'
        let newRequest = {
            requesterId:UserToken.getUserId(),
            requesteeId: id
        }
        console.log(newRequest)
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
                console.log(responseData)
                this.setState({
                    feedback:"Friend request sent!",
                    pendingFriends: this.state.pendingFriends.concat(newFriendInfo)
                })

            }
            else {
                console.log(responseData)
                this.setState({
                    feedback:"Friend request could not be sent :(. Please try a different email"
                })
            }
       })

    }

    addFriendFromButton(id) {
        console.log("IN add friend by button")
        let url = baseDomain + '/friend/send'
        let newRequest = {
            requesterId:UserToken.getUserId(),
            requesteeId: id
        }
        console.log(newRequest)
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
                console.log(responseData)
                this.setState({
                    feedback:"Friend request accepted!",
                })
                this.getCurrentFriends()
                this.filterPendingAfterAdd(id)

            }
            else {
                console.log(responseData)
                this.setState({
                    feedback:"Friend request could not be sent :(. Please try a different email"
                })
            }
       })

    }

    checkUserEmail() {
            let url = baseDomain + '/user/findbyemail'
            let newRequest = {
                email: this.state.addFriendUser
            }
            console.log(newRequest)
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
                    console.log(responseData)
                    this.setState({
                        feedback:"Friend found!"
                    })
                    this.addFriendByEmail(responseData.results[0].userId, responseData.results[0])
                }
                else {
                    console.log(responseData)
                    this.setState({
                        feedback:"Friend could not be found :(. Please try a different email"
                    })
                }
           })

    }

    rejectFriend(id) {
        let url = baseDomain + '/friend/reject'
        let newRequest = {
            requesterId: UserToken.getUserId(),
            requesteeId: id
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
                    let temp = this.state.pendingFriendsRequest
                    let tempResult = temp.filter((obj) => {
                    console.log(obj)
                    if (obj.userId === id) {
                        console.log("remove " + JSON.stringify(obj))
                    }
                        return obj.userId !== id
                    })
                    this.setState({
                       pendingFriends:tempResult,
                       feedback: "Friend request rejected"
                    })
                }
                else {
                    this.setState({
                        feedback: "Friend request could not be rejected"
                    })
                }
            })



    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("A name was submitted: " + this.state.addFriendUser);
        this.checkUserEmail();

    }


    handleInputChange(event) {
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
                to="/"
            />
        }

        return (
            <div className="page">
                <BearHugsNavbar></BearHugsNavbar>
                    <Tabs
                        id="friend-tabs"
                        activeKey={this.state.key}
                        onSelect={key => this.setState({ key })}
                    >
                        <Tab eventKey="currentFriends" title="Current Friends">
                            <div className="friendsContainer">
                                <div className="row center-row"><h1 className="pageTitle">Friends</h1></div>
                                <div className="input-row center-row">
                                    <Form onSubmit={this.handleSubmit} className="input">
                                        <Form.Group>
                                            <Form.Label>Search for User</Form.Label>
                                            <Form.Control type="text" name="addFriendUser" value={this.state.addFriendUser} onChange={this.handleInputChange} placeholder="Add friend by WUSTL email" />
                                        </Form.Group>
                                        <Button type="submit" variant="danger" value="Search">Add Friend</Button>
                                    </Form>
                                </div>
                                <div>

                                    {
                                        this.state.currentFriends.map((friend) =>
                                            <ListedUser id={friend.userId} key={friend.userId} firstName={friend.firstName} lastName={friend.lastName} removeFriend={() => this.removeFriend(friend.userId)} profPicSrc="possum-on-horse.png" age={friend.age}></ListedUser>
                                        )
                                    }

                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="pendingFriends" title="Pending Friends">
                            <div className="friendsContainer">
                                <div className="row center-row">
                                    <h2 className="pageTitle">Pending Friend Requests</h2>
                                </div>

                                <div>

                                    {
                                        this.state.pendingFriendsRequest.map((friend) =>
                                            <PendingFriend id={friend.userId} key={friend.userId} firstName={friend.firstName} lastName={friend.lastName} approveFriend={() => this.addFriendByButton(friend.userId)} rejectFriend={() => this.rejectFriend(friend.userId)} profPicSrc="possum-on-horse.png" age={friend.age}></PendingFriend>
                                        )
                                    }
                                </div>
                            </div>

                        </Tab>
                    </Tabs>
                </div>

        );
    }
}

export default FriendsPage;