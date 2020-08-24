import axios from 'axios';

class Users {

  constructor() {
      this.users = axios.create({
        baseURL: `${process.env.REACT_APP_API_URI}/users`,
        //baseURL: "http://localhost:4000/users",
        withCredentials: true,
      });
  }

  profile() {
    return this.users.get("/profile").then(({ data }) => data);
  }

  editProfile({ username, email, password, profilepic }) {
    return this.users
      .put('/edit-profile', { username, email, password, profilepic })
      .then(({ data }) => data);
  }

  deleteProfile() {
    //console.log("hey")
    return this.users.post('/delete-profile').then(({ data }) => data);
  }

  newTrip( { name, traveler, initdate } ) {
    return this.users
    .post("/new-trip", { name, traveler, initdate })
    .then(({ data }) => data);
  }

}

const usersService = new Users();

export default usersService;

