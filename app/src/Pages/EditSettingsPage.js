import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import UserToken from '../Components/UserToken'
import BearHugsNavbar from '../Components/BearHugsNavbar'
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import Image from "react-bootstrap/Image"
const axios = require('axios');

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"

class EditSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            email: "",
            phoneNumber: "",
            feedback: "",
            passwordFeedback: "",
            newPassword: "",
            newPasswordConfirm: "",
            redirect: false,
            photos:[],
            genderIdentity: "",
            maleGenderPref: false,
            femaleGenderPref: false,
            otherGenderPref: false,
            firstName: "",
            lastName: "",
            age: -1,
            currentPhotos: [],
            doneLoading:0,
            numPhotos:-1,
            file: null

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCurrentUserInfo = this.getCurrentUserInfo.bind(this);
        this.getPhotoInfo = this.getPhotoInfo.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.onPhotosChange = this.onPhotosChange.bind(this)
        this.changePassword = this.changePassword.bind(this);
    }

    checkUserLogIn() {
        let token = UserToken.getUserId()
        if (token == null || token == undefined || token == "") {
            this.setState({
                redirect: true
            })
        }

    }

    componentDidMount() {
        this.checkUserLogIn();
        this.getCurrentUserInfo()
        this.getPhotoInfo();
    }

    getCurrentUserInfo() {
        let uid = UserToken.getUserId();
        let url = baseDomain + '/user/find'
        let newRequest = {
            "userId": uid,
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
            // TODO: handle case where login is invalid
            if (JSON.stringify(responseData.error) === '{}') {
                // console.log(responseData.results[0])
                this.setState({
                    email: responseData.results[0].email,
                    phoneNumber: responseData.results[0].phoneNumber,
                    description: responseData.results[0].description,
                    firstName: responseData.results[0].firstName,
                    lastName: responseData.results[0].lastName,
                    age: responseData.results[0].age,
                    genderIdentity:responseData.results[0].genderIdentity,
                    maleGenderPref: responseData.results[0].maleGenderPref,
                    femaleGenderPref:responseData.results[0].femaleGenderPref,
                    otherGenderPref:responseData.results[0].otherGenderPref,
                })

            }
            else {
                this.setState({ feedback: "Couldn't get data" })
            }

        })


    }

    getPhotoInfo() {
        fetch('http://ec2-34-207-209-250.compute-1.amazonaws.com/photoGetter.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "userId": parseInt(UserToken.getUserId())
            })
          })
            .then(photos => photos.json())
            .then(photos => {
                let tempPhotoNumber = this.state.doneLoading + 1;
                // TODO: handle case where login is invalid
                if (photos.length != 0) {
                    this.setState({
                        currentPhotos: photos,
                        doneLoading: tempPhotoNumber
                    })
                }
                else {
                    this.setState({
                        feedback: "You have not uploaded a photo yet."
                    })
                }
            }).catch((error) => {
                // console.log(error);
                let tempPhotoNumber = this.state.doneLoading + 1;
                this.setState({
                    feedback: "Photos could not be obtained at this time, but other user information has been obtained."
                })
            })
    }

    uploadPhoto(event) {
        event.preventDefault();
        let formData = new FormData();

        formData.append('userId', parseInt(UserToken.getUserId()));
        formData.append('filename', this.state.file);

        // console.log(this.state);

        // const config = {
        //     headers: { 'content-type': 'multipart/form-data' }
        // }

        const url = 'http://ec2-34-207-209-250.compute-1.amazonaws.com/photoUploader.php';

        axios.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(response => {
            // console.log(response);
            this.setState({
                feedback:"Photo successfully uploaded!"
            })
            this.getPhotoInfo()
        })
        .catch(error => {
            console.log(error);
        });
    }

    onPhotosChange(e) {
        this.setState({
            "file":e.target.files[0]
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let uid = parseInt(UserToken.getUserId());
        let url = baseDomain + '/user/update'
        let newRequest = {
            "userId": uid,
            "email": this.state.email,
            "phoneNumber": this.state.phoneNumber,
            "description": this.state.description,
            "genderIdentity": this.state.genderIdentity,
            "maleGenderPref": this.state.maleGenderPref,
            "femaleGenderPref":this.state.femaleGenderPref,
            "otherGenderPref": this.state.otherGenderPref
        }

        // console.log("New request for edit" + JSON.stringify(newRequest))

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)

        }).then(res => res.json())
            .then(responseData => {
                // console.log("Data received")
                // console.log(responseData)
                // TODO: handle case where login is invalid
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({ feedback: "Changes saved!" })
                }
                else {
                    this.setState({ feedback: "Changes could not be saved :( Please try again" })
                }
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            })
    }

    handleInputChange(event) {
        let target = event.target;
        let value = target.value
        let name = target.name;
        if (name=="maleGenderPref" || name=="femaleGenderPref" || name=="otherGenderPref") {
                let checkValue = event.target.checked;
                // console.log('name ' + name + 'value '+ checkValue)
                this.setState({
                    [name]: checkValue
                });
        } else{
            this.setState({
                [name]: value
            });
        };
    }

    changePassword(event){
        event.preventDefault();
        if(this.filterPassword(this.state.newPassword)){
            // console.log("trying to update...");
            let url = baseDomain + '/user/updatePassword'
            let newRequest = {
                "email": this.state.email,
                "password": this.state.newPassword
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
                    // console.log(responseData)
                    // TODO: handle case where login is invalid
                    if (JSON.stringify(responseData.error) !== '{}') {
                        this.setState({
                            passwordFeedback: "Password change failed 🤨"
                        })
                    } else {
                        this.setState({
                            passwordFeedback: "Password updated successfully 😁"
                        })
                    }
                })
        }
    }

    filterPassword(password) {
        if (password != this.state.newPasswordConfirm) {
            this.setState({
                passwordFeedback: "Password and confirm password do not match."
            })
            return false
        }
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (!re.test(password)) {
            this.setState({
                passwordFeedback: "Password should contain at least eight characters, and it should have at least one uppercase character, one lowercase character, and one digit."
            })
            return false
        }
        return true
    }

    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect
                to="/"
            />
        }


        return (
            <div className="page" >
                <BearHugsNavbar></BearHugsNavbar>
                <div className="row center-row">
                <h2>Edit User Information</h2>
                </div>
                <div className="feedback-wrapper">
                    <h6>{this.state.feedback}</h6>
                </div>
                    <div className="row center-row">
                            {/*<Image src={this.state.photo} className="img-parent" />*/}
                            {this.state.currentPhotos.map((photo, idx) =>  (
                                <img src={photo} key={idx} className="img-parent"/>
                            ))}
                    </div>
                <div className="col">
                <form onSubmit={this.uploadPhoto}>
                    <input type="hidden" name="MAX_FILE_SIZE" value="50000000000000" />
                    <input type="file" accept="image/png, image/jpeg" name="filename" id = "uploadfile_input" onChange={this.onPhotosChange}/>
                    <Button type="submit" variant="danger" name="submit"> UPLOAD </Button>
                </form>


                    <Form onSubmit={this.handleSubmit} controlId="editForm">
                        <Form.Group controlId="editForm.email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="newemail@wustl.edu" />
                        </Form.Group>
                        <Form.Group controlId="editForm.phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="phoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange} placeholder="##########" />
                        </Form.Group>
                        <Form.Group controlId="editForm.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={this.state.description} rows={3} onChange={this.handleInputChange} placeholder="Write what you want
                            people to see on your profile" />
                        </Form.Group>
                        <Form.Group controlId="editForm.genderIdentity">
                            <Form.Label>Gender Identity</Form.Label>
                            <Form.Control as="select" value={this.state.genderIdentity}
                                name="genderIdentity" onChange={this.handleInputChange}>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <div>
                            <Form.Label>Gender Preference for Matching</Form.Label>
                            </div>
                            <Form.Check inline label="Male" name="maleGenderPref" onChange={this.handleInputChange} id="male_gender_pref"  checked={this.state.maleGenderPref} />
                            <Form.Check inline label="Female" name="femaleGenderPref" onChange={this.handleInputChange} id="female_gender_pref"  checked={this.state.femaleGenderPref} />
                            <Form.Check inline label="Other" name="otherGenderPref" onChange={this.handleInputChange} id="other_gender_pref" checked={this.state.otherGenderPref} />
                            </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="editForm.submit">
                                <Button type="submit" variant="danger" name="submit-button">Submit Changes</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <Form controlId="passwordForm" onSubmit={this.changePassword}>
                        <h3 class="center">Change Password</h3>
                        <Form.Group controlId="editForm.newPassword">
                            <Form.Control type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleInputChange} placeholder="New Password" />
                        </Form.Group>
                        <Form.Group controlId="editForm.newPasswordconfirm">
                            <Form.Control type="password" name="newPasswordConfirm" value={this.state.newPasswordConfirm} onChange={this.handleInputChange} placeholder="Confirm New Password" />
                        </Form.Group>
                        <p class="center">{this.state.passwordFeedback}</p>
                        <Form.Row>
                            <Form.Group as={Col} controlId="passwordForm.submit">
                                <Button type="submit" variant="danger" name="submit-button">Change Password</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>

                    {/* <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <h3>{this.state.feedback}</h3>
                        </div>
                        <div class="input-row">
                            <div className="col">
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                />
                            </div>
                        </div>
                        <div className="input-row">
                            <div className="col">
                                <input type="text" placeholder="First Name" name="firstName" value={this.state.firstName} onChange={this.handleInputChange}></input>
                            </div>
                            <div className="col">
                                <input type="text" placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.handleInputChange}></input>
                            </div>
                        </div>
                        <div className="input-row center-row ">
                            <textarea rows="4" cols="50" placeholder="Write what you want people to see when they check your profile" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
                        </div>
                        <div className="input-row center-row">
                            <Button type="submit" className="button red" name="submit-button">Submit Changes</Button>
                        </div>

                    </form> */}
                </div>
            </div>

        );
    }
}

export default EditSettingsPage;

