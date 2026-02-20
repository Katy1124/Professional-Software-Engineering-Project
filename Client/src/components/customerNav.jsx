import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import './customerNav.css';

export default function CustomerNav() {
    const [isOn, setIsOn] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <div className='customerNavbar'>
            <nav className='navbar'>
                <div className='navbar-header'>
                    <div className='navbar-toggler'>
                        <button 
                            className={`hamburger ${isOn ? 'is-active' : ''}`}
                            onClick={() => setIsOn(!isOn)}
                            aria-label="Menu"
                            aria-expanded={isOn}
                            >On/Off
                        </button>
                    </div>
                    <div className='navbar-brand'>
                        <img src={giacomLogo} alt="Giacom Logo" style={{width: '200px'}}/>
                    </div>
                </div>
                <ul>
                    <div className='collapse navbar-collapse'>
                        <NavLink to="/customer"><li className='nav-link'>Dashboard</li></NavLink>
                        <NavLink to="/customerTickets"><li className='nav-link'>My Tickets</li></NavLink>
                        <NavLink to="/customerQuotes"><li className='nav-link'>My Quotes</li></NavLink>
                        <NavLink to="/createTicket"><li className='nav-link'>Create Ticket</li></NavLink>
                    </div>
                </ul>
            </nav>
        </div>
    )
}