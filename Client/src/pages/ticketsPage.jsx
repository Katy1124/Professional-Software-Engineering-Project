import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import '../css/ticketsPage.css';
import AdminNav from '../components/adminNav';

export default function TicketsPage() {
  return (
    
    <div className="tickets-page">

      <AdminNav />


      <div className="container-fluid text-center">
        <div className="row align-items-center">

          <div className="col">
              <div className="card tickets">
                <div className="card-body">
                  <p style={{fontSize: '60px', fontWeight: 'bold'}}>Ticket 108</p>
                  <p style={{fontSize: '40px'}}>User15645</p>
                  <p style={{fontSize: '20px'}}>Sign-up button not working</p>
                  <p style={{fontSize: '20px'}}><span>Severity: </span><span>Medium</span></p>
                  <p style={{fontSize: '20px'}}><span>Impact: </span><span>Medium</span></p>
                  <p style={{fontSize: '20px'}}><span>Date: </span><span>05/02/2026</span></p>
                  <p style={{fontSize: '20px'}}><span>Status: </span><span style={{padding: '5px', borderRadius: '5px', backgroundColor: '#236A49', color: 'white'}}>Active</span></p>
                  <Link to="/viewTicket" style={{ textDecoration: 'none' }}>
                    <button className="view-button">View</button>
                  </Link>
                </div>
              </div>
          </div>

          <div className="col">
            <div className="card tickets">
              <div class="card-body">
                <p style={{fontSize: '60px', fontWeight: 'bold'}}>Ticket 232</p>
                  <p style={{fontSize: '40px'}}>User2323</p>
                  <p style={{fontSize: '20px'}}>Order system down</p>
                  <p style={{fontSize: '20px'}}><span>Severity: </span><span>Critical</span></p>
                  <p style={{fontSize: '20px'}}><span>Impact: </span><span>Critical</span></p>
                  <p style={{fontSize: '20px'}}><span>Date: </span><span>02/02/2026</span></p>
                  <p style={{fontSize: '20px'}}><span>Status: </span><span style={{padding: '5px', borderRadius: '5px', backgroundColor: '#236A49', color: 'white'}}>Active</span></p>
                  <Link to="/viewTicket" style={{ textDecoration: 'none' }}>
                    <button className="view-button">View</button>
                  </Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card tickets">
              <div className="card-body">
                <p style={{fontSize: '60px', fontWeight: 'bold'}}>Ticket 300</p>
                  <p style={{fontSize: '40px'}}>User98769</p>
                  <p style={{fontSize: '20px'}}>Employees not able to login</p>
                  <p style={{fontSize: '20px'}}><span>Severity: </span><span>High</span></p>
                  <p style={{fontSize: '20px'}}><span>Impact: </span><span>Critical</span></p>
                  <p style={{fontSize: '20px'}}><span>Date: </span><span>03/02/2026</span></p>
                  <p style={{fontSize: '20px'}}><span>Status: </span><span style={{padding: '5px', borderRadius: '5px', backgroundColor: '#B58229', color: 'white'}}>Pending</span></p>
                  <Link to="/viewTicket" style={{ textDecoration: 'none' }}>
                    <button className="view-button">View</button>
                  </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="footer" />
    </div>
  );
}