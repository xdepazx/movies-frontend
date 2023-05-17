import axios from "axios"

const API_URL = 'https://wild-cow-woolens.cyclic.app/api/movies/'

const createMovie = async (movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, movieData, config)
    return response.data
}

const getMovies = async () => {
    
    const response = await axios.get(API_URL)
    return response.data
}



const likeMovie = async (id, movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + id, movieData, config)
    return response.data
}

const borrarMovies = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const moviesService = {
    createMovie,
    getMovies,
    likeMovie,
    borrarMovies
}

export default moviesService