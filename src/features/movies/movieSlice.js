import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import movieService from "./movieService"

const initialState = {
    movies: [],
    isError: false,
    isSucces: false,
    isLoading: false,
    message: ''
}

//crear nueva 
export const createMovie = createAsyncThunk('movies/create', async (movieData, thunkAPI) => {
    try {
        //BUSCAR TOKEN ANTES DE LLAMARLO    
        const token = thunkAPI.getState().auth.user.token
        return await movieService.createMovie(movieData, token)
    } catch (error) {
        // si el backend lanza error
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error este en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})

//mostrar las pelis del usuario
export const getMovies = createAsyncThunk('movies/getAll', async(_, thunkAPI)=>{
    try {
        return await movieService.getMovies()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error esta en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})


export const likeMovie = createAsyncThunk('movies/likeMovie', async(id, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.likeMovie(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error este en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})

//borrar
export const borrarMovies = createAsyncThunk('movies/borrar', async(id, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await movieService.borrarMovies(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       //ese error este en el estado, usuario no vea consola error. Rechaza operacion con mensaje de error
        return thunkAPI.rejectWithValue(message)
    }
})

export const movieSlice = createSlice({
    name: 'movie',
    initialState, 
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder

        .addCase(createMovie.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(createMovie.fulfilled,(state, action) => {
            state.isLoading = false
            state.isSucces = true
            //agregamos al array con metodo push
            state.movies.push(action.payload)
        })
        .addCase(createMovie.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.movies = null
        })
        .addCase(getMovies.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(getMovies.fulfilled,(state, action) => {
            state.isLoading = false
            state.isSucces = true
            //devuelve array
            state.movies= action.payload
        })
        .addCase(getMovies.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(likeMovie.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(likeMovie.fulfilled,(state, action) => {
            state.isLoading = false
            state.isSucces = true
            
            state.movies.forEach(element => {
                if(element._id === action.payload._id){
                   element.vote_count = action.payload.vote_count
                }
            })
            
        })
        .addCase(likeMovie.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(borrarMovies.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(borrarMovies.fulfilled,(state, action) => {
            state.isLoading = false
            state.isSucces = true
            //devuelve array
            state.movies= state.movies.filter((movie) => movie._id !== action.payload.id)
        })
        .addCase(borrarMovies.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
}) 

export const {reset} = movieSlice.actions
export default movieSlice.reducer