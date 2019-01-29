import React, {Component} from 'react';
import './OwnersSignIn.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class OwnersSignIn extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            emailID : "",
            password : "",
            ownersSignFlag : false
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            ownersSignFlag : false
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
        axios.post('http://localhost:3001/OwnersSignIn',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        ownersSignFlag : true
                    })
                }else{
                    this.setState({
                        ownersSignFlag : false
                    })
                }
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            console.log("Owner Sign Flag : ", this.state.ownersSignFlag);
            redirectVar = <Redirect to= "/ListPropertySidebar"/>
            console.log(redirectVar);
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
            <div class="owners-first-div">
                {redirectVar}
                <div class="row owners-row">
                    <div class="col-sm-11">
                        <img class="signin-image1" height="60" width="175" src={require("../Images/logo3.png")}/>
                    </div>
                    <div class="col-sm-1">
                        <img height="60" width="70" src={require("../Images/logo1.png")}/>
                    </div>
                </div>
                <div class="owners-container">
                    <div class="owners-div-left">
                        <img height="300" width="420" src={require('../Images/home1.png')}/>
                    </div>
                    <div class="owners-div-right">
                        <div class="container"> 
                            <div class="owners-form">
                                <div class="owners-main-div">
                                        <h1>Owner Login</h1>
                                    <div class="form-group">
                                        <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="emailID" placeholder="Email address"/>
                                    </div>
                                    <div class="form-group">
                                        <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                                    </div>
                                    <div class="owners-pwd-div">
                                        <p><a href='/SignUp'>Forgot password?</a></p>
                                    </div>
                                    <button onClick = {this.submitLogin} class="owners-btn">Log In</button> 
                                    <div class="owners-checkbox-div">
                                        <form onSubmit={this.onSubmit.bind(this)}>
                                            {checkbox}
                                        </form>
                                    </div>
                                    <h5 class='owners-msg1-div'>Want to list your property? <a href="/SignUp">Learn More</a></h5>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
                <div class='owners-lastmsg-div'>
                        <h7>Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.</h7><br></br>
                        <h7>©2018 HomeAway. All rights reserved.</h7>
                    </div> 
            </div>
        )
    }
}

//export Login Component
export default OwnersSignIn;

