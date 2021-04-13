import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"
import UserToken from '../Components/UserToken'
import BearHugsNavbar from '../Components/BearHugsNavbar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';


let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"

class EditSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            email: "",
            feedback: "",
            redirect: false,
            pictures: [],
            genderIdentity:"MALE",
            genderPreferences:"STRAIGHT",
            firstName:"",
            lastName:"",
            age:-1

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDrop = this.onDrop.bind(this);
        this.getCurrentUserInfo = this.getCurrentUserInfo.bind(this);

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
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
        console.log("EDIT SETTINGS IS HERE")
        this.checkUserLogIn();
        this.getCurrentUserInfo()
    }

    getCurrentUserInfo() {
        let uid = UserToken.getUserId();
        console.log("user id in edit settings: " + uid)
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
                    console.log(responseData.results[0])
                    this.setState({
                        email: responseData.results[0].email,
                        description: responseData.results[0].description,
                        firstName: responseData.results[0].firstName,
                        lastName: responseData.results[0].lastName,
                        age: responseData.results[0].age
                    })
                    if (responseData.results[0].genderIdentity!=null){
                        this.setState({
                            genderIdentity: responseData.results[0].genderIdentity
                        })
                        
                    }
                    else if (responseData.results[0].genderPreferences!=null) {
                        this.setState({
                            genderPreferences: responseData.results[0].genderPreferences,
                        })
                        
                    }
              
                }
                else {
                    console.log("No data for edit settings")
                    console.log(responseData.error)
                    this.setState({feedback: "Couldn't get data"})
                }

            })


    }

    handleSubmit(event) {
        event.preventDefault();
        let uid = UserToken.getUserId();
        let url = baseDomain + '/user/update'
        let newRequest = {
            "userId": uid,
            "email": this.state.email,
            "description": this.state.description,
            "genderIdentity": this.state.genderIdentity,
            "genderPreferences": this.state.genderPreferences,
            "firstName":this.state.firstName,
            "lastName":this.state.lastName,
            "age":this.state.age
        }
        console.log("New rquest" + newRequest)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)

        }).then(res => res.json())
        .then(responseData => {
                console.log("Data received")
                console.log(responseData)
                // TODO: handle case where login is invalid
                if (JSON.stringify(responseData.error) === '{}') {
                    this.setState({feedback: "Changes saved!"})
                    
                }
                else {
                    this.setState({feedback: "Changes could not be saved :( Please try again"})
                }

            })
        }

    handleInputChange(event) {
        let target = event.target;
  
        let value = target.value
        let name = target.name;
        console.log(name + " " + value)
        this.setState({
            [name]: value
        });
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
                            <h3>{this.state.feedback}</h3>
                </div>
                <div className="col">
                    <Form onSubmit={this.handleSubmit} controlId="editForm">
                        <Form.Row>
                            <Form.Group as={Col} controlId="editForm.picture">
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="editForm.email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} placeholder="newemail@wustl.edu" />
                        </Form.Group>
                        <Form.Group controlId="editForm.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="description" value={this.state.description} rows={3} onChange={this.handleInputChange} placeholder="Write what you want 
                            people to see on your profile" />
                        </Form.Group>
                        <Form.Group controlId="editForm.genderIdentity">
                            <Form.Label>Gender Identity</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.genderIdentity}
                                onChange={this.handleInputChange}>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="editForm.genderPreference">
                            <Form.Label>Gender Preference</Form.Label>
                            <Form.Control as="select" defaultValue={this.state.genderPreferences}
                                onChange={this.handleInputChange}>
                                <option value="STRAIGHT">Straight</option>
                                <option value="GAY">Gay</option>
                                <option value="BISEXUAL">Bisexual</option>
                                <option value="OTHER">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="editForm.submit">
                                <Button type="submit" variant="danger" name="submit-button">Submit Changes</Button>
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

