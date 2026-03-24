import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SecurePath from './components/securepath';
import LandingPage from './pages/landingPage';
import CustomerDashboard from './pages/customerDashboard';
import TicketForm from './pages/ticketForm';
import AdminDashboard from './pages/adminDashboard';
import TicketsPage from './pages/ticketsPage';
import CustomerQuote from './pages/customerQuote';
import QuoteGenerator from './pages/quoteGenerator';
import ViewTicket from './pages/viewTicket';
import LoginPage from './pages/loginPage';
// Temporary pages
import CustQuotePage from './pages/customerQuotesPage';
import AdminQuotePage from './pages/adminQuotesPage';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<SecurePath allowedType={1}> <AdminDashboard /> </SecurePath>} />
        <Route path="/customer" element={<SecurePath allowedType={0}> <CustomerDashboard /> </SecurePath>} />
        <Route path="/ticketForm" element={<SecurePath allowedType={0}> <TicketForm /> </SecurePath>} />
        <Route path="/ticketsPage" element={<TicketsPage />} />
        <Route path="/customerQuote/:id" element={<CustomerQuote/>} />
        <Route path="/adminQuote" element={<SecurePath allowedType={1}> <QuoteGenerator /> </SecurePath>} />
        <Route path="/viewTicket" element={<ViewTicket />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Temporary pages */}
        {/* <Route path="/viewTestTicket/:id" element={<TestTicket />}/>
        <Route path="/viewQuoteAdmin/:id" element={<TestQuoteAdmin/>}/>
        <Route path="/viewQuoteCustomer/:id" element={<TestQuoteCustomer/>}/> */}
        <Route path="/custQuotepage/:id" element={<CustQuotePage/>}/>
        <Route path="/adminQuotePage" element={<AdminQuotePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;