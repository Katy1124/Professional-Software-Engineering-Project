import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ticketsApi } from '../api/tickets.api';
import '../css/ticketsPage.css';
import CustomerNav from '../components/customerNav';



export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('');
  const [sortBy, setSortBy] = useState('');
  useEffect(() => {
   const fetchTickets = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
          if (!storedUser || !storedUser.id) {
            console.error("No userID");
            return;
          }
        const data = await ticketsApi.list();
        const all = Array.isArray(data) ? data : [];
        // Filter client-side by account_Id
        const filtered = all.filter(t => t.account_Id === storedUser.id);
        setTickets(filtered);
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
    if (s === 'qr') return '#236A49';
    if (s === 'a') return '#236A49';
    if (s === 'p') return '#B58229';
    if (s === 'r') return '#75aef4';
    if (s === 'e') return '#dc3545';
    return '#6c757d';
  };

  const ticketStat = (Status) => {
  if (!Status) return 'N/A';
    const s = Status.toLowerCase();
    if (s === 'qr') return 'Quote Ready';
    if (s === 'a') return 'Active';
    if (s === 'p') return 'Pending';
    if (s === 'r') return 'Resolved';
    if (s === 'e') return 'Escalated';
    return 'N/A';
  };
  const ticketSeverity = (severity) => {
  if (!severity) return 'N/A';
    if(severity == 1) return 'Low'; 
    if(severity == 2) return 'Medium'; 
    if(severity == 3) return 'High'; 
    if(severity == 4) return 'Critical'; 
  };
  const filteredTickets = tickets
    .filter(t => filterSeverity ? t.severity == filterSeverity : true)
    .sort((a, b) => {
      if (sortBy === 'deadline') return a.deadline - b.deadline;
      if (sortBy === 'severity') return b.severity - a.severity;
      return 0;
    });
  return (
    <div className="tickets-page">

      <CustomerNav />

      <div className="container-fluid text-center" style={{ paddingTop: '25px' }}>

        {loading && <p style={{ color: 'white', marginTop: '2rem' }}>Loading...</p>}

        {error && (
          <div className="alert alert-danger" style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && tickets.length === 0 && (
          <p style={{ color: 'white', marginTop: '2rem' }}>No tickets found.</p>
        )}

                <div className="row justify-content-center mb-4 filter-container">
        <div className="col-md-3">
          <label className="filter-label">Filter Severity</label>
          <select 
            className="form-select custom-select" 
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="">All Severities</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Critical</option>
          </select>
        </div>
          <div className="col-md-3">
            <label className="filter-label">Sort By</label>
            <select 
              className="form-select custom-select" 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="deadline">Shortest Deadline</option>
              <option value="severity">Highest Severity</option>
            </select>
          </div>
        </div>
        
      <div className="row justify-content-center mt-4">
        {filteredTickets.map((ticket) => (
            <div className="col-lg-3" key={ticket.id}>
              <div className="card tickets">
                <div className="card-body d-flex flex-column">
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
                  <Link to={`/viewticket/${ticket.id}`} className="mt-auto" style={{ textDecoration: 'none' }}>
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
