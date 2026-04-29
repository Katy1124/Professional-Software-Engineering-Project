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
        // LOGIC FOR STATUSES
        const fetchStats = async () => {
                try {
                  const storedUser = JSON.parse(localStorage.getItem('user'));
                    if (!storedUser || !storedUser.id) {
                      console.error("No userID");
                      return;
                    }
                    const tickets = await ticketsApi.list();
                    const allTickets = Array.isArray(tickets) ? tickets : [];
                    const userTickets = allTickets;
                    const counts = {
                      pending: userTickets.filter(t => ['p', 'qp'].includes(t.status?.toLowerCase())).length,
                      active: userTickets.filter(t => ['a', 'qr', 'e'].includes(t.status?.toLowerCase())).length,
                      resolved: userTickets.filter(t => ['r', 'rj'].includes(t.status?.toLowerCase())).length
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
      {/*<div className="container text-center">*/}
        <div className="quick-links-section text-center">
        <p className='quick-links'>Quick Links</p>
          <h2 className="mb-4" style={{color: 'white', fontWeight: 'bold' , height: 20}}>Quick Links</h2>
          <div className="row justify-content-center gap-3">
          <div className="row justify-content-center">
            <div className="col-6 col-md-4">
              <Link to="/alltickets" className="card quick-link-card p-4 text-decoration-none d-block">
                My Tickets
              </Link>
            </div>
            <div className="col-6 col-md-4 ">
              <Link to="/quotegen" className="card quick-link-card p-4 text-decoration-none d-block">
                My Quotes
              </Link>
            </div>
        </div>
      <div classname = "container">

      </div>
        {/* <div class="row justify-content-center">
          <div class="col-4 links" style={{marginTop: '10px', marginBottom: '10px'}}>
            <Link to="/quotegen" style={{ textDecoration: 'none' }}>
              <div className="card edits">
                <div class="card-body">
                  <p style={{fontSize: '20px'}}>Quote Editor</p>
                </div>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
      </div>
    </div>
  );
}