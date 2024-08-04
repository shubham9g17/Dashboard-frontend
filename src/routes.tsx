import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import ClicksPage from './pages/ClicksPage';

const AppRoutes: React.FC = () => {
  const { token } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={token ? <DashboardPage /> : <Navigate to="/signin" />} />
        <Route path="/orders" element={token ? <OrdersPage /> : <Navigate to="/signin" />} />
        <Route path="/clicks" element={token ? <ClicksPage /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
