import React, { useState } from 'react';
import { ticketsApi } from '../api/tickets.api';
import { attachmentsApi } from '../api/attachments.api';
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
    attachments: [],
  });

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleFormSubmit = async () => {
    console.log('1. Submit button clicked');

    const typeMap = {
      'Support': 'S',
      'Incident': 'I',
      'Enhancement / Feature': 'E'
    };

    const severityMap = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
    const businessMap = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };

    const selectedDate = new Date(form.date);
    const today = new Date();
    const diffTime = Math.abs(selectedDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 7;

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser || !storedUser.id) {
        alert('you must be logged in!');
        return;
      }

      const payload = {
        title: form.title,
        description: form.description,
        status: 'P',
        type: typeMap[form.type],
        severity: severityMap[form.severity],
        technical_Diffculty: businessMap[form.impact],
        users_Affected: parseInt(form.users) || 0,
        deadline: diffDays,
        account_Id: storedUser.id,
      };

      console.log('Payload:', payload);

      const result = await ticketsApi.create(payload);
      console.log('Database response:', result);

      if (!result || result.id === undefined) {
        alert('Ticket submitted, but no ID was returned. Check console for details.');
        return;
      }

      if (form.attachments && form.attachments.length > 0) {
        await attachmentsApi.uploadMany(result.id, form.attachments);
      }

      alert(`Success! Ticket added to database.\n\nTicket ID: ${result.id}\nTitle: ${result.title}`);
      navigate('/customer');
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
                <h1 style={{ color: 'white', fontSize: '30px', marginBottom: '20px' }}>
                  Ticket Submission
                </h1>

                <div className="mb-3">
                  <label style={{ color: 'white' }}>Ticket Type</label>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle w-100 text-start ticket-dropdown"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      {form.type || 'Select Type'}
                    </button>
                    <ul className="dropdown-menu ticket-dropdown-menu w-100">
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => set('type', 'Support')}
                        >
                          Support
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => set('type', 'Incident')}
                        >
                          Incident
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => set('type', 'Enhancement / Feature')}
                        >
                          Enhancement / Feature
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-3">
                  <label style={{ color: 'white' }}>Title</label>
                  <input
                    type="text"
                    className="form-control ticket-input"
                    placeholder="Briefly describe the issue"
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label style={{ color: 'white' }}>Description</label>
                  <textarea
                    className="form-control ticket-input"
                    rows="3"
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                  ></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label style={{ color: 'white' }}>Severity</label>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle w-100 text-start ticket-dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {form.severity || 'Select Severity'}
                      </button>
                      <ul className="dropdown-menu ticket-dropdown-menu w-100">
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('severity', 'Low')}
                          >
                            Low
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('severity', 'Medium')}
                          >
                            Medium
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('severity', 'High')}
                          >
                            High
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('severity', 'Critical')}
                          >
                            Critical
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-6">
                    <label style={{ color: 'white' }}>Business Impact</label>
                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle w-100 text-start ticket-dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        {form.impact || 'Select Impact'}
                      </button>
                      <ul className="dropdown-menu ticket-dropdown-menu w-100">
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('impact', 'Low')}
                          >
                            Low
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('impact', 'Medium')}
                          >
                            Medium
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('impact', 'High')}
                          >
                            High
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => set('impact', 'Critical')}
                          >
                            Critical
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label style={{ color: 'white' }}>Date of Issue</label>
                    <input
                      type="date"
                      className="form-control ticket-input"
                      value={form.date}
                      onChange={e => set('date', e.target.value)}
                    />
                  </div>

                  <div className="col-6">
                    <label style={{ color: 'white' }}>Users Affected</label>
                    <input
                      type="number"
                      className="form-control ticket-input"
                      min="0"
                      placeholder="Enter number"
                      value={form.users}
                      onChange={e => set('users', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                    Attachments
                  </label>

                  <div className="input-group">
                    <label
                      htmlFor="file-upload"
                      className="btn btn-light"
                      style={{ margin: 0, display: 'flex', alignItems: 'center' }}
                    >
                      Browse...
                    </label>

                    <div className="form-control ticket-input bg-dark text-white border-secondary">
                      {form.attachments.length > 0
                        ? `${form.attachments.length} file(s) selected`
                        : 'No file selected.'}
                    </div>

                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        set('attachments', files);
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                  <button
                    className="btn ticket-btn-cancel"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn ticket-btn-submit"
                    type="button"
                    onClick={handleFormSubmit}
                  >
                    Submit Ticket
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}