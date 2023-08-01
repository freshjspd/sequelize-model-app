import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

export const getUsersThunk = createAsyncThunk(
  'users/get',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await httpClient.get('/users');
      return data; // => action.payload
    } catch (err) {
      console.log('err :>> ', err);
      return rejectWithValue({ message: err.message }); // => action.payload
    }
  }
);

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    // GET
    builder.addCase(getUsersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.users = payload;
    });
    builder.addCase(getUsersThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;
