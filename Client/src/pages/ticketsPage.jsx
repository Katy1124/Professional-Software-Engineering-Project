import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import './ticketsPage.css';

export default function TicketsPage() {
  return (
    
    <div className="tickets-page">

      <nav className="navbar custom-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={giacomLogo} alt="GIACOM" width="110" height="24"></img></a>
          <a className="navbar custom-link" href="#">Customer Dash</a>
          <a className="navbar custom-link" href="#">Admin Dash</a>
        </div>
      </nav>


      <div className="container-fluid text-center">
        <div className="row align-items-center">

          <div className="col">
              <div className="card tickets">
                <div className="card-body">
                  <p style={{fontSize: '40px', fontWeight: 'bold'}}>Ticket 108</p>
                  <p style={{fontSize: '20px'}}>User15645</p>
                  <p>Sign-up button not working</p>
                  <p><span>Severity: </span><span>Medium</span></p>
                  <p><span>Impact: </span><span>Medium</span></p>
                  <p><span>Date: </span><span>05/02/2026</span></p>
                  <p><span>Status: </span><span style={{padding: '5px', borderRadius: '5px', backgroundColor: '#236A49', color: 'white'}}>Active</span></p>
                  <Link to="/ticketsPage" style={{ textDecoration: 'none' }}>
                    <button className="view-button">View</button>
                  </Link>
                </div>
              </div>
          </div>

          <div className="col">
            <div className="card tickets">
              <div class="card-body">
                <p style={{fontSize: '40px', fontWeight: 'bold'}}>Ticket 232</p>
                  <p style={{fontSize: '20px'}}>User2323</p>
                  <p>Order system down</p>
                  <p><span>Severity: </span><span>Critical</span></p>
                  <p><span>Impact: </span><span>Critical</span></p>
                  <p><span>Date: </span><span>02/02/2026</span></p>
                  <p><span>Status: </span><span style={{padding: '5px', borderRadius: '5px', backgroundColor: '#236A49', color: 'white'}}>Active</span></p>
                  <button className="view-button">View</button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card tickets">
              <div className="card-body">
                <p style={{fontSize: '40px', fontWeight: 'bold'}}>Ticket 300</p>
                  <p style={{fontSize: '20px'}}>User98769</p>
                  <p>Employees not able to login</p>
                  <p><span>Severity: </span><span>High</span></p>
                  <p><span>Impact: </span><span>Critical</span></p>
                  <p><span>Date: </span><span>03/02/2026</span></p>
                  <p><span>Status: </span><span style={{padding: '5px', borderRadius: '5px', backgroundColor: '#B58229', color: 'white'}}>Pending</span></p>
                  <button className="view-button">View</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="footer" />
    </div>
  );
}