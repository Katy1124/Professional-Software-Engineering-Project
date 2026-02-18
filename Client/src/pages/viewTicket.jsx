import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import '../css/viewTicket.css';

export default function ViewTicket() {
  return (
    
    <div className="view-ticket">

      <nav className="navbar custom-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/landing">
            <img src={giacomLogo} alt="GIACOM" width="110" height="24"></img></a>
          <a className="navbar custom-link" href="/customer">Customer Dash</a>
          <a className="navbar custom-link" href="/admin">Admin Dash</a>
        </div>
      </nav>


      <div className="container-fluid text-center">
        <div className="row align-items-center justify-content-center">

          <div className="col d-flex justify-content-center">
              <div className="card tickets">
                <div className="card-body">
                  <p style={{fontSize: '40px', fontWeight: 'bold'}}><span style={{paddingRight: '100px'}}>Ticket 108 </span><span style={{paddingLeft: '100px'}}>Sent by: User15645</span></p>
                  <p style={{fontSize: '25px', textAlign: 'left', paddingLeft: '100px', fontWeight: 'bold'}}>01/02/2026</p>
                  <p style={{fontSize: '25px', fontWeight: 'bold'}}><span>Title: </span><span>Sign-up button not working</span></p>
                  <div className="container">
                    <p><span>Ticket Type: </span><span>Incident</span></p>
                    <p><span>Severity: </span><span>Medium </span> <span>Business Impact: </span><span>Medium</span></p>
                    <p><span>Users Affected: </span><span>~100 </span><span>Resolution Date: </span><span>04/02/2026</span></p>
                    <p><span>Status: </span><span style={{padding: '5px', borderRadius: '5px', backgroundColor: '#236A49', color: 'white'}}>Active</span></p>
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