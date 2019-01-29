import React, {Component} from 'react';
import './OwnersDashboard.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import DetailsComponent from '../DetailsView/DetailsComponent';
import {DropdownButton, MenuItem} from 'react-bootstrap';

//Define a Login Component
class OwnersDashboardBooked extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            PropertyDetails : [],
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:3001/OwnersDashboardBooked')
                .then((response) => {
                    console.log("response",response.data);
                //update the state with the response data
                this.setState({
                    PropertyDetails : this.state.PropertyDetails.concat(response.data) 
                });
                console.log("PropertyDetails within OwnersDashboard FE",this.state.PropertyDetails);
            });
    }
    
    render(){
        let PropDetails = this.state.PropertyDetails.map(PropertyDetails => {
            return (
                <DetailsComponent>{PropertyDetails.headline}{PropertyDetails.proptype}{PropertyDetails.noofrooms}{PropertyDetails.noofbathrooms}{PropertyDetails.accomodates}{PropertyDetails.baserate}{PropertyDetails.propertyID}</DetailsComponent>
            )
        })
        return(
            <div class="ownersdashall-first-div">
                <div class="row ownersdashbooked-row">
                    <div class="col-sm-1">
                        <span class="glyphicon glyphicon-align-left ownersdashbooked-glyphicon1"></span>
                    </div>
                    <div class="col-sm-4">
                        {/*<img class="ownersdash-img1" height="40" width="175" src={require("../Images/Homeaway_logo.png")}/>*/}
                        <label class="ownersdashbooked-col1"><Link to="/">HomeAway</Link></label>
                    </div>    
                    <div class="col-sm-2 ownerdashbooked-dropdown1">
                       <DropdownButton bsStyle="primary" title="Trip Boards">
                            <MenuItem eventKey="1"><Link to="/OwnersDashboardAll">Listed Property</Link></MenuItem>
                            <MenuItem eventKey="2"><Link to="/OwnersDashboardBooked">Booked Property</Link></MenuItem>
                        </DropdownButton>
                    </div>
                    <div class="col-sm-2 ownersdashbooked-col2">
                        <Link to="/ListProperty" class="ownersdashbooked-col2">Add new property</Link>
                    </div>
                    <div class="col-sm-2">
                        <Link to="/" class="ownersdashbooked-col3"><span class="glyphicon glyphicon-log-out listglyphiconbooked2"></span> Sign Out</Link>
                    </div>
                    <div class="col-sm-1">
                        <span class="glyphicon glyphicon-th ownersdashbooked-glyphicon1"></span>
                    </div>
                    <div class="ownderdashbooked-lastmsg">
                        <h1>List all the properties booked by the traveler</h1>
                    </div>
                </div>
                <div>
                    {PropDetails}
                </div>
            </div>
                          
        )
    }
}

//export Login Component
export default OwnersDashboardBooked;

