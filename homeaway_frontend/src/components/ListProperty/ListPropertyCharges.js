import React, {Component} from 'react';
import './ListProperty.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {MenuItem,  DropdownButton, Glyphicon, Button} from 'react-bootstrap';
import ListPropertySidebar from './ListPropertySidebar';

class ListPropertyCharges extends Component {
    constructor(props){
    //Call the constrictor of Super class i.e The Component
        super(props);
    //maintain the state required for this component
        this.state = {
            currency : '',
            baserate : '',
            minstay : '',
            cleaningfee : '',
            successMsg : '',
            listPropertyFlag4 : false,
        }
        //Bind the handlers to this class
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
        currency : this.state.currency,
        baserate : this.state.baserate,
        minstay : this.state.minstay,
        cleaningfee : this.state.cleaningfee
    }
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/ListPropertyCharges',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                  listPropertyFlag : true,
                  successMsg : "Property was listed Successfully!!"
                })
            }else{
                this.setState({
                  listPropertyFlag : false,
                  successMsg : "Sorry!! Unable to List the Property, Try again!!"
                })
            }
        });
}

  render () {

      return (
       
        <div class="listproperty-first-div">
            <ListPropertySidebar/>
            <div class="container">
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
                <div class="listproperty-successmsg">
                    {this.state.successMsg}
                </div>
            </div>
        </div>    
      )
    }
}

export default ListPropertyCharges;