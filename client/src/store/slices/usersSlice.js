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

export const deleteUserThunk = createAsyncThunk(
  'users/delete',
  async (payload, { rejectWithValue }) => {
    try {
      await httpClient.delete(`/users/${payload}`);
      return payload;
    } catch (err) {
      console.log('err :>> ', err);
      return rejectWithValue({ message: err.message });
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
    // DELETE
    builder.addCase(deleteUserThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, { payload }) => {
      const deletedUserIndex = state.users.findIndex(u => u.id === payload);
      state.users.splice(deletedUserIndex, 1);
      state.isFetching = false;
    });
    builder.addCase(deleteUserThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;
