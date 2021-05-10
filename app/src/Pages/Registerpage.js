import { faPooStorm } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import UserToken from "../Components/UserToken.js"
import MultiSelect from "react-multi-select-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';


let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"


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
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            errors: "",
            age: 18,
            feedback: " ",
            genderIdentity: "",
            maleGenderPref: false,
            femaleGenderPref: false,
            otherGenderPref: false,
            redirect: false,
            securityQs: false,
            q1_select: "",
            q2_select: "",
            a1: "",
            a2: ""
        }
        this.registerAccount = this.registerAccount.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.filterInputs = this.filterInputs.bind(this)
        this.checkSecurity = this.checkSecurity.bind(this);
    }

    logIn() {
        // console.log("Login event")
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
                // console.log(responseData)
                // TODO: handle case where login is invalid
                if (JSON.stringify(responseData.error) === '{}') {
                    console.log("in reigster page log in with results " + responseData.results)
                    UserToken.setUserId(responseData.results[0].userId)
                    UserToken.setUserName(responseData.results[0].firstName + " " + responseData.results[0].lastName)
                    UserToken.setUserEmail(responseData.results[0].email)
                    UserToken.setUserPhoneNumber(responseData.results[0].phoneNumber)
                    this.setState({ redirect: true })
                }
            })
    //   .then(sendEmail()) <--uncomment when backend is set up 
}
// sendEmail(){
//     fetch(`dummyAPIemailURL/email`, {
//         method: 'POST',
//         headers: {
//           accept: 'application/json', 
//           'content-type': 'application/json'
//         },
//         body: JSON.stringify({ email: this.state.email })
//       })
//       .then(res => res.json())  
//       .then(data => {
        
       
//         this.setState({ sendingEmail: false})
//         notify.show(data.msg)
//         this.form.reset()
//       })
//       .catch(err => console.log(err))

