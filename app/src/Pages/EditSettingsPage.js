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
import {Col} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';


let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000"

class EditSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            email:"",
            feedback: "",
            redirect: false,
            pictures: []

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onDrop = this.onDrop.bind(this);

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
        this.checkUserLogIn();
    }

    handleSubmit(event) {
        event.preventDefault();
        //     let uid = UserToken.getUserId();
        //     let url = baseDomain + 'endpoint'
        //     let newRequest = {
        //         "uid": uid,
        //         "firstName": this.state.firstName,
        //         "lastName": this.state.lastName,
        //         "description": this.state.description
        //     }

        //     fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newRequest)

        // })
        // .then(response => {
        //     let responseText = response.json()
        //     if (responseText.error==null) {
        //         this.setState({feedback:"Changes successfully saved!"})
        //     }
        //     else {
        //         this.setState({feedback:"Changes could not be saved, please try again :("})
        //     }

        //  })

    }


    handleInputChange(event) {
        let target = event.target;
        let value = target.value
        let name = target.name;
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
            <div className="page">
                <BearHugsNavbar></BearHugsNavbar>
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

