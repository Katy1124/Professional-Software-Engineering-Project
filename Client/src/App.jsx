import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SecurePath from './components/securepath';
import LandingPage from './pages/landingPage';
import LoginPage from './pages/loginPage';
// Admin Pages
import AdminDashboard from './pages/adminDashboard';
import CustomerDashboard from './pages/customerDashboard';
import AdminQuotesPage from './pages/adminQuotesPage';
import QuoteEstimate from './pages/quoteGenerator';
// Customer Pages
import TicketForm from './pages/ticketForm';
import TicketsPageAd from './pages/ticketsPageAd';
import TicketsPageCus from './pages/ticketsPageCus';
import CustomerQuotesPage from './pages/customerQuotesPage';
import CustomerQuote from './pages/customerQuote';
import TicketsPage from './pages/ticketsPage';
import ViewTicket from './pages/viewTicket';
// Temporary pages
import TestTicket from './pages/viewTicketAd';
import TestTicketcus from './pages/viewTicketCus';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ticketsPageAd" element={<TicketsPageAd />} />
        <Route path="/ticketsPageCus" element={<TicketsPageCus />} />
        
        {/* Temporary pages */}
        <Route path="/viewTestTicket/:id" element={<TestTicket />}/>
        <Route path="/viewTestTicketcus/:id" element={<TestTicketcus />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<SecurePath allowedType={1}><AdminDashboard /> </SecurePath>} />
        <Route path='/allquotes' element={<SecurePath allowedType={1}><AdminQuotesPage /> </SecurePath>} />
        <Route path='/quotegen/:id?' element={<SecurePath allowedType={1}><QuoteEstimate /> </SecurePath>} /> {/* NOT WORKING */}
        <Route path='/tickets' element={<TicketsPage />} />
        <Route path='/viewticket/:id' element={<ViewTicket />} />
        <Route path='/customer' element={<SecurePath allowedType={0}><CustomerDashboard /> </SecurePath>} />
        <Route path='/create' element={<SecurePath allowedType={0}><TicketForm /> </SecurePath>} />
        <Route path='/quotes' element={<SecurePath allowedType={0}><CustomerQuotesPage /> </SecurePath>} />
        <Route path='/viewquote/:id' element={<SecurePath allowedType={0}><CustomerQuote /> </SecurePath>} />
      </Routes>
    </BrowserRouter>
  );
}
// {<SecurePath allowedType={1}> <AdminDashboard /> </SecurePath>}

export default App;