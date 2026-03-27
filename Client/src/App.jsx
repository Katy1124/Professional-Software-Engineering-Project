import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SecurePath from './components/securepath';
import LoginPage from './pages/loginPage';

// Admin Pages
import AdminDashboard from './pages/adminDashboard'; //Admin Dashboard
import AdminQuotesPage from './pages/adminQuotesPage'; //All Quotes
import QuoteEstimate from './pages/quoteGenerator'; //Admin Quote Generator
import ViewTicketAd from './pages/viewTicketAdNEW'; //Admin View Ticket

// Customer Pages
import CustomerDashboard from './pages/customerDashboard'; //Customer Dashboard
import TicketForm from './pages/ticketForm'; //Ticket Form

import TicketsPageAd from './pages/ticketsPageAd'; //All Tickets
import TicketsPageCus from './pages/ticketsPageCus'; //Customer Tickets
import CustomerQuotesPage from './pages/customerQuotesPage'; //Customer Quotes
import CustomerQuote from './pages/customerQuote'; //Customer View Quote
import ViewTicketCus from './pages/viewTicketCus'; //Customer View Ticket

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/ticketsPageAd" element={<TicketsPageAd />} />
        <Route path="/ticketsPageCus" element={<TicketsPageCus />} />

        {/* Temporary pages */}
        <Route path="/viewTestTicket/:id" element={<TestTicket />} />
        <Route path="/viewTestTicketcus/:id" element={<TestTicketcus />} />

        <Route
          path="/admin"
          element={
            <SecurePath allowedType={1}>
              <AdminDashboard />
            </SecurePath>
          }
        />
        <Route
          path="/allquotes"
          element={
            <SecurePath allowedType={1}>
              <AdminQuotesPage />
            </SecurePath>
          }
        />
        <Route
          path="/quotegen/:id?"
          element={
            <SecurePath allowedType={1}>
              <QuoteEstimate />
            </SecurePath>
          }
        />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/viewticket/:id" element={<ViewTicket />} />

        <Route
          path="/customer"
          element={
            <SecurePath allowedType={0}>
              <CustomerDashboard />
            </SecurePath>
          }
        />
        <Route
          path="/create"
          element={
            <SecurePath allowedType={0}>
              <TicketForm />
            </SecurePath>
          }
        />
        <Route
          path="/quotes"
          element={
            <SecurePath allowedType={0}>
              <CustomerQuotesPage />
            </SecurePath>
          }
        />
        <Route
          path="/viewquote"
          element={
            <SecurePath allowedType={0}>
              <CustomerQuote />
            </SecurePath>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;