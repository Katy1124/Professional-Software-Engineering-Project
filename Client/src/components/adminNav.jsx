import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import './adminNav.css';

export default function AdminNav() {
    return (
        <div className='adminNavbar'>
            <nav className='navbar'>
                <ul>
                    <li className='navbar-toggler'></li>
                    <li className='navbar-brand'></li>
                    <div className='collapse navbar-collapse'>
                        <li className='nav-item'></li>
                        <li className='nav-item'></li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}