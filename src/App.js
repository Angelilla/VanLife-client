import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from './pages/Home/Home'
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import CreateTrip from "./pages/trips/CreateTrip/CreateTrip";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import EditProfile from "./pages/EditProfile/EditProfile";
import Private from './pages/Private';
import ListTrips from "../src/pages/trips/ListTrips/ListTrips"
import TripDetail from "../src/pages/trips/TripDetail/TripDetail";
import EditTrip from '../src/pages/trips/EditTrip/EditTrip'
import AddPic from '../src/pages/AddPic'
import AddPicGallery from '../src/pages/AddPicGallery'


class App extends Component {
  render() {
    return (
      
      <AuthProvider> 
        <Navbar />
        <div className='app-container'>
          <Switch>
                <AnonRoute exact path='/signup' component={Signup} />
                <AnonRoute exact path='/login' component={Login} />
                <PrivateRoute exact path='/private' component={Private} />
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                <PrivateRoute exact path='/new-trip' component={CreateTrip} />
                <Route exact path='/trips' component={ListTrips} />
                <Route exact path='/trips/:id' component={TripDetail} />
                <Route exact path='/' component={Home} />
                <Route exact path='/trips/:id/edit' component={EditTrip} />
                <Route exact path='/addpic'component={AddPic}/>
                <Route exact path='/api/addpicgallery/:id'component={AddPicGallery}/>
          </Switch>
        </div>
      </AuthProvider> 
    );
  }
}

export default App;
