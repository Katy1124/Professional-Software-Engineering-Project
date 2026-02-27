import React, { useState } from 'react';
import '../css/TicketForm.css';
import { useNavigate } from 'react-router-dom';
import CustomerNav from '../components/customerNav';

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
        <CustomerNav />
      </header>

      <main className="ticket-main">
        <div className="ticket-card">
          <h1 className="ticket-title">Ticket Submission</h1>

          <div className="dropdown ticket-field">
          <label for="dropdown" className="form-label">Ticket Type</label>
            <button className="btn btn-dark dropdown-toggle w-100 text-start custom-select-trigger" type="button" data-bs-toggle="dropdown">
              {form.type ? ["Select Type", "Support", "Incident", "Enhancement"][form.type] : "Select Type"}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark custom-dropdown-list w-100">
              <li><button className="dropdown-item" onClick={() => set('type', '1')}>Support</button></li>
              <li><button className="dropdown-item" onClick={() => set('type', '2')}>Incident</button></li>
              <li><button className="dropdown-item" onClick={() => set('type', '3')}>Enhancement / Feature</button></li>
            </ul>
          </div>

            <div className="mb-3 ticket-field">
              <label for="ticket-title" className="form-label">Title</label>
              <input type="text" className="form-control" id="ticket-title" placeholder="Briefly describe the issue" value={form.title} onChange={e => set('title', e.target.value)} />
            </div>

            <div className="mb-3 ticket-field">
              <label for="ticket-desc" className="form-label">Description</label>
              <textarea className="form-control" id="ticket-desc" rows="3" value={form.description} onChange={e => set('description', e.target.value)}></textarea>
            </div>

          <div className="ticket-row">
            <div className="ticket-field">
              <div className="dropdown ticket-field">
                <label for="dropdown" className="form-label">Severity</label>
                <button className="btn btn-dark dropdown-toggle w-100 text-start custom-select-trigger" type="button" data-bs-toggle="dropdown">
                  {form.severity ? ["Select Severity", "Low", "Medium", "High", "Critical"][form.severity] : "Select Severity"}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark custom-dropdown-list w-100">
                  <li><button className="dropdown-item" onClick={() => set('severity', '1')}>Low</button></li>
                  <li><button className="dropdown-item" onClick={() => set('severity', '2')}>Medium</button></li>
                  <li><button className="dropdown-item" onClick={() => set('severity', '3')}>High</button></li>
                  <li><button className="dropdown-item" onClick={() => set('severity', '4')}>Critical</button></li>
                </ul>
              </div>
            </div>

            <div className="ticket-field">
              <div className="dropdown ticket-field">
                <label for="dropdown" className="form-label">Business Impact</label>
                <button className="btn btn-dark dropdown-toggle w-100 text-start custom-select-trigger" type="button" data-bs-toggle="dropdown">
                  {form.impact ? ["Select Impact", "Low", "Medium", "High", "Critical"][form.impact] : "Select Impact"}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark custom-dropdown-list w-100">
                  <li><button className="dropdown-item" onClick={() => set('severity', '1')}>Low</button></li>
                  <li><button className="dropdown-item" onClick={() => set('severity', '2')}>Medium</button></li>
                  <li><button className="dropdown-item" onClick={() => set('severity', '3')}>High</button></li>
                  <li><button className="dropdown-item" onClick={() => set('severity', '4')}>Critical</button></li>
                </ul>
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

          <div className="mb-3 ticket-field">
            <label for="formFileMultiple" className="form-label">Attachments</label>
            <input className="form-control" type="file" id="formFileMultiple" multiple onChange={e => set('file', e.target.files[0])} />
          </div>

          <div className="ticket-actions">
            <button className="ticket-btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
            <button className="ticket-btn-primary" onClick={() => console.log('Submit:', form)}>Submit Ticket</button>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}