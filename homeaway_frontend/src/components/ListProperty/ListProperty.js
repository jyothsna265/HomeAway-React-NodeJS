import React, {Component} from 'react';
import './ListProperty.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {MenuItem,  DropdownButton, Glyphicon, Button} from 'react-bootstrap';

class ListProperty extends Component {
    constructor(props){
    //Call the constrictor of Super class i.e The Component
        super(props);
    //maintain the state required for this component
        this.state = {
            address : '',
            headline : '',
            propdesc : '',
            proptype : '',
            noofrooms : '',
            noofpeople : '',
            noofbathrooms : '',
            startdate : '',
            enddate : '',
            currency : '',
            baserate : '',
            minstay : '',
            cleaningfee : '',
            listPropertyFlag : false,
        }
        //Bind the handlers to this class
        this.addressChangeHandler = this.addressChangeHandler.bind(this);
        this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
        this.propDescChangeHandler = this.propDescChangeHandler.bind(this);
        this.propTypeChangeHandler = this.propTypeChangeHandler.bind(this);
        this.noOfRoomsChangeHandler = this.noOfRoomsChangeHandler.bind(this);
        this.noOfPeopleChangeHandler = this.noOfPeopleChangeHandler.bind(this);
        this.noOfBathroomsChangeHandler = this.noOfBathroomsChangeHandler.bind(this);
        this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
        this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
        this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
        this.baserateChangeHandler = this.baserateChangeHandler.bind(this);
        this.minstayChangeHandler = this.minstayChangeHandler.bind(this);
        this.cleaningfeeChangeHandler = this.cleaningfeeChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
  
  //Call the Will Mount to set the auth Flag to false
  componentWillMount(){
    this.setState({
      listPropertyFlag : false
    })
  }
  //address change handler to update state variable with the text entered by the user
  addressChangeHandler = (e) => {
    this.setState({
        address : e.target.value
    })
  }
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
  currencyChangeHandler = (e) => {
    this.setState({
        currency : e.target.value
    })
  }
  baserateChangeHandler = (e) => {
    this.setState({
        baserate : e.target.value
    })
  }
  minstayChangeHandler = (e) => {
    this.setState({
        minstay : e.target.value
    })
  }
  cleaningfeeChangeHandler = (e) => {
    this.setState({
        cleaningfee : e.target.value
    })
  }
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        address : this.state.address,
        headline : this.state.headline,
        propdesc : this.state.propdesc,
        proptype : this.state.proptype,
        noofrooms : this.state.noofrooms,
        noofpeople : this.state.noofpeople,
        noofbathrooms : this.state.noofbathrooms,
        startdate : this.state.startdate,
        enddate : this.state.enddate,
        currency : this.state.currency,
        baserate : this.state.baserate,
        minstay : this.state.minstay,
        cleaningfee : this.state.cleaningfee
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/ListProperty',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                  listPropertyFlag : true
                })
            }else{
                this.setState({
                  listPropertyFlag : false
                })
            }
        });
}

  render () {
    let redirectVar = null;
    if(this.state.listPropertyFlag){
        redirectVar = <Redirect to= "/OwnersDashboard"/>
        console.log(redirectVar);
    }

      return (
       
        <div class="listproperty-first-div">
          {redirectVar}
          <div class="row listproperty-row">
              <div class="col-sm-1">
                  <span class="glyphicon glyphicon-align-left listglyphicon1"></span>
              </div>
              <div class="col-sm-6 listproperty-col1">
                  <img class="listproperty-img1" height="40" width="175" src={require("../Images/Homeaway_logo.png")}/>
              </div>
              <div class="col-sm-2 listglyphicon3">
                <Link to="/ListProperty" class="listglyphicon3">Add new property</Link>
              </div>
              <div class="col-sm-2">
                  <Link to="/" class="listglyphicon2"><span class="glyphicon glyphicon-user listglyphicon2"></span>Sign Out</Link>
              </div>
              <div class="col-sm-1">
                  <span class="glyphicon glyphicon-th listglyphicon1"></span>
              </div>
            </div>
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
                  <div class="listproperty-form4">
                    <div class="listproperty-div4">
                      <div class="panel">
                        <h1>How much do you want to charge?</h1>
                      </div>
                      <h2>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</h2>
                      <div class="form-group">
                        <label class="listproperty-label3">Currency:</label>
                        <input onChange = {this.currencyChangeHandler} type="text" name="currency" class="form-control4" placeholder="Currency"/>
                      </div>
                      <div class="form-group">
                        <label class="listproperty-label4">Nightly Base Rate:</label>
                        <input onChange = {this.baserateChangeHandler} type="text" name="baserate" class="form-control4" placeholder="Nightly Base rate"/>
                      </div>
                      <div class="form-group">
                        <label class="listproperty-label5">Minimum Stay:</label>
                        <input onChange = {this.minstayChangeHandler} type="text" name="minstay" class="form-control4" placeholder="Minimum Stay"/>
                      </div>
                    </div>
                  </div>
                  <div class="listproperty-form5">
                    <div class="listproperty-div5">
                      <div class="panel">
                        <h1>Fees</h1>
                      </div>
                      <h2>You can add fees to your listing or skip this step. Additional fees can be added later.</h2>
                      <div class="form-group">
                        <label class="listproperty-label6">Cleaning Fee:</label>
                        <input onChange = {this.cleaningfeeChangeHandler} type="text" name="cleaningfee" class="form-control5" placeholder="Cleaning Fee"/>
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

export default ListProperty;