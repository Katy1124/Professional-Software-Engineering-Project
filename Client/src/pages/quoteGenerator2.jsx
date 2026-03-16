import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/quoteGenerator.css';
import AdminNav from '../components/adminNav';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';

export default function QuoteEstimate() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [quote, setQuote] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    breakdown: '',
    overrideHours: '',
    overrideRate: '',
    internalNotes: '',
    files: [],
  });

  const set = (key, val) => setQuoteForm(p => ({ ...p, [key]: val }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketData = await ticketsApi.getById(id);
        setTicket(ticketData);

        const quoteData = await quotesApi.getByTicketId(id);
        const q = Array.isArray(quoteData) ? quoteData[0] : quoteData;
        if (q) {
          setQuote(q);
          setQuoteForm(p => ({
            ...p,
            overrideHours: String(q.estimated_Resolution_Time ?? ''),
            overrideRate: String(q.hourly_Rate ?? ''),
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async () => {
    const payload = {
      hourly_Rate: parseFloat(quoteForm.overrideRate),
      estimated_Resolution_Time: parseFloat(quoteForm.overrideHours),
      estimated_Cost: parseFloat(quoteForm.overrideHours) * parseFloat(quoteForm.overrideRate),
      priority_Level: quote?.priority_Level ?? 0,
      effort_Level: quote?.effort_Level ?? 0,
      ticket_Id: parseInt(id),
    };
    try {
      if (quote?.id) {
        await quotesApi.update(quote.id, payload);
      } else {
        await quotesApi.create(payload);
      }
    } catch (error) {
      console.error('Error saving quote:', error);
    }
  };

  if (!ticket) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  const estimatedCost = quoteForm.overrideHours && quoteForm.overrideRate
    ? (parseFloat(quoteForm.overrideHours) * parseFloat(quoteForm.overrideRate)).toFixed(2)
    : quote?.estimated_Cost?.toFixed(2) ?? '—';

  return (
    <div className="quote-container">
      <header className="quote-header">
        <AdminNav />
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
              <label className="quote-label">Quote Breakdown</label>
              <textarea
                className="quote-textarea"
                placeholder="Enter quote breakdown details..."
                value={quoteForm.breakdown}
                onChange={e => set('breakdown', e.target.value)}
              />

              <div className="quote-attachments">
                <label className="quote-label">Attachments</label>
                <label className="quote-file-upload">
                  <input type="file" hidden multiple onChange={e => set('files', Array.from(e.target.files))} />
                  📎 Choose files or drag and drop
                </label>
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
                    <span className="quote-cost-value quote-cost-highlight">£{estimatedCost}</span>
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

            <div className="quote-admin-controls">
              <h3 className="quote-admin-title">Admin Controls</h3>

              <div className="quote-control-group">
                <label>Override Hours:</label>
                <input
                  type="text"
                  className="quote-control-input"
                  value={quoteForm.overrideHours}
                  onChange={e => set('overrideHours', e.target.value)}
                />
              </div>

              <div className="quote-control-group">
                <label>Override Rate:</label>
                <input
                  type="text"
                  className="quote-control-input"
                  value={quoteForm.overrideRate}
                  onChange={e => set('overrideRate', e.target.value)}
                />
              </div>

              <div className="quote-control-group">
                <label>Internal Notes</label>
                <textarea
                  className="quote-notes-textarea"
                  placeholder="Internal notes..."
                  value={quoteForm.internalNotes}
                  onChange={e => set('internalNotes', e.target.value)}
                />
              </div>

              <div className="quote-admin-actions">
                <button className="quote-btn-save" onClick={handleSave}>Save Quote Revision</button>
                <button className="quote-btn-approve">Approve Quote</button>
                <button className="quote-btn-reject">Reject / Request Changes</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}