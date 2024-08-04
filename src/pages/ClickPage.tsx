import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ClicksPage: React.FC = () => {
  const { token, setToken } = useAuth();
  const [clicks, setClicks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/clicks');
        setClicks(response.data);
      } catch (error) {
        console.error('Error fetching clicks data', error);
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
      <h2 className="text-2xl mb-4">Clicks</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Click ID</th>
            <th className="px-4 py-2">Merchant</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">User ID</th>
          </tr>
        </thead>
        <tbody>
          {clicks.map((click: any) => (
            <tr key={click._id}>
              <td className="border px-4 py-2">{click._id}</td>
              <td className="border px-4 py-2">{click.merchant}</td>
              <td className="border px-4 py-2">{click.product}</td>
              <td className="border px-4 py-2">{click.price}</td>
              <td className="border px-4 py-2">{click.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClicksPage;
