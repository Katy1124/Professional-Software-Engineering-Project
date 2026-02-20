import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerDashboard.css';
import { useNavigate } from 'react-router-dom';
import CustomerNav from '../components/customerNav';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Pending Tickets', count: 3 },
    { label: 'Active Tickets', count: 3 },
    { label: 'Resolved Tickets', count: 3 }
  ];

  const routes = {
    createTicket: '/tickets/create',
    myTickets: '/tickets',
    myQuotes: '/quotes'
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        {/* <img src="/giacom-master-white-logo-1.png" alt="GIACOM" className="header-logo" />
        <span>Welcome [User]</span> */}
        <CustomerNav />
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <h3>{stat.label}</h3>
              <p className="stat-number">{stat.count}</p>
            </div>
          ))}
        </div>

        <div className="cta-button" onClick={() => console.log('Navigate to:', routes.createTicket)}>
          <p>Create a New Ticket</p>
        </div>

        <div className="quick-links-section">
          <h2 className="quick-links-title">Quick Links</h2>
          <div className="quick-links-grid">
            <button onClick={() => console.log('Navigate to:', routes.myTickets)} className="quick-link-btn">
              My Tickets
            </button>
            <button onClick={() => console.log('Navigate to:', routes.myQuotes)} className="quick-link-btn">
              My Quotes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}