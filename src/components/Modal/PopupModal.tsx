// components/PopupModal.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { updateUserDetails } from '../../store/slices/usersSlice';
import { User } from '../../features/UserManagement/UserManagement.types';
import { Order } from '../../features/OrdersOverview/OrdersOverview.types';
import "./ModalStyles.css"

interface PopupModalProps {
  data: User | Order | null;
  type: 'editUser' | 'viewOrderDetails';
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ data, type, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(
    type === 'editUser'
      ? {
          username: (data as User)?.username || '',
          email: (data as User)?.email || '',
          role: (data as User)?.role || 'User',
        }
      : {
          orderId: (data as Order)?.id || '',
          customerName: (data as Order)?.customerName || '',
          orderDate: (data as Order)?.orderDate || new Date(),
          status: (data as Order)?.status || 'Pending',
          totalAmount: (data as Order)?.totalAmount || 0,
        }
  );

  const handleSave = () => {
    if (type === 'editUser' && data) {
      dispatch(updateUserDetails({ ...data, ...formData }));
    }
    // Handle view details or other actions if needed
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {type === 'editUser' ? (
          <>
            <h2>Edit User Details</h2>
            <label>
              Username:
              <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            </label>
            <label>
              Email:
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </label>
            <label>
              Role:
              <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </select>
            </label>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h2>Order Details</h2>
            <p>Order ID: {formData.orderId}</p>
            <p>Customer Name: {formData.customerName}</p>
            <p>Order Date: {formData.orderDate.toString()}</p>
            <p>Status: {formData.status}</p>
            <p>Total Amount: {formData.totalAmount}</p>
            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupModal;
