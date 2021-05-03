import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"
class ViewProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            numProfiles:-1,
            redirect:false,
            unsuitableMatches:[],
            currentPhotos:[],
            doneLoading: 0,
        }
        this.checkUserLogIn = this.checkUserLogIn.bind(this)
        this.getProfiles = this.getProfiles.bind(this)
        this.getPendingAndCurrent = this.getPendingAndCurrent.bind(this)
        this.getRejectedMatches = this.getRejectedMatches.bind(this)
    }

   checkUserLogIn() {
        let token =  UserToken.getUserId()
        if(token==null || token==undefined || token=="") {
            this.setState({
                redirect:true
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

                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
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
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
                    })
                }
            })

        }


    getPendingAndCurrent() {
        this.getCurrentMatches();
        this.getPendingMatches();

    }

    getProfiles() {
        let url = baseDomain + '/user/random'
        let newRequest = {
            count: 20
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
              if (responseData.error!=null) {
                  this.getPendingAndCurrent();
                for (let i = 0; i < responseData.results.length; ++i) {
                    if (this.state.unsuitableMatches.includes(responseData.results[i])) {
                        responseData.splice(i)
                    }
                }
               let setProfiles = responseData.results
               let userToken = UserToken.getUserId()
               let tempProfiles = setProfiles.filter((obj) => {
                return obj.userId !== userToken
                })
                this.setState({
                    profiles: tempProfiles,
                    numProfiles:tempProfiles.length
                })
                  
           }
       }).then(()=>{
        for (let i=0; i < this.state.profiles.length; ++i) {
           this.getPhotoForCurrentUser(this.state.profiles[i].userId) 
        }
       })

    }

    componentDidMount() {
        this.checkUserLogIn()
            if(!this.state.redirect) {
                this.getProfiles()
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
              if (JSON.stringify(responseData.error) === '{}') {
                let temp = this.state.profiles
                let photoArray=this.state.currentPhotos
                let tempProfiles = this.state.numProfiles-1
                let doneLoadingTemp = this.state.doneLoading-1
                let tempResult = temp.filter((obj) => {
                return obj.userId != userId
                })
                let tempPhotos = photoArray.filter((obj) => {
                    return obj.id != userId
                    })
                this.setState({
                    profiles: tempResult,
                    numProfiles: tempProfiles,
                    currentPhotos: tempPhotos,
                    doneLoading: doneLoadingTemp
        
                })
           }
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

    getPhotoForCurrentUser(id) {
        console.log("get photo for user " + id)
        console.log(url)
        let url='http://bearhugs.love/server/php/photoGetter.php'
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
        .then(photos=> {
            console.log(JSON.stringify(photos))
           let tempPhotoNumber=this.state.doneLoading+1;
                // TODO: handle case where login is invalid
                    if (photos.results.length!=0) {
                            this.setState(prevState => ({
                                currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc: photos.results[0]}],
                                doneLoading: tempPhotoNumber
                            }))
                        }
                    else {
                        this.setState(prevState => ({
                            currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc:"mail-order-wife.png"}],
                            doneLoading: tempPhotoNumber
                        }))
                    }

            }).catch((error)=>{
                let tempPhotoNumber=this.state.doneLoading+1;
                this.setState(prevState => ({
                    currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc:"mail-order-wife.png"}],
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
              if (JSON.stringify(responseData.error) === '{}') {
                let temp = this.state.profiles
                let photoArray=this.state.currentPhotos
                let tempProfiles = this.state.numProfiles-1
                let tempDoneLoading = this.state.doneLoading-1
                let tempResult = temp.filter((obj) => {
                return obj.userId != userId
                })
                let tempPhotos = photoArray.filter((obj) => {
                    return obj.id != userId
                    })
                this.setState({
                    profiles: tempResult,
                    numProfiles: tempProfiles,
                    currentPhotos: tempPhotos,
                    doneLoading: tempDoneLoading
        
                })
           }
       })
  
    }
    
    render() {
        const redirect = this.state.redirect
	    if (redirect) {
            return <Redirect
            to= "/"
            />
        }
        console.log("done loading :" + this.state.doneLoading)
        console.log("num profiles " + this.state.numProfiles)

        if (this.state.doneLoading==this.state.numProfiles) {
            console.log("In render with done loading "+ this.state.doneLoading+ " and num profiles" + this.state.numProfiles)
            return (
                <div className="page">
                    <BearHugsNavbar></BearHugsNavbar>
                    <div className="row center-row">
                        <div className="col center-col">
                            {
                                this.state.profiles.map((profile,i) =>
                                <div className="row center-row match-container" key = {"row0" + profile.userId}>
                                    <MatchProfile key={profile.userId} userId={profile.userId} imgsrc= {this.state.currentPhotos[i].imgsrc}
                                    firstName={profile.firstName} lastName={profile.lastName} age={profile.age} descrip={profile.description}
                                     matched={false}
                                     approveMatch={() => this.onClickAccept(profile.userId)} rejectMatch={() => this.onClickReject(profile.userId)}
                                     ></MatchProfile>
                                     
                                </div>
                                )
                            }
    
                            {/* for frontend testing */}
    
    
                        </div>
                    </div>
                </div>
            );

        }
        else {
            return null;
        }
 
    }
}

export default ViewProfilePage;
