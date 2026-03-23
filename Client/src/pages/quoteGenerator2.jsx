import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/quoteGenerator.css';
import AdminNav from '../components/adminNav';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';

export default function QuoteEstimate() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [quote, setQuote] = useState(null);
  const [overrideHours, setOverrideHours] = useState('');
  const [overrideRate, setOverrideRate] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quoteData = await quotesApi.getById(id);
        setQuote(quoteData);
        setOverrideHours(String(quoteData.estimated_Resolution_Time ?? ''));
        setOverrideRate(String(quoteData.hourly_Rate ?? ''));

        const ticketData = await ticketsApi.getById(quoteData.ticket_Id);
        setTicket(ticketData);
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
      ticket_Id: quote?.ticket_Id,
      status: 'Pending',
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

  const updateQuoteStatus = async (status) => {
    if (!quote?.id) return alert('No quote found to update.');
    try {
      await quotesApi.update(quote.id, { ...quote, status });
      setQuote(q => ({ ...q, status }));
      alert(`Quote ${status}.`);
    } catch (error) {
      console.error('Error updating quote status:', error);
      alert('Failed to update quote status.');
    }
  };

    const ticketStatus = (status) => {
    if (status === 'A') return 'Active';
    if (status === 'P') return 'Pending';
    if (status === 'C') return 'Complete';
    return status;
  };

  const ticketType = (type) => {
    if (type === 'S') return 'Support';
    if (type === 'I') return 'Incident';
    if (type === 'E') return 'Enhancement / Feature';
    return type;
  };

  const ticketSeverity = (severity) => {
    if (severity === 1) return 'Low';
    if (severity === 2) return 'Medium';
    if (severity === 3) return 'High';
    if (severity === 4) return 'Critical';
    return severity;
  };
  
  const effortLevel = (level) => {
    if (level === 1) return 'Low';
    if (level === 2) return 'Medium';
    if (level === 3) return 'High';
    return level;
  };

  const priorityLevel = (plevel) => {
    if (plevel === 1) return 'Low';
    if (plevel === 2) return 'Medium';
    if (plevel === 3) return 'High';
    if (plevel === 4) return 'Critical';
    return plevel;
  };

  const statusColor = (status) => {
  if (!status) return '#6c757d';
  const s = status.toLowerCase();
  if (s === 'a') return '#236A49';
  if (s === 'p') return '#B58229';
  if (s === 'c') return '#dc3545';
  return '#6c757d';
  };

  if (!ticket || !quote) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  return (
    <div className="quote-generator">
      <AdminNav />
      <div className="container-fluid" style={{ paddingTop: '70px' }}>
        <div className="row">
          <div className="col-2">
            <div className="card quote-ticket-card">
              <div className="card-body">
                <p style={{ fontWeight: 'bold' }}>Selected Ticket: {ticket.id}</p>
                <p>{ticket.title}</p>
                <p>Type: {ticketType(ticket.type)}</p>
                <p>Severity: {ticketSeverity(ticket.severity)}</p>
                <p>Deadline: {ticket.deadline} days</p>
                <p>Users Affected: {ticket.users_Affected}</p>
                <p>Status: <span className="badge" style={{ backgroundColor: statusColor(ticket.status), padding: '5px 8px' }}>{ticketStatus(ticket.status)}</span></p>
              </div>
            </div>
            <button className="btn quote-change-btn w-100 mt-2" onClick={() => navigate('/adminquotepage')}>Change Ticket</button>
          </div>

          <div className="col quote-main-card p-3">
            <p className="quote-heading">Quote Estimate</p>
            <div className="row">
              <div className="col">
                  <div className="mb-3">
                  <label style={{ color: 'white' }}>Internal Notes</label>
                  <textarea className="form-control quote-input mt-1" rows="3" placeholder="Internal notes..." value={internalNotes} onChange={e => setInternalNotes(e.target.value)}></textarea>
                </div>
                <div className="quote-inner-card p-3">
                  <p className="quote-subheading">Quote Breakdown</p>
                  <div className="row">
                    <div className="col-6">
                      <p className="quote-muted">Hourly Rate: <span className="quote-value">£{quote.hourly_Rate}</span></p>
                      <p className="quote-muted">Priority Level: <span className="quote-value">{priorityLevel(quote.priority_Level)}</span></p>
                    </div>
                    <div className="col-6">
                      <p className="quote-muted">Total Cost: <span className="quote-highlight">£{estimatedCost}</span></p>
                      <p className="quote-muted">Estimated Time: <span className="quote-value">{quote.estimated_Resolution_Time} hrs</span></p>
                    </div>
                    <div className="col-12">
                      <p className="quote-muted">Effort Level: <span className="quote-value">{effortLevel(quote.effort_Level)}</span></p>
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
                <label style={{ color: 'white' }}>Effort Level</label>
                <select className="form-control quote-input mt-1" value={quote?.effort_Level ?? ''} onChange={e => setQuote(q => ({ ...q, effort_Level: parseInt(e.target.value) }))}>
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                </select>
              </div>

              <div className="mb-3">
                <label style={{ color: 'white' }}>Priority Level</label>
                <select className="form-control quote-input mt-1" value={quote?.priority_Level ?? ''} onChange={e => setQuote(q => ({ ...q, priority_Level: parseInt(e.target.value) }))}>
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                  <option value={4}>Critical</option>
                </select>
              </div>

                <button className="btn quote-btn-save w-100 mb-2" onClick={handleSave}>Save Quote Revision</button>
                <button className="btn quote-btn-approve w-100 mb-2" onClick={() => updateQuoteStatus('Approved')}>Approve Quote</button>
                <button className="btn quote-btn-reject w-100" onClick={() => updateQuoteStatus('Rejected')}>Reject / Request Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}