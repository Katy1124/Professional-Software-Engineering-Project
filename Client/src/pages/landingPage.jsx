import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import '../css/landingPage.css';
export default function LandingPage() { 
    return (
        <div className="landing-page">

            <div className='image'>
                <img src={giacomLogo} alt="GIACOM" width="110" height="24"></img>
            </div>

            <div className='landing-text'>
                <div className="row">
                    <h1>SmartQuote</h1>
                </div>
                <div className="row">
                    <h2>Intelligent Quoting System for Support & Incident Tickets</h2>
                </div>
            </div>

            <div className='buttons'>
                <div className='row'>
                    <div className="col"> 
                        <Link to="/admin" style={{ textDecoration: 'none' }}>
                            <button className="admin-button">Administrators</button>
                        </Link>
                    </div>
                    <div className="col"> 
                        <Link to="/customer" style={{ textDecoration: 'none' }}>
                            <button className="customer-button">Customers</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
     )
}