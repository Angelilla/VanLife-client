import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api`,
  withCredentials: true 
});

const errorHandler = err => {
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
   
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewPhoto (newPhoto) {
    return service.patch('/update-photo', newPhoto)
      .then(res => res.data)
      .catch(errorHandler);
  },

  handleUp (theFile) {
   
    return service.post('/upload-gallery', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveInGallery (tripId, newPhoto) {
    return service.post(`/${tripId}/update-gallery`, newPhoto)
      .then(res => res.data)
      .catch(errorHandler);
  },
}