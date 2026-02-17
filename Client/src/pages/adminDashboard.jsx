import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import './adminDashboard.css';


export default function AdminDashboard() {
  return (
    
    <div className="admin-dashboard">

      <nav className="navbar custom-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/landing">
            <img src={giacomLogo} alt="GIACOM" width="110" height="24"></img></a>
          <a className="navbar custom-link" href="/customer">Customer Dash</a>
          <a className="navbar custom-link" href="/admin">Admin Dash</a>
        </div>
      </nav>

      {/* Tickets */}
      <div class="container text-center">
        <div className="row align-items-center">

          <div className="col">
            <Link to="/ticketsPage" style={{ textDecoration: 'none' }}>
              <div className="card active-tickets">
                <div className="card-body">
                  <p style={{fontSize: '20px'}}>Active Tickets</p>
                  <p style={{fontSize: '40px', fontWeight: 'bold'}}>23</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <div className="card pending-tickets">
              <div class="card-body">
                <p style={{fontSize: '20px'}}>Pending Tickets</p>
                <p style={{fontSize: '40px', fontWeight: 'bold'}}>5</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card resolved-tickets">
              <div className="card-body">
                <p style={{fontSize: '20px'}}>Resolved Tickets</p>
                <p style={{fontSize: '40px', fontWeight: 'bold'}}>16</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quick Links */}
      <div className="container text-center">
        <p className='quick-links'>Quick Links</p>
        <div className="row justify-content-center">
          <div className="col-4">
            <div className="card tickets">
              <div className="card-body">
                <p style={{fontSize: '20px'}}>Tickets</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card quotes">
              <div className="card-body">
                <p style={{fontSize: '20px'}}>Quotes</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-4">
            <div className="card edits">
              <div class="card-body">
                <p style={{fontSize: '20px'}}>Edits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="footer" />
    </div>
  );
}