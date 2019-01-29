import React,{Component} from 'react';
import './DetailsView.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {MenuItem, Dropdown, DropdownButton} from 'react-bootstrap';
import DetailsComponent from './DetailsComponent';

class DetailsView extends Component {
    constructor(){
        super();
        this.state = {  
            propertyDetails : [],
            place : ''
        }
        this.placeChangeHandler = this.placeChangeHandler.bind(this);

    }  
    //get the books data from backend  
    componentDidMount(){
        axios.get('http://localhost:3001/DetailsView')
                .then((response) => {
                    console.log("response",response.data);
                //update the state with the response data
                this.setState({
                    propertyDetails : this.state.propertyDetails.concat(response.data) 
                });
                console.log("PropertyDetails within DetailsView FE",this.state.propertyDetails);
            });
    }

    
    placeChangeHandler = (e) => {
        this.setState({
            place : e.target.value
        })
    }
  
    
    render() {
        let propDetails = this.state.propertyDetails.map(propertyDetails => {
            return (
                <DetailsComponent>{propertyDetails.headline}{propertyDetails.proptype}{propertyDetails.noofrooms}{propertyDetails.noofbathrooms}{propertyDetails.accomodates}{propertyDetails.baserate}{propertyDetails.propertyID}</DetailsComponent>
            )
        })
        let propDetailsAddress = this.state.propertyDetails.map(propertyDetails => {
            return (
                <tr>{propertyDetails.address}</tr>
            )
        }) 
        return (
            <div class="details-first-div">
                <div class="row details-row1">
                    <div class="col-sm-5 details-logo-col1">
                        <Link to="/"><img height="60" width="170" src={require('../Images/logo3.png')}/></Link>
                    </div>
                    <div class="col-sm-2 details-dropdown1">
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
            
                    <div class="col-sm-1 details-dropdown2">
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
                        <button class="details-nav-btn"><Link to="./ListProperty">List your property</Link></button>
                    </div>
                    <div class="col-sm-1 details-logo-col2">
                        <img height="60" width="60" src={require("../Images/logo1.png")}/>
                    </div>
                </div>
        
                <div class="row details-row2">
                    <div class="col-sm-4 details-info-col1">
                        {propDetailsAddress[0]}
                    </div>
                    <div class="col-sm-2 details-info-col2">
                        <span class="glyphicon glyphicon-calendar">Arrive</span>
                    </div>
                    <div class="col-sm-2 details-info-col3">
                        <span class="glyphicon glyphicon-calendar">Depart</span>
                    </div>
                    <div class="col-sm-1 details-info-col4">
                        <h3>Guests</h3>
                    </div>
                </div>
                <div>
                    {propDetails}
                </div>
            </div>
        )
    }
}
export default DetailsView;