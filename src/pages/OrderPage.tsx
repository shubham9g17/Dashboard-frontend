import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  const { token, setToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders data', error);
        if (error.response.status === 401) {
          setToken(null);
          navigate('/signin');
        }
      }
    };
    fetchData();
  }, [setToken, navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl mb-4">Orders</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">User ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
