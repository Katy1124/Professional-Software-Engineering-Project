import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ticketsApi } from '../api/tickets.api';
import '../css/ticketsPage.css';
import AdminNav from '../components/adminNav';

const ACCOUNT_ID = 1;

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketsApi.list();
        const all = Array.isArray(data) ? data : [];
        // Filter client-side by account_Id
        const filtered = all.filter(t => t.account_Id === ACCOUNT_ID);
        setTickets(filtered);
      } catch (err) {
        setError(err.message || 'Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const statusColor = (status) => {
    if (!status) return '#6c757d';
    const s = status.toLowerCase();
    if (s === 'active') return '#236A49';
    if (s === 'pending') return '#B58229';
    if (s === 'closed') return '#dc3545';
    return '#6c757d';
  };

  return (
    <div className="tickets-page">

      <AdminNav />

      <div className="container-fluid text-center">

        {loading && <p style={{ color: 'white', marginTop: '2rem' }}>Loading...</p>}

        {error && (
          <div className="alert alert-danger" style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && tickets.length === 0 && (
          <p style={{ color: 'white', marginTop: '2rem' }}>No tickets found for account {ACCOUNT_ID}.</p>
        )}

        <div className="row align-items-start justify-content-center mt-4">
          {tickets.map((ticket) => (
            <div className="col-auto" key={ticket.id}>
              <div className="card tickets">
                <div className="card-body">
                  <p style={{ fontSize: '60px', fontWeight: 'bold' }}>Ticket {ticket.id}</p>
                  <p style={{ fontSize: '40px' }}>Account: {ticket.account_Id}</p>
                  <p style={{ fontSize: '20px' }}>{ticket.title}</p>
                  <p style={{ fontSize: '20px' }}><span>Severity: </span><span>{ticket.severity}</span></p>
                  <p style={{ fontSize: '20px' }}><span>Users Affected: </span><span>{ticket.users_Affected}</span></p>
                  <p style={{ fontSize: '20px' }}><span>Deadline: </span><span>{ticket.deadline} days</span></p>
                  <p style={{ fontSize: '20px' }}>
                    <span>Status: </span>
                    <span style={{ padding: '5px', borderRadius: '5px', backgroundColor: statusColor(ticket.status), color: 'white' }}>
                      {ticket.status || 'Active'}
                    </span>
                  </p>
                  <Link to={`/viewTicket/${ticket.account_Id}`} style={{ textDecoration: 'none' }}>
                    <button className="view-button">View</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <footer className="footer" />
    </div>
  );
}
