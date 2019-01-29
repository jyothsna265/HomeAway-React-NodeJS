import React, {Component} from 'react';
import './ListProperty.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {MenuItem,  DropdownButton, Glyphicon, Button} from 'react-bootstrap';
import ListPropertySidebar from './ListPropertySidebar';

class ListPropertyWelcome extends Component {
    constructor(props){
    //Call the constrictor of Super class i.e The Component
        super(props);
    //maintain the state required for this component
        this.state = {
            address : '',
            listPropertyFlag1 : false,
        }
        //Bind the handlers to this class
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
  
  //Call the Will Mount to set the auth Flag to false
  componentWillMount(){
    this.setState({
      listPropertyFlag1 : false
    })
  }
  //address change handler to update state variable with the text entered by the user
  addressChangeHandler = (e) => {
    this.setState({
        address : e.target.value
    })
  }
  
  
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        address : this.state.address,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/ListPropertyWelcome',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                  listPropertyFlag1 : true
                })
            }else{
                this.setState({
                  listPropertyFlag1 : false
                })
            }
        });
}

  render () {
    let redirectVar = null;
    if(this.state.listPropertyFlag1){
        redirectVar = <Redirect to= "/ListPropertyDescribe"/>
        console.log(redirectVar);
    }

      return (
        <div class="listproperty-first-div">
          {redirectVar}
              <ListPropertySidebar/>
                <div class="container">
                  <div class="listproperty-form1">
                    <div class="listproperty-div1">
                      <div class="panel">
                        <h1 class="listproperty-h1"> Welcome! Verify the location of your rental</h1>
                      </div>
                      <div class="form-group">
                        <label class="listproperty-label7">Address:</label>
                        <input onChange = {this.addressChangeHandler} type="text" name="address" class="form-control1" placeholder="Enter your address"/>
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

export default ListPropertyWelcome;