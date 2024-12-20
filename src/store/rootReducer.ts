import { combineReducers } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';

const rootReducer = combineReducers({
  orders: ordersReducer,
  users: usersReducer,
});

export default rootReducer;
