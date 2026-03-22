import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { quotesApi } from '../api/quotes.api';
import '../css/ticketsPage.css';
import CustomerNav from '../components/customerNav';

const ACCOUNT_ID = 1;

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await quotesApi.list();
        const all = Array.isArray(data) ? data : [];
        const filtered = all.filter(q => q.status === 'Approved');
        setQuotes(filtered);
      } catch (err) {
        setError(err.message || 'Failed to load quotes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

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
                  <p style={{ fontSize: '20px' }}><span>Priority Level: </span><span>{quote.priority_Level}</span></p>
                  <p style={{ fontSize: '20px' }}><span>Status: </span>
                    <span style={{ padding: '5px', borderRadius: '5px', backgroundColor: '#B58229', color: 'white' }}>
                      {quote.status}
                    </span>
                  </p>
                  <Link to={`/viewQuoteCustomer/${quote.id}`} style={{ textDecoration: 'none' }}>
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