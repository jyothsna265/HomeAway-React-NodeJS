import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { MenuItem, DropdownButton} from 'react-bootstrap';
import axios from 'axios';
import './UserProfile.css';

class UserProfile extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            firstname : "",
            lastname : "",
            aboutme : "",
            mycountry : "",
            company : "",
            school : "",
            hometown : "",
            languages : "",
            gender : "",
            phonenum : "",
            emailID : "",
            successMsg : "",
            userProfileFlag : false
        }
        //Bind the handlers to this class
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
        this.mycountryChangeHandler = this.mycountryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.phonenumChangeHandler = this.phonenumChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    
    //firstname change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }
    //lastname change handler to update state variable with the text entered by the user
    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value
        })
    }
    //aboutme change handler to update state variable with the text entered by the user
    aboutmeChangeHandler = (e) => {
        this.setState({
            aboutme : e.target.value
        })
    }
    //mycountry change handler to update state variable with the text entered by the user
    mycountryChangeHandler = (e) => {
        this.setState({
            mycountry : e.target.value
        })
    }
    //company change handler to update state variable with the text entered by the user
    companyChangeHandler = (e) => {
        this.setState({
            company : e.target.value
        })
    }
    //school change handler to update state variable with the text entered by the user
    schoolChangeHandler = (e) => {
        this.setState({
            school : e.target.value
        })
    }
    //hometown change handler to update state variable with the text entered by the user
    hometownChangeHandler = (e) => {
        this.setState({
            hometown : e.target.value
        })
    }
    //languages change handler to update state variable with the text entered by the user
    languagesChangeHandler = (e) => {
        this.setState({
            languages : e.target.value
        })
    }
    //gender change handler to update state variable with the text entered by the user
    genderChangeHandler = (e) => {
        this.setState({
            gender : e.target.value
        })
    }
    //phonenum change handler to update state variable with the text entered by the user
    phonenumChangeHandler = (e) => {
        this.setState({
            phonenum : e.target.value
        })
    }
    //Email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            emailID : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            aboutme : this.state.aboutme,
            mycountry : this.state.mycountry,
            company : this.state.company,
            school : this.state.school,
            hometown : this.state.hometown,
            languages : this.state.languages,
            gender : this.state.gender,
            phonenum : this.state.phonenum,
            emailID : this.state.emailID
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/UserProfile',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        userProfileFlag : true,
                        successMsg : "Profile information is successfully updated"
                    })
                }else{
                    this.setState({
                        userProfileFlag : false,
                        successMsg : "Profile information is not updated"
                    })
                }
            });
    }

    render(){   
        return(
            <div class="user-first-div">
                <div class="row user-row1">
                    <div class="col-sm-5">
                        <Link to="/"><img height="50" width="175" src={require("../Images/HomeAway.png")}/></Link>
                    </div>
                    <div class="col-sm-2 user-col2">
                        <Link to="./TravelerDashboard">Trip Boards</Link>
                    </div>
                    <div class="col-sm-2 user-dropdown1">
                        <DropdownButton bsStyle="primary" title="My Account">
                            <MenuItem eventKey="1"><Link to="/TravelLogin">Homepage</Link></MenuItem>
                            <MenuItem eventKey="2"><Link to="/TraverlerDashboard">My trips</Link></MenuItem>
                            <MenuItem eventKey="3"><Link to="/UserProfile">My profile</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="5"><Link to="/OwnersDashboard">Owners Dashboard</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="6"><Link to="/" class="glyphicon glyphicon-log-out"> Logout</Link></MenuItem>
                        </DropdownButton>
                    </div>
                    <div class="col-sm-2">
                        <button class="user-nav-btn"><Link to="./ListProperty">List your property</Link></button>
                    </div>
                    <div class="col-sm-1 user-logo-col2">
                        <img height="50" width="50" src={require("../Images/logo1.png")}/>
                    </div>
                </div>
                <div class="row user-row2">
                    <div class="col-sm-1">
                    
                    </div>
                    <div class="col-sm-1">
                        <label>Inbox</label>
                    </div>
                    <div class="col-sm-1">
                        <label><Link to="/TraverlerDashboard">My Trips</Link></label>
                    </div>
                    <div class="col-sm-1">
                        <label><Link to="/UserProfile">Profile</Link></label>
                    </div>
                    <div class="col-sm-1">
                        <label>Account</label>
                    </div>
                    <div class="col-sm-7">

                    </div>
                </div>
                <div class="user-form">
                    <div class="user-main-div">
                        <div class="user-div1">
                            <img class="user-img1" height="150" width="125" src={require("../Images/logo4.png")}/>
                            <h1>Jyothsna Chowdary</h1>
                            <h3>Member since 2018</h3>
                        </div>
                        <div class="container">
                            <div class="user-ad-left">
                                <h2>Profile Information</h2>
                                <div class="form-group">
                                    <input onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder="First Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.lastnameChangeHandler} type="text" class="form-control" name="lastname" placeholder="Last Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.aboutmeChangeHandler} type="text" class="form-control1" name="aboutme" placeholder="About Me"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.mycountryChangeHandler} type="text" class="form-control" name="mycountry" placeholder="My City, Country"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.companyChangeHandler} type="text" class="form-control" name="company" placeholder="Company"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.schoolChangeHandler} type="text" class="form-control" name="school" placeholder="School"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.hometownChangeHandler} type="text" class="form-control" name="hometown" placeholder="Hometown"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.languagesChangeHandler} type="text" class="form-control" name="languages" placeholder="Languages"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.genderChangeHandler} type="text" class="form-control" name="gender" placeholder="Gender"/>
                                </div>
                                <img class="user-img2" height="100" width="500" src={require("../Images/Profile4.png")}/>
                                <div class="form-group">
                                    <input onChange = {this.phonenumChangeHandler} type="text" class="form-control" name="phonenum" placeholder="Phone number"/>
                                    <h4><a href="/SignIn">Add another phone number</a></h4><br/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="emailID" placeholder="Email ID"/>
                                </div>
                            </div>
                            <div class="user-ad-right">
                                <div class="col-row1">
                                    <img height="400" width="350" src={require("../Images/Profile1.png")}/>
                                </div>
                                <div class="col-row2">
                                    <img height="100" width="350" src={require("../Images/Profile2.png")}/>
                                </div>
                                <div class="col-row3">
                                    <img height="500" width="350" src={require("../Images/Profile3.png")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick = {this.submitLogin} class="user-btn">Save Changes</button>
                    <div class="userprofile-successmsg">
                        {this.state.successMsg}
                    </div>
                </div>
            </div>   
        )
    }
}

export default UserProfile;