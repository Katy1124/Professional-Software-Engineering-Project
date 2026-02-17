import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import './landingPage.css';
export default function LandingPage() { 
    return (
        <div className="landing-page">
            <img src={giacomLogo} alt="GIACOM" width="110" height="24"></img>
            <div className='landing-text'>
                
            </div>
        </div>
     )
}