import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import movieReducer from '../features/movies/movieSlice'
import moviesReducer from '../features/movie/moviesSlice'

export const store = configureStore ({
    reducer: {
        auth: authReducer,
        movie: movieReducer,
        movies: moviesReducer
    },
})