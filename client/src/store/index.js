import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';

const reducer = {
  usersData: usersReducer,
};

const store = configureStore({ reducer });

export default store;

// state = {
//   usersData: {
//     users: [],
//     isFetching: false,
//     error: null,
//   },
// };
