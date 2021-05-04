import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import UserToken from "../Components/UserToken"
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import BearHugsNavbar from "../Components/BearHugsNavbar";
import ListedUser from "../Components/ListedUser";


let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"
class WingmanPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            currentFriends: [],
            wingmanee: { userId: -1 },
            wingmanning: false,
            currentPhotos:[],
            doneLoading:0,
            numFriends:-1,
            feedback: ""
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

    getPhotoForCurrentUser(id) {
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
                    if (photos.length!=0) {
                            this.setState(prevState => ({
                                currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc: photos[0]}],
                                doneLoading: tempPhotoNumber
                            }))
                        }
                    else {
                        this.setState(prevState => ({
                            currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc:"default-profile.png"}],
                            doneLoading: tempPhotoNumber
                        }))
                    }

            }).catch((error)=>{
                let tempPhotoNumber=this.state.doneLoading+1;
                console.error(error)
                this.setState(prevState => ({
                    currentPhotos: [...prevState.currentPhotos, {id: id, imgsrc:"default-profile.png"}],
                    doneLoading: tempPhotoNumber
                }))
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
		    console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({
                       currentFriends: responseData.results, 
                       doneLoading: 0,
                       numFriends: responseData.results.length
                    }, function() {
                        if (this.state.currentFriends.length > 0) {
                            for (let i=0; i < this.state.currentFriends.length; ++i) {
                                this.getPhotoForCurrentUser(this.state.currentFriends[i].userId) 
                             }

                        }
                        else {
                            this.setState({
                                feedback: "You don't have any friends yet. Go to the friends page to make a friend request!"
                            }) 
                        }
                      
                    })
                } else{
                    this.setState({
                        feedback: "Friends could not be retrieved. Please try again later."
                    })
                }
                //TODO: add message for if no friends yet
            })
    }

    sendWingManNotificationToFriend(friend) {
        let url = baseDomain + '/notifications/sendthreeuser'
        let newRequest = {
            userId1: friend.userId,
            userId2: this.state.wingmanee.userId,
            userId3: UserToken.getUserId(),
            message: UserToken.getUserName() + " thinks you and " + this.state.wingmanee.firstName + " " + this.state.wingmanee.lastName + " would be cute together!"
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
           
       })
    


    }
    

    sendWingManNotificationToWingmanee(friend) {
        let url = baseDomain + '/notifications/sendthreeuser'
        let newRequest = {
            userId1: this.state.wingmanee.userId,
            userId2: friend.userId,
            userId3: UserToken.getUserId(),
            message: UserToken.getUserName() + " thinks you and " + friend.firstName + " " + friend.lastName + " would be cute together!"
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
           
       })
    


    }


    sendWingMan(friend){
        console.log("send wingman for friend " +friend)
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
            if (JSON.stringify(responseData.error) === '{}') {
            alert("Wingman match suggestion sent to "+ this.state.wingmanee.firstName + " " +this.state.wingmanee.lastName + " and "+ friend.firstName + " " +friend.lastName );
            this.sendWingManNotificationToFriend(friend)
            this.sendWingManNotificationToWingmanee(friend)
            }   
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
                <div className="row center-row">
                    {this.state.feedback}
                </div>
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
                    <p className="center">{this.state.feedback}</p>
                </div>
                <div className="text-container">
                    <p className="center">Select a friend from below who you think needs a match.
                    From there, you can select another one of your friends to ship them with 😏 </p>
                </div>
            </div>;

            backbutton = null;
        }

        if (this.state.doneLoading == this.state.numFriends) {
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

        } else {
            return (
                <div className = "page">
                    <BearHugsNavbar></BearHugsNavbar>
    
                    {wingmanPanel}
    
                    <div className="friendsContainer">
    
                    </div>
                    
                    {backbutton}
                </div>

            )
        }

        
    }


}

export default WingmanPage;