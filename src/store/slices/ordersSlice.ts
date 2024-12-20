import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../../features/OrdersOverview/OrdersOverview.types';


export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get<Order[]>('https://676571b452b2a7619f5f9229.mockapi.io/api/orders');
  return response.data;
});

export const deleteOrders = createAsyncThunk('users/deleteOrders', async (id: string) => {
  await axios.delete(`https://676571b452b2a7619f5f9229.mockapi.io/api/orders/${id}`);
  return id; // Return the deleted order's ID to identify which user to remove from the state
});

// Async thunk for updating the order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, newStatus }: { id: string; newStatus: string }) => {
    const response = await axios.put(`https://676571b452b2a7619f5f9229.mockapi.io/api/orders/${id}`, {
      status: newStatus
    });
    return response.data; // Return the updated order to update the state
  }
);

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
      })
      .addCase(deleteOrders.fulfilled, (state, action) => {
        const userIdToDelete = action.payload;
        state.data = state.data.filter((order) => order.id !== userIdToDelete);
      })
      .addCase(deleteOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete order';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const orderIndex = state.data.findIndex((order) => order.id === updatedOrder.id);
        if (orderIndex !== -1) {
          state.data[orderIndex] = updatedOrder; // Update the order status in the state
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update order status';
      });
  },
})

export default ordersSlice.reducer;
