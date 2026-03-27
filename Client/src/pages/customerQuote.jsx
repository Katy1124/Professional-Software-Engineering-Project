import CustomerNav from '../components/customerNav';
import { useState, useEffect } from 'react';
import { ticketsApi } from '../api/tickets.api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/customerQuote.css';

const BASE_RATE   = { E: 65, I: 85, S: 55 };
const SEV_MULT    = { 1: 1.0, 2: 1.25, 3: 1.6, 4: 2.0 };
const IMPACT_MULT = { 1: 1.0, 2: 1.15, 3: 1.35, 4: 1.6 };
const RES_HOURS   = {
    E: { 1: 8,  2: 12, 3: 20, 4: 32 },
    I: { 1: 2,  2: 4,  3: 8,  4: 16 },
    S: { 1: 4,  2: 6,  3: 10, 4: 18 },
  };
const ROLE_SPLIT = {
  E: { BA: 0.05, QA: 0.50, Architect: 0.00, Developer: 0.45 },
  I: { BA: 0.02, QA: 0.20, Architect: 0.00, Developer: 0.78 },
  S: { BA: 0.10, QA: 0.10, Architect: 0.00, Developer: 0.80 },
};

const normType = (t = '') => {
  const u = String(t).trim().toUpperCase();
  if (u === 'E' || u === 'ENHANCEMENT') return 'E';
  if (u === 'I' || u === 'INCIDENT') return 'I';
  return 'S';
};
const fmt = (n) => `£${Number(n).toFixed(2)}`;
const fmtH = (n) => `${Number(n).toFixed(1)}h`;
 
const ticketType = (type) => {
  const t = normType(type);
  if (t === 'E') return 'Enhancement';
  if (t === 'I') return 'Incident';
  return 'Support';
};
 
const ticketSeverity = (severity) => {
  if (!severity) return 'N/A';
  if (severity == 1) return 'Low';
  if (severity == 2) return 'Medium';
  if (severity == 3) return 'High';
  if (severity == 4) return 'Critical';
  return 'N/A';
};
 
const ticketImpact = (impact) => {
  if (!impact) return 'N/A';
  if (impact == 1) return 'Low';
  if (impact == 2) return 'Medium';
  if (impact == 3) return 'High';
  if (impact == 4) return 'Critical';
  return 'N/A';
};
 
const ticketStat = (status) => {
  if (!status) return 'N/A';
  const s = status.toLowerCase();
  if (s === 'a') return 'Active';
  if (s === 'p') return 'Pending';
  if (s === 'c') return 'Closed';
  return 'N/A';
};
 
const statusColor = (status) => {
  if (!status) return '#6c757d';
  const s = status.toLowerCase();
  if (s === 'a') return '#22c55e';
  if (s === 'p') return '#f59e0b';
  if (s === 'r') return '#75aef4';
  if (s === 'e') return '#dc3545';
  return '#6c757d';
};

