import apiClient from './apiClient';

export const fetchUsers = () => apiClient.get('/users');
export const toggleUserActive = (id: string, isActive: boolean) =>
  apiClient.put(`/users/${id}/active`, { isActive });
export const deleteUser = (id: string) => apiClient.delete(`/users/${id}`);
