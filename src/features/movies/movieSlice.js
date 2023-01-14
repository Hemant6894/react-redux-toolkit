import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/MovieApi';
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const movieText = "harry";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`);
    return response.data;

})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${seriesText}&type=series`);
    return response.data;

})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;

})
const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow:{}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state, { payload }) => {
            state.selectedMovieOrShow = {};
        },

    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log('pending')
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('fetched successfully');
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('rejected')
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('fetched successfully');
            return { ...state, shows: payload }
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log('fetched successfully');
            return { ...state, selectedMovieOrShow: payload }
        },


    }

})

export const {removeSelectedMovieOrShow} = movieSlice.actions;  // only for async
export const getAllMovies = (state) => state.movies.movies; // state.nameofreducer.
export const getAllShows = (state) => state.movies.shows;
export const getMovieOrShowDetails = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;