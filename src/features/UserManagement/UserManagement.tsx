import { useEffect } from 'react';
import { Table } from '../../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsers } from '../../store/slices/usersSlice';

const UserManagement = () => {
  const dispatch = useAppDispatch();
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
  };

  const handleDeleteUser = (id: string) => {
    console.log(`Delete user ${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>User Management</h1>
      <Table
        data={users}
        columns={columns}
        actions={(row: any) => [
          <button className={row.isActive ? 'deactivated' : 'active'} onClick={() => handleToggleActive(row.id)}>
            {row.isActive ? 'Deactivate' : 'Activate'}
          </button>,
          <button className='delete' onClick={() => handleDeleteUser(row.id)}>Delete</button>,
        ]}
      />
    </div>
  );
};

export default UserManagement;
