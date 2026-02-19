import React, { useState } from 'react';
import '../css/quoteGenerator.css';
import { useNavigate } from 'react-router-dom';

export default function QuoteEstimate() {
  const navigate = useNavigate();

  const [quote, setQuote] = useState({
    breakdown: '',
    overrideHours: '10.5',
    overrideRate: '£75',
    internalNotes: '',
  });

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

  const set = (key, val) => setQuote(p => ({ ...p, [key]: val }));

  return (
    <div className="quote-container">
      <header className="quote-header">
        <div className="quote-header-left">
          <div className="quote-hamburger">
            <span /><span /><span />
          </div>
          <img src="/giacom-master-white-logo-1.png" alt="GIACOM" className="header-logo" />
        </div>
        <div className="quote-header-right">
          <span>Welcome [User]</span>
          <div className="quote-avatar">U</div>
        </div>
      </header>

      <main className="quote-main">
        {/* Left Sidebar - Ticket Details (OUTSIDE) */}
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
        </aside>

        {/* Right Big Card - All Actions */}
        <div className="quote-big-card">
          <div className="quote-header-row">
            <h1 className="quote-title">Quote Estimate</h1>
            <button className="quote-change-btn">Change Ticket</button>
          </div>

          <div className="quote-layout">
            {/* Quote Breakdown */}
            <div className="quote-section">
              <label className="quote-label">Quote Breakdown</label>
              <textarea
                className="quote-textarea"
                placeholder="Enter quote breakdown details..."
                value={quote.breakdown}
                onChange={e => set('breakdown', e.target.value)}
              />
            </div>

            {/* Admin Controls */}
            <div className="quote-admin-controls">
              <h3 className="quote-admin-title">Admin Controls</h3>

              <div className="quote-control-group">
                <label>Override Hours:</label>
                <input
                  type="text"
                  className="quote-control-input"
                  value={quote.overrideHours}
                  onChange={e => set('overrideHours', e.target.value)}
                />
              </div>

              <div className="quote-control-group">
                <label>Override Rate:</label>
                <input
                  type="text"
                  className="quote-control-input"
                  value={quote.overrideRate}
                  onChange={e => set('overrideRate', e.target.value)}
                />
              </div>

              <div className="quote-control-group">
                <label>Internal Notes</label>
                <textarea
                  className="quote-notes-textarea"
                  placeholder="Internal notes..."
                  value={quote.internalNotes}
                  onChange={e => set('internalNotes', e.target.value)}
                />
              </div>

              {/* Action Buttons inside Admin Controls */}
              <div className="quote-admin-actions">
                <button className="quote-btn-save">Save Quote Revision</button>
                <button className="quote-btn-approve">Approve Quote</button>
                <button className="quote-btn-reject">Reject / Request Changes</button>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
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
      </main>
    </div>
  );
}