//       .then(this.setState({confirm: true}))
// }

    

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
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
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
    filterGenderIdentity() {
        if (this.state.genderIdentity=="") {
            this.setState({
                feedback: "Please indicate your gender."
            })
            return false;

        }
        return true;
    }
    filterGenderPreference() {
        if (this.state.maleGenderPref==false && this.state.femaleGenderPref==false && this.otherGenderPref==false) {
            this.setState({
                feedback: "Please indicate your preferred gender for matching."
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
        let genderIdentityCheck = this.filterGenderIdentity();
        let filterPhoneNumber = this.filterPhoneNumber()
        let genderPreferenceCheck = this.filterGenderPreference()
        if (ageFilter && nameFilter && emailFilter && passwordFilter && confirmPassWordCheck && genderIdentityCheck && genderPreferenceCheck && filterPhoneNumber) {
            this.setState({
                securityQs: true,
                feedback: ""
            })
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        else {
            // console.log("Filters failed")
            window.scrollTo({
                top: 300,
                behavior: "smooth"
            })
        }
    }
    
    filterSecurity(){
        if(this.state.q1_select === this.state.q2_select || this.state.q1_select === "" || this.state.q1_select === ""){
            this.setState({
                feedback: "Please select two different security questions."
            });
            window.scrollTo({
                top: 200,
                behavior: "smooth"
            })
        }
        var regex = /^[ a-zA-Z\-\’]+$/;
        if (!regex.test(this.state.a1) || !regex.test(this.state.a2)) {
            this.setState({
                feedback: "Please enter a valid answer for both questions."
            })
            window.scrollTo({
                top: 200,
                behavior: "smooth"
            })
            return false;
        }
        return true;
    }

    checkSecurity(event){
        event.preventDefault();

        //filter answers & send questions to backend
        if(this.filterSecurity()){
            let url = baseDomain + '/securityQuestions/send'
            let a1 = this.state.a1; let a2 = this.state.a2;
            let q1 = this.state.q1_select; let q2 = this.state.q2_select;
            let newRequest = {
                "email": this.state.email,
                "a1": a1,
                "a2": a2,
                "q1": q1,
                "q2": q2
            }
            // console.log("securityQ: "+ newRequest)
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
                    if (JSON.stringify(responseData.error) !== '{}') {
                        this.setState({
                            feedback: "Problem uploading security questions to server 🤒"
                        })
                    } else {
                        this.setState({
                            feedback: "Registering account..."
                        })
                        this.registerAccount()
                    }
                })
        }
        //then call registerAccount();
    }

    registerAccount() {
        let url = baseDomain + '/user/register'
        let newRequest = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "phoneNumber": this.state.phoneNumber,
            "password": this.state.password,
            "age": this.state.age,
            "genderIdentity": this.state.genderIdentity,
            "maleGenderPref": this.state.maleGenderPref,
            "femaleGenderPref": this.state.femaleGenderPref,
            "otherGenderPref": this.state.otherGenderPref,
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

    filterPhoneNumber(){
        var regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!regex.test(this.state.phoneNumber)) {
            this.setState({
                feedback: "Please enter valid phone number."
            })
            return false;
        }
        return true;
}

    handleInputChange(event) {
        event.preventDefault();
        let target = event.target;
        let value = target.value
        let name = target.name;
        if (name=="maleGenderPref" || name=="femaleGenderPref" || name=="otherGenderPref") {
                let checkValue = event.target.checked;
                // console.log('name ' + name + 'value '+ checkValue)
                let setValue = false
                this.setState({
                    [name]: checkValue
                });
        } else{
            this.setState({
                [name]: value
            });
        }
       
    }


    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect
                to="/editsettings"
            />
        }

        let registerform;
        
        if(!this.state.securityQs) {
        registerform =
            <form onSubmit={this.filterInputs}>
                <div className="input-row center-row">
                    <h2 className="font-red">Register for Bear Hugs</h2>
                </div>

                <div className="input-row center-row">
                    <input className="input" type='text' value={this.state.email} onChange={this.handleInputChange} name='email' placeholder="yourwustlemail@wustl.edu" />
                </div>
                <div className="input-row center-row">
                    <input className="input" type='tel' pattern="[0-9]{10}" value={this.state.phoneNumber} onChange={this.handleInputChange} name='phoneNumber' placeholder="##########" />
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
                    <input className="input" type='number' name='age' onChange={this.handleInputChange} value={this.state.age} placeholder="Type age here" />
                </div>
                <div className="input-row center-row">
                    <select defaultValue={this.state.genderIdentity} id="gender_select"
                        name="genderIdentity" onChange={this.handleInputChange} className="input">
                        <option value="" disabled>Your Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                
                <div className="input-row center-row match-width">
                    <Form.Group>
                        <div>
                        <Form.Label>Gender Preference for Matching</Form.Label>
                        </div>
                    <Form.Check inline label="Male" name="maleGenderPref" onChange={this.handleInputChange} id="male_gender_pref"  checked={this.state.maleGenderPref} />
                    <Form.Check inline label="Female" name="femaleGenderPref" onChange={this.handleInputChange} id="female_gender_pref"  checked={this.state.femaleGenderPref} />
                    <Form.Check inline label="Other" name="otherGenderPref" onChange={this.handleInputChange} id="other_gender_pref" checked={this.state.otherGenderPref} />
                    </Form.Group>
                </div>

                <div className="center-row padding-top-1rem">
                    <div className="divider ">
                    </div>
                </div>
                <div className="input-row center-row">
                    <button className="full-width-button red" type="submit">Register!</button>
                </div>
            </form>
        }
        else{
        registerform=
            <form onSubmit={this.checkSecurity}>
                <div className="input-row center-row">
                    <h2 className="font-red">Security Questions</h2>
                </div>

                <p><i>Looks good! Now just 2 security questions, in case you ever forget your password.</i></p>
                <div className="input-row center-row">
                    <select defaultValue="" id="q1_select"
                        name="q1_select" onChange={this.handleInputChange} className="input">
                        <option value="" disabled>Question 1</option>
                        <option value="Your mom's maiden name">Your mom's maiden name:</option>
                        <option value="Your best friend in kindergarten">Your best friend in kindergarten:</option>
                        <option value="Favorite type of nut">Favorite type of nut:</option>
                        <option value="Name of your first kiss">Name of your first kiss:</option>
                        <option value="Dream job">Dream job:</option>
                    </select>
                </div>
                <div className="input-row center-row">
                    <input className="input" type='text' value={this.state.a1} onChange={this.handleInputChange} name='a1' placeholder="Answer" />
                </div>
                <div className="input-row center-row">
                    <select defaultValue="" id="q2_select"
                        name="q2_select" onChange={this.handleInputChange} className="input">
                        <option value="" disabled>Question 2</option>
                        <option value="Your mom's maiden name">Your mom's maiden name:</option>
                        <option value="Your best friend in kindergarten">Your best friend in kindergarten:</option>
                        <option value="Favorite type of nut">Favorite type of nut:</option>
                        <option value="Name of your first kiss">Name of your first kiss:</option>
                        <option value="Dream job">Dream job:</option>
                    </select>
                </div>
                <div className="input-row center-row">
                    <input className="input" type='text' value={this.state.a2} onChange={this.handleInputChange} name='a2' placeholder="Answer" />
                </div>
                

                <div className="center-row padding-top-1rem">
                    <div className="divider ">
                    </div>
                </div>
                <div className="input-row center-row">
                    <button className="full-width-button red" type="submit">Register!</button>
                </div>
            </form>
        }
        return (
            <div className="page">

                <div className="row center-row">
                    <div className="col center-col padding-5rem">
                        <div className="box margin-5rem ">
                            
                            {registerform}

                                <p className="center"><Link to="/" className="route-link">Back to Login </Link></p>
                                <div className="feedback-wrapper">
                                    <p>{this.state.feedback}</p>
                                </div>
                                    


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

