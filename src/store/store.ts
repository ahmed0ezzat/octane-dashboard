import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
