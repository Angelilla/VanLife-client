import React, { Component } from "react";

//import { withAuth } from "../lib/AuthProvider";	

import service from '../lib/photo-service';
import tripsService from '../lib/trips-service';


class AddPicGallery extends Component {

    constructor(props) {
        super(props);
        this.state = { gallery: [] };
    }

    componentDidMount() {
        console.log(this.props.match.params)
        const tripId = this.props.match.params
        
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
            let newArr = [...this.state.gallery]
            console.log(newArr)
            newArr.push(response.secure_url)
            this.setState({ gallery: newArr })
            console.log(this.state)
        })
        .catch(err => {
            console.log("Error while uploading the file: ", err);
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const tripId = this.props.match.params;
        const newPhoto = this.state;
        console.log(tripId.id)
        console.log(newPhoto)
        
        service.saveInGallery(tripId.id, newPhoto)
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
            <form onSubmit={(e) => this.handleSubmit(e)}>

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