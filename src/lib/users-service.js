import axios from 'axios';

class Users {

    constructor() {
        this.auth = axios.create({
          baseURL: "http://localhost:4000/users",
          //baseURL: [process.env.REACT_APP_API_URI],
          withCredentials: true,
        });
      }

}

