import React, {Component} from 'react';
import './SignIn.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';


//Define a Login Component
class SignIn extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailID : "",
            password : "",
            authFlag : false,
            checkboxState: true
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            emailID : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    onSubmit(event) {
        event.preventDefault();
    }
      /* callback to change the checkboxState to false when the checkbox is checked */
    toggle(event) {
        this.setState({
            checkboxState: !this.state.checkboxState
        });
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            emailID : this.state.emailID,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/SignIn',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/TravelLogin"/>
        }
        const checkedOrNot = [];
        checkedOrNot.push(
            <p>{this.state.checkboxState ? 'Unchecked' : 'Checked'}</p>
        );
        const checkbox = (
            <span>
                <input 
                    type="checkbox"
                    onClick={this.toggle.bind(this)}
                    checked
                />
                 Keep me Signed in
            </span>
        );
        return(
            <div class='signin-first-div'>
                {redirectVar}
                <div class="row signin-row">
                    <div class="col-sm-11">
                        <img class="signin-image1" height="60" width="175" src={require("../Images/logo3.png")}/>
                    </div>
                    <div class="col-sm-1">
                        <img height="60" width="70" src={require("../Images/logo1.png")}/>
                    </div>
                </div>
                <div class="container">
                    <div class="signin-header">
                        <h1>Log in to HomeAway</h1>
                        <h2>Need an account? <a href='/SignUp'>SignUp</a></h2>
                    </div>
                    <div class="signin-form">
                        <div class="signin-div">
                            <div class="signin-account-div">
                                <p>Account Login</p>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="emailID" placeholder="Email address"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div class="signin-pwd-div">
                                <p><a href='/SignUp'>Forgot password?</a></p>
                            </div>
                            <button onClick = {this.submitLogin} class="signin-btn">Log In</button>
                            <div class="signin-checkbox-div">
                                <form onSubmit={this.onSubmit.bind(this)}>
                                    {checkbox}
                                </form>
                            </div>
                            <p class='signin-line-div'>or</p>
                            <div>
                                <label><img class="signin-fb" height="49" width="330" src={require('../Images/fb.png')}/></label>
                                <label><img class="signin-google" height="48" width="330" src={require('../Images/google.png')}/></label>             
                            </div>
                            <h6 class='signin-msg1-div'>We don't post anything without your permission.</h6>
                        </div>
                    </div>
                    <div class='signin-lastmsg-div'>
                        <h7>Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.</h7><br></br>
                        <h7>©2018 HomeAway. All rights reserved.</h7>
                    </div>
                </div>
            </div>
        )
    }
}

//export Login Component
export default SignIn;

