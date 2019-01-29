import React, {Component} from 'react';
import './ListProperty.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {MenuItem,  DropdownButton, Glyphicon, Button} from 'react-bootstrap';
import ListPropertySidebar from './ListPropertySidebar';

class ListPropertyAvailability extends Component {
    constructor(props){
    //Call the constrictor of Super class i.e The Component
        super(props);
    //maintain the state required for this component
        this.state = {
            startdate : '',
            enddate : '',
            listPropertyFlag3 : false,
        }
        //Bind the handlers to this class
        this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
        this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
  
  //Call the Will Mount to set the auth Flag to false
  componentWillMount(){
    this.setState({
        listPropertyFlag3 : false
    })
  }
  
  
  startdateChangeHandler = (e) => {
    this.setState({
        startdate : e.target.value
    })
  }
  enddateChangeHandler = (e) => {
    this.setState({
        enddate : e.target.value
    })
  }
  
  
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        startdate : this.state.startdate,
        enddate : this.state.enddate,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/ListPropertyAvailability',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    listPropertyFlag3 : true
                })
            }else{
                this.setState({
                    listPropertyFlag3 : false
                })
            }
        });
}

  render () {
    let redirectVar = null;
    if(this.state.listPropertyFlag3){
        redirectVar = <Redirect to= "/ListPropertyCharges"/>
        console.log(redirectVar);
    }

      return (
       
        <div class="listproperty-first-div">
            {redirectVar}
        <ListPropertySidebar/>
            <div class="container">
                <div class="listproperty-form3">
                    <div class="listproperty-div3">
                        <div class="panel">
                            <h1>Availability</h1>
                        </div>
                        <h2>Already know when you would like your property to be available?</h2>
                        <h2>You can also make changes after publishing your listing.</h2>
                        <div class="listproperty-date">
                            <div class="form-group listproperty-left">
                                <label class="listproperty-label1">Start date:</label>
                                <input onChange = {this.startdateChangeHandler} type="date" name="startdate" class="form-control3" placeholder="Start Date"/>
                            </div>
                            <div class="form-group listproperty-right">
                                <label class="listproperty-label2">End date:</label>
                                <input onChange = {this.enddateChangeHandler} type="date" name="enddate" class="form-control3" placeholder="End Date"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="listproperty-btndiv">
                    <button onClick = {this.submitLogin} class="lisproperty-btn">Save changes</button> 
                </div>
            </div>
        </div>     
      )
    }
}

export default ListPropertyAvailability;