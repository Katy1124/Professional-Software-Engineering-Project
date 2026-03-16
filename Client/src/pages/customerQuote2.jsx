import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    <div className="quote-container">
      <header className="quote-header">
        <CustomerNav />
      </header>

      <main className="quote-main">
        <aside className="quote-sidebar">
          <div className="quote-ticket-card">
            <div className="quote-ticket-header">Selected Ticket: {ticket.id}</div>
            <div className="quote-ticket-detail">{ticket.title}</div>

            <div className="quote-ticket-info">
              <div className="quote-info-row">
                <span className="quote-info-label">Type:</span>
                <span className="quote-info-value">{ticket.type}</span>
              </div>
              <div className="quote-info-row">
                <span className="quote-info-label">Severity:</span>
                <span className="quote-info-value">{ticket.severity}</span>
              </div>
              <div className="quote-info-row">
                <span className="quote-info-label">Deadline:</span>
                <span className="quote-info-value">{ticket.deadline}</span>
              </div>
              <div className="quote-info-row">
                <span className="quote-info-label">Users Affected:</span>
                <span className="quote-info-value">{ticket.users_Affected}</span>
              </div>
            </div>

            <div className="quote-status">
              <span className="quote-status-label">Status:</span>
              <span className="quote-status-badge">{ticket.status}</span>
            </div>
          </div>

          <button className="quote-change-ticket-btn">Change Ticket</button>
        </aside>

        <div className="quote-big-card">
          <h1 className="quote-title">Quote Estimate</h1>

          <div className="quote-layout">
            <div className="quote-section">

              <div className="quote-breakdown-display">
                <h3 className="quote-section-title">Quote Breakdown</h3>
                <div className="quote-breakdown-row">
                  <span className="quote-breakdown-task">Estimated Resolution Time</span>
                  <span className="quote-breakdown-hours">{quote?.estimated_Resolution_Time ?? '—'} hrs</span>
                </div>
                <div className="quote-breakdown-row">
                  <span className="quote-breakdown-task">Effort Level</span>
                  <span className="quote-breakdown-hours">{quote?.effort_Level ?? '—'}</span>
                </div>
                <div className="quote-breakdown-row">
                  <span className="quote-breakdown-task">Priority Level</span>
                  <span className="quote-breakdown-hours">{quote?.priority_Level ?? '—'}</span>
                </div>
              </div>

              <div className="quote-cost-summary">
                <h3 className="quote-cost-title">Cost Summary</h3>
                <div className="quote-cost-grid">
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Hourly Rate:</span>
                    <span className="quote-cost-value">£{quote?.hourly_Rate ?? '—'}</span>
                  </div>
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Total Cost:</span>
                    <span className="quote-cost-value quote-cost-highlight">£{quote?.estimated_Cost?.toFixed(2) ?? '—'}</span>
                  </div>
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Priority Level:</span>
                    <span className="quote-cost-value">{quote?.priority_Level ?? '—'}</span>
                  </div>
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Estimated Time:</span>
                    <span className="quote-cost-value">{quote?.estimated_Resolution_Time ?? '—'} hrs</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="quote-customer-actions">
              <button className="quote-btn-accept">Accept Quote</button>
              <button className="quote-btn-modify">Modify Quote</button>
              <button className="quote-btn-decline">Decline Quote</button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}