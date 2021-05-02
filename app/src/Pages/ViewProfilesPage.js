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
        this.getCurrentPhotos = this.getCurrentPhotos.bind(this)
    }

   checkUserLogIn() {
        let token =  UserToken.getUserId()
        console.log("token in edit settings " + token)
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
                console.log(responseData)
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
                console.log("pending friends resposne data")
                console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
                    })
                    console.log(this.state.unsuitableMatches)
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
                        unsuitableMatches: this.state.unsuitableMatches.concat(responseData.results)
                    })
                    console.log("unsitable matches")
                    console.log(this.state.unsuitableMatches)
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
        console.log("get current photos")
        for (let i=0; i < this.state.profiles.length; ++i) {
            console.log(this.state.profiles[i])
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
                  console.log(responseData)
                let temp = this.state.profiles
                let photoArray=this.state.currentPhotos
                let tempProfiles = this.state.numProfiles-1
                let tempResult = temp.filter((obj) => {
                console.log(obj)
                return obj.userId != userId
                })
                let tempPhotos = photoArray.filter((obj) => {
                    console.log(obj)
                    return obj.id != userId
                    })
                this.notifyRequesteeofMatch(userId)
                this.setState({
                    profiles: tempResult,
                    numProfiles: tempProfiles,
                    currentPhotos: tempPhotos
        
                })
               console.log("was match successful? " + responseData.matched);
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
        let url='../../../server/php/photoGetter.php'
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
            console.log("current photo response : ")
            console.log(photos)
           let tempPhotoNumber=this.state.doneLoading+1;
                // TODO: handle case where login is invalid
                    if (photos.length!=0) {
                        console.log("return actual photo")
                            this.setState(prevState => ({
                                currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc: photos[0]}],
                                doneLoading: tempPhotoNumber
                            }))
                    
                    }
                    else {
                        console.log("Reutnr defualt")
                        this.setState(prevState => ({
                            currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc:"mail-order-wife.png"}],
                            doneLoading: tempPhotoNumber
                        }))
                    }

            }).catch((error)=>{
                let tempPhotoNumber=this.state.doneLoading+1;
                console.error(error)
                console.log("Reutnr defualt")
                this.setState(prevState => ({
                    currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc:"mail-order-wife.png"}],
                    doneLoading: tempPhotoNumber
                }))
            })

    }


    getCurrentPhotos() {
   
    }
    onClickReject(userId) {
        let temp = this.state.profiles
        let tempProfiles = this.state.numProfiles-1
        let photoArray=this.state.currentPhotos
        let tempResult = temp.filter((obj) => {
		console.log(obj)
		console.log(userId)
        if (obj.userId === userId) {
        }
            return obj.userId !== userId
        })
        let tempPhotos = photoArray.filter((obj) => {
            console.log(obj)
            return obj.id != userId
            })
        this.setState({
            profiles: tempResult,
            numProfiles:tempProfiles,
            currentPhotos: tempPhotos
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
