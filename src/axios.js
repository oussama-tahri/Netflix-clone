//axios is the request contains the key that we gonna send to our backend (tmdb) to get data
import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export default instance;