function TicketModal({ tickets, loading, error, onSelect, onClose }) {
  const [search, setSearch] = useState('');
 
  const filtered = tickets.filter((t) => {
    if (!search) return true;
    return (
      String(t.id).includes(search) ||
      (t.title || '').toLowerCase().includes(search.toLowerCase()) ||
      normType(t.type) === search.toUpperCase()
    );
  });
 
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1050,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1e0a3c',
          border: '1px solid #67236a',
          borderRadius: 12,
          width: '100%',
          maxWidth: 560,
          maxHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ background: '#67236a', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Select a Ticket</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer' }}>×</button>
        </div>
 
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #67236a' }}>
          <input
            className="form-control quote-input"
            placeholder="Search by id, title or type (E / I / S)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
 
        <div style={{ overflowY: 'auto', flex: 1, padding: '8px 12px' }}>
          {loading && <p style={{ color: '#d4b8d6', padding: '12px 8px' }}>Loading tickets…</p>}
          {error && <p style={{ color: '#f87171', padding: '12px 8px' }}>Error: {error}</p>}
          {!loading && filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => { onSelect(t); onClose(); }}
              style={{ background: '#2d0a3e', border: '1px solid #67236a', borderRadius: 8, padding: '10px 14px', marginBottom: 6, cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#3d1452'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2d0a3e'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontWeight: 'bold', color: '#ffb91d' }}>#{t.id}</span>
                <span style={{ fontSize: 12, color: '#d4b8d6' }}>{ticketType(t.type)}</span>
              </div>
              <p style={{ margin: 0, color: 'white', fontSize: 14 }}>{t.title || '(no title)'}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: '#d4b8d6' }}>Severity: {ticketSeverity(t.severity)}</span>
                {t.quote != null && (
                  <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>{fmt(t.quote)} quoted</span>
                )}
              </div>
            </div>
          ))}
          {!loading && filtered.length === 0 && (
            <p style={{ color: '#d4b8d6', padding: '12px 8px' }}>No tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default function QuoteEstimate() {
  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [ticketsError, setTicketsError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resHours, setResHours] = useState('');
  const [devHours, setDevHours] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [ticket, setTicket] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [internalNotes, setInternalNotes] = useState('');
 
  useEffect(() => {
  const fetchTickets = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.id) {
        console.error("No userID");
        setTicketsError('You must be logged in to view tickets.');
        return;
      }

      const data = await ticketsApi.list();
      const all = Array.isArray(data) ? data : [];
      const userTickets = all.filter((t) => t.account_Id === storedUser.id);
      setTickets(userTickets);
    } catch (err) {
      setTicketsError(err.message || 'Failed to load tickets');
    } finally {
      setTicketsLoading(false);
    }
  };
  fetchTickets();
}, []);
 useEffect(() => {
  if (!ticket) return;
  const type   = normType(ticket.type);
  const sev    = Math.max(1, Math.min(4, Number(ticket.severity) || 1));
  const impact = Math.max(1, Math.min(4, Number(ticket.technical_Diffculty) || 1));
  const autoResHrs = (RES_HOURS[type] ?? RES_HOURS.S)[sev];
  const autoDevHrs = +(autoResHrs * 0.6).toFixed(1);
  const autoRate   = +(BASE_RATE[type] * SEV_MULT[sev] * IMPACT_MULT[impact]).toFixed(2);
  setResHours(String(autoResHrs));
  setDevHours(String(autoDevHrs));
  setHourlyRate(String(autoRate));
}, [ticket?.id]);
  useEffect(() => {
    if (!ticket) return;
    const type = normType(ticket.type);
  }, [ticket?.id]);
 
  const type = ticket ? normType(ticket.type) : 'S';
  const effectiveResHrs = Math.max(0, parseFloat(resHours) || 0);
  const effectiveDevHrs = Math.max(0, parseFloat(devHours) || 0);
  const effectiveRate = Math.max(0, parseFloat(hourlyRate) || 0);
  const totalCost = +(effectiveRate * effectiveResHrs).toFixed(2);
 
  const showToast = (msg, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };
  const handleApprove = async () => {
    if (!ticket) return;
    setSaving(true);
    try {
      await ticketsApi.update(ticket.id, { ...ticket, status: 'a', quote: totalCost });
      setTicket((prev) => ({ ...prev, status: 'a', quote: totalCost }));
      showToast('Quote approved');
    } catch (err) {
      showToast(err.message || 'Approve failed', false);
    } finally {
      setSaving(false);
    }
  };
 
  const handleReject = async () => {
    if (!ticket) return;
    setSaving(true);
    try {
      await ticketsApi.update(ticket.id, { ...ticket, status: 'p' });
      setTicket((prev) => ({ ...prev, status: 'p' }));
      showToast('Returned for changes');
    } catch (err) {
      showToast(err.message || 'Reject failed', false);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="quote-generator">
      <CustomerNav />
 
      {toast && (
        <div style={{ position: 'fixed', top: 76, right: 20, zIndex: 2000, background: toast.ok ? '#065f46' : '#7f1d1d', border: `1px solid ${toast.ok ? '#059669' : '#991b1b'}`, borderRadius: 8, padding: '10px 18px', color: 'white', fontSize: 14, fontWeight: 500 }}>
          {toast.msg}
        </div>
      )}
 
      {showModal && (
        <TicketModal
          tickets={tickets}
          loading={ticketsLoading}
          error={ticketsError}
          onSelect={setTicket}
          onClose={() => setShowModal(false)}
        />
      )}
 
      <div className="container-fluid" style={{ paddingTop: '100px' }}>
        <div className="row">
 
          <div className="col-2">
            <div className="card quote-ticket-card">
              <div className="card-body">
                {ticket ? (
                  <>
                    <p style={{ fontWeight: 'bold', color: '#ffb91d' }}>Selected Ticket: #{ticket.id}</p>
                    <p style={{ fontWeight: 600 }}>{ticket.title}</p>
                    <p className="quote-muted" style={{ marginBottom: 4, color: 'black' }}>Type: <span style={{ color: 'black' }}>{ticketType(ticket.type)}</span></p>
                    <p className="quote-muted" style={{ marginBottom: 4, color: 'black' }}>Severity: <span style={{ color: 'black' }}>{ticketSeverity(ticket.severity)}</span></p>
                    <p className="quote-muted" style={{ marginBottom: 4, color: 'black' }}>Business Impact: <span style={{ color: 'black' }}>{ticketImpact(ticket.technical_Diffculty)}</span></p>
                    <p className="quote-muted" style={{ marginBottom: 4, color: 'black' }}>Deadline: <span style={{ color: 'black' }}>{ticket.deadline ?? 'N/A'}</span></p>
                    <p className="quote-muted" style={{ marginBottom: 4, color: 'black' }}>Users Affected: <span style={{ color: 'black' }}>{ticket.users_Affected ?? 'N/A'}</span></p>
                    <p className="quote-muted" style={{ marginBottom: 0, color: 'black' }}>
                      Status: <span className="badge" style={{ backgroundColor: statusColor(ticket.status) }}>{ticketStat(ticket.status)}</span>
                    </p>
                    {ticket.quote != null && (
                      <p className="quote-muted" style={{ marginTop: 8, marginBottom: 0 }}>
                        Current Quote: <span className="quote-highlight">{fmt(ticket.quote)}</span>
                      </p>
                    )}
                  </>
                ) : (
                  <p style={{ color: '#d4b8d6', fontSize: 13 }}>No ticket selected. Click below to pick one.</p>
                )}
              </div>
            </div>
            <button className="btn quote-change-btn w-100 mt-2" onClick={() => setShowModal(true)}>
              {ticket ? 'Change Ticket' : 'Select Ticket'}
            </button>
          </div>
 
          <div className="col quote-main-card p-3">
            <p className="quote-heading">Quote Estimate</p>
 
            <div className="row">
 
              <div className="col">
 
                {!ticket && (
                  <div className="quote-inner-card p-4 mb-3 text-center">
                    <p style={{ color: '#d4b8d6', fontSize: 15, marginBottom: 0 }}>
                      Select a ticket on the left to begin building a quote.
                    </p>
                  </div>
                )}
 
                {ticket && (
                  <>
                    <div className="quote-inner-card p-3">
                      <p className="quote-subheading">Price Breakdown</p>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #9b59a0' }}>
                            <th style={{ color: '#d4b8d6', padding: '4px 0 8px', fontWeight: 600, textAlign: 'left' }}>Item</th>
                            <th style={{ color: '#d4b8d6', padding: '4px 0 8px', fontWeight: 600, textAlign: 'right' }}>Hours</th>
                            <th style={{ color: '#d4b8d6', padding: '4px 0 8px', fontWeight: 600, textAlign: 'right' }}>Rate</th>
                            <th style={{ color: '#d4b8d6', padding: '4px 0 8px', fontWeight: 600, textAlign: 'right' }}>Cost</th>
                          </tr>
                        </thead>
                        <tbody>
 
                          <tr style={{ borderBottom: '1px solid #9b59a0' }}>
                            <td style={{ color: '#ffb91d', padding: '5px 0', fontWeight: 600 }}>Resolution time (total)</td>
                            <td style={{ color: 'white', textAlign: 'right', padding: '5px 0', fontWeight: 600 }}>{fmtH(effectiveResHrs)}</td>
                            <td style={{ color: '#d4b8d6', textAlign: 'right', padding: '5px 0' }}>{fmt(effectiveRate)}/hr</td>
                            <td style={{ color: 'white', textAlign: 'right', padding: '5px 0', fontWeight: 600 }}>{fmt(totalCost)}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #67236a' }}>
                            <td style={{ color: '#ffb91d', padding: '5px 0', fontWeight: 600 }}>Dev time (total)</td>
                            <td style={{ color: 'white', textAlign: 'right', padding: '5px 0', fontWeight: 600 }}>{fmtH(effectiveDevHrs)}</td>
                            <td style={{ padding: '5px 0' }} />
                            <td style={{ padding: '5px 0' }} />
                          </tr>
 
                          {Object.entries(ROLE_SPLIT[type]).map(([role, pct]) => {
                            const roleHrs = +(effectiveDevHrs * pct).toFixed(2);
                            const roleCost = +(roleHrs * effectiveRate).toFixed(2);
                            return (
                              <tr key={role} style={{ borderBottom: '1px solid #4a1a4e' }}>
                                <td style={{ color: '#d4b8d6', padding: '5px 0 5px 16px', fontSize: 13 }}>
                                  ↳ {role} <span style={{ color: '#9b59a0', fontSize: 11, marginLeft: 4 }}>{Math.round(pct * 100)}%</span>
                                </td>
                                <td style={{ color: pct > 0 ? 'white' : '#4a3050', textAlign: 'right', padding: '5px 0', fontSize: 13 }}>{fmtH(roleHrs)}</td>
                                <td style={{ color: pct > 0 ? '#d4b8d6' : '#4a3050', textAlign: 'right', padding: '5px 0', fontSize: 13 }}>{pct > 0 ? `${fmt(effectiveRate)}/hr` : '—'}</td>
                                <td style={{ color: pct > 0 ? 'white' : '#4a3050', textAlign: 'right', padding: '5px 0', fontSize: 13 }}>{pct > 0 ? fmt(roleCost) : '—'}</td>
                              </tr>
                            );
                          })}
                          <tr>

                          </tr>
                          <tr style={{ borderTop: '2px solid #9b59a0' }}>
                            <td style={{ color: '#d4b8d6', padding: '10px 0 4px', fontWeight: 'bold', fontSize: 15 }}>Total Quote</td>
                            <td style={{ color: 'white', textAlign: 'right', padding: '10px 0 4px', fontWeight: 'bold' }}>{fmtH(effectiveResHrs)}</td>
                            <td style={{ padding: '10px 0 4px' }} />
                            <td style={{ textAlign: 'right', padding: '10px 0 4px' }}>
                              <span className="quote-highlight" style={{ fontSize: 16 }}>{fmt(totalCost)}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
 
              <div className="col-3 quote-actions p-3">
                <p className="quote-subheading">Customer Controls</p>
 
                {ticket && (
                  <div className="mb-3 p-2" style={{ background: '#2d0a3e', borderRadius: 8 }}>
                    <p style={{ color: '#d4b8d6', marginBottom: 2, fontSize: 13 }}>Total Price</p>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: 'bold' }}>
                      <span className="quote-highlight">{fmt(totalCost)}</span>
                    </p>
                  </div>
                )}
                <button className="btn quote-btn-approve w-100 mb-2" onClick={handleApprove} disabled={!ticket || saving}>
                  Approve Quote
                </button>
                <button className="btn quote-btn-reject w-100" onClick={handleReject} disabled={!ticket || saving}>
                  Reject / Request Changes
                </button>
              </div>
 
            </div>
          </div>
 
        </div>
      </div>
 
      <footer className="footer" />
    </div>
  );
}