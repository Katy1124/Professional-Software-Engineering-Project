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
import TestTicket from './pages/viewTicket2';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<SecurePath allowedType={1}> <AdminDashboard /> </SecurePath>} />
        <Route path="/customer" element={<SecurePath allowedType={0}> <CustomerDashboard /> </SecurePath>} />
        <Route path="/ticketForm" element={<SecurePath allowedType={0}> <TicketForm /> </SecurePath>} />
        <Route path="/ticketsPage" element={<TicketsPage />} />
        <Route path="/customerQuote" element={<CustomerQuote/>} />
        <Route path="/adminQuote" element={<SecurePath allowedType={1}> <QuoteGenerator /> </SecurePath>} />
        <Route path="/viewTicket" element={<ViewTicket />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Temporary pages */}
        <Route path="/viewTestTicket/:id" element={<TestTicket />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
