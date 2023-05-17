import axios from "axios"

const API_URL = 'https://wild-cow-woolens.cyclic.app/api/movies/'

const getMovie = async (id) => {
    const response = await axios.get(API_URL + id)
    return response.data
}

const moviesService = {
    
    getMovie
    
}

export default moviesService