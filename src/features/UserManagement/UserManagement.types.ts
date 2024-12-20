export interface User {
    id: string;
    username: string;
    email: string;
    role: 'Admin' | 'User' | 'Guest';
    isActive: boolean;
  }
  