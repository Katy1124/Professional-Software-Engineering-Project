import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import './adminDashboard.css';

export default function AdminDashboard() {
  return (
    
    <div className="admin-dashboard">

      <nav className="navbar custom-nav">
        <div className="container-fluid">
          <a classNamen="navbar-brand" href="#">
            <img src={giacomLogo} alt="GIACOM" width="110" height="24"></img></a>
          <a className="navbar custom-link" href="#">Customer Dash</a>
          <a className="navbar custom-link" href="#">Admin Dash</a>
        </div>
      </nav>

      {/* Tickets */}
      <div class="container text-center">
        <div className="row align-items-center">

          <div className="col">
            <div className="card">
              <div className="card-body">
                <p style={{fontSize: '20px'}}>Active Tickets</p>
                <p style={{fontSize: '40px', fontWeight: 'bold'}}>23</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div class="card-body">
                <p style={{fontSize: '20px'}}>Pending Tickets</p>
                <p style={{fontSize: '40px', fontWeight: 'bold'}}>5</p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card">
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
            <div className="card">
              <div className="card-body">
                <p style={{fontSize: '20px'}}>Tickets</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <p style={{fontSize: '20px'}}>Quotes</p>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-4">
            <div className="card">
              <div class="card-body">
                <p style={{fontSize: '20px'}}>Edits</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard! Here you can manage users, view reports, and configure settings.</p>
      </div>
      
      <footer className="footer" />
    </div>
  );
}