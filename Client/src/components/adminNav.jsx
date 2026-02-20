import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import burger from '../assets/menu.png';
import './adminNav.css';

export default function AdminNav() {
    const [isOn, setIsOn] = useState(false);

    const openMenu = () => {
        console.log("Button Clicked! Current state:", !isOn);
        setIsOn(!isOn)
    }
    const closeMenu = () => setIsOn(false);

    return (
        <div className='adminNavbar'>
            <nav className='navbar'>
                <div className='navbar-header'>
                    <div className='navbar-toggler'>
                        <button 
                            className={`hamburger ${isOn ? 'is-active' : ''}`}
                            onClick={openMenu}
                            aria-label="Menu"
                            aria-expanded={isOn}
                            ><img src={burger} alt="Menu Icon" style={{width: '20px'}}/>
                        </button>
                    </div>
                    <div className='navbar-brand'>
                        <img src={giacomLogo} alt="Giacom Logo" style={{width: '200px'}}/>
                    </div>
                </div>
                <ul>
                    <div className={`navbar-links ${isOn ? 'on' : ''}`}>
                        <NavLink to="/customer" onClick={closeMenu}>
                            <li className='nav-link'>
                                <div className="card menu-item">
                                    <div className="card-body">
                                        <p style={{fontSize: '20px'}}>Dashboard</p>
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                        <NavLink to="/customerTickets" onClick={closeMenu}>
                            <li className='nav-link'>
                                <div className="card menu-item">
                                    <div className="card-body">
                                        <p style={{fontSize: '20px'}}>Tickets</p>
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                        <NavLink to="/customerQuotes" onClick={closeMenu}>
                            <li className='nav-link'>
                                <div className="card menu-item">
                                    <div className="card-body">
                                        <p style={{fontSize: '20px'}}>Quotes</p>
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                        <NavLink to="/createTicket" onClick={closeMenu}>
                            <li className='nav-link'>
                                <div className="card menu-item">
                                    <div className="card-body">
                                        <p style={{fontSize: '20px'}}>Quote Editor</p>
                                    </div>
                                </div>
                            </li>
                        </NavLink>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

// <a href="https://www.flaticon.com/free-icons/open-menu" title="open menu icons">Open menu icons created by Pixel perfect - Flaticon</a>