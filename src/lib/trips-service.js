import axios from 'axios';

class Trips {

    constructor() {
        this.trips = axios.create({
          baseURL: `${process.env.REACT_APP_API_URI}/trips`,
          //baseURL: "http://localhost:4000/trips",
          withCredentials: true,
        });
    }

    allTrips(){
        return this.trips.get('/').then(({ data }) => data);
    }
    
    tripDet(tripId) {
        return this.trips.get(`/${tripId}`).then(({ data }) => data);
    }

    editTrip( { tripId, name, initdate } ) {
        return this.trips
        .put(`/${tripId}/edit`, { name, initdate })
        .then(({ data }) => data);
    }

    deleteTrip(tripId) {
        return this.trips.post(`/${tripId}/delete`);
    }
    
    addFavouriteTrip(tripId, userId) {
        return this.trips.post(`/${tripId}/add-favourite`, {tripId, userId}).then(({ data }) => data);
    };

    deleteFavouriteTrip(tripId) {
        return this.trips.post(`/${tripId}/delete-favourite`, {}).then(({ data }) => data);

    };

    tripReview(tripId) {
        return this.trips.post(`/${tripId}/review`, {}).then(({ data }) => data);

    };
  
}

const tripsService = new Trips();

export default tripsService;
  