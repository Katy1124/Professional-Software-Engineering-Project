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
        setTickets(all);
      } catch (err) {
        setError(err.message || 'Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const statusColor = (Status) => {
    if (!Status) return '#6c757d';
    const s = Status.toLowerCase();
    if (s === 'a') return '#236A49';
    if (s === 'p') return '#B58229';
    if (s === 'r') return '#75aef4';
    if (s === 'e') return '#dc3545';
    return '#6c757d';
  };

  const ticketStat = (Status) => {
  if (!Status) return 'N/A';
    const s = Status.toLowerCase();
    if (s === 'a') return 'Active';
    if (s === 'p') return 'Pending';
    if (s === 'r') return 'Resolved';
    if (s === 'e') return 'Escalated';
    return 'N/A';
  };
  const ticketSeverity = (severity) => {
  if (!severity) return 'N/A';
    if(severity == 1) return 'low'; 
    if(severity == 2) return 'medium'; 
    if(severity == 3) return 'high'; 
    if(severity == 4) return 'critical'; 
  };
  return (
    <div className="tickets-page">

      <AdminNav />

      <div className="container-fluid text-center" style={{ paddingTop: '25px' }}>

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
                  <p className='number'>Ticket {ticket.id}</p>
                  <p className='account'>Account: {ticket.account_Id}</p>
                  <p className='title'>{ticket.title}</p>
                  <table className="table table-borderless ticket-table">
                    <tbody>
                      <tr className='severity'>
                        <td>Severity: </td>
                        <td>{ticketSeverity(ticket.severity)}</td>
                      </tr>
                      <tr className='users'>
                        <td>Users Affected: </td>
                        <td>{ticket.users_Affected}</td>
                      </tr>
                      <tr className='date'>
                        <td>Deadline: </td>
                        <td>{ticket.deadline} Days</td>
                      </tr>
                      <tr className='status'>
                        <td>Status: </td>
                        <td style={{ backgroundColor: statusColor(ticket.status), color: 'white', borderRadius: '20px', textAlign: 'center' }}>{ticketStat(ticket.status)}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <p className='severity'><span>Severity: </span><span></span></p>
                  <p className='users'><span>Users Affected: </span><span></span></p>
                  <p className='date'><span>Deadline: </span><span>days</span></p>
                  <p className='status'>
                    <span>Status: </span> */}
                    {/* <span style={{ padding: '5px', borderRadius: '5px', backgroundColor: statusColor(ticket.status), color: 'white' }}>
                      {ticketStat(ticket.status)}
                    </span> */}
                  {/* </p> */}
                  <Link to={`/viewTestTicket/${ticket.id}`} style={{ textDecoration: 'none' }}>
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