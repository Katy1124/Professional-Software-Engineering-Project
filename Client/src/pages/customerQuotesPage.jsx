import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { quotesApi } from '../api/quotes.api';
import '../css/ticketsPage.css';
import CustomerNav from '../components/customerNav';

// const ACCOUNT_ID = 1;

export default function CustomerQuotesPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const userObj = storedUser ? JSON.parse(storedUser) : null;
        setCurrentUser(userObj);

        const data = await quotesApi.list();
        const all = Array.isArray(data) ? data : [];
        if (userObj && userObj.id) {
          const filtered = all.filter(q => q.status === 'Approved');
        setQuotes(filtered);
      } else {
        setError("No user session found. Please log in again.");
      } 
    } catch (err) {
        setError(err.message || 'Failed to load quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleViewQuote = (quote) => {
    localStorage.setItem('quoteId', quote.id);
    navigate(`/viewquote/${quote.id}`);
  }

    const priorityLevel = (plevel) => {
    if (plevel === 1) return 'Low';
    if (plevel === 2) return 'Medium';
    if (plevel === 3) return 'High';
    if (plevel === 4) return 'Critical';
    return plevel;
  };

  const effortLevel = (level) => {
    if (level === 1) return 'Low';
    if (level === 2) return 'Medium';
    if (level === 3) return 'High';
    return level;
  };

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

        {!loading && !error && quotes.length === 0 && (
          <p style={{ color: 'white', marginTop: '2rem' }}>No quotes available.</p>
        )}

        <div className="row align-items-start justify-content-center mt-4">
          {quotes.map((quote) => (
            <div className="col-auto" key={quote.id}>
              <div className="card tickets">
                <div className="card-body">
                  <p style={{ fontSize: '60px', fontWeight: 'bold' }}>Quote {quote.id}</p>
                  <p style={{ fontSize: '40px' }}>Ticket: {quote.ticket_Id}</p>
                  <p style={{ fontSize: '20px' }}><span>Hourly Rate: </span><span>£{quote.hourly_Rate}</span></p>
                  <p style={{ fontSize: '20px' }}><span>Estimated Time: </span><span>{quote.estimated_Resolution_Time} hrs</span></p>
                  <p style={{ fontSize: '20px' }}><span>Total Cost: </span><span>£{quote.estimated_Cost?.toFixed(2)}</span></p>
                  <p style={{ fontSize: '20px' }}><span>Priority Level: </span><span>{priorityLevel(quote.priority_Level)}</span></p>
                  <p style={{ fontSize: '20px' }}><span>Effort Level: </span><span>{effortLevel(quote.effort_Level)}</span></p>
                  <p style={{ fontSize: '20px' }}><span>Status: </span>
                    <span style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#236A49', color: 'white' }}>
                      {quote.status}
                    </span>
                  </p>
                  <button className="view-button" onClick={() => handleViewQuote(quote)}>
                    View
                  </button>
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