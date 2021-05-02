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
            wingmanMatches: [],
            pendingPhotos: [],
            currentPhotos: [],
            wingmanPhotos: [],
            doneLoadingPending: 0,
            doneLoadingCurrent: 0,
            numPending: -1,
            numCurrent: -1,
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

    getPhotoForPendingUser(id) {
        let url = '../../../server/php/photoGetter.php'
        console.log("url " + url)
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
                let tempPhotoNumber = this.state.doneLoadingPending + 1;
                // TODO: handle case where login is invalid
                if (photos.results.length != 0) {
                    console.log("return actual photo")
                    this.setState(prevState => ({
                        pendingPhotos: [...prevState.pendingPhotos, { id: id, imgsrc: photos.results[0] }],
                        doneLoadingPending: tempPhotoNumber
                    }))

                }
                else {
                    console.log("Reutnr defualt")
                    this.setState(prevState => ({
                        pendingPhotos: [...prevState.pendingPhotos, { id: id, imgsrc: "mail-order-wife.png" }],
                        doneLoadingPending: tempPhotoNumber
                    }))
                }

            }).catch((error) => {
                let tempPhotoNumber = this.state.doneLoadingCurrent + 1;
                console.error(error)
                console.log("Reutnr defualt")
                this.setState(prevState => ({
                    pendingPhotos: [...prevState.pendingPhotos, { id: id, imgsrc: "mail-order-wife.png" }],
                    doneLoadingPending: tempPhotoNumber
                }))
            })

    }

    getPhotoForCurrentUser(id) {
        let url = '../../../server/php/photoGetter.php'
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
                if (photos.results.length != 0) {
                    console.log("return actual photo")
                    this.setState(prevState => ({
                        currentPhotos: [...prevState.currentPhotos, { id: id, imgsrc: photos.results[0]}],
                        doneLoadingCurrent: tempPhotoNumber
                    }))

                }
                else {
                    console.log("Reutnr defualt")
                    this.setState(prevState => ({
                        currentPhotos: [...prevState.currentPhotos, { id: id, imgsrc: "mail-order-wife.png" }],
                        doneLoadingCurrent: tempPhotoNumber
                    }))
                }

            }).catch((error) => {
                let tempPhotoNumber = this.state.doneLoadingCurrent + 1;
                console.error(error)
                console.log("Reutnr defualt")
                this.setState(prevState => ({
                    currentPhotos: [...prevState.currentPhotos, { id: id, imgsrc: "mail-order-wife.png" }],
                    doneLoadingCurrent: tempPhotoNumber
                }))
            })

    }

    getCurrentPhotos() {
        for (let i = 0; i < this.state.currentMatches.length; ++i) {
            this.getPhotoForCurrentUser(this.state.currentMatches[i].userId);

        }
        // console.log("temp current")
        // console.log(tempCurrent)
        // this.setState({
        //     currentPhotos:tempCurrent
        // })
    }
    getPendingPhotos() {
        for (let i = 0; i < this.state.pendingMatches.length; ++i) {
            this.getPhotoForPendingUser(this.state.pendingMatches[i].userId);

        }
        // for (let i=0; i < this.state.wingmanMatches.length; ++i) {
        //     let newelement = this.getPhotoForUser(this.state.wingmanMatches[i].userId);
        //     tempWingman.push(newelement);
        // }
        // this.setState({
        //     wingmanPhotos:tempWingman
        // })

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
                    let photoArray = this.state.pendingPhotos
                    let tempDoneLoading = this.state.doneLoadingPending-1
                    let numProfilesPending = this.state.numPending-1
                    let tempResult = temp.filter((obj) => {
                        if (obj.userId === id) {
                            console.log("remove " + JSON.stringify(obj))
                        }
                        return obj.userId !== id
                    })
                    let tempPhotoResult = photoArray.filter((obj) => {
                        if (obj.id === id) {
                            console.log("remove " + JSON.stringify(obj))
                        }
                        return obj.id !== id
                    })
                    this.setState({
                        pendingMatches: tempResult,
                        pendingPhotos: tempPhotoResult,
                        doneLoadingPending: tempDoneLoading,
                        numPending: numProfilesPending,
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

    rejectWingmanMatch() {
        let url = baseDomain + '/wingman/reject'
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
                        wingmanMatches: responseData.results
                    })
                }
            })

    }

    getWingmanMatches() {
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
                console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        wingmanMatches: responseData.results
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
                        currentMatches: responseData.results,
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
                console.log("pending friends resposne data")
                console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        pendingMatches: responseData.results,
                        numPending: responseData.results.length
                    }, () => {
                        this.getPendingPhotos();
                    });


                }
            })

    }


    filterPendingAfterAdd(id) {
        let temp = this.state.pendingMatches
        let photoArray = this.state.pendingPhotos
        let tempPendingDone = this.state.doneLoadingPending -1
        let pendingNum = this.state.numPending-1
        let tempResult = temp.filter((obj) => {
            if (obj.userId === id) {
                console.log("remove " + JSON.stringify(obj))
            }
            return obj.userId !== id
        })
        let tempPhotoResult = photoArray.filter((obj) => {
            if (obj.id === id) {
                console.log("remove " + JSON.stringify(obj))
            }
            return obj.id !== id
        })
        this.setState({
            pendingMatches: tempResult,
            pendingPhotos: tempPhotoResult,
            doneLoadingPending: tempPendingDone,
            numPending: pendingNum
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
                    this.notifyRequesteeofMatch(id)

                }
                else {
                    console.log(responseData)
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

    // checkUserEmail() {
    //     let url = baseDomain + '/user/findbyemail'
    //     let newRequest = {
    //         email: this.state.addFriendUser
    //     }
    //     console.log(newRequest)
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newRequest)
    //     })
    //         .then(res => res.json())
    //         .then(responseData => {
    //             if (JSON.stringify(responseData.error) === '{}') {
    //                 console.log(responseData)
    //                 this.setState({
    //                     feedback: "Friend found!"
    //                 })
    //                 this.addFriendByEmail(responseData.results[0].userId, responseData.results[0])
    //             }
    //             else {
    //                 console.log(responseData)
    //                 this.setState({
    //                     feedback: "Friend could not be found :(. Please try a different email"
    //                 })
    //             }
    //         })

    // }

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
        console.log("number of matches for current and completed " + this.state.numCurrent + "loading "+ this.state.doneLoadingCurrent)
        console.log("number of matches for pending " + this.state.numPending + "loading "+ this.state.doneLoadingPending)
        if (this.state.numCurrent == this.state.doneLoadingCurrent && this.state.numPending == this.state.doneLoadingPending) {
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
                                        this.state.currentMatches.map((profile, i) =>
                                            <div className="row center-row match-container" key={"row0current" + profile.userId}>
                                                <CompletedMatchesProfile key={profile.userId} userId={profile.userId} imgsrc={this.state.currentPhotos[i].imgsrc}
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
                                        this.state.pendingMatches.map((profile, i) =>
                                            <div className="row center-row match-container" key={"row0pending" + profile.userId}>
                                                <PendingMatchesProfile key={profile.userId} userId={profile.userId} imgsrc={this.state.pendingPhotos[i].imgsrc}
                                                    firstName={profile.firstName} lastName={profile.lastName} email={profile.email} age={profile.age} descrip={profile.description} genderIdentity={profile.genderIdentity} genderPreferences={profile.genderPreferences}
                                                    matched={false} approveMatch={() => this.addMatchFromButton(profile.userId)} rejectMatch={() => this.rejectMatch(profile.userId)} ></PendingMatchesProfile>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Tab>
                        {/* <Tab eventKey="wingmanMatches" title="Wingman Matches Matches">
                        <div className="row center-row">
                            <h2>Pending Matches</h2>
                        </div>
                        <div className="row center-row">
                            <div className="col center-col">
                                {
                                    this.state.wingmanMatches.map((profile) =>
                                        <div className="row center-row match-container" key={"row0wingman" + profile.userId}>
                                            <PendingMatchesProfile key={profile.userId} userId={profile.userId} imgsrc="mail-order-wife.png"
                                                firstName={profile.firstName} lastName={profile.lastName} email={profile.email} age={profile.age} descrip={profile.description} genderIdentity={profile.genderIdentity} genderPreferences={profile.genderPreferences}
                                                matched={false} approveMatch={() => this.addMatchFromButton(profile.userId)} rejectMatch={() => this.rejectWingmanMatch(profile.userId)} ></PendingMatchesProfile>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Tab> */}
                    </Tabs>
                </div >

            );
        } else {
            return null;
        }
    }
}

export default ViewPastMatches;
