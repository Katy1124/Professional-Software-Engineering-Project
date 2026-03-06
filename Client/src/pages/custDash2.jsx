import React, {useState, useEffect} from 'react';
import { ticketsApi } from '../api/tickets.api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CustomerDashboard.css';
import { useNavigate } from 'react-router-dom';
import CustomerNav from '../components/customerNav';

export default function DashCust() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    pending: 0,
    active: 0,
    resolved: 0
  });

  useEffect(() => {
    // LOGIC FOR STATUSES
    // const fetchStats = async () => {
    //     try {
    //         const tickets = await ticketsApi.list();

    //         const counts = {
    //             pending: tickets.filter(t => t.status === 'Pending').length,
    //             active: tickets.filter(t => t.status === 'Active').length,
    //             resolved: tickets.filter(t => t.status === 'Resolved').length
    //         };

    //         setStats(counts);
    //     } catch (error) {
    //         console.error('Error fetching ticket stats:', error);
    //     }
    // };

    //TEMPORARY LOGIC USING SEVERITY INSTEAD OF STATUS
    const fetchStats = async () => {
        try {
            const tickets = await ticketsApi.list();
            const allTickets = Array.isArray(tickets) ? tickets : [];
            const counts = {
                pending: allTickets.filter(t => t.severity == 1).length,
                active: allTickets.filter(t => t.severity == 2).length,
                resolved: allTickets.filter(t => t.severity == 3 || t.severity == 4).length
            };

            setStats(counts);
        } catch (error) {
            console.error('Error fetching ticket stats:', error);
        }
    };

    fetchStats();
  }, []);

  const labels = [
    { label: 'Pending Tickets', count: stats.pending },
    { label: 'Active Tickets', count: stats.active },
    { label: 'Resolved Tickets', count: stats.resolved }
  ];

  const routes = {
    createTicket: '/tickets/create',
    myTickets: '/tickets',
    myQuotes: '/quotes'
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <CustomerNav />
      </header>

      <main className="dashboard-main">
        <div className="stats-grid">
          {labels.map((stat, idx) => (
            <div key={idx} className="stat-card">
                <h3>{stat.label}</h3>
                <p className="stat-number">{stat.count}</p>
            </div>
          ))}
        </div>

        <Link to="/ticketForm" style={{ textDecoration: 'none' }}>
          <div className="cta-button" onClick={() => console.log('Navigate to:', routes.createTicket)}>
            <p>Create a New Ticket</p>
          </div>
        </Link>

        <div className="quick-links-section">
          <h2 className="quick-links-title">Quick Links</h2>
          <div className="quick-links-grid">
            <Link to="/ticketsPage" style={{ textDecoration: 'none' }} className="quick-link-btn">
              <button onClick={() => console.log('Navigate to:', routes.myTickets)} className="quick-link-btn">
                My Tickets
              </button>
            </Link>
            <Link to="/customerQuote" style={{ textDecoration: 'none' }} className="quick-link-btn">
              <button onClick={() => console.log('Navigate to:', routes.myQuotes)} className="quick-link-btn">
                My Quotes
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}