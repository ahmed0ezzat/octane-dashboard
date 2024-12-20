import { Table } from '../../components/Table/Table';
import { Column } from '../../components/Table/table.types';
import { Order } from './OrdersOverview.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOrders } from '../../store/slices/ordersSlice';
import { useEffect } from 'react';

const OrdersOverview = () => {

  const dispatch = useAppDispatch();
  const { data: orders, loading, error } = useAppSelector((state) => state.orders);
  const columns: Column<Order>[] = [
    { key: 'id', label: 'Order ID' },
    { key: 'customerName', label: 'Customer Name' },
    { key: 'orderDate', label: 'Order Date' },
    { key: 'status', label: 'Status' },
    { key: 'totalAmount', label: 'Total Amount' },
  ];

   useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    console.log(`Update order ${id} to ${newStatus}`);
  };

  const handleDeleteOrder = (id: string) => {
    console.log(`Delete order ${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Orders Overview</h1>
      <Table
        data={orders}
        columns={columns}
        actions={(row) => [
          <button className="update" onClick={() => handleUpdateStatus(row.id, 'Shipped')}>Update</button>,
          <button className="delete" onClick={() => handleDeleteOrder(row.id)}>Delete</button>,
        ]}
      />
    </div>
  );
};

export default OrdersOverview;
