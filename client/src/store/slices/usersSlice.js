import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  // reducers:{
  // getUsers:(state,action)=>{state.users = action.payload}
  // }
});

const { reducer } = usersSlice;

export default reducer;
