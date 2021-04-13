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
import CompletedMatchesProfile from "../Components/CompletedMatchesProfile"
import PendingMatchesProfile from "../Components/PendingMatchesProfile"

let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"

class ViewPastMatches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            feedback: "",
            pendingMatches: [],
            currentMatches: [],
            key: "currentMatches"

        }
        this.getCurrentMatches = this.getCurrentMatches.bind(this)
        this.getPendingMatches = this.getPendingMatches.bind(this)
        this.checkUserEmail = this.checkUserEmail.bind(this)


    }

    componentDidMount() {
        this.checkUserLogIn();
        this.getCurrentMatches();
        this.getPendingMatches();
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

    }



    rejectMatch(id) {
        let url = baseDomain + '/match/reject'
        console.log("in reject match " + id)
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
                console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    let temp = this.state.pendingMatches
                    let tempResult = temp.filter((obj) => {
                        if (obj.userId === id) {
                            console.log("remove " + JSON.stringify(obj))
                        }
                        return obj.userId !== id
                    })
                    this.setState({
                        pendingMatches: tempResult,
                        feedback: "Match removed!"
                    })

                }
                else {
                    this.setState({
                        feedback: "Match could not be rejected :("
                    })
                }
            })


    }
    getCurrentMatches() {
        let url = baseDomain + '/match/matches'
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
                        currentMatches: responseData.results
                    })
                }
            })

    }

    getPendingMatches() {
        let url = baseDomain + '/match/requests'
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
                console.log("pending friends resposne data")
                console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        pendingMatches: responseData.results
                    })
                }
            })

    }


    filterPendingAfterAdd(id) {
        let temp = this.state.pendingMatches
        let tempResult = temp.filter((obj) => {
            console.log(obj)
            if (obj.userId === id) {
                console.log("remove " + JSON.stringify(obj))
            }
            return obj.userId !== id
        })
        this.setState({
            pendingMatches: tempResult,
        })
    }


    addMatchFromButton(id) {
        console.log("IN add match by button")
        let url = baseDomain + '/match/send'
        let newRequest = {
            requesterId: UserToken.getUserId(),
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
                        feedback: "Match created",
                    })
                    this.getCurrentMatches()
                    this.filterPendingAfterAdd(id)

                }
                else {
                    console.log(responseData)
                    this.setState({
                        feedback: "Match could not be completed :(. Please try again later"
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
                        feedback: "Friend found!"
                    })
                    this.addFriendByEmail(responseData.results[0].userId, responseData.results[0])
                }
                else {
                    console.log(responseData)
                    this.setState({
                        feedback: "Friend could not be found :(. Please try a different email"
                    })
                }
            })

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
                    id="match-tabs"
                    activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                >
                    <Tab eventKey="currentMatches" title="Current Matches">
                        <div className="row center-row">
                            <h2>Completed Matches</h2>
                        </div>
                        <div className="row center-row">
                            <div className="col center-col">
                                {
                                    this.state.currentMatches.map((profile) =>
                                        <div className="row center-row match-container" key={"row0" + profile.userId}>
                                            <CompletedMatchesProfile key={profile.userId} userId={profile.userId} imgsrc="mail-order-wife.png"
                                                firstName={profile.firstName} lastName={profile.lastName} email={profile.email} age={profile.age} descrip={profile.description} genderIdentity={profile.genderIdentity} genderPreferences={profile.genderPreferences}
                                                matched={true}></CompletedMatchesProfile>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="pendingMatches" title="Pending Matches">
                        <div className="row center-row">
                            <h2>Pending Matches</h2>
                        </div>
                        <div className="row center-row">
                            <div className="col center-col">
                                {
                                    this.state.pendingMatches.map((profile) =>
                                        <div className="row center-row match-container" key={"row0" + profile.userId}>
                                            <PendingMatchesProfile key={profile.userId} userId={profile.userId} imgsrc="mail-order-wife.png"
                                                firstName={profile.firstName} lastName={profile.lastName} email={profile.email} age={profile.age} descrip={profile.description} genderIdentity={profile.genderIdentity} genderPreferences={profile.genderPreferences}
                                                matched={false} approveMatch={() => this.addMatchFromButton(profile.userId)} rejectMatch={() => this.rejectMatch(profile.userId)} ></PendingMatchesProfile>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div >

        );
    }
}

export default ViewPastMatches;
