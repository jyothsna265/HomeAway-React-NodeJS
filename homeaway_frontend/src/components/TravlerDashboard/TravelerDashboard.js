import React,{Component} from 'react';
import './TravelerDashboard.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {MenuItem, Dropdown, DropdownButton, Button} from 'react-bootstrap';
import DetailsComponent from '../DetailsView/DetailsComponent';

class TravelerDashboard extends Component {
    constructor(){
        super();
        this.state = {  
            travPropertyDetails : [],
            place : ''
        }
    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/TravelerDashboard')
                .then((response) => {
                    console.log("response",response.data);
                //update the state with the response data
                this.setState({
                    travPropertyDetails : this.state.travPropertyDetails.concat(response.data) 
                });
                console.log("PropertyDetails within TravelerDashboard FE",this.state.travPropertyDetails);
            });
    }

    render() {
        let travPropDetails = this.state.travPropertyDetails.map(travPropertyDetails => {
            return (
                <DetailsComponent>{travPropertyDetails.headline}{travPropertyDetails.proptype}{travPropertyDetails.noofrooms}{travPropertyDetails.noofbathrooms}{travPropertyDetails.accomodates}{travPropertyDetails.baserate}{travPropertyDetails.propertyID}</DetailsComponent>
            )
        })
        return (
            <div class="travdash-first-div">
                <div class="row travdash-row1">
                    <div class="col-sm-5 travdash-logo-col1">
                        <Link to="/"><img height="50" width="170" src={require('../Images/logo3.png')}/></Link>
                    </div>
                    <div class="col-sm-1 travdash-link">
                        <Link to="/TravelerDashboard">Trip Boards</Link>
                    </div>
                    <div class="col-sm-2 travdash-dropdown1">
                       <DropdownButton bsStyle="primary" title="My Account">
                            <MenuItem eventKey="1">Inbox</MenuItem>
                            <MenuItem eventKey="2">My trips</MenuItem>
                            <MenuItem eventKey="3"><Link to="/UserProfile">My profile</Link></MenuItem>
                            <MenuItem eventKey="4">Accounts</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="5">Owner Dashboard</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="6"><Link to="/">Logout</Link></MenuItem>
                        </DropdownButton>
                    </div>
            
                    <div class="col-sm-1 travdash-dropdown2">
                        <DropdownButton bsStyle="primary" title="Help">
                            <MenuItem eventKey="1">Visit help center</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="2">Travelers</MenuItem>
                            <MenuItem eventKey="3">How it works</MenuItem>
                            <MenuItem eventKey="4">Security Center</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="5">Homeowners</MenuItem>
                            <MenuItem eventKey="6">How it works</MenuItem>
                            <MenuItem eventKey="7">List your property</MenuItem>
                            <MenuItem eventKey="8">Community</MenuItem>
                            <MenuItem eventKey="9">Discovery Hub</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="10">Property managers</MenuItem>
                            <MenuItem eventKey="11">List your properties</MenuItem>
                        </DropdownButton>
                    </div>
                    <div class="col-sm-2">
                        <button class="travdash-nav-btn"><Link to="./ListProperty">List your property</Link></button>
                    </div>
                    <div class="col-sm-1 travdash-logo-col2">
                        <img height="60" width="60" src={require("../Images/logo1.png")}/>
                    </div>
                </div>
                <div class="travdash-sec-div">
                    <h1>Trip Boards</h1>
                    <h2>Trip Boards help you keep track of the places you love.</h2>
                </div>
                <div class="travdash-third-div">
                    <h3>You've booked the below listed properties</h3>
                </div>
                <div>
                {travPropDetails}
                </div>
            </div>
        
        )
    }
}

export default TravelerDashboard;