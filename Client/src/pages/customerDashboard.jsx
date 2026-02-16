import { useEffect, useState } from "react";

export default function CustomerDashboard() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5002/api/customer') 
        .then((res) => {
        if (!res.ok) throw new Error("Could not reach the server");
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data from Azure...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

return (
  <div style={{ padding: '20px' }}>
    <h1>Customer List</h1>
    <table border="1" style={{ width: '50%', textAlign: 'left', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ padding: '10px' }}>Username</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c, index) => (
          
          <tr key={c.username || index}>
            <td style={{ padding: '10px' }}>{c.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};