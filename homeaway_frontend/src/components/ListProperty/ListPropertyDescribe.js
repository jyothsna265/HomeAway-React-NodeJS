import React, {Component} from 'react';
import './ListProperty.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {MenuItem,  DropdownButton, Glyphicon, Button} from 'react-bootstrap';
import ListPropertySidebar from './ListPropertySidebar';

class ListPropertyDescribe extends Component {
    constructor(props){
    //Call the constrictor of Super class i.e The Component
        super(props);
    //maintain the state required for this component
        this.state = {
            headline : '',
            propdesc : '',
            proptype : '',
            noofrooms : '',
            noofpeople : '',
            noofbathrooms : '',
            listPropertyFlag2 : false,
        }
        //Bind the handlers to this class
        this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
        this.propDescChangeHandler = this.propDescChangeHandler.bind(this);
        this.propTypeChangeHandler = this.propTypeChangeHandler.bind(this);
        this.noOfRoomsChangeHandler = this.noOfRoomsChangeHandler.bind(this);
        this.noOfPeopleChangeHandler = this.noOfPeopleChangeHandler.bind(this);
        this.noOfBathroomsChangeHandler = this.noOfBathroomsChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
  
  //Call the Will Mount to set the auth Flag to false
  componentWillMount(){
    this.setState({
        listPropertyFlag2 : false
    })
  }
  //address change handler to update state variable with the text entered by the user
  headlineChangeHandler = (e) => {
    this.setState({
      headline : e.target.value
    })
  }
  propDescChangeHandler = (e) => {
    this.setState({
      propdesc : e.target.value
    })
  }
  propTypeChangeHandler = (e) => {
    this.setState({
        proptype : e.target.value
    })
  }
  noOfRoomsChangeHandler = (e) => {
    this.setState({
        noofrooms : e.target.value
    })
  }
  noOfPeopleChangeHandler = (e) => {
    this.setState({
        noofpeople : e.target.value
    })
  }
  noOfBathroomsChangeHandler = (e) => {
    this.setState({
        noofbathrooms : e.target.value
    })
  }
  
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        headline : this.state.headline,
        propdesc : this.state.propdesc,
        proptype : this.state.proptype,
        noofrooms : this.state.noofrooms,
        noofpeople : this.state.noofpeople,
        noofbathrooms : this.state.noofbathrooms,
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/ListPropertyDescribe',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    listPropertyFlag2 : true
                })
            }else{
                this.setState({
                    listPropertyFlag2 : false
                })
            }
        });
}

  render () {
    let redirectVar = null;
    if(this.state.listPropertyFlag2){
        redirectVar = <Redirect to= "/ListPropertyAvailability"/>
        console.log(redirectVar);
    }
    return ( 
        <div class="listproperty-first-div">
            {redirectVar}
            <ListPropertySidebar/>
            <div class="container">
                <div class="listproperty-form2">
                    <div class="listproperty-div2">
                        <div class="panel">
                            <h2 class="listproperty-h2">Describe your property</h2> 
                        </div>
                        <p>Start out with a descriptive headline and a detailed summary of your property.</p>
                        <div class="form-group">
                            <input onChange = {this.headlineChangeHandler} type="text" name="headline" class="form-control2" placeholder="Headline"/>
                        </div>
                        <div class="form-group">
                            <input onChange = {this.propDescChangeHandler} type="text" name="propdesc" class="form-control3" placeholder="Property Description"/>
                        </div>
                        <div class="form-group">
                            <input onChange = {this.propTypeChangeHandler} type="text" name="proptype" class="form-control6" placeholder="Property Type"/>
                        </div>
                        <div class="form-group">
                            <input onChange = {this.noOfRoomsChangeHandler} type="text" name="noofrooms" class="form-control6" placeholder="Bedrooms"/>
                        </div>
                        <div class="form-group">
                            <input onChange = {this.noOfPeopleChangeHandler} type="text" name="noofpeople" class="form-control6" placeholder="Accomodates"/>
                        </div>
                        <div class="form-group">
                            <input onChange = {this.noOfBathroomsChangeHandler} type="text" name="noofbathrooms" class="form-control6" placeholder="Bathrooms"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="listproperty-btndiv">
                <button onClick = {this.submitLogin} class="lisproperty-btn">Save changes</button> 
            </div>
        </div>       
      )
    }
}

export default ListPropertyDescribe;