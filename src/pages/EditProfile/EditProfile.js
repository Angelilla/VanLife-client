import React, { Component } from "react";
import { withAuth } from "../../lib/AuthProvider";
import usersService from "../../lib/users-service";

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: this.props.user.username,
          email: this.props.user.email,
          password: this.props.user.password, 
          profilepic: this.props.user.profilepic
        };
    }

    componentWillUnmount() {
        
        this.setState=() => {
            return
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        const { username, email, password, profilepic } = this.state;
        usersService.editProfile({ username, email, password, profilepic })
        /*.then(user => {
            //console.log(user)
            this.setState({ 
                username: user.username, 
                email: user.email, 
                password: user.password
            })
            
        })*/
        .then(() => {
            this.props.history.push("/private")
        })
        .catch (error => console.log(error)) 
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {

        const { username, email, password, profilepic } = this.state;

        return (
            <div className="log-cont">
                <div className="right-box">
                    <div className="box">
                        <div className="log-title">Edita tu perfil</div>
                        <div className="input-box">
                            <input className="input-log" type="text" name="username" value={username} onChange={this.handleChange} placeholder={username}/>
                        </div>
                        <div className="input-box">
                            <input className="input-log" type="text" name="email" value={email} onChange={this.handleChange} placeholder="Tu email"/>
                        </div>
                        <div className="input-box">
                            <input className="input-log" type="password" name="password" value={password} onChange={this.handleChange} placeholder="******" />
                        </div>
                        <button onClick={this.handleFormSubmit} className="log-btn" type="submit" value="EditProfile">Editar</button>
                        <a className="btns-cont-link" href='/private' id='home-btn'><p>Perfil</p></a>

                    </div>
                </div>
            </div>
        )

    }

}

export default withAuth(EditProfile);