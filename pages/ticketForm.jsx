import React, { useState } from 'react';
import { ticketsApi } from '../api/tickets.api';
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
  
  const handleFormSubmit = async () => {
    console.log("1. Submit button clicked");

    const severityMap = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
    const businessMap = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
    const selectedDate = new Date(form.date);
    const today = new Date();
    const diffTime = Math.abs(selectedDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 7;
    
    try {
        const payload = {
            title: form.title,
            description: `[TYPE: ${form.type}] ${form.description}`,
            quote: 0,
            severity: severityMap[form.severity],
            technical_Diffculty: businessMap[form.impact],
            users_Affected: parseInt(form.users) || 0,
            deadline: diffDays,
            account_Id: 1,
        };
        console.log("Payload:", payload);
        const result = await ticketsApi.create(payload);
        console.log("Database response:", result);

        if (result && (result.id !== undefined)) {
          alert(`Success! Ticket added to database.\n\nTicket ID: ${result.id}\nTitle: ${result.title}`);
        } else {
          alert("Ticket submitted, but no ID was returned. Check console for details.");
        }
        } catch (error) {
      console.error('Submission Error:', error);
      alert(`Submission failed: ${error.message}`);
    }
  };


  return (
    <div className="ticket-form">
      <CustomerNav />

      <div className="container" style={{ paddingTop: '100px' }}>
        <div className="row">
          <div className="col-6 mx-auto">
        <div className="card ticket-form-card">
          <div className="card-body">
            <h1 style={{ color: 'white', fontSize: '30px', marginBottom: '20px' }}>Ticket Submission</h1>

            <div className="mb-3">
              <label style={{ color: 'white' }}>Ticket Type</label>
              <div className="dropdown">
                <button className="btn dropdown-toggle w-100 text-start ticket-dropdown" type="button" data-bs-toggle="dropdown">
                  {form.type || 'Select Type'}
                </button>
                <ul className="dropdown-menu ticket-dropdown-menu w-100">
                  <li><button className="dropdown-item" onClick={() => set('type', 'Support')}>Support</button></li>
                  <li><button className="dropdown-item" onClick={() => set('type', 'Incident')}>Incident</button></li>
                  <li><button className="dropdown-item" onClick={() => set('type', 'Enhancement / Feature')}>Enhancement / Feature</button></li>
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label style={{ color: 'white' }}>Title</label>
              <input type="text" className="form-control ticket-input" placeholder="Briefly describe the issue" value={form.title} onChange={e => set('title', e.target.value)} />
            </div>

            <div className="mb-3">
              <label style={{ color: 'white' }}>Description</label>
              <textarea className="form-control ticket-input" rows="3" value={form.description} onChange={e => set('description', e.target.value)}></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label style={{ color: 'white' }}>Severity</label>
                <div className="dropdown">
                  <button className="btn dropdown-toggle w-100 text-start ticket-dropdown" type="button" data-bs-toggle="dropdown">
                    {form.severity || 'Select Severity'}
                  </button>
                  <ul className="dropdown-menu ticket-dropdown-menu w-100">
                    <li><button className="dropdown-item" onClick={() => set('severity', 'Low')}>Low</button></li>
                    <li><button className="dropdown-item" onClick={() => set('severity', 'Medium')}>Medium</button></li>
                    <li><button className="dropdown-item" onClick={() => set('severity', 'High')}>High</button></li>
                    <li><button className="dropdown-item" onClick={() => set('severity', 'Critical')}>Critical</button></li>
                  </ul>
                </div>
              </div>
              <div className="col-6">
                <label style={{ color: 'white' }}>Business Impact</label>
                <div className="dropdown">
                  <button className="btn dropdown-toggle w-100 text-start ticket-dropdown" type="button" data-bs-toggle="dropdown">
                    {form.impact || 'Select Impact'}
                  </button>
                  <ul className="dropdown-menu ticket-dropdown-menu w-100">
                    <li><button className="dropdown-item" onClick={() => set('impact', 'Low')}>Low</button></li>
                    <li><button className="dropdown-item" onClick={() => set('impact', 'Medium')}>Medium</button></li>
                    <li><button className="dropdown-item" onClick={() => set('impact', 'High')}>High</button></li>
                    <li><button className="dropdown-item" onClick={() => set('impact', 'Critical')}>Critical</button></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label style={{ color: 'white' }}>Date of Issue</label>
                <input type="date" className="form-control ticket-input" value={form.date} onChange={e => set('date', e.target.value)} />
              </div>
              <div className="col-6">
                <label style={{ color: 'white' }}>Users Affected</label>
                <input type="number" className="form-control ticket-input" min="0" placeholder="Enter number" value={form.users} onChange={e => set('users', e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label style={{ color: 'white' }}>Attachments</label>
              <input className="form-control ticket-input" type="file" multiple hidden onChange={e => set('file', e.target.files[0])} />
              <span>{form.file ? form.file.name : 'Choose a file'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              <button className="btn ticket-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn ticket-btn-submit" type='button' onClick={handleFormSubmit}>Submit Ticket</button>
            </div>

          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}