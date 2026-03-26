import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';
import '../css/viewTicketNEW.css';
import AdminNav from '../components/adminNav';

export default function ViewTicket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await ticketsApi.getById(id);
        setTicket(data);

        const quoteData = await quotesApi.list();
        const all = Array.isArray(quoteData) ? quoteData : [];
        const ticketQuote = all.find(q => q.ticket_Id === parseInt(id));
        if (ticketQuote) setQuote(ticketQuote);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    fetchTicket();
  }, [id]);

  const handleResolved = async () => {
      try {
        await ticketsApi.update(id, {...ticket, status: 'r'});
        setTicket(prev => ({...prev, status: 'r'}));
        alert('This ticket is now Resolved');
      } catch (error) {
        console.error('Error resolving the ticket:', error);
        alert('Failed to resolve ticket');
      }
    }
    const handleEscalated = async () => {
      try {
        await ticketsApi.update(id, {...ticket, status: 'e'});
        setTicket(prev => ({...prev, status: 'e'}));
        alert('This ticket has been Escalated');
      } catch (error) {
        console.error('Error escalating the ticket:', error);
        alert('Failed to escalate ticket');
      }
    }

    const ticketStat = (Status) => {
  if (!Status) return 'N/A';
    const s = Status.toLowerCase();
    if (s === 'a') return 'Active';
    if (s === 'p') return 'Pending';
    if (s === 'r') return 'Resolved';
    if (s === 'e') return 'Escalated';
    return 'N/A';
  };
  const tickectSeverity = (severity) => {
  if (!severity) return 'N/A';
    if(severity == 1) return 'Low'; 
    if(severity == 2) return 'Medium'; 
    if(severity == 3) return 'High'; 
    if(severity == 4) return 'Critical'; 
  };
  const tickectimpact = (impact) => {
  if (!impact) return 'N/A';
    if(impact == 1) return 'Low'; 
    if(impact == 2) return 'Medium'; 
    if(impact == 3) return 'High'; 
    if(impact == 4) return 'Critical'; 
  };
    const ticketType = (type) => {
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
    return { bg: '#ee9ba4', fg: '#dc3545' }; 
  } else if (d <= 6) {
    return { bg: '#f7e9c1', fg: '#ffc107' }; 
  } else {
    return { bg: '#91e0a3', fg: '#28a745' };
  }
};

const statusColour = (status) => {
  if (!status) return { bg: '#d8acdb', fg: '#b97ebc' };
    const s = status.toLowerCase();
  if (s === 'e') {
    return { bg: '#ee9ba4', fg: '#dc3545' }; 
  } else if (s === 'r') {
    return { bg: '#b1d1f8', fg: '#75aef4' }; 
  } else if (s === 'p') {
    return { bg: '#f7e9c1', fg: '#ffc107' };
  } else {
    return { bg: '#91e0a3', fg: '#28a745' };
  }
};

  if (!ticket) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  return (
    <div className="view-ticket">
      <AdminNav />

      <div className="container-fluid text-center" style={{ paddingTop: '50px' }}>
        <div className="row align-items-center justify-content-center">

          <div className="col d-flex justify-content-center">
            <div className="card singleTicket">
              <div className="card-body">
                <p className='heading'>
                  {/* ticket */}
                  <span className='ticketno'> Ticket #{ticket.id} </span>
                  {/* account */}
                  <span className='account'> Account {ticket.account_Id} </span>
                </p>
                {/* title */}
                <p className='title'> {ticket.title} </p>
                {/* deadline */}
                <p className='date'
                   style={{backgroundColor: deadlineColour(ticket.deadline).bg, color: deadlineColour(ticket.deadline).fg, borderColor: deadlineColour(ticket.deadline).fg}}> 
                  Deadline: {ticket.deadline} days 
                </p>


                <div className="container information">
                  <div className="row title mb-2">
                    {/* type */}
                    <div className="col-2 type">
                      <p>Type</p>
                      <p style={{fontWeight: 'bold', fontSize: '20px', color: 'black'}}>{ticketType(ticket.type)}</p>
                    </div>
                    {/* status */}
                    <div className="col-2 status" 
                        style={{
                        backgroundColor: statusColour(ticket.status).bg, color: statusColour(ticket.status).fg, borderColor: statusColour(ticket.status).fg
                      }}>
                      <p>Status</p>
                      <p style={{fontWeight: 'bold', fontSize: '20px'}}>{ticketStat(ticket.status)}</p>
                    </div>
                    {/* severity */}
                    <div className="col-2 severity">
                      <p>Severity</p>
                      <p style={{fontWeight: 'bold', fontSize: '20px', color: 'black'}}>{tickectSeverity(ticket.severity)}</p>
                    </div>
                    {/* business impact */}
                    <div className="col-2 impact">
                      <p>Impact</p>
                      <p style={{fontWeight: 'bold', fontSize: '20px', color: 'black'}}>{tickectimpact(ticket.technical_Diffculty)}</p>
                    </div>
                  </div>


                  <div className="row estimate mb-2">
                    {/* users affected */}
                    <div className="col-6 users">
                      <p >Users Affected</p>
                      <p style={{fontWeight: 'bold', fontSize: '20px', color: 'black'}}>{ticket.users_Affected}</p>
                    </div>
                    {/* quote */}
                    <div className="col-6 quote">
                      <p>Quote</p>
                      <p style={{fontWeight: 'bold', fontSize: '20px', color: 'black'}}>£{quote ? quote.estimated_Cost.toFixed(2) : 'No quote yet'}</p>
                    </div>
                  </div>

                  <div className='row desc mb-2' style={{minHeight: '150px'}}> 
                    {/* description */}
                    <div className='col-6 desc'>
                      <p>Description</p>
                      <p style={{fontSize: '20px', color: 'black'}}>{ticket.description}</p>
                    </div>
                    {/* attachments */}
                    <div className='col-6 att'>
                      <p>Attachments</p>
                    </div>
                  </div>
                </div>
              </div>
                  <div className='action-btn'>
                    <button className='resolved' onClick={handleResolved} disabled={ticket.status?.toLowerCase() === 'r'}
                    style={{backgroundColor: ticket.status?.toLowerCase() === 'r' ? '#6c757d' : '#ff007f', color: 'white'}}>Resolve</button>
                    <button className='escalated' onClick={handleEscalated} disabled={ticket.status?.toLowerCase() === 'e'}
                    style={{backgroundColor: ticket.status?.toLowerCase() === 'e' ? '#6c757d' : '#ff007f', color: 'white'}}>Escalate</button>
                  </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" />
    </div>
  );
}