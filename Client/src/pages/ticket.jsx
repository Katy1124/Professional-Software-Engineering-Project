import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TicketForm.css';
import { useNavigate } from 'react-router-dom';
import CustomerNav from '../components/customerNav';

export default function TicketForm() {
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [impact, setImpact] = useState('');
  const [date, setDate] = useState('');
  const [users, setUsers] = useState('');

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
                  {type || 'Select Type'}
                </button>
                <ul className="dropdown-menu ticket-dropdown-menu w-100">
                  <li><button className="dropdown-item" onClick={() => setType('Support')}>Support</button></li>
                  <li><button className="dropdown-item" onClick={() => setType('Incident')}>Incident</button></li>
                  <li><button className="dropdown-item" onClick={() => setType('Enhancement / Feature')}>Enhancement / Feature</button></li>
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label style={{ color: 'white' }}>Title</label>
              <input type="text" className="form-control ticket-input" placeholder="Briefly describe the issue" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="mb-3">
              <label style={{ color: 'white' }}>Description</label>
              <textarea className="form-control ticket-input" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label style={{ color: 'white' }}>Severity</label>
                <div className="dropdown">
                  <button className="btn dropdown-toggle w-100 text-start ticket-dropdown" type="button" data-bs-toggle="dropdown">
                    {severity || 'Select Severity'}
                  </button>
                  <ul className="dropdown-menu ticket-dropdown-menu w-100">
                    <li><button className="dropdown-item" onClick={() => setSeverity('Low')}>Low</button></li>
                    <li><button className="dropdown-item" onClick={() => setSeverity('Medium')}>Medium</button></li>
                    <li><button className="dropdown-item" onClick={() => setSeverity('High')}>High</button></li>
                    <li><button className="dropdown-item" onClick={() => setSeverity('Critical')}>Critical</button></li>
                  </ul>
                </div>
              </div>
              <div className="col-6">
                <label style={{ color: 'white' }}>Business Impact</label>
                <div className="dropdown">
                  <button className="btn dropdown-toggle w-100 text-start ticket-dropdown" type="button" data-bs-toggle="dropdown">
                    {impact || 'Select Impact'}
                  </button>
                  <ul className="dropdown-menu ticket-dropdown-menu w-100">
                    <li><button className="dropdown-item" onClick={() => setImpact('Low')}>Low</button></li>
                    <li><button className="dropdown-item" onClick={() => setImpact('Medium')}>Medium</button></li>
                    <li><button className="dropdown-item" onClick={() => setImpact('High')}>High</button></li>
                    <li><button className="dropdown-item" onClick={() => setImpact('Critical')}>Critical</button></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <label style={{ color: 'white' }}>Date of Issue</label>
                <input type="date" className="form-control ticket-input" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="col-6">
                <label style={{ color: 'white' }}>Users Affected</label>
                <input type="number" className="form-control ticket-input" min="0" placeholder="Enter number" value={users} onChange={e => setUsers(e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label style={{ color: 'white' }}>Attachments</label>
              <input className="form-control ticket-input" type="file" multiple />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              <button className="btn ticket-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn ticket-btn-submit" onClick={() => console.log('Submit')}>Submit Ticket</button>
            </div>

          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}