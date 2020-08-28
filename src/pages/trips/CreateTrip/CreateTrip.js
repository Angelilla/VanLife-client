import React, { Component } from "react";
import usersService from "../../../lib/users-service";
import { withAuth } from "../../../lib/AuthProvider";

class CreateTrip extends Component {

    state = { name: "", traveler: this.props.user._id, initdate: "" };

    handleFormSubmit = event => {
        event.preventDefault();
        const { name, traveler, initdate } = this.state;
        usersService.newTrip({ name, traveler, initdate })
            .then(() => this.props.history.push("/private"))
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {

        const { name, initdate } = this.state;
        console.log(this.props.user._id)

        return (
            
            <form onSubmit={this.handleFormSubmit} className="rightbox">
                <div className="box">
                    <div className="log-title">Crea una aventura</div>
                        <div className="input-box">
                        <input className="input-log" type="text" name="name" value={name} onChange={this.handleChange} placeholder="Nombre de la aventura"/>
                    </div>
                        
                        <div className="input-box">
                        <input className="input-log" type="date" name="initdate" value={initdate} onChange={this.handleChange} placeholder="Fecha" />
                    </div>
                    <button  className="log-btn" type="submit">Crear</button>
              
                </div>
            </form>
        )
    }

}

export default withAuth(CreateTrip);