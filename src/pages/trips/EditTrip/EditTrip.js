import React, { Component } from "react";
import tripsService from '../../../lib/trips-service'

class EditTrip extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: "",
          initdate: ""
        };
    }

    componentDidMount = () => {
        console.log(this.props.match.params)
        const tripId = this.props.match.params.id
        tripsService.tripDet(tripId)
          .then (res => {
            //console.log(res)
            this.setState({
              name: res.name,
              initdate: res.initdate
          
            })
          })
          .catch(error => console.log(error));

        

    }

    handleFormSubmit = e => {
        const { name, initdate } = this.state;
        //console.log(name ,initdate)
        const tripId = this.props.match.params.id
        e.preventDefault();
        tripsService.editTrip({tripId, name, initdate})
        .then(() => {
            this.props.history.push('/private');
        })
        .catch(error => console.log(error));
    }


    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {

        const { name, initdate } = this.state;

        return (
            <form onSubmit={this.handleFormSubmit} className="right-box">
                <div className="box">
                    <div className="log-title">Edita tu aventura</div>
                        <div className="input-box">
                        <input className="input-log" type="text" name="name" value={name} onChange={this.handleChange} />
                    </div>
                        
                        <div className="input-box">
                        <input className="input-log" type="date" name="initdate" value={initdate} onChange={this.handleChange} />
                    </div>
                    <button  className="log-btn" type="submit">Guardar</button>
              
                </div>
            </form>
        )
    }

}

export default EditTrip;