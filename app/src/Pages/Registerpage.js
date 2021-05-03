import { faPooStorm } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import UserToken from "../Components/UserToken.js"
import MultiSelect from "react-multi-select-component";


let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"


const genderPreferenceOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
    { label: "None", value: "NONE" }
];
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: "",
            age: 18,
            feedback: " ",
            selectedGender: [],
            selectedGenderPreference: [],
            redirect: false

        }
        this.registerAccount = this.registerAccount.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.filterInputs = this.filterInputs.bind(this)
        this.setSelectedPreferences=this.setSelectedPreferences.bind(this)

    }

    logIn() {
        console.log("Login event")
        let url = baseDomain + '/user/login'
        let newRequest = {
            "email": this.state.email,
            "password": this.state.password
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
                    console.log("in reigster page log in with results " + responseData.results)
                    UserToken.setUserId(responseData.results[0].userId)
                    UserToken.setUserName(responseData.results[0].firstName + " " + responseData.results[0].lastName)
                    UserToken.setUserEmail(responseData.results[0].email)
                    this.setState({ redirect: true })
                }
            })
    }

    filterInputs(event) {
        event.preventDefault()
        let age = this.state.age;
        let firstName = this.state.firstName
        let lastName = this.state.lastName
        let email = this.state.email
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword
        let ageFilter = this.filterAge(age)
        let nameFilter = this.filterName(firstName, lastName)
        let emailFilter = this.filterEmail(email)
        let passwordFilter = this.filterPassword(password)
        let confirmPassWordCheck = this.checkPassword(password, confirmPassword)
        if (ageFilter && nameFilter && emailFilter && passwordFilter && confirmPassWordCheck) {
            this.registerAccount()
        }
        else {
            console.log("Filters failed")
        }

    }

    checkPassword(password, confirmPassword) {
        if (password != confirmPassword) {
            this.setState({
                feedback: "Password and confirm password do not match. Please enter password/confirm password again."
            })
            return false
        }
        return true
    }
    filterPassword(password) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
        if (!re.test(password)) {
            this.setState({
                feedback: "Password should contain at least eight characters, and it should have at least one uppercase character, one lowercase character, and one digit."
            })
            return false
        }
        return true
    }
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    filterEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            this.setState({
                feedback: "Please enter a valid full email of the form 'wustlkey@wustl.edu."
            })
            return false
        }
        let afterAt = email.split('@')[1]
        if (afterAt != "wustl.edu") {
            this.setState({
                feedback: "Your email must be a wustl.edu email. Please enter a wustl.edu email"
            })
            return false
        }
        return true;
    }


    //https://www.codexworld.com/how-to/validate-first-last-name-with-regular-expression-using-javascript/
    filterName(firstName, lastName) {
        //should match names with multiple last names, hypens, and apostrophes
        var regName = /^[ a-zA-Z\-\’]+$/;
        let fullName = firstName + " " + lastName;
        if (!regName.test(fullName)) {
            this.setState({
                feedback: "Please enter a valid full first and last name."
            })
            return false;
        }
        return true;


    }

    filterAge(age) {
        if (age < 18) {
            this.setState({
                feedback: "You have to be over 18 to use this service."
            })
            return false;
        }
        else if (age > 110) {
            this.setState({
                feedback: "Please enter a reasonable age."
            })
            return false;
        }
        return true;
    }

    registerAccount() {
        let url = baseDomain + '/user/register'
        let newRequest = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password,
            "age": this.state.age
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
                if (JSON.stringify(responseData.error) !== '{}') {
                    this.setState({
                        feedback: "Register not successful :("
                    })
                } else {
                    this.setState({
                        feedback: "Register successful :) Return to login and try your new account!"
                    })
                    this.logIn();
                }
            })
    }

    handleInputChange(event) {
        let target = event.target;
        let value = target.value
        let name = target.name;
        this.setState({
            [name]: value
        });
    }

    setSelectedPreferences(event){
      let values = Array.from(event, option => option.value);
      console.log(values)
      this.setState({
          genderPreferenceOptions: values
      })
        
    }



    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect
                to="/viewmatches"
            />
        }

        return (
            <div className="page">

                <div className="row center-row">
                    <div className="col center-col">
                        <div className="box margin-5rem ">
                            <form onSubmit={this.filterInputs}>
                                <div className="input-row center-row">
                                    <h2 className="font-red">Register for Bear Hugs</h2>
                                </div>

                                <div className="input-row center-row">
                                    <input className="input" type='text' value={this.state.email} onChange={this.handleInputChange} name='email' placeholder="yourwustlemail@wustl.edu" />
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" value={this.state.password} onChange={this.handleInputChange} type='password' name='password' placeholder="Password" />
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" type='password' value={this.state.confirmPassword} onChange={this.handleInputChange} name='confirmPassword' placeholder="Confirm Password" />
                                </div>
                                <div className="input-row center-row">
                                    <input className="input" type='text' value={this.state.firstName} onChange={this.handleInputChange} name='firstName' placeholder="First Name" />
                                    <input className="input" type='text' value={this.state.lastName} onChange={this.handleInputChange} name='lastName' placeholder="Last Name" />
                                </div>
                                <div className="input-row center-row">
                                    <label for="age" className="agelabel">Your age:</label>
                                    <input className="input" type='number' name='age' onChange={this.handleInputChange} value={this.state.age} placeholder="Type age here" />
                                </div>
                                <div className="input-row center-row">
                                    <label for="gender" className="genderlabel">Your gender:</label>

                                </div>
                                <div className="input-row center-row match-container">
                                    <MultiSelect
                                        options={genderPreferenceOptions}
                                        value={this.state.selectedGenderPreference}
                                        onChange={this.setSelectedPreferences}
                                        labelledBy="Select Gender Preferences"
                                        className="match-width"
                                        hasSelectAll={true}
                                    />
                                </div>

                                <div className="center-row padding-top-1rem">
                                    <div className="divider ">
                                    </div>
                                </div>
                                <div className="input-row center-row">
                                    <button className="full-width-button red" type="submit">Register!</button>
                                </div>
                                <div className="center-row">
                                    <span className="error-span">{this.state.feedback}</span>
                                </div>
                                <div className="row center-row">
                                    <Link to="/" className="route-link">Back to Login </Link>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
                <div className="page-gradient">

                </div>
            </div>
        );
    }
}

export default RegisterPage;

