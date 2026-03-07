import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ticketsApi } from '../api/tickets.api';
import '../css/viewTicket.css';
import AdminNav from '../components/adminNav';

export default function ViewTicket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await ticketsApi.getById(id);
        setTicket(data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    fetchTicket();
  }, [id]);

  if (!ticket) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

  return (
    <div className="view-ticket">

      <AdminNav />

      <div className="container-fluid text-center">
        <div className="row align-items-center justify-content-center">

          <div className="col d-flex justify-content-center">
            <div className="card singleTicket">
              <div className="card-body">

                <p style={{ fontSize: '40px', fontWeight: 'bold' }}>
                  <span style={{ paddingRight: '100px' }}>Ticket {ticket.id}</span>
                  <span style={{ paddingLeft: '100px' }}>Account: {ticket.account_Id}</span>
                </p>

                <p style={{ fontSize: '25px', textAlign: 'left', paddingLeft: '100px', fontWeight: 'bold' }}>
                  Deadline: {ticket.deadline} days
                </p>

                <div className="container information">

                  <div className="row title" style={{ fontSize: '25px', fontWeight: 'bold' }}>
                    <div className="col-2" style={{ marginLeft: '90px', marginBottom: '10px' }}>
                      Title:
                    </div>
                    <div className="col-5" style={{ marginLeft: '170px', marginBottom: '10px' }}>
                      {ticket.title}
                    </div>
                  </div>

                  <div className="row type">
                    <div className="col-2" style={{ marginLeft: '90px', marginBottom: '10px' }}>
                      <p>Description:</p>
                    </div>
                    <div className="col-5" style={{ marginLeft: '190px', marginBottom: '10px' }}>
                      <p>{ticket.description}</p>
                    </div>
                  </div>

                  <div className="row severity">
                    <div className="col-3" style={{ marginLeft: '90px', marginBottom: '10px' }}>
                      <p>Severity: {ticket.severity}</p>
                    </div>
                    <div className="col-4" style={{ marginLeft: '115px', marginBottom: '10px' }}>
                      <p>Technical Difficulty: {ticket.technical_Diffculty}</p>
                    </div>
                  </div>

                  <div className="row estimate">
                    <div className="col-3" style={{ marginLeft: '90px', marginBottom: '10px' }}>
                      <p>Users Affected: {ticket.users_Affected}</p>
                    </div>
                    <div className="col-4" style={{ marginLeft: '115px', marginBottom: '10px' }}>
                      <p>Quote: £{ticket.quote}</p>
                    </div>
                  </div>

                  <div className='row desc' style={{minHeight: '150px'}}> 
                    <div className='col-5' style={{marginLeft: '90px'}}>
                      <p>Description:</p>
                    </div>
                    <div className='col-5' style={{marginLeft: '30px'}}>
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