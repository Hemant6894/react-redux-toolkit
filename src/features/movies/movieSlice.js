import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/MovieApi';
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const movieText = "harry";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`);
    return response.data;

})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    const seriesText = "Friends";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`);
    return response.data;

})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;

})
const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow:{},
    showSearchBar: true
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
            return { ...state, showSearchBar: true ,movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('rejected')
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('fetched successfully');
            return { ...state, showSearchBar: true ,shows: payload }
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log('fetched successfully');
            return { ...state, showSearchBar: false ,selectedMovieOrShow: payload }
        },


    }

})

export const {removeSelectedMovieOrShow} = movieSlice.actions;  // only for async
export const getAllMovies = (state) => state.movies.movies; // state.nameofreducer.
export const getAllShows = (state) => state.movies.shows;
export const getMovieOrShowDetails = (state) => state.movies.selectedMovieOrShow;
export const getSearchBarFlag = (state) => state.movies.showSearchBar;
export default movieSlice.reducer;