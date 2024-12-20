import { Table } from '../../components/Table/Table';
import { Column } from '../../components/Table/table.types';
import { Order } from './OrdersOverview.types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOrders,deleteOrders, updateOrderStatus } from '../../store/slices/ordersSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupModal from '../../components/Modal/PopupModal';

const OrdersOverview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState<Order | null>(null);
  const [modalType, setModalType] = useState<'viewOrderDetails' | null>(null);
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

  const handleView = (order: Order) => {
    setSelectedItem(order);
    setModalType('viewOrderDetails')
  }
  const handleUpdateStatus = (id: string, newStatus: string) => {
    console.log(`Update order ${id} to ${newStatus}`);
    dispatch(updateOrderStatus({ id, newStatus }));
  };

  const handleDeleteOrder = (id: string) => {
    console.log(`Delete order ${id}`);
    dispatch(deleteOrders(id))
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Orders Overview</h1>
      <button className='navigate' onClick={() => navigate('/users')}> User Management </button>
      <Table
        data={orders}
        columns={columns}
        actions={(row) => [
          <button onClick={() => handleView(row)}>View</button>,
          // <button className="update" onClick={() => handleUpdateStatus(row.id, 'Shipped')}>Update</button>,
          <select className="update-status" value={row?.status} onChange={(e) => handleUpdateStatus(row.id, e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>,
          <button className="delete" onClick={() => handleDeleteOrder(row.id)}>Delete</button>,
        ]}
      />
      {modalType && selectedItem && (
        <PopupModal data={selectedItem} type={modalType} onClose={closeModal} />
      )}
    </div>
  );
};

export default OrdersOverview;
