import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingPage';
import CustomerDashboard from './pages/customerDashboard';
import TicketCreateForm from './pages/ticket';
import AdminDashboard from './pages/adminDashboard';
import TicketsPage from './pages/ticketsPage';
import CustomerQuote from './pages/customerQuote';
import QuoteGenerator from './pages/quoteGenerator';
import ViewTicket from './pages/viewTicket';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/ticketForm" element={<TicketCreateForm />} />
        <Route path="/ticketsPage" element={<TicketsPage />} />
        <Route path="/customerQuote" element={<CustomerQuote/>} />
        <Route path="/adminQuote" element={<QuoteGenerator />} />
        <Route path="/viewTicket" element={<ViewTicket />} />
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
