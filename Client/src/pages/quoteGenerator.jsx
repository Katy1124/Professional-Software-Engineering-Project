import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/quoteGenerator.css';
import AdminNav from '../components/adminNav';

export default function QuoteEstimate() {
  const [breakdown, setBreakdown] = useState('');
  const [overrideHours, setOverrideHours] = useState('10.5');
  const [overrideRate, setOverrideRate] = useState('£75');
  const [internalNotes, setInternalNotes] = useState('');

  const ticket = {
    id: 108,
    title: 'Sign-up button not working',
    type: 'Support',
    severity: 'Medium',
    deadline: '05/02/2026',
    usersAffected: 120,
    status: 'Active',
  };

  const costSummary = {
    hourlyRate: '£40',
    totalCost: '£420.00',
    severity: 'Medium',
    estimatedTime: '10 Hours',
  };

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
                <p>Users Affected: {ticket.usersAffected}</p>
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
                      <p className="quote-muted">Hourly Rate: <span className="quote-value">{costSummary.hourlyRate}</span></p>
                      <p className="quote-muted">Severity: <span className="quote-value">{costSummary.severity}</span></p>
                    </div>
                    <div className="col-6">
                      <p className="quote-muted">Total Cost: <span className="quote-highlight">{costSummary.totalCost}</span></p>
                      <p className="quote-muted">Estimated Time: <span className="quote-value">{costSummary.estimatedTime}</span></p>
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

                <button className="btn quote-btn-save w-100 mb-2">Save Quote Revision</button>
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