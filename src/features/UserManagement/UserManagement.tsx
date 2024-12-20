import { useEffect, useState } from 'react';
import { Table } from '../../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsers, toggleUserActive, deleteUser } from '../../store/slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { User } from './UserManagement.types';
import { Order } from '../OrdersOverview/OrdersOverview.types';
import PopupModal from '../../components/Modal/PopupModal';


const UserManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<User | Order | null>(null);
  const [modalType, setModalType] = useState<'editUser' | 'viewOrderDetails' | null>(null);

  const { data: users, loading, error } = useAppSelector((state) => state.users);

  const columns = [
    { key: 'id', label: 'User ID' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    // { key: 'isActive', label: 'Active Status' },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleToggleActive = (id: string) => {
    console.log(`Toggle active status for user ${id}`);
    dispatch(toggleUserActive(id));
  };

  const handleDeleteUser = (id: string) => {
    console.log(`Delete user ${id}`);
    dispatch(deleteUser(id))
  };

  const handleEditUser = (user: User) => {
    setSelectedItem(user);
    setModalType('editUser');
  }

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User Management</h1>
      <button className='navigate' onClick={() => navigate('/orders')}> Orders Management </button>
      <Table
        data={users}
        columns={columns}
        actions={(row: any) => [
          <button className={row.isActive ? 'deactivated' : 'active'} onClick={() => handleToggleActive(row.id)}>
            {row.isActive ? 'Deactivate' : 'Activate'}
          </button>,
          <button className='delete' onClick={() => handleDeleteUser(row.id)}>Delete</button>,
          <button onClick={() => handleEditUser(row)}>Edit</button>,
        ]}
      />
       {modalType && selectedItem && (
        <PopupModal data={selectedItem} type={modalType} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserManagement;
