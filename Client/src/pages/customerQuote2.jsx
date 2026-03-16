import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/customerQuote.css';
import CustomerNav from '../components/customerNav';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';

export default function CustomerQuote() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketData = await ticketsApi.getById(id);
        setTicket(ticketData);

        const quoteData = await quotesApi.getByTicketId(id);
        const q = Array.isArray(quoteData) ? quoteData[0] : quoteData;
        if (q) setQuote(q);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!ticket) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  return (
    <div className="customer-quote">
      <CustomerNav />

      <div className="container-fluid" style={{ paddingTop: '100px' }}>
        <div className="row">
          <div className="col-2">
            <div className="card quote-ticket-card">
              <div className="card-body">
                <p style={{ fontWeight: 'bold' }}>Selected Ticket: {ticket.id}</p>
                <p>{ticket.title}</p>
                <p>Type: {ticket.type}</p>
                <p>Severity: {ticket.severity}</p>
                <p>Deadline: {ticket.deadline}</p>
                <p>Users Affected: {ticket.users_Affected}</p>
                <p>Status: <span className="badge" style={{ backgroundColor: '#22c55e' }}>{ticket.status}</span></p>
              </div>
            </div>
            <button className="btn quote-change-btn w-100 mt-2">Change Ticket</button>
          </div>

          <div className="col quote-main-card p-3">
            <p className="quote-heading">Quote Estimate</p>
            <div className="row">
              <div className="col">
                <div className="quote-inner-card p-3 mb-3">
                  <p className="quote-subheading">Quote Breakdown</p>
                  <div className="quote-breakdown-row py-2">
                    <span>Estimated Resolution Time</span>
                    <span className="quote-muted">{quote?.estimated_Resolution_Time ?? '—'} hrs</span>
                  </div>
                  <div className="quote-breakdown-row py-2">
                    <span>Effort Level</span>
                    <span className="quote-muted">{quote?.effort_Level ?? '—'}</span>
                  </div>
                  <div className="quote-breakdown-row py-2">
                    <span>Priority Level</span>
                    <span className="quote-muted">{quote?.priority_Level ?? '—'}</span>
                  </div>
                </div>

                <div className="quote-inner-card p-3">
                  <p className="quote-subheading">Cost Summary</p>
                  <div className="row">
                    <div className="col-6">
                      <p className="quote-muted">Hourly Rate: <span className="quote-value">£{quote?.hourly_Rate ?? '—'}</span></p>
                      <p className="quote-muted">Priority Level: <span className="quote-value">{quote?.priority_Level ?? '—'}</span></p>
                    </div>
                    <div className="col-6">
                      <p className="quote-muted">Total Cost: <span className="quote-highlight">£{quote?.estimated_Cost?.toFixed(2) ?? '—'}</span></p>
                      <p className="quote-muted">Estimated Time: <span className="quote-value">{quote?.estimated_Resolution_Time ?? '—'} hrs</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-2 quote-actions p-3">
                <button className="btn quote-btn-accept w-100 mb-2">Accept Quote</button>
                <button className="btn quote-btn-modify w-100 mb-2">Modify Quote</button>
                <button className="btn quote-btn-decline w-100">Decline Quote</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}