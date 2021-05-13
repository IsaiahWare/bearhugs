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
import { Profiler } from 'react';

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"

class ViewPastMatches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            feedback: "",
            pendingMatches: [],
            currentMatches: [],
            pendingWingmanMatches: [],
            completedWingmanMatches: [],
            doneLoadingPending: 0,
            doneLoadingCurrent: 0,
            doneLoadingPendingWingman: 0,
            numPending: -1,
            numCurrent: -1,
            numWingmanRequests: -1,
            key: "currentMatches"

        }
        this.getCurrentMatches = this.getCurrentMatches.bind(this)
        this.getPendingMatches = this.getPendingMatches.bind(this)
        this.getCurrentPhotos = this.getCurrentPhotos.bind(this);
        this.getPendingPhotos = this.getPendingPhotos.bind(this);

    }



    componentDidMount() {
        this.checkUserLogIn();
        this.getCurrentMatches();
        this.getPendingMatches();
        this.getPendingWingmanMatches();
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

    async getPhotoForPendingUser(id, found, foundIndex) {
        let dupeCurrent = this.state.pendingMatches
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
                // console.log("current photo response : ")
                // console.log(photos)
                let tempPhotoNumber = this.state.doneLoadingPending + 1;
                // TODO: handle case where login is invalid
                if (photos.length != 0) {
                    found.photos = photos
                    dupeCurrent[foundIndex] = found
                    this.setState(prevState => ({
                        pendingMatches: dupeCurrent,
                        doneLoadingPending: tempPhotoNumber
                    }))

                }
                else {
                    found.photos = ["default-profile.png"]
                    dupeCurrent[foundIndex] = found
                    // console.log("Reutnr defualt")
                    this.setState(prevState => ({
                        pendingMatches: dupeCurrent,
                        doneLoadingPending: tempPhotoNumber
                    }))
                }

            }).catch((error) => {
                let tempPhotoNumber = this.state.doneLoadingPending + 1;
                found.photos = ["default-profile.png"]
                dupeCurrent[foundIndex] = found
                console.error(error)
                // console.log("Reutnr defualt")
                this.setState(prevState => ({
                    pendingMatches: dupeCurrent,
                    doneLoadingPending: tempPhotoNumber
                }))
            })

    }

    async getPhotoforPendingWingmanUser(id, found, foundIndex) {
        let dupeCurrent = this.state.pendingWingmanMatches
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
                let tempPhotoNumber = this.state.doneLoadingPendingWingman + 1;
                // TODO: handle case where login is invalid
                if (photos.length != 0) {
                    found.photos = photos
                    dupeCurrent[foundIndex] = found
                    this.setState(prevState => ({
                        pendingWingmanMatches: dupeCurrent,
                        doneLoadingPendingWingman: tempPhotoNumber
                    }))

                }
                else {
                    found.photos = ["default-profile.png"]
                    dupeCurrent[foundIndex] = found
                    this.setState(prevState => ({
                        pendingWingmanMatches: dupeCurrent,
                        doneLoadingPendingWingman: tempPhotoNumber
                    }))
                }

            }).catch((error) => {
                let tempPhotoNumber = this.state.doneLoadingPendingWingman + 1;
                console.error(error)
                found.photos = ["default-profile.png"]
                dupeCurrent[foundIndex] = found
                this.setState(prevState => ({
                    pendingWingmanMatches: dupeCurrent,
                    doneLoadingPendingWingman: tempPhotoNumber
                }))
            })

    }

    async getPhotoForCurrentUser(id, found, foundIndex) {
        let dupeCurrent = this.state.currentMatches

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
                let tempPhotoNumber = this.state.doneLoadingCurrent + 1;
             
                // TODO: handle case where login is invalid
                if (photos.length != 0) {
                    found.photos = photos
                    dupeCurrent[foundIndex] = found
                    this.setState(prevState => ({
                        currentMatches:dupeCurrent,
                        doneLoadingCurrent: tempPhotoNumber
                    }))

                }
                else {
                    found.photos = ["default-profile.png"]
                    dupeCurrent[foundIndex] = found
                    this.setState(prevState => ({
                        currentMatches: dupeCurrent,
                        doneLoadingCurrent: tempPhotoNumber
                    }))
                }

            }).catch((error) => {
                let tempPhotoNumber = this.state.doneLoadingCurrent + 1;
                console.error(error)
                found.photos = ["default-profile.png"]
                dupeCurrent[foundIndex] = found
                this.setState(prevState => ({
                    currentMatches: dupeCurrent,
                    doneLoadingCurrent: tempPhotoNumber,
                }))
            })

    }

    async getCurrentPhotos() {
        for (let i = 0; i < this.state.currentMatches.length; ++i) {
            await this.getPhotoForCurrentUser(this.state.currentMatches[i].userId, this.state.currentMatches[i],i);

        }
        // console.log("temp current")
        // console.log(tempCurrent)
        // this.setState({
        //     currentPhotos:tempCurrent
        // })
    }
    async getPendingPhotos() {
        for (let i = 0; i < this.state.pendingMatches.length; ++i) {
            await this.getPhotoForPendingUser(this.state.pendingMatches[i].userId,this.state.pendingMatches[i],i);

        }
        // for (let i=0; i < this.state.wingmanMatches.length; ++i) {
        //     let newelement = this.getPhotoForUser(this.state.wingmanMatches[i].userId);
        //     tempWingman.push(newelement);
        // }
        // this.setState({
        //     wingmanPhotos:tempWingman
        // })

    }


    async getPendingWingmanPhotos() {
        for (let i = 0; i < this.state.pendingWingmanMatches.length; ++i) {
            await this.getPhotoforPendingWingmanUser(this.state.pendingWingmanMatches[i].userId, this.state.pendingWingmanMatches[i], i );

        }

    }


    rejectMatch(id) {
        let url = baseDomain + '/match/reject'
        // console.log("in reject match " + id)
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
                // console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    let temp = this.state.pendingMatches
                    let tempDoneLoading = this.state.doneLoadingPending - 1
                    let numProfilesPending = this.state.numPending - 1
                    let tempResult = temp.filter((obj) => {
                        return obj.userId !== id
                    })
                    this.setState({
                        pendingMatches: tempResult,
                        doneLoadingPending: tempDoneLoading,
                        numPending: numProfilesPending,
                        feedback: "Match rejected!"
                    })

                }
                else {
                    this.setState({
                        feedback: "Match could not be rejected :("
                    })
                }
            })


    }

    rejectWingmanMatch(wingmanId, requesterId, requesteeId) {
        let url = baseDomain + '/wingman/reject'
        let newRequest = {
            wingmanId: wingmanId,
            requesterId: requesterId,
            requesteeId: requesteeId
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
                    let temp = this.state.pendingWingmanMatches
                    let tempNumberWingman = this.state.numWingmanRequests-1
                    let tempDone = this.state.doneLoadingPendingWingman-1
                    // console.log("wingman matches before filter: " + temp)
                    let tempResult = temp.filter((obj) => {
                        return obj.requesterId !== requesterId
                    })
                    // console.log("wingman matches after filter: " + tempResult)
                    // console.log("wingman photos before filter: " + photoArray)
                    // console.log("wingman photos after filter: " + tempPhotoResult)
                    this.setState({
                        feedback: "Wingman request rejected!",
                        pendingWingmanMatches: tempResult,
                        numWingmanRequests: tempNumberWingman,
                        doneLoadingPendingWingman: tempDone
                    })
                }
            })

    }

    getPendingWingmanMatches() {
        let url = baseDomain + '/wingman/requests'
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
                console.log("pending wingman matches")
                console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        pendingWingmanMatches: responseData.results,
                        numWingmanRequests: responseData.results.length,
                        doneLoadingPendingWingman: 0
                    }, () => {
                        this.getPendingWingmanPhotos();
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
                // console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        currentMatches: responseData.results,
                        doneLoadingCurrent: 0,
                        numCurrent: responseData.results.length

                    }, () => {
                        this.getCurrentPhotos();
                    });
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
                // console.log("pending friends resposne data")
                // console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        pendingMatches: responseData.results,
                        doneLoadingPending: 0,
                        numPending: responseData.results.length
                    }, () => {
                        this.getPendingPhotos();
                    });


                }
            })

    }


    filterPendingAfterAdd(id) {
        let temp = this.state.pendingMatches
        let tempPendingDone = this.state.doneLoadingPending - 1
        let pendingNum = this.state.numPending - 1
        let tempResult = temp.filter((obj) => {
            return obj.userId !== id
        })
        this.setState({
            pendingMatches: tempResult,
            doneLoadingPending: tempPendingDone,
            numPending: pendingNum
        })
    }

    completePendingWingman(wingmanId, requesterId, requesteeId) {
        // console.log("IN add match by button")
        let url = baseDomain + '/wingman/send'
        let newRequest = {
            wingmanId: wingmanId,
            requesterId: requesterId,
            requesteeId: requesteeId
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
                    // console.log("complete pending wingman " + responseData)
                    let temp = this.state.pendingWingmanMatches
                    let tempNumberWingman = this.state.numWingmanRequests-1
                    let tempDone = this.state.doneLoadingPendingWingman-1
                    // console.log("wingman matches before filter: " + temp)
                    let tempResult = temp.filter((obj) => {
                        return obj.requesterId !== requesterId
                    })
                    // console.log("wingman matches after filter: " + tempResult)
                    // console.log("wingman photos before filter: " + photoArray)

                    // console.log("wingman photos after filter: " + tempPhotoResult)
                    this.setState({
                        feedback: "Wingman approved!",
                        pendingWingmanMatches: tempResult,
                        numWingmanRequests: tempNumberWingman,
                        doneLoadingPendingWingman: tempDone
                    })
                    this.addMatchFromButton(requesterId)

                }
                else {
                    console.log(responseData)
                    this.setState({
                        feedback: "Wingman match could not be completed :(. Please try again later"
                    })
                }
            })

    }
    addMatchFromButton(id) {
        // console.log("IN add match by button")
        let url = baseDomain + '/match/send'
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
                    // console.log(responseData)
                    this.setState({
                        feedback: "Match approved!",
                    })
                    this.filterPendingAfterAdd(id)
                    this.getCurrentMatches()

                }
                else {
                    // console.log(responseData)
                    this.setState({
                        feedback: "Match could not be completed :(. Please try again later"
                    })
                }
            })

    }

    notifyRequesteeofMatch(userId) {
        let url = baseDomain + '/notifications/sendtwouser'
        let newRequest = {
            userId1: userId,
            userId2: UserToken.getUserId(),
            message: UserToken.getUserName() + "has swiped on you! Check pending matches to see more."
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
        console.log("number of matches for current and completed " + this.state.numCurrent + "loading " + this.state.doneLoadingCurrent)
        console.log("number of matches for pending " + this.state.numPending + "loading " + this.state.doneLoadingPending)
        console.log("number of matches for wignman" + this.state.numWingmanRequests + "loading " + this.state.doneLoadingPendingWingman)
        if (this.state.numCurrent == this.state.doneLoadingCurrent && this.state.numPending == this.state.doneLoadingPending && this.state.doneLoadingPendingWingman == this.state.numWingmanRequests) {
            console.log(this.state.pendingMatches)
            return (
                <div className="page">
                    <BearHugsNavbar></BearHugsNavbar>
                    <Tabs
                        id="match-tabs"
                        activeKey={this.state.key}
                        onSelect={(key => {
                            this.setState({ key })
                            this.setState({
                                feedback: ""
                            })
                        })

                        }
                    >
                        <Tab eventKey="currentMatches" title="Current Matches">
                            <div className="row center-row">
                                <h2>Completed Matches</h2>
                            </div>
                            <div className="row center-row">
                                <h6>{this.state.feedback}</h6>
                            </div>
                            <div className="row center-row match-container-row">
                                <div className="col center-col">
                                    {
                                        this.state.currentMatches.map((profile, i) =>
                                            <div className="row center-row match-container match-row" key={"row0current" + profile.userId}>
                                                <CompletedMatchesProfile key={profile.userId} userId={profile.userId} imgsrc= {profile.photos[0]}
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
                                <h2>Pending User Matches</h2>
                            </div>
                            <div className="row center-row">
                                <h6>{this.state.feedback}</h6>
                            </div>
                            <div className="row center-row match-container-row">
                                <div className="col center-col">
                                    {
                                        this.state.pendingMatches.map((profile, i) =>
                                            <div className="row center-row match-container match-row" key={"row0pending" + profile.userId}>
                                                <PendingMatchesProfile key={profile.userId} userId={profile.userId} imgsrc={profile.photos[0]}
                                                    firstName={profile.firstName} lastName={profile.lastName} email={profile.email} age={profile.age} descrip={profile.description} genderIdentity={profile.genderIdentity} genderPreferences={profile.genderPreferences}
                                                    matched={false} approveMatch={() => this.addMatchFromButton(profile.userId)} rejectMatch={() => this.rejectMatch(profile.userId)} notifyRequesteeofMatch={() => this.notifyRequesteeofMatch(profile.userId)} ></PendingMatchesProfile>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="wingmanMatches" title="Wingman Matches">
                            <div className="row center-row">
                                <h2>Pending Wingman Matches</h2>
                            </div>
                            <div className="row center-row">
                                <h6>{this.state.feedback}</h6>
                            </div>
                            <div className="row center-row match-container-row">
                                <div className="col center-col">
                                    {
                                        this.state.pendingWingmanMatches.map((profile, i) =>
                                            <div className="row center-row match-container match-row" key={"row0wingmanpending" + profile.requestId}>
                                                <PendingMatchesProfile key={profile.userId+"wingman"} userId={profile.userId} requestId={profile.requestId} wingmanId={profile.wingmanId} requesterId={profile.requesterId} requesteeId={profile.requesteeId} imgsrc={profile.photos[0]}
                                                    firstName={profile.firstName} lastName={profile.lastName} email={profile.email} age={profile.age} descrip={profile.description} genderIdentity={profile.genderIdentity} genderPreferences={profile.genderPreferences}
                                                    matched={false} approveMatch={() => this.completePendingWingman(profile.wingmanId, profile.requesterId, profile.requesteeId)} rejectMatch={() => this.rejectWingmanMatch(profile.wingmanId, profile.requesterId, profile.requesteeId)} notifyRequesteeofMatch={() => this.notifyRequesteeofMatch(profile.userId)}></PendingMatchesProfile>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div >

            );
        } else {
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

                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="pendingMatches" title="Pending Matches">
                            <div className="row center-row">
                                <h2>Pending Matches</h2>
                            </div>
                            <div className="row center-row">
                                <div className="col center-col">

                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="wingmanMatches" title="Pending Wingman Matches">
                            <div className="row center-row">
                                <h2>Pending Wingman Matches</h2>
                            </div>
                            <div className="row center-row">
                                <div className="col center-col">
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

            );
        }
    }
}

export default ViewPastMatches;
