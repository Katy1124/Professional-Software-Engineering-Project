import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CustomerDashboard.css';
import CustomerNav from '../components/customerNav';

export default function CustomerDashboard() {

  const stats = [
    { label: 'Pending Tickets', count: 3 },
    { label: 'Active Tickets', count: 3 },
    { label: 'Resolved Tickets', count: 3 }
  ];

  return (
    <div className="customer-dashboard-wrapper">
      <header className="customer-dashboard-header">
        <CustomerNav />
      </header>

      <main className="customer-dashboard-main">
        <div className="row g-4 mb-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-4">
              <div className="card customer-stat-card">
                <div className="card-body">
                  <h3 className="customer-stat-label">{stat.label}</h3>
                  <p className="customer-stat-count">{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/ticketForm" style={{ textDecoration: 'none' }}>
          <div className="customer-create-ticket-btn">
            <p>Create a New Ticket</p>
          </div>
        </Link>

        <div className="customer-quick-links-section">
          <h2 className="customer-quick-links-title">Quick Links</h2>
          <div className="row g-4">
            <div className="col-6">
              <Link to="/ticketsPage" style={{ textDecoration: 'none' }}>
                <div className="card customer-quick-link-card">
                  <div className="card-body">
                    <p>My Tickets</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6">
              <Link to="/customerQuote" style={{ textDecoration: 'none' }}>
                <div className="card customer-quick-link-card">
                  <div className="card-body">
                    <p>My Quotes</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}