import React, { Component } from "react";
import axios from "axios";

//import { withAuth } from "../lib/AuthProvider";	

import service from '../lib/photo-service';
import tripsService from '../lib/trips-service'


class AddPicGallery extends Component {

    constructor(props) {
        super(props);
        this.state = { gallery: [] };
    }

    componentDidMount() {
        const tripId = this.props.match.params.id
        console.log(this.props.params)
        tripsService.tripDet(tripId)
            .then (res => {
                console.log(res)
                this.setState({
                   gallery: res.gallery
                })
            })
            .catch(error => console.log(error));

    }

    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        uploadData.append("gallery", e.target.files[0]);
        
        service.handleUp(uploadData)
        .then(response => {
            console.log('response is: ', response);

            this.setState({ gallery: response.secure_url });
        })
        .catch(err => {
            console.log("Error while uploading the file: ", err);
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        
        service.saveInGallery(this.state)
        .then(res => {
            console.log('added: ', res);
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }
    
    render() {

        return (
          <div>
            <h2>New Pic</h2>
            <form onSubmit={e => this.handleSubmit(e)}>

                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} 
                /> 

                <button type="submit">Save new thing</button>
            </form>
          </div>
        );
    }

}

export default AddPicGallery;