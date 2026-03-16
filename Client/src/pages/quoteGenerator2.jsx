import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/quoteGenerator.css';
import AdminNav from '../components/adminNav';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';

export default function QuoteEstimate() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [quote, setQuote] = useState(null);
  const [breakdown, setBreakdown] = useState('');
  const [overrideHours, setOverrideHours] = useState('');
  const [overrideRate, setOverrideRate] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketData = await ticketsApi.getById(id);
        setTicket(ticketData);

        const quoteData = await quotesApi.getByTicketId(id);
        const q = Array.isArray(quoteData) ? quoteData[0] : quoteData;
        if (q) {
          setQuote(q);
          setOverrideHours(String(q.estimated_Resolution_Time ?? ''));
          setOverrideRate(String(q.hourly_Rate ?? ''));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const estimatedCost = overrideHours && overrideRate
    ? (parseFloat(overrideHours) * parseFloat(overrideRate)).toFixed(2)
    : quote?.estimated_Cost?.toFixed(2) ?? '—';

  const handleSave = async () => {
    const payload = {
      hourly_Rate: parseFloat(overrideRate),
      estimated_Resolution_Time: parseFloat(overrideHours),
      estimated_Cost: parseFloat(overrideHours) * parseFloat(overrideRate),
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
      alert('Quote saved successfully.');
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Failed to save quote.');
    }
  };

  if (!ticket) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  return (
    <div className="quote-generator">
      <AdminNav />

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
                  <label style={{ color: 'white' }}>Quote Breakdown</label>
                  <textarea className="form-control quote-input mt-2" rows="4" placeholder="Enter quote breakdown details..." value={breakdown} onChange={e => setBreakdown(e.target.value)}></textarea>
                </div>

                <div className="quote-inner-card p-3 mb-3">
                  <label style={{ color: 'white' }}>Attachments</label>
                  <input type="file" className="form-control quote-input mt-2" multiple />
                </div>

                <div className="quote-inner-card p-3">
                  <p className="quote-subheading">Cost Summary</p>
                  <div className="row">
                    <div className="col-6">
                      <p className="quote-muted">Hourly Rate: <span className="quote-value">£{quote?.hourly_Rate ?? '—'}</span></p>
                      <p className="quote-muted">Priority Level: <span className="quote-value">{quote?.priority_Level ?? '—'}</span></p>
                    </div>
                    <div className="col-6">
                      <p className="quote-muted">Total Cost: <span className="quote-highlight">£{estimatedCost}</span></p>
                      <p className="quote-muted">Estimated Time: <span className="quote-value">{quote?.estimated_Resolution_Time ?? '—'} hrs</span></p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-3 quote-actions p-3">
                <p className="quote-subheading">Admin Controls</p>

                <div className="mb-3">
                  <label style={{ color: 'white' }}>Override Hours</label>
                  <input type="text" className="form-control quote-input mt-1" value={overrideHours} onChange={e => setOverrideHours(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label style={{ color: 'white' }}>Override Rate</label>
                  <input type="text" className="form-control quote-input mt-1" value={overrideRate} onChange={e => setOverrideRate(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label style={{ color: 'white' }}>Internal Notes</label>
                  <textarea className="form-control quote-input mt-1" rows="3" placeholder="Internal notes..." value={internalNotes} onChange={e => setInternalNotes(e.target.value)}></textarea>
                </div>

                <button className="btn quote-btn-save w-100 mb-2" onClick={handleSave}>Save Quote Revision</button>
                <button className="btn quote-btn-approve w-100 mb-2">Approve Quote</button>
                <button className="btn quote-btn-reject w-100">Reject / Request Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}