import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';
import { attachmentsApi } from '../api/attachments.api';
import '../css/viewTicket.css';
import CustomerNav from '../components/customerNav';

export default function CustViewTicket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [quote, setQuote] = useState(null);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await ticketsApi.getById(id);
        setTicket(data);

        const quoteData = await quotesApi.list();
        const all = Array.isArray(quoteData) ? quoteData : [];
        const ticketQuote = all.find(q => q.ticket_Id === parseInt(id));
        if (ticketQuote) {
          setQuote(ticketQuote);
        }

        const attachmentData = await attachmentsApi.getByTicketId(id);
        setAttachments(Array.isArray(attachmentData) ? attachmentData : []);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleDownload = async (attachmentId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tickets/${id}/attachments/${attachmentId}/download`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const contentDisposition = response.headers.get('content-disposition');
      let fileName = 'attachment';

      if (contentDisposition) {
        const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?"?([^"]+)"?/i);
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1]);
        }
      }

      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading attachment:', error);
      alert('Failed to download attachment');
    }
  };

  const ticketStat = (Status) => {
    if (!Status) return 'N/A';
    const s = Status.toLowerCase();
    if (s === 'a') return 'Active';
    if (s === 'p') return 'Pending';
    if (s === 'r') return 'Resolved';
    if (s === 'e') return 'Escalated';
    if (s === 'qp') return 'Quote Pending';
    if (s === 'qr') return 'Quote Ready';
    if (s === 'rj') return 'Quote Rejected';
    return 'N/A';
  };

  const tickectSeverity = (severity) => {
    if (!severity) return 'N/A';
    if (severity == 1) return 'Low';
    if (severity == 2) return 'Medium';
    if (severity == 3) return 'High';
    if (severity == 4) return 'Critical';
    return 'N/A';
  };

  const tickectimpact = (impact) => {
    if (!impact) return 'N/A';
    if (impact == 1) return 'Low';
    if (impact == 2) return 'Medium';
    if (impact == 3) return 'High';
    if (impact == 4) return 'Critical';
    return 'N/A';
  };

  const ticketType = (type) => {
    if (!type) return 'N/A';
    const t = type.toLowerCase();
    if (t === 's') return 'Support';
    if (t === 'i') return 'Incident';
    if (t === 'e') return 'Enhancement / Feature';
    return t;
  };

  const deadlineColour = (days) => {
    const d = parseInt(days);
    if (isNaN(d)) return { bg: '#d8acdb', fg: '#b97ebc' };

    if (d <= 3) {
      return { bg: '#f8bec5', fg: '#dc3545' };
    } else if (d <= 6) {
      return { bg: '#f7e9c1', fg: '#ffc107' };
    } else {
      return { bg: '#91e0a3', fg: '#28a745' };
    }
  };

  const statusColour = (status) => {
    if (!status) return { bg: '#d8acdb', fg: '#b97ebc' };
    const s = status.toLowerCase();
    if (s === 'e' || s === 'rj') {
      return { bg: '#ee9ba4', fg: '#dc3545' };
    } else if (s === 'r') {
      return { bg: '#b1d1f8', fg: '#75aef4' };
    } else if (s === 'p' || s === 'qp') {
      return { bg: '#ffefc0', fg: '#ffc107' };
    } else {
      return { bg: '#91e0a3', fg: '#28a745' };
    }
  };

  if (!ticket) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  return (
    <div className="view-ticket">
      <CustomerNav />

      <div className="container-fluid text-center" style={{ paddingTop: '50px' }}>
        <div className="row align-items-center justify-content-center">
          <div className="col d-flex justify-content-center">
            <div className="card singleTicket">
              <div className="card-body">
                <p className="heading">
                  <span className="ticketno"> Ticket #{ticket.id} </span>
                  <span className="account"> Account {ticket.account_Id} </span>
                </p>

                <p className="title"> {ticket.title} </p>

                <p
                  className="date"
                  style={{
                    backgroundColor: deadlineColour(ticket.deadline).bg,
                    color: deadlineColour(ticket.deadline).fg,
                    borderColor: deadlineColour(ticket.deadline).fg
                  }}
                >
                  Deadline: {ticket.deadline} days
                </p>

                <div className="container information">
                  <div className="row title mb-2">
                    <div className="col-2 type">
                      <p>Type</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                        {ticketType(ticket.type)}
                      </p>
                    </div>

                    <div
                      className="col-2 status"
                      style={{
                        backgroundColor: statusColour(ticket.status).bg,
                        color: statusColour(ticket.status).fg,
                        borderColor: statusColour(ticket.status).fg
                      }}
                    >
                      <p>Status</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px' }}>
                        {ticketStat(ticket.status)}
                      </p>
                    </div>

                    <div className="col-2 severity">
                      <p>Severity</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                        {tickectSeverity(ticket.severity)}
                      </p>
                    </div>

                    <div className="col-2 impact">
                      <p>Impact</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                        {tickectimpact(ticket.technical_Diffculty)}
                      </p>
                    </div>
                  </div>

                  <div className="row estimate mb-2">
                    <div className="col-6 users">
                      <p>Users Affected</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                        {ticket.users_Affected}
                      </p>
                    </div>

                    <div className="col-6 quote">
                      <p>Quote</p>
                      <p style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                        {quote && ['qr', 'a', 'e', 'r'].includes(ticket.status?.toLowerCase()) 
                          ? `£${quote.estimated_Cost.toFixed(2)}` 
                          : 'No quote yet'}
                      </p>
                    </div>
                  </div>

                  <div className="row desc mb-2" style={{ minHeight: '150px' }}>
                    <div className="col-6 desc">
                      <p>Description</p>
                      <p style={{ fontSize: '20px', color: 'black' }}>
                        {ticket.description}
                      </p>
                    </div>

                    <div className="col-6 att">
                      <p>Attachments</p>

                      {attachments.length === 0 ? (
                        <p style={{ fontSize: '20px', color: 'black' }}>No attachments</p>
                      ) : (
                        attachments.map((file) => (
                          <div key={file.id} style={{ marginBottom: '10px' }}>
                            <button
                              type="button"
                              onClick={() => handleDownload(file.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'blue',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                padding: 0,
                                fontSize: '18px'
                              }}
                            >
                              {file.originalFileName}
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" />
    </div>
  );
}