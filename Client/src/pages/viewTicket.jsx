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
                  
                  <div className="container information">
                    <div className='row title' style={{fontSize: '25px', fontWeight: 'bold'}}>
                        <div className='col-2' style={{marginLeft: '90px', marginBottom: '10px'}}>
                            Title:  
                        </div>
                        <div className='col-5' style={{marginLeft: '170px', marginBottom: '10px'}}>   
                            Sign-up button not working
                        </div> 
                    </div>
                    
                    <div className='row type'>
                        <div className='col-2' style={{marginLeft: '90px', marginBottom: '10px'}}>
                            <p>Ticket Type:</p>
                        </div>
                        <div className='col-2' style={{marginLeft: '190px', marginBottom: '10px'}}>
                            <p>Incident</p>
                        </div> 
                    </div>
                    
                    <div className='row severity'>
                        <div className='col-3' style={{marginLeft: '90px', marginBottom: '10px'}}>
                            <p>Severity: Medium</p>
                        </div>
                        <div className='col-4' style={{marginLeft: '115px', marginBottom: '10px'}}>
                            <p>Business Impact: Medium</p>
                        </div>
                    </div>
                    
                    <div className='row estimate'>
                        <div className='col-3' style={{marginLeft: '90px', marginBottom: '10px'}}>
                            <p>Users Affected: ~100</p>
                        </div>
                        <div className='col-4' style={{marginLeft: '115px', marginBottom: '10px'}}>
                            <p>Resolution Date: 04/02/2026</p>
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