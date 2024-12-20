import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrdersOverview from './features/OrdersOverview/OrdersOverview';
import UserManagement from './features/UserManagement/UserManagement';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />
        <Route path="/orders" element={<OrdersOverview />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
   
}

export default App
