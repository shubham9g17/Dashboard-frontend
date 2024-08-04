import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { token, setToken } = useAuth();
  const [data, setData] = useState({ clicks: 0, orders: 0, amount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
        if (error.response.status === 401) {
          setToken(null);
          navigate('/signin');
        }
      }
    };
    fetchData();
  }, [setToken, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="mb-4">Clicks: {data.clicks}</div>
      <div className="mb-4">Orders: {data.orders}</div>
      <div className="mb-4">Amount: ${data.amount}</div>
    </div>
  );
};

export default DashboardPage;
