import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ apiUrl, page }) => {
    const response = await fetch(`${apiUrl}&page=${page}`)
    const data = await response.json()
    return data.results // Assuming the array of movies is under "results"
})

const initialState = {
    movies: [],
    fetchStatus: '',
    page: 0,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearMovies: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = [...state.movies, ...(action.payload || [])];
            state.fetchStatus = 'success'
            state.page += 1; // Increment the page number
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        });
    }
})

export default moviesSlice
export const { clearMovies } = moviesSlice.actions;