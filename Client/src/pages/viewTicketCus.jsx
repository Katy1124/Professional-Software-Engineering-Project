import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ticketsApi } from '../api/tickets.api';
import { quotesApi } from '../api/quotes.api';
import '../css/viewTicket.css';
import CustomerNav from '../components/customerNav';

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

  const ticketStat = (Status) => {
  if (!Status) return 'N/A';
    const s = Status.toLowerCase();
    if (s === 'a') return 'Active';
    if (s === 'p') return 'Pending';
    if (s === 'c') return 'Closed';
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
    if (type === 'S') return 'Support';
    if (type === 'I') return 'Incident';
    if (type === 'E') return 'Enhancement / Feature';
    return type;
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

                <div className="ticket-header-container">
                  <p className="title">Ticket {ticket.id}</p>
                  <p className="title">Account: {ticket.account_Id}</p>
                </div>

                <p style={{ fontSize: '25px', textAlign: 'left', fontWeight: 'bold' }}>
                  Deadline: {ticket.deadline} days
                </p>

                  <div className="container information">
                  <div className="row title mb-2" style={{ fontSize: '25px', fontWeight: 'bold' }}>
                    <div className="col-12">
                      Title: {ticket.title}
                    </div>
                  </div>

                  <div className="row type mb-2">
                    <div className="col-6">
                      <p>Type: {ticketType(ticket.type)}</p>
                    </div>
                    <div className="col-6">
                      <p>Status: {ticketStat(ticket.status)}</p>
                    </div>
                  </div>

                  <div className="row severity mb-2">
                    <div className="col-6">
                      <p>Severity: {tickectSeverity(ticket.severity)}</p>
                    </div>
                    <div className="col-6">
                      <p>Buisness impact: {tickectimpact(ticket.technical_Diffculty)}</p>
                    </div>
                  </div>

                  <div className="row estimate mb-2">
                    <div className="col-6">
                      <p>Users Affected: {ticket.users_Affected}</p>
                    </div>
                    <div className="col-6">
                      <p>Quote: £{quote ? quote.estimated_Cost.toFixed(2) : 'No quote yet'}</p>
                    </div>
                  </div>

                  <div className='row desc mb-2' style={{minHeight: '150px'}}> 
                    <div className='col-6'>
                      <p>Description:</p>
                      <p>{ticket.description}</p>
                    </div>
                    <div className='col-6'>
                      <p>Attachments:</p>
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