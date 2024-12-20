import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../features/UserManagement/UserManagement.types';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('https://676571b452b2a7619f5f9229.mockapi.io/api/users');
  return response.data;
});

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await axios.delete(`https://676571b452b2a7619f5f9229.mockapi.io/api/users/${id}`);
  return id; // Return the deleted user's ID to identify which user to remove from the state
});

// Async thunk for updating a user
export const updateUserDetails = createAsyncThunk('users/updateUserDetails', async (user: User) => {
  const response = await axios.put(`https://676571b452b2a7619f5f9229.mockapi.io/api/users/${user.id}`, user);
  return response.data; // Return the updated user
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { data: [], loading: false, error: null } as {
    data: User[];
    loading: boolean;
    error: string | null;
  },
  reducers: {
    toggleUserActive: (state, action) => {
      const userId = action.payload;
      const userIndex = state.data.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.data[userIndex].isActive = !state.data[userIndex].isActive;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userIdToDelete = action.payload;
        state.data = state.data.filter((user) => user.id !== userIdToDelete);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete user';
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const userIndex = state.data.findIndex((user) => user.id === updatedUser.id);
        if (userIndex !== -1) {
          state.data[userIndex] = updatedUser; // Update the user in the state with new data
        }
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user details';
      });
  },
});

export const { toggleUserActive } = usersSlice.actions;
export default usersSlice.reducer;
