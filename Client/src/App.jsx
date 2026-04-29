import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SecurePath from './components/securepath';
import LoginPage from './pages/loginPage';
// new commit
// Admin Pages
import AdminDashboard from './pages/adminDashboard'; //Admin Dashboard
import QuoteEstimate from './pages/quoteGeneratorNEW'; //Admin Quote Generator
import ViewTicketAd from './pages/viewTicketAdNEW'; //Admin View Ticket
import TicketsPageAd from './pages/ticketsPageAd'; //All Tickets

// Customer Pages
import CustomerDashboard from './pages/customerDashboard'; //Customer Dashboard
import TicketForm from './pages/ticketForm'; //Ticket Form

import TicketsPageCus from './pages/ticketsPageCus'; //Customer Tickets
import CustomerQuote from './pages/customerQuote'; //Customer View Quote
import ViewTicketCus from './pages/viewTicketCusNEW'; //Customer View Ticket

function App() {
  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
            path="/admin"
            element={
                <SecurePath allowedType={1}>
                <AdminDashboard />
                </SecurePath>
            }
            />
            <Route
            path="/quotegen"
            element={
                <SecurePath allowedType={1}>
                <QuoteEstimate />
                </SecurePath>
            }
            />
            <Route
            path="/viewticketad/:id"
            element={
                <SecurePath allowedType={1}>
                <ViewTicketAd />
                </SecurePath>
            }
            />
            <Route
            path="/alltickets"
            element={
                <SecurePath allowedType={1}>
                <TicketsPageAd />
                </SecurePath>
            }
            />
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
            path="/mytickets"
            element={
                <SecurePath allowedType={0}>
                <TicketsPageCus />
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
            <Route
            path="/viewticket/:id"
            element={
                <SecurePath allowedType={0}>
                <ViewTicketCus />
                </SecurePath>
            }
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App;