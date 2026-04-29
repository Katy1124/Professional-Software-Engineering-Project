import React, {useState, useEffect} from 'react';
import { ticketsApi } from '../api/tickets.api';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CustomerDashboard.css';
import { useNavigate } from 'react-router-dom';
import CustomerNav from '../components/customerNav';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    pending: 0,
    active: 0,
    resolved: 0
  });

  useEffect(() => {
    // LOGIC FOR STATUSES
    const fetchStats = async () => {
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser || !storedUser.id) {
              console.error("No userID");
              return;
            }
            const tickets = await ticketsApi.list();
            const allTickets = Array.isArray(tickets) ? tickets : [];
            const userTickets = allTickets.filter(t => t.account_Id === storedUser.id);
            const counts = {
              pending: userTickets.filter(t => ['p', 'qp'].includes(t.status?.toLowerCase())).length,
              active: userTickets.filter(t => ['a', 'qr', 'e'].includes(t.status?.toLowerCase())).length,
              resolved: userTickets.filter(t => ['r', 'rj'].includes(t.status?.toLowerCase())).length
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
    createTicket: 'create/',
    myTickets: 'tickets/',
    myQuotes: 'viewquote/'
  };

  return (
    <div className="customer-dashboard">
      <header className="dashboard-header">
        <CustomerNav />
      </header>

      {/* Adding a Bootstrap container to center content and add padding */}
    <main className="container" style={{ paddingTop: '100px' }}>
      <div className="container text-center">
        <div className="row justify-content-center">
          {[
            { label: 'Active Tickets', count: stats.active, colorClass: 'active-tickets' },
            { label: 'Pending Tickets', count: stats.pending, colorClass: 'pending-tickets' },
            { label: 'Resolved Tickets', count: stats.resolved, colorClass: 'resolved-tickets' }
          ].map((stat, idx) => (
            <div key={idx} className="col-md-4 mb-3">
              <div className={`card ${stat.colorClass}`} style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="card-body">
                  <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{stat.label}</h3>
                  <p style={{ fontSize: '40px', fontWeight: 'bold', margin: 0 }}>{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Ticket Button Area */}
      <div className="text-center mb-5">
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <div className="create-ticket-btn d-inline-block">
              Create a New Ticket
          </div>
        </Link>
      </div>

        {/* Quick Links Section */}
        <div className="quick-links-section text-center">
          <h2 className="mb-4" style={{color: 'white', fontWeight: 'bold'}}>Quick Links</h2>
          <div className="row justify-content-center gap-3">
          <div className="row justify-content-center">
            <div className="col-6">
              <Link to="/mytickets" className="card quick-link-card p-4 text-decoration-none d-block">
                My Tickets
              </Link>
            </div>
            <div className="col-6">
              <Link to="/viewquote" className="card quick-link-card p-4 text-decoration-none d-block">
                My Quotes
              </Link>
            </div>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}