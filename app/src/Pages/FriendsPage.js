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
import { Profiler } from 'react';

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"

class FriendsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendUser: "",
            redirect: false,
            feedback: "",
            pendingFriends:[],
            pendingFriendsRequest: [],
            currentFriends: [],
            numPending: -1,
            numCurrent: -1,
            doneLoadingCurrent: 0,
            doneLoadingPending: 0,
            key: "currentFriends"

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getCurrentFriends = this.getCurrentFriends.bind(this)
        this.getPendingFriends = this.getPendingFriends.bind(this)
        this.addFriend = this.addFriendByEmail.bind(this)
        this.addFriend = this.addFriendByPhoneNumber.bind(this)
        // this.rejectFriend = this.rejectFriend.bind(this)
        this.checkUserEmail = this.checkUserEmail.bind(this)
        this.checkUserPhoneNumber = this.checkUserPhoneNumber.bind(this)



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

    getPhotoForPendingUser(id, found, foundIndex) {
        let url = 'http://ec2-34-207-209-250.compute-1.amazonaws.com/photoGetter.php'
        let dupeCurrent = this.state.pendingFriendsRequest
        // console.log("url " + url)
        let newRequest = {
            "userId": id,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)

        })
            .then(photos => photos.json())
            .then(photos => {
                let tempPhotoNumber = this.state.doneLoadingPending + 1;
                
                if (photos.length != 0) {
                    found.photos = photos
                    dupeCurrent[foundIndex] = found
                    this.setState(prevState => ({
                        pendingFriendsRequest:dupeCurrent,
                        doneLoadingPending: tempPhotoNumber
                    }))


                }
                else {
                    found.photos = ["default-profile.png"]
                    dupeCurrent[foundIndex] = found
                    // console.log("Reutnr defualt")
                    this.setState(prevState => ({
                        pendingFriendsRequest:dupeCurrent,
                        doneLoadingPending: tempPhotoNumber
                    }))
                }

            }).catch((error) => {
                let tempPhotoNumber = this.state.doneLoadingPending + 1;
                console.error(error)
                found.photos = ["default-profile.png"]
                dupeCurrent[foundIndex] = found
                // console.log("Reutnr defualt")
                this.setState(prevState => ({
                    pendingFriendsRequest: dupeCurrent,
                    doneLoadingPending: tempPhotoNumber
                }))
            })

    }


    getPhotoForCurrentUser(id, found, foundIndex) {
        let dupeCurrent = this.state.currentFriends;
        console.log("get photo for user " + id)
        let url = 'http://ec2-34-207-209-250.compute-1.amazonaws.com/photoGetter.php'
        let newRequest = {
            "userId": id,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)

        })
            .then(photos => photos.json())
            .then(photos => {
                console.log("current photo response : ")
                console.log(photos)
                let tempPhotoNumber = this.state.doneLoadingCurrent + 1;
                // TODO: handle case where login is invalid
                if (photos.length != 0) {
                    found.photos = photos
                    dupeCurrent[foundIndex] = found
                    this.setState(prevState => ({
                        currentFriends:dupeCurrent,
                        doneLoadingCurrent: tempPhotoNumber
                    }))


                }
                else {
                    found.photos = ["default-profile.png"]
                    dupeCurrent[foundIndex] = found
                    // console.log("Reutnr defualt")
                    this.setState(prevState => ({
                        currentFriends:dupeCurrent,
                        doneLoadingCurrent: tempPhotoNumber
                    }))
                }

            }).catch((error) => {
                let tempPhotoNumber = this.state.doneLoadingCurrent + 1;
                console.error(error)
                found.photos = ["default-profile.png"]
                dupeCurrent[foundIndex] = found
                // console.log("Reutnr defualt")
                this.setState(prevState => ({
                    currentFriends: dupeCurrent,
                    doneLoadingCurrent: tempPhotoNumber
                }))
            })

    }


    removeFriend(id) {
        let url = baseDomain + '/friend/unfriend'
        // console.log("Remove friend--self-id :" + UserToken.getUserId())
        // console.log("Remove friend--otherf-id :" + id)
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
                // console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    let temp = this.state.currentFriends
                    let tempCurrentNum = this.state.numCurrent - 1
                    let doneLoadingTemp = this.state.doneLoadingCurrent - 1
                    let tempResult = temp.filter((obj) => {
                        return obj.userId !== id
                    })

                    this.setState({
                        currentFriends: tempResult,
                        numCurrent: tempCurrentNum,
                        doneLoadingCurrent: doneLoadingTemp,
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
                console.log("firend resposne")
                console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        currentFriends: responseData.results,
                        numCurrent: responseData.results.length,
                        doneLoadingCurrent: 0,
                    }, async () => {
                        console.log(this.state.currentFriends)
                        if (responseData.results.length > 0) {
                            for (let i = 0; i < this.state.currentFriends.length; ++i) {
                                await this.getPhotoForCurrentUser(this.state.currentFriends[i].userId, this.state.currentFriends[i], i);
                            }
                        }
                    });
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
                // console.log("the boy from pending friends")
                if (JSON.stringify(responseData.error) === '{}') {
                     console.log("got pending friends data")
                     console.log(responseData)
                    this.setState({
                        pendingFriendsRequest: responseData.results,
                        doneLoadingPending: 0,
                        numPending: responseData.results.length
                    }, async () => {
                        if (responseData.results.length > 0) {
                            for (let i = 0; i < this.state.pendingFriendsRequest.length; ++i) {
                                await this.getPhotoForPendingUser(this.state.pendingFriendsRequest[i].userId, this.state.pendingFriendsRequest[i], i );
                            }
                        }

                    });
                } else {
                    console.log("ERROR: " + responseData.results.error)
                }
            })

    }


    filterPendingAfterAdd(id) {
        let temp = this.state.pendingFriendsRequest
        let tempNumber = this.state.numPending - 1
        let tempPendingDone = this.state.doneLoadingPending - 1
        let tempResult = temp.filter((obj) => {
            return obj.userId !== id
        })
        this.setState({
            pendingFriendsRequest: tempResult,
            numPending: tempNumber,
            doneLoadingPending: tempPendingDone

        })
    }

    addFriendByEmail(id, newFriendInfo) {
        let url = baseDomain + '/friend/send'
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
                    this.setState({
                        feedback: "Friend request sent!",
                        pendingFriends: this.state.pendingFriends.concat(newFriendInfo)
                    })
                    this.createAddFriendNotification(id)
                }
                else {
                    this.setState({
                        feedback: "Friend request could not be sent :(. Please try a different email"
                    })
                }
            })

    }


    createAddFriendNotification(friendId) {
        let url = baseDomain + '/notifications/sendtwouser'
        let newRequest = {
            userId1: friendId,
            userId2: UserToken.getUserId(),
            message: UserToken.getUserName() + " has sent you a friend request! Go to your pending friend requests to review this request."
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
                // console.log(responseData)

            })

    }

    createAcceptedFriendRequestNotification(friendId) {
        let url = baseDomain + '/notifications/sendtwouser'
        let newRequest = {
            userId1: friendId,
            userId2: UserToken.getUserId(),
            message: UserToken.getUserName() + " has accepted your friends request."
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
                // console.log(responseData)
            })
    }

    addFriendFromButton(id) {
        // console.log("IN add friend by button")
        let url = baseDomain + '/friend/send'
        let newRequest = {
            requesterId: UserToken.getUserId(),
            requesteeId: id
        }
        // console.log(newRequest)
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
                        feedback: "Friend request accepted!",
                    })
                    this.filterPendingAfterAdd(id)
                    this.createAcceptedFriendRequestNotification(id)
                    this.getCurrentFriends()
                }
                else {
                    this.setState({
                        feedback: "Friend request could not be sent :(. Please try a different email"
                    })
                }
            })

    }

    checkUserEmail() {
        if (this.state.addFriendUser == UserToken.getUserEmail()) {
            this.setState({
                feedback: "You can't friend yourself!"
            })
        }
        else {
            let url = baseDomain + '/user/findbyemail'
            let newRequest = {
                email: this.state.addFriendUser
            }
            // console.log(newRequest)
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
                            feedback: "Friend found!"
                        })
                        this.addFriendByEmail(responseData.results[0].userId, responseData.results[0])
                    }
                    else {
                        this.setState({
                            feedback: "Friend could not be found :(. Please try a different email"
                        })
                    }
                })

             }


         }

         // /user/phone
         addFriendByPhoneNumber(id, newFriendInfo){
            let url = baseDomain + '/friend/send'
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
                        this.setState({
                            feedback: "Friend request sent!",
                            pendingFriends: this.state.pendingFriends.concat(newFriendInfo)
                        })
                        this.createAddFriendNotification(id)
                    }
                    else {
                        this.setState({
                            feedback: "Friend request could not be sent :(. Please try a different phone number"
                        })
                    }
                })
        }
        checkUserPhoneNumber() {
            if (this.state.addFriendUser == UserToken.getUserPhoneNumber()) {
                this.setState({
                    feedback: "You can't friend yourself!"
                })
            }
            else {
                let url = baseDomain + '/user/phone'
                let newRequest = {
                    phoneNumber: this.state.addFriendUser
                }
                // console.log(newRequest)
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
                                feedback: "Friend found!"
                            })
                            this.addFriendByPhoneNumber(responseData.results[0].userId, responseData.results[0])
                        }
                        else {
                            this.setState({
                                feedback: "Friend could not be found :(. Please try a different phone number and check that there are no other characters or symbols in your search."
                            })
                        }
                    })
    
                 }
    
    
             }


    rejectFriend(id) {
        let url = baseDomain + '/friend/reject'
        let newRequest = {
            requesterId: id,
            requesteeId: UserToken.getUserId()
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
                    // console.log("the boy from reject friend")
                    this.getPendingFriends();
                    // console.log(responseData)
                    //     let temp = this.state.pendingFriendsRequest
                    //     let tempPhotos = this.state.pendingPhotos
                    //     let tempNum = this.state.numPending - 1
                    //     let tempDone = this.state.doneLoadingPending - 1
                    //     this.setState({
                    //         numPending: tempNum,
                    //         doneLoadingPending: tempDone,
                    //     }, 
                    //     function() {
                    //     let tempResult = temp.filter((obj) => {
                    //         return obj.userId !== id
                    //     })
                    //     let tempPhotosResult = tempPhotos.filter((obj) => {
                    //         return obj.id !== id
                    //     })
                    //     this.setState({
                    //         pendingFriends: tempResult,
                    //         pendingPhotos: tempPhotosResult,
                    //         feedback: "Friend request rejected"
                    //     })
                    //     console.log("num pending in reject friend "+ this.numPending)
                    //     console.log("num done in reject friend "+this.doneLoadingPending)
                    // })
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
        if(this.state.addFriendUser.match(/ ^ [0-9] + $ /)){
            this.checkUserNumber();
        }
        else{
            this.checkUserEmail();
        }

    }


    handleInputChange(event) {
        this.setState({
            addFriendUser: event.target.value
        });
    }

    componentDidUpdate() {
	console.log("updated state:", this.state);
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
        // console.log("number of matches for current and completed " + this.state.numCurrent + "loading " + this.state.doneLoadingCurrent)
        // console.log("number of matches for pending " + this.state.numPending + "loading " + this.state.doneLoadingPending)
        if (this.state.numPending == this.state.doneLoadingPending && this.state.numCurrent == this.state.doneLoadingCurrent) {
            return (
                <div className="page">
                    <BearHugsNavbar></BearHugsNavbar>
                    <Tabs
                        id="friend-tabs"
                        activeKey={this.state.key}
                        onSelect={(key => {
                            this.setState({ key })
                            this.setState({
                                feedback: ""
                            })
                        })}
                    >
                        <Tab eventKey="currentFriends" title="Current Friends">
                            <div className="friendsContainer">
                                <div className="row center-row">
                                    <h1 className="pageTitle">Friends</h1>
                                </div>
                                <div className="row center-row">
                                    <h6>{this.state.feedback}</h6>
                                </div>
                                <div className="input-row center-row">
                                    <Form onSubmit={this.handleSubmit} className="input">
                                        <Form.Group>
                                            <Form.Label>Search for User</Form.Label>
                                            <Form.Control type="text" name="addFriendUser" value={this.state.addFriendUser} onChange={this.handleInputChange} placeholder="Add friend by WUSTL email or phone number" />
                                        </Form.Group>
                                        <Button type="submit" variant="danger" value="Search">Add Friend</Button>
                                    </Form>
                                </div>
                                <div>

                                    {
                                        this.state.currentFriends.map((friend, i) =>
                                            <ListedUser id={friend.userId} key={friend.userId} firstName={friend.firstName}
                                                lastName={friend.lastName} removeFriend={() => this.removeFriend(friend.userId)}
                                                removeTrue={true} profPicSrc={friend.photos[0]} age={friend.age}></ListedUser>
                                        )
                                    }

                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="pendingFriends" title="Pending Friends">
                            <div className="friendsContainer">
                                <div className="row center-row">
                                    <h1 className="pageTitle">Pending Friend Requests</h1>
                                </div>
                                <div className="row center-row">
                                    <h6>{this.state.feedback}</h6>
                                </div>
                                <div>
                                    {
                                        this.state.pendingFriendsRequest.map((friend, i) =>
                                            <PendingFriend id={friend.userId} key={friend.userId} firstName={friend.firstName} lastName={friend.lastName} approveFriend={() => this.addFriendFromButton(friend.userId)} rejectFriend={() => this.rejectFriend(friend.userId)} profPicSrc={friend.photos[0]} age={friend.age}></PendingFriend>
                                        )
                                    }
                                </div>
                            </div>

                        </Tab>
                    </Tabs>
                </div>

            );
        } else {
            return (
                <div className="page">
                    <BearHugsNavbar></BearHugsNavbar>
                    <Tabs
                        id="friend-tabs"
                        activeKey={this.state.key}
                        onSelect={(key => {
                            this.setState({ key })
                            this.setState({
                                feedback: ""
                            })
                        })}
                    >
                        <Tab eventKey="currentFriends" title="Current Friends">
                            <div className="friendsContainer">
                                <div className="row center-row">
                                    <h1 className="pageTitle">Friends</h1>
                                </div>
                                <div className="row center-row">
                                    <h6>{this.state.feedback}</h6>
                                </div>
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
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="pendingFriends" title="Pending Friends">
                            <div className="friendsContainer">
                                <div className="row center-row">
                                    <h1 className="pageTitle">Pending Friend Requests</h1>
                                </div>
                                <div className="row center-row">
                                    <h6>{this.state.feedback}</h6>
                                </div>
                                <div>
                                </div>
                            </div>

                        </Tab>
                    </Tabs>
                </div>


            );



        }
    }
}

export default FriendsPage;
