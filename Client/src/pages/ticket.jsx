import React, { useState } from 'react';
import './TicketForm.css';
import { useNavigate } from 'react-router-dom';

export default function TicketForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: 'Support',
    title: '',
    description: '',
    severity: 'Low',
    impact: 'Low',
    date: '',
    users: '',
    file: null,
  });

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  return (
    <div className="ticket-container">
      <header className="ticket-header">
        <div className="ticket-header-left">
          <div className="ticket-hamburger">
            <span /><span /><span />
          </div>
          <div className="ticket-logo">GIACOM<span className="ticket-logo-dot">.</span></div>
        </div>
        <div className="ticket-header-right">
          <span>[User]</span>
          <div className="ticket-avatar">U</div>
        </div>
      </header>

      <main className="ticket-main">
        <div className="ticket-card">
          <h1 className="ticket-title">Ticket Submission</h1>

          <div className="ticket-field">
            <label>Ticket Type</label>
            <select value={form.type} onChange={e => set('type', e.target.value)}>
              <option>Support</option>
              <option>Incident</option>
              <option value="Enhancement">Enhancement / Feature</option>
            </select>
          </div>

          <div className="ticket-field">
            <label>Title</label>
            <input type="text" placeholder="Brief description" value={form.title} onChange={e => set('title', e.target.value)} />
          </div>

          <div className="ticket-field">
            <label>Description</label>
            <textarea placeholder="Describe your issue or request" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>

          <div className="ticket-row">
            <div className="ticket-field">
              <label>Severity</label>
              <select value={form.severity} onChange={e => set('severity', e.target.value)}>
                {['Low', 'Medium', 'High', 'Critical'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="ticket-field">
              <label>Business Impact</label>
              <select value={form.impact} onChange={e => set('impact', e.target.value)}>
                {['Low', 'Medium', 'High', 'Critical'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="ticket-row">
            <div className="ticket-field">
              <label>Date of Issue</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div className="ticket-field">
              <label>Users Affected</label>
              <input type="number" min="0" placeholder="Enter number" value={form.users} onChange={e => set('users', e.target.value)} />
            </div>
          </div>

          <div className="ticket-field">
            <label>Attachments</label>
            <label className="ticket-file">
              <input type="file" hidden onChange={e => set('file', e.target.files[0])} />
              <span>{form.file ? form.file.name : 'Choose a file'}</span>
            </label>
          </div>

          <div className="ticket-actions">
            <button className="ticket-btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
            <button className="ticket-btn-primary" onClick={() => console.log('Submit:', form)}>Submit Ticket</button>
          </div>
        </div>
      </main>
    </div>
  );
}