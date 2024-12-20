import apiClient from './apiClient';

export const fetchOrders = () => apiClient.get('/orders');
export const updateOrderStatus = (id: string, status: string) =>
  apiClient.put(`/orders/${id}/status`, { status });
export const deleteOrder = (id: string) => apiClient.delete(`/orders/${id}`);
