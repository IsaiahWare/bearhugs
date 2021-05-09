import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"
class ViewProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            numProfiles: -1,
            redirect: false,
            unsuitableMatches: [],
            currentPhotos: [],
            doneLoading: 0,
            feedback: "Loading profiles..."
        }
        this.checkUserLogIn = this.checkUserLogIn.bind(this)
        this.getProfiles = this.getProfiles.bind(this)
        this.getRejectedMatches = this.getRejectedMatches.bind(this)
    }

    checkUserLogIn() {
        let token = UserToken.getUserId()
        if (token == null || token == undefined || token == "") {
            this.setState({
                redirect: true
            })
        }
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
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
                    }, function () {
                        this.getRejectedMatches();
                    })
                }

            })

    }

    getRejectedWingmanMatches() {
        let url = baseDomain + '/wingman/rejectedMatches'
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
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
                    }, function () {
                        this.getProfiles();

                    })
                }


            })

    }
    getRejectedMatches() {
        let url = baseDomain + '/match/rejectedMatches'
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
                // console.log("rejected matches response data ")
                // console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
                    }, function () {
                        this.getRejectedWingmanMatches()

                    })
                }


            })

    }

    getPendingMatches() {
        console.log("get pending matches")
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
                if (JSON.stringify(responseData.error) === '{}') {
                    // console.log("pending matches response data ")
                    // console.log(responseData)
                    this.setState({
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
                    }, function () {
                        this.getCurrentMatches();
                    })
                }

            })

    }



    getProfiles() {
        let url = baseDomain + '/user/random'
        let newRequest = {
            count: 15,
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
                if (responseData.error !== '{}') {
                    console.log("Current profiles before splicing: ")
                    console.log(responseData)
                    for (let j = 0; j < this.state.unsuitableMatches.length; ++j) {
                        let result = responseData.results.findIndex(element => element.userId == this.state.unsuitableMatches[j].userId)
                        if (result != -1) {
                            responseData.results.splice(result)
                        }

                    }
                    let temp = responseData.results;
                    let selfid = parseInt(UserToken.getUserId())
                    // console.log("self id " + selfid)
                    let tempResult = temp.filter((obj) => {
                        // console.log(obj)
                        return obj.userId !== selfid
                    })

                    this.setState({
                        profiles: tempResult,
                        numProfiles: tempResult.length,
                        unsuitableMatches: []
                    })
                }
                else {
                    this.setState({ feedback: "No profiles could be obtained. Please try again later." })
                }
            }).then(() => {
                console.log("Current profiles: ")
                console.log(this.state.profiles)
                for (let i = 0; i < this.state.profiles.length; ++i) {
                    this.getPhotoForCurrentUser(this.state.profiles[i].userId)
                }

            }).then(() => {
                this.setState({feedback:""})

            })

    }

    componentDidMount() {
        this.checkUserLogIn()
        if (!this.state.redirect) {
            this.getPendingMatches()
        }
    }



    onClickAccept(userId) {
        let url = baseDomain + '/match/send'
        let newRequest = {
            requesterId: UserToken.getUserId(),
            requesteeId: userId
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
                //       if (JSON.stringify(responseData.error) === '{}') {
                //         let temp = this.state.profiles
                //         let photoArray=this.state.currentPhotos
                //         let tempProfiles = this.state.numProfiles-1
                //         let doneLoadingTemp = this.state.doneLoading-1
                //         let tempResult = temp.filter((obj) => {
                //         return obj.userId != userId
                //         })
                //         let tempPhotos = photoArray.filter((obj) => {
                //             return obj.id != userId
                //             })
                //         this.setState({
                //             profiles: tempResult,
                //             numProfiles: tempProfiles,
                //             currentPhotos: tempPhotos,
                //             doneLoading: doneLoadingTemp

                //         })
                //    }
            })

    }

    notifyRequesteeofMatch(userId) {
        let url = baseDomain + '/notifications/sendtwouser'
        let newRequest = {
            userId1: userId,
            userId2: UserToken.getUserId(),
            message: UserToken.getUserName() + " has swiped on you! Check pending matches to see more."
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
    getPhotoForCurrentUser(id, idx) {
        let url = 'http://ec2-34-239-255-127.compute-1.amazonaws.com/server/php/photoGetter.php'
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
                let tempPhotoNumber = this.state.doneLoading + 1;
                    if (photos.length!=0) {
                            this.setState(prevState => ({
                                currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc: photos}],
                                doneLoading: tempPhotoNumber
                            }))
                        }
                    else {
                        this.setState(prevState => ({
                            currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc: ["default-profile.png"]}],
                            doneLoading: tempPhotoNumber
                        }))
                    }

            }).catch((error) => {
                console.error(error)
                let tempPhotoNumber = this.state.doneLoading + 1;
                this.setState(prevState => ({
                    currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc: ["default-profile.png"]}],
                    doneLoading: tempPhotoNumber
                }))
            })

    }

    onClickReject(userId) {
        let url = baseDomain + '/match/reject'
        let newRequest = {
            requesterId: UserToken.getUserId(),
            requesteeId: userId
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
                //   if (JSON.stringify(responseData.error) === '{}') {
                //     let temp = this.state.profiles
                //     let photoArray=this.state.currentPhotos
                //     let tempProfiles = this.state.numProfiles-1
                //     let tempDoneLoading = this.state.doneLoading-1
                //     let tempResult = temp.filter((obj) => {
                //     return obj.userId != userId
                //     })
                //     let tempPhotos = photoArray.filter((obj) => {
                //         return obj.id != userId
                //         })
                //     this.setState({
                //         profiles: tempResult,
                //         numProfiles: tempProfiles,
                //         currentPhotos: tempPhotos,
                //         doneLoading: tempDoneLoading

                //     })
                //}
            })

    }

    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect
                to="/"
            />
        }
        // console.log("done loading :" + this.state.doneLoading)
        // console.log("num profiles " + this.state.numProfiles)

        let userPhotos = [
            {imgsrc: "mail-order-wife.png", id: 1},
            {imgsrc: "possum-on-horse.png", id: 2}
        ];

        if (this.state.doneLoading == this.state.numProfiles) {
            // console.log("In render with done loading "+ this.state.doneLoading+ " and num profiles" + this.state.numProfiles)
            return (
                <div className="page">
                    <BearHugsNavbar></BearHugsNavbar>
                    <div className="row center-row">
                        <h6>{this.state.feedback}</h6>
                    </div>
                    <div className="row center-row match-container-row">
                        <div className="col center-col">
                            {
                                this.state.profiles.map((profile,i) =>
                                <div className="row center-row match-container match-row" key = {"row0" + profile.userId}>
                                    <MatchProfile key={profile.userId} userId={profile.userId} photos= {this.state.currentPhotos[i].imgsrc}
                                    firstName={profile.firstName} lastName={profile.lastName} age={profile.age} descrip={profile.description}
                                     matched={false}
                                     approveMatch={() => this.onClickAccept(profile.userId)} rejectMatch={() => this.onClickReject(profile.userId)}
                                     ></MatchProfile>

                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            );

        }
        else {
            return (
                <div className="page">
                    <BearHugsNavbar></BearHugsNavbar>
                    <div className="row center-row">
                        <h6>{this.state.feedback}</h6>
                    </div>
                    <div className="row center-row match-container-row">

                        <div className="col center-col">


                            {/* for frontend testing */}


                        </div>
                    </div>
                </div>

            )
        }

    }
}

export default ViewProfilePage;
