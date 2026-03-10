import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/customerQuote.css';
import CustomerNav from '../components/customerNav';

export default function CustomerQuote() {
  const ticket = {
    id: 108,
    title: 'Sign-up button not working',
    type: 'Support',
    severity: 'Medium',
    deadline: '05/02/2026',
    usersAffected: 120,
    status: 'Active',
  };

  const quoteBreakdown = [
    { task: 'Investigation and breakdown', hours: '1.5 hrs' },
    { task: 'Bug fix and testing', hours: '3 hrs' },
    { task: 'Deployment and verification', hours: '1 hr' },
    { task: 'Documentation', hours: '0.5 hrs' },
  ];

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
                  <p className="quote-subheading">Quote Breakdown</p>
                  {quoteBreakdown.map((item, i) => (
                    <div key={i} className="quote-breakdown-row py-2">
                      <span>{item.task}</span>
                      <span className="quote-muted">{item.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="quote-inner-card p-3">
                  <p className="quote-subheading">Cost Summary</p>
                  <div className="row">
                    <div className="col-6">
                      <p className="quote-muted">Hourly Rate: <span className="quote-value">£40</span></p>
                      <p className="quote-muted">Severity: <span className="quote-value">Medium</span></p>
                    </div>
                    <div className="col-6">
                      <p className="quote-muted">Total Cost: <span className="quote-highlight">£420.00</span></p>
                      <p className="quote-muted">Estimated Time: <span className="quote-value">10 Hours</span></p>
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