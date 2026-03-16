import React, { useState, useEffect, use } from 'react';
import { ticketsApi } from '../api/tickets.api';
import { Link } from 'react-router-dom';
import giacomLogo from '../assets/giacom-master-white-logo-1.png'; 
import '../css/adminDashboard.css';
import AdminNav from '../components/adminNav';


export default function AdminDashboard() {
      const [stats, setStats] = useState({
        pending: 0,
        active: 0,
        resolved: 0
      });

      useEffect(() => {
        //TEMPORARY LOGIC USING SEVERITY INSTEAD OF STATUS
            const fetchStats = async () => {
                try {
                    const tickets = await ticketsApi.list();
                    const allTickets = Array.isArray(tickets) ? tickets : [];
                    const counts = {
                        pending: allTickets.filter(t => t.severity == 1).length,
                        active: allTickets.filter(t => t.severity == 2).length,
                        resolved: allTickets.filter(t => t.severity == 3 || t.severity == 4).length
                    };
        
                    setStats(counts);
                } catch (error) {
                    console.error('Error fetching ticket stats:', error);
                }
            };
        
            fetchStats();
          }, []);
        
          const labels = [
            { label: 'Pending Tickets', count: stats.pending },
            { label: 'Active Tickets', count: stats.active },
            { label: 'Resolved Tickets', count: stats.resolved }
          ];
     

  return (
    
    <div className="admin-dashboard">

      <AdminNav />

      <div className="container text-center">
  <div className="row justify-content-center">
    {[
      { label: 'Active Tickets', count: stats.active, colorClass: 'active-tickets' },
      { label: 'Pending Tickets', count: stats.pending, colorClass: 'pending-tickets' },
      { label: 'Resolved Tickets', count: stats.resolved, colorClass: 'resolved-tickets' }
    ].map((stat, idx) => (
      <div key={idx} className="col-md-4 mb-3">
        <div className={`card ${stat.colorClass}`} style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card-body">
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{stat.label}</h3>
            <p style={{ fontSize: '40px', fontWeight: 'bold', margin: 0 }}>{stat.count}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="container text-center">
        <p className='quick-links'>Quick Links</p>
        <div className="row justify-content-center" style={{paddingTop: '5px'}}>
          <div className="col-4 links">
            <Link to="/ticketsPage" style={{ textDecoration: 'none' }}>
              <div className="card tickets">
                <div className="card-body">
                  <p style={{fontSize: '20px'}}>Tickets</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-4 links">
            <Link to="/customerQuote" style={{ textDecoration: 'none' }}>
              <div className="card quotes">
                <div className="card-body">
                  <p style={{fontSize: '20px'}}>Quotes</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-4 links" style={{marginTop: '10px', marginBottom: '10px'}}>
            <Link to="/adminQuote" style={{ textDecoration: 'none' }}>
              <div className="card edits">
                <div class="card-body">
                  <p style={{fontSize: '20px'}}>Edits</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="footer" />
    </div>
  );
}