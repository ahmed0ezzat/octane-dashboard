import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../../features/OrdersOverview/OrdersOverview.types';


export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get<Order[]>('https://676571b452b2a7619f5f9229.mockapi.io/api/orders');
  return response.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { data: [], loading: false, error: null } as {
    data: Order[];
    loading: boolean;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default ordersSlice.reducer;
