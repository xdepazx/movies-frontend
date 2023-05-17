import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moviesService from './moviesService'

const initialState = {
    movies: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//mostrar las movie del usuario
export const getMovie = createAsyncThunk('movies/getOne', async (id, thunkAPI) => {
   
    try {
       
        return await moviesService.getMovie(id)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const moviesSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder            
            .addCase(getMovie.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies = action.payload
            })
            .addCase(getMovie.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = moviesSlice.actions
export default moviesSlice.reducer