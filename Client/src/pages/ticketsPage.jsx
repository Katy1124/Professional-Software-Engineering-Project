import { useEffect, useState } from "react";
import giacomLogo from "../assets/giacom-master-white-logo-1.png";
import "../css/ticketsPage.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5039";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");

        const res = await fetch(`${API_BASE}/api/Tickets`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        console.log("Tickets API returned:", data);

        // handles either [] or { $values: [] } just in case
        const list = Array.isArray(data) ? data : (data?.$values ?? []);
        setTickets(list);
      } catch (e) {
        console.error(e);
        setError(e.message || "Failed to load tickets");
        setTickets([]);
      }
    })();
  }, []);

  return (
    <div className="tickets-page">
      <nav className="navbar custom-nav">
        <div className="container-fluid">
          <a className="navbar-brand" href="/landing">
            <img src={giacomLogo} alt="GIACOM" width="110" height="24" />
          </a>
          <a className="navbar custom-link" href="/customer">Customer Dash</a>
          <a className="navbar custom-link" href="/admin">Admin Dash</a>
        </div>
      </nav>

      <div className="container-fluid">
        {error && <div style={{ color: "red" }}>{error}</div>}

        {tickets.length === 0 ? (
          <p>No tickets found</p>
        ) : (
          <div className="row align-items-center">
            {tickets.map(t => (
              <div className="col" key={t.id}>
                <div className="card tickets">
                  <div className="card-body">
                    <p style={{ fontSize: "40px", fontWeight: "bold" }}>
                      Ticket {t.id}
                    </p>
                    <p style={{ fontSize: "20px" }}>{t.title}</p>
                    <p style={{ fontSize: "16px" }}>{t.description}</p>
                    <p>Severity: {t.severity}</p>
                    <p>Users affected: {t.users_Affected}</p>
                    <button className="view-button">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="footer" />
    </div>
  );
}