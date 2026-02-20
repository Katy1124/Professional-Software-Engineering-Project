import React from 'react';
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

  const costSummary = {
    hourlyRate: '£40',
    totalCost: '£420.00',
    severity: 'Medium',
    estimatedTime: '10 Hours',
  };

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
                <span className="quote-info-value">{ticket.usersAffected}</span>
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
                {quoteBreakdown.map((item, i) => (
                  <div className="quote-breakdown-row" key={i}>
                    <span className="quote-breakdown-task">{item.task}</span>
                    <span className="quote-breakdown-hours">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="quote-cost-summary">
                <h3 className="quote-cost-title">Cost Summary</h3>
                <div className="quote-cost-grid">
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Hourly Rate:</span>
                    <span className="quote-cost-value">{costSummary.hourlyRate}</span>
                  </div>
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Total Cost:</span>
                    <span className="quote-cost-value quote-cost-highlight">{costSummary.totalCost}</span>
                  </div>
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Severity:</span>
                    <span className="quote-cost-value">{costSummary.severity}</span>
                  </div>
                  <div className="quote-cost-row">
                    <span className="quote-cost-label">Estimated Time:</span>
                    <span className="quote-cost-value">{costSummary.estimatedTime}</span>
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