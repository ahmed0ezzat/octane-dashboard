export interface Order {
    id: string;
    customerName: string;
    orderDate: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    totalAmount: number;
  }